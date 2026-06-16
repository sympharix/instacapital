from rest_framework import serializers
from .models import WorkflowRule

class WorkflowRuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkflowRule
        fields = '__all__'
