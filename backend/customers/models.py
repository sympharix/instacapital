from django.db import models
from leads.models import Lead

class EmploymentType(models.TextChoices):
    SALARIED = 'SALARIED', 'Salaried'
    SELF_EMPLOYED = 'SELF_EMPLOYED', 'Self Employed'
    BUSINESS = 'BUSINESS', 'Business'

from django.conf import settings

class Customer(models.Model):
    # Link to Django User
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True, related_name='customer_profile')
    # Link to Lead if applicable
    lead = models.OneToOneField(Lead, on_delete=models.SET_NULL, null=True, blank=True, related_name='customer_profile')
    
    # Personal Info
    full_name = models.CharField(max_length=255)
    mobile = models.CharField(max_length=20, unique=True)
    email = models.EmailField(blank=True, null=True)
    pan_number = models.CharField(max_length=15, blank=True, null=True)
    aadhaar_number = models.CharField(max_length=15, blank=True, null=True)
    dob = models.DateField(blank=True, null=True)
    address = models.TextField(blank=True, null=True)

    # Employment Info
    employment_type = models.CharField(max_length=50, choices=EmploymentType.choices)
    company_name = models.CharField(max_length=255, blank=True, null=True)
    salary = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    business_turnover = models.DecimalField(max_digits=15, decimal_places=2, default=0)

    # Loan History
    existing_loans = models.BooleanField(default=False)
    total_emi = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    outstanding_amount = models.DecimalField(max_digits=12, decimal_places=2, default=0)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.full_name} ({self.mobile})"
