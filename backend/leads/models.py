from django.db import models
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver

class LeadSource(models.TextChoices):
    WEBSITE = 'WEBSITE', 'Website'
    FACEBOOK = 'FACEBOOK', 'Facebook'
    GOOGLE_ADS = 'GOOGLE_ADS', 'Google Ads'
    WHATSAPP = 'WHATSAPP', 'WhatsApp'
    REFERRAL = 'REFERRAL', 'Referral'
    MANUAL = 'MANUAL', 'Manual Entry'

class LeadStatus(models.TextChoices):
    NEW = 'NEW', 'New'
    CONTACTED = 'CONTACTED', 'Contacted'
    INTERESTED = 'INTERESTED', 'Interested'
    DOCUMENTS_PENDING = 'DOCUMENTS_PENDING', 'Documents Pending'
    APPLIED = 'APPLIED', 'Applied'
    PROCESSING = 'PROCESSING', 'Processing'
    VERIFICATION = 'VERIFICATION', 'Verification'
    APPROVED = 'APPROVED', 'Approved'
    SANCTIONED = 'SANCTIONED', 'Sanctioned'
    DISBURSED = 'DISBURSED', 'Disbursed'
    REJECTED = 'REJECTED', 'Rejected'

class LoanType(models.TextChoices):
    PERSONAL = 'PERSONAL', 'Personal Loan'
    HOME = 'HOME', 'Home Loan'
    LAP = 'LAP', 'LAP'
    BUSINESS = 'BUSINESS', 'Business Loan'
    EDUCATION = 'EDUCATION', 'Education Loan'
    CAR = 'CAR', 'Car Loan'

class Lead(models.Model):
    name = models.CharField(max_length=255)
    mobile = models.CharField(max_length=20)
    email = models.EmailField(blank=True, null=True)
    city = models.CharField(max_length=100, blank=True, null=True)
    state = models.CharField(max_length=100, blank=True, null=True)
    loan_type = models.CharField(max_length=50, choices=LoanType.choices)
    source = models.CharField(max_length=50, choices=LeadSource.choices, default=LeadSource.MANUAL)
    status = models.CharField(max_length=50, choices=LeadStatus.choices, default=LeadStatus.NEW)
    assigned_executive = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True, related_name='assigned_leads')
    notes = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} - {self.loan_type}"

# Import inside the signal to avoid circular imports if any, but since we are triggering a celery task it's fine
from integrations.tasks import send_brevo_email

@receiver(post_save, sender=Lead)
def trigger_welcome_email(sender, instance, created, **kwargs):
    if created and instance.email:
        subject = f"Welcome to Instacapital, {instance.name}!"
        body = f"Hi {instance.name},\n\nThank you for your interest in a {instance.loan_type} loan! We have received your enquiry and one of our experts will contact you at {instance.mobile} shortly.\n\nBest Regards,\nThe Instacapital Team"
        send_brevo_email.delay(instance.email, subject, body)
