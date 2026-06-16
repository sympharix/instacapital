from django.contrib.auth.models import AbstractUser
from django.db import models

class Role(models.TextChoices):
    SUPER_ADMIN = 'SUPER_ADMIN', 'Super Admin'
    ADMIN = 'ADMIN', 'Admin'
    MANAGER = 'MANAGER', 'Manager'
    LOAN_EXECUTIVE = 'LOAN_EXECUTIVE', 'Loan Executive'
    TELECALLER = 'TELECALLER', 'Telecaller'
    OPERATIONS_EXECUTIVE = 'OPERATIONS_EXECUTIVE', 'Operations Executive'
    SUPPORT = 'SUPPORT', 'Support Team'
    CUSTOMER = 'CUSTOMER', 'Customer'

class Company(models.Model):
    name = models.CharField(max_length=255)
    domain = models.CharField(max_length=255, unique=True, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.name

class User(AbstractUser):
    role = models.CharField(
        max_length=50,
        choices=Role.choices,
        default=Role.LOAN_EXECUTIVE
    )
    phone_number = models.CharField(max_length=20, blank=True, null=True)
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='users', null=True, blank=True)

    def __str__(self):
        return f"{self.username} - {self.get_role_display()} ({self.company.name if self.company else 'System'})"

class OTPVerification(models.Model):
    identifier = models.CharField(max_length=255) # email or phone
    otp_code = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)
    is_verified = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.identifier} - {self.otp_code}"
