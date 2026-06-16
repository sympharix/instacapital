from django.db import models
from customers.models import Customer
from applications.models import LoanApplication
from django.conf import settings

class DocumentType(models.TextChoices):
    PAN = 'PAN', 'PAN Card'
    AADHAAR = 'AADHAAR', 'Aadhaar Card'
    SALARY_SLIP = 'SALARY_SLIP', 'Salary Slip'
    BANK_STATEMENT = 'BANK_STATEMENT', 'Bank Statement'
    ITR = 'ITR', 'ITR'
    GST = 'GST', 'GST Documents'
    PROPERTY = 'PROPERTY', 'Property Documents'

class Document(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name='documents', null=True, blank=True)
    lead = models.ForeignKey('leads.Lead', on_delete=models.CASCADE, related_name='documents', null=True, blank=True)
    application = models.ForeignKey(LoanApplication, on_delete=models.SET_NULL, null=True, blank=True, related_name='documents')
    document_type = models.CharField(max_length=50, choices=DocumentType.choices)
    file = models.FileField(upload_to='documents/')
    is_verified = models.BooleanField(default=False)
    ocr_extracted_data = models.JSONField(blank=True, null=True) # Mocking Textract output
    uploaded_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.customer.full_name} - {self.document_type}"
