from django.db import models

class TriggerType(models.TextChoices):
    ON_CREATE = 'ON_CREATE', 'On Creation'
    ON_UPDATE = 'ON_UPDATE', 'On Update'
    ON_STATUS_CHANGE = 'ON_STATUS_CHANGE', 'On Status Change'

class ActionType(models.TextChoices):
    SEND_EMAIL = 'SEND_EMAIL', 'Send Email'
    SEND_SMS = 'SEND_SMS', 'Send SMS'
    CHECK_CREDIT = 'CHECK_CREDIT', 'Check Credit Score'

class WorkflowRule(models.Model):
    name = models.CharField(max_length=255)
    model_name = models.CharField(max_length=50, help_text="e.g. Lead, LoanApplication")
    trigger_type = models.CharField(max_length=50, choices=TriggerType.choices)
    condition_field = models.CharField(max_length=50, blank=True, null=True, help_text="e.g. status")
    condition_value = models.CharField(max_length=50, blank=True, null=True, help_text="e.g. APPROVED")
    action_type = models.CharField(max_length=50, choices=ActionType.choices)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
