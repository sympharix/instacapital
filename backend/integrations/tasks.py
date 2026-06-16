from celery import shared_task
from .models import IntegrationLog
from django.core.mail import send_mail
from django.conf import settings
import time

@shared_task
def send_brevo_email(to_email, subject, body):
    try:
        # Temporarily disabled Brevo email sending
        # send_mail(
        #     subject=subject,
        #     message=body,
        #     from_email=settings.DEFAULT_FROM_EMAIL,
        #     recipient_list=[to_email],
        #     fail_silently=False,
        # )
        # Simulate success
        time.sleep(1)
        status = 'SUCCESS'
        payload = {'status': 'sent (mocked/disabled)'}
    except Exception as e:
        status = 'FAILED'
        payload = {'error': str(e)}

    IntegrationLog.objects.create(
        integration_name='BREVO_EMAIL',
        target_id=to_email,
        status=status,
        request_payload={'subject': subject, 'body': body},
        response_payload=payload
    )
    return status == 'SUCCESS'

@shared_task
def send_mock_sms(phone_number, message):
    time.sleep(1)
    IntegrationLog.objects.create(
        integration_name='TWILIO_MOCK',
        target_id=phone_number,
        status='SUCCESS',
        request_payload={'message': message},
        response_payload={'sid': 'mock-sid-6789'}
    )
    return True

@shared_task
def check_mock_credit(pan_number):
    time.sleep(2)
    IntegrationLog.objects.create(
        integration_name='CIBIL_MOCK',
        target_id=pan_number,
        status='SUCCESS',
        request_payload={'pan': pan_number},
        response_payload={'score': 750, 'report_id': 'mock-report-001'}
    )
    return 750
