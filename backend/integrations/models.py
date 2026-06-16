from django.db import models
from django.conf import settings

class IntegrationLog(models.Model):
    integration_name = models.CharField(max_length=50, help_text="e.g. SENDGRID, TWILIO, CIBIL")
    target_id = models.CharField(max_length=50, help_text="e.g. email address or phone number")
    status = models.CharField(max_length=20, choices=[('SUCCESS', 'Success'), ('FAILED', 'Failed')])
    request_payload = models.JSONField(blank=True, null=True)
    response_payload = models.JSONField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.integration_name} to {self.target_id} ({self.status})"
