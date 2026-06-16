from django.db import models
from customers.models import Customer
from leads.models import LoanType
from django.conf import settings

import uuid

class ApplicationStatus(models.TextChoices):
    PROCESSING = 'PROCESSING', 'Processing'
    VERIFICATION = 'VERIFICATION', 'Verification'
    APPROVED = 'APPROVED', 'Approved'
    SANCTIONED = 'SANCTIONED', 'Sanctioned'
    DISBURSED = 'DISBURSED', 'Disbursed'
    REJECTED = 'REJECTED', 'Rejected'

class PartnerType(models.TextChoices):
    BANK = 'BANK', 'Bank'
    NBFC = 'NBFC', 'NBFC'

class LendingPartner(models.Model):
    name = models.CharField(max_length=255)
    partner_type = models.CharField(max_length=20, choices=PartnerType.choices, default=PartnerType.BANK)
    contact_person = models.CharField(max_length=255, blank=True, null=True)
    contact_email = models.EmailField(blank=True, null=True)
    contact_phone = models.CharField(max_length=20, blank=True, null=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class LoanApplication(models.Model):
    application_id = models.CharField(max_length=20, unique=True, blank=True)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name='applications')
    loan_type = models.CharField(max_length=50, choices=LoanType.choices)
    requested_amount = models.DecimalField(max_digits=12, decimal_places=2)
    tenure_months = models.IntegerField()
    status = models.CharField(max_length=50, choices=ApplicationStatus.choices, default=ApplicationStatus.PROCESSING)
    lending_partner = models.ForeignKey(LendingPartner, on_delete=models.SET_NULL, null=True, blank=True, related_name='applications')
    assigned_to = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if not self.application_id:
            # Generate a unique application ID
            self.application_id = f"APP-{str(uuid.uuid4().hex[:8]).upper()}"
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.application_id} - {self.customer.full_name} ({self.status})"

class ApplicationNote(models.Model):
    application = models.ForeignKey(LoanApplication, on_delete=models.CASCADE, related_name='notes')
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True)
    note = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Note on {self.application.application_id} by {self.author}"
