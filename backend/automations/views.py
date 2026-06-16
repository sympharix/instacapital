from rest_framework import viewsets, permissions
from .models import WorkflowRule
from .serializers import WorkflowRuleSerializer

class WorkflowRuleViewSet(viewsets.ModelViewSet):
    queryset = WorkflowRule.objects.all()
    serializer_class = WorkflowRuleSerializer
    permission_classes = [permissions.IsAuthenticated]
