from rest_framework import generics, permissions
from .models import User
from .serializers import UserSerializer, RegisterSerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (permissions.AllowAny,)
    serializer_class = RegisterSerializer

class UserDetailView(generics.RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self):
        return self.request.user

import random
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import OTPVerification

class SendOTPView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        identifier = request.data.get('identifier')
        if not identifier:
            return Response({'error': 'identifier is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        otp = str(random.randint(100000, 999999))
        
        # As per user request, print to terminal log
        print(f"\n=============================================")
        print(f"🚀 OTP for {identifier}: {otp}")
        print(f"=============================================\n")

        OTPVerification.objects.create(identifier=identifier, otp_code=otp)
        return Response({'message': 'OTP sent successfully (check terminal logs)'})

class VerifyOTPView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        identifier = request.data.get('identifier')
        otp = request.data.get('otp')
        
        if not identifier or not otp:
            return Response({'error': 'identifier and otp are required'}, status=status.HTTP_400_BAD_REQUEST)
            
        verification = OTPVerification.objects.filter(identifier=identifier, otp_code=otp).order_by('-created_at').first()
        
        if verification:
            verification.is_verified = True
            verification.save()
            return Response({'message': 'OTP verified successfully', 'identifier': identifier})
        else:
            return Response({'error': 'Invalid or expired OTP'}, status=status.HTTP_400_BAD_REQUEST)

from django.db import transaction
from leads.models import Lead, LeadStatus, LeadSource, LoanType
from customers.models import Customer, EmploymentType
from .models import Role

class CustomerRegisterView(APIView):
    permission_classes = (permissions.AllowAny,)

    @transaction.atomic
    def post(self, request):
        data = request.data
        username = data.get('username')
        password = data.get('password')
        email = data.get('email')
        mobile = data.get('mobile')
        full_name = data.get('full_name')

        if not all([username, password, mobile, full_name]):
            return Response({'error': 'username, password, mobile, and full_name are required'}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(username=username).exists():
            return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)

        # 1. Create Django User
        user = User.objects.create_user(
            username=username,
            password=password,
            email=email,
            role=Role.CUSTOMER
        )

        # 2. Create Lead automatically
        lead = Lead.objects.create(
            name=full_name,
            mobile=mobile,
            email=email,
            loan_type=LoanType.PERSONAL, # Defaulting to PERSONAL as per plan
            source=LeadSource.WEBSITE,
            status=LeadStatus.NEW
        )

        # 3. Create Customer Profile
        customer = Customer.objects.create(
            user=user,
            lead=lead,
            full_name=full_name,
            mobile=mobile,
            email=email,
            employment_type=EmploymentType.SALARIED # Default placeholder
        )

        return Response({
            'message': 'Customer registered successfully',
            'user_id': user.id,
            'lead_id': lead.id,
            'customer_id': customer.id
        }, status=status.HTTP_201_CREATED)

from .permissions import IsSuperAdmin
from .serializers import StaffUserCreateSerializer

class UserManagementListCreateView(generics.ListCreateAPIView):
    queryset = User.objects.all().order_by('-date_joined')
    permission_classes = (IsSuperAdmin,)

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return StaffUserCreateSerializer
        return UserSerializer

class UserManagementUpdateView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (IsSuperAdmin,)
