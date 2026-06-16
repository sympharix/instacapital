from rest_framework import viewsets, permissions, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import LoanApplication, LendingPartner, ApplicationNote
from .serializers import LoanApplicationSerializer, LendingPartnerSerializer, ApplicationNoteSerializer
from customers.models import Customer
from users.models import Role
from users.permissions import IsAdminUser
from integrations.tasks import send_brevo_email


class LendingPartnerViewSet(viewsets.ModelViewSet):
    queryset = LendingPartner.objects.all()
    serializer_class = LendingPartnerSerializer

    def get_permissions(self):
        if self.action in ('list', 'retrieve'):
            return [permissions.IsAuthenticated()]
        return [IsAdminUser()]


class LoanApplicationViewSet(viewsets.ModelViewSet):
    serializer_class = LoanApplicationSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['customer__full_name', 'loan_type', 'status']
    ordering_fields = ['created_at', 'updated_at']

    def get_permissions(self):
        if self.action in ('update', 'partial_update', 'destroy'):
            return [IsAdminUser()]
        return [permissions.IsAuthenticated()]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'CUSTOMER':
            return LoanApplication.objects.filter(customer__user=user)
        return LoanApplication.objects.all()

    def perform_create(self, serializer):
        user = self.request.user
        if user.role == 'CUSTOMER':
            # Auto-assign the linked customer
            try:
                customer = Customer.objects.get(user=user)
                serializer.save(customer=customer)
            except Customer.DoesNotExist:
                # Fallback, but shouldn't happen with our logic
                serializer.save()
        else:
            serializer.save()

    def perform_update(self, serializer):
        old_status = serializer.instance.status
        old_partner_id = serializer.instance.lending_partner_id

        instance = serializer.save()

        customer_email = instance.customer.email if instance.customer else None
        if not customer_email:
            return

        if instance.status != old_status:
            subject = f"Application {instance.application_id} - Status Updated to {instance.get_status_display()}"
            body = (
                f"Hi {instance.customer.full_name},\n\n"
                f"The status of your loan application {instance.application_id} has been updated to "
                f"'{instance.get_status_display()}'.\n\n"
                f"Best Regards,\nThe Instacapital Team"
            )
            send_brevo_email.delay(customer_email, subject, body)

        if instance.lending_partner_id and instance.lending_partner_id != old_partner_id:
            subject = f"Lending Partner Assigned - {instance.application_id}"
            body = (
                f"Hi {instance.customer.full_name},\n\n"
                f"Your loan application {instance.application_id} has been assigned to our partner "
                f"'{instance.lending_partner.name}'. They will be in touch with you regarding the next steps.\n\n"
                f"Best Regards,\nThe Instacapital Team"
            )
            send_brevo_email.delay(customer_email, subject, body)

    @action(detail=True, methods=['get', 'post'], url_path='notes')
    def notes(self, request, pk=None):
        application = self.get_object()

        if request.method == 'POST':
            if not (request.user.is_authenticated and request.user.role in (Role.ADMIN, Role.SUPER_ADMIN)):
                return Response({'detail': 'Not authorized.'}, status=403)
            serializer = ApplicationNoteSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save(application=application, author=request.user)
            return Response(serializer.data, status=201)

        notes = application.notes.all()
        serializer = ApplicationNoteSerializer(notes, many=True)
        return Response(serializer.data)
