from rest_framework import viewsets, permissions, filters
from .models import Lead
from .serializers import LeadSerializer
from users.permissions import IsAdminUser


class LeadViewSet(viewsets.ModelViewSet):
    queryset = Lead.objects.all()
    serializer_class = LeadSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]

    def get_permissions(self):
        if self.action == 'create':
            return [permissions.AllowAny()]
        if self.action == 'destroy':
            return [IsAdminUser()]
        return [permissions.IsAuthenticated()]
    search_fields = ['name', 'email', 'mobile', 'city']
    ordering_fields = ['created_at', 'updated_at']

    def get_queryset(self):
        queryset = super().get_queryset()
        status = self.request.query_params.get('status', None)
        source = self.request.query_params.get('source', None)
        loan_type = self.request.query_params.get('loan_type', None)
        assigned_executive = self.request.query_params.get('assigned_executive', None)
        
        if status:
            queryset = queryset.filter(status=status)
        if source:
            queryset = queryset.filter(source=source)
        if loan_type:
            queryset = queryset.filter(loan_type=loan_type)
        if assigned_executive:
            queryset = queryset.filter(assigned_executive=assigned_executive)
            
        return queryset
