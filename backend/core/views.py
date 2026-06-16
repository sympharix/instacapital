from datetime import timedelta

from django.db.models import Sum
from django.utils import timezone
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from applications.models import ApplicationStatus, LoanApplication
from documents.models import Document
from leads.models import Lead


def _month_bounds(months_ago):
    today = timezone.now().date()
    first_of_this_month = today.replace(day=1)
    year = first_of_this_month.year
    month = first_of_this_month.month - months_ago
    while month <= 0:
        month += 12
        year -= 1
    start = first_of_this_month.replace(year=year, month=month)
    if month == 12:
        end = start.replace(year=year + 1, month=1)
    else:
        end = start.replace(month=month + 1)
    return start, end


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def dashboard_stats(request):
    total_leads = Lead.objects.count()
    active_applications = LoanApplication.objects.exclude(
        status__in=[ApplicationStatus.DISBURSED, ApplicationStatus.REJECTED]
    ).count()
    pending_documents = Document.objects.filter(is_verified=False).count()
    disbursed_total = LoanApplication.objects.filter(
        status=ApplicationStatus.DISBURSED
    ).aggregate(total=Sum('requested_amount'))['total'] or 0

    trends = []
    for months_ago in range(5, -1, -1):
        start, end = _month_bounds(months_ago)
        applications_count = LoanApplication.objects.filter(
            created_at__gte=start, created_at__lt=end
        ).count()
        disbursed_count = LoanApplication.objects.filter(
            status=ApplicationStatus.DISBURSED, updated_at__gte=start, updated_at__lt=end
        ).count()
        trends.append({
            'month': start.strftime('%b'),
            'applications': applications_count,
            'disbursed': disbursed_count,
        })

    recent_activity = []

    for lead in Lead.objects.order_by('-created_at')[:5]:
        recent_activity.append({
            'type': 'lead',
            'title': 'New Lead registered',
            'subtitle': f"{lead.name} - {lead.get_loan_type_display()}",
            'timestamp': lead.created_at,
        })

    for application in LoanApplication.objects.select_related('customer').order_by('-updated_at')[:5]:
        recent_activity.append({
            'type': 'application',
            'title': f"Application {application.application_id} - {application.get_status_display()}",
            'subtitle': f"{application.customer.full_name} - {application.get_loan_type_display()}",
            'timestamp': application.updated_at,
        })

    for document in Document.objects.select_related('customer').order_by('-created_at')[:5]:
        recent_activity.append({
            'type': 'document',
            'title': f"{document.get_document_type_display()} uploaded",
            'subtitle': document.customer.full_name if document.customer else 'Unknown Customer',
            'timestamp': document.created_at,
        })

    recent_activity.sort(key=lambda item: item['timestamp'], reverse=True)
    recent_activity = recent_activity[:6]

    return Response({
        'total_leads': total_leads,
        'active_applications': active_applications,
        'pending_documents': pending_documents,
        'disbursed_total': disbursed_total,
        'trends': trends,
        'recent_activity': recent_activity,
    })
