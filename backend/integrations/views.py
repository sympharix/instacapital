from rest_framework import viewsets, permissions
from .models import IntegrationLog
from .serializers import IntegrationLogSerializer

class IntegrationLogViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = IntegrationLog.objects.all().order_by('-created_at')
    serializer_class = IntegrationLogSerializer
    permission_classes = [permissions.IsAuthenticated]
