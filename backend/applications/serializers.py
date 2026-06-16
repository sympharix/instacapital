from rest_framework import serializers
from .models import LoanApplication, LendingPartner, ApplicationNote
from customers.serializers import CustomerSerializer


class LendingPartnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = LendingPartner
        fields = '__all__'


class ApplicationNoteSerializer(serializers.ModelSerializer):
    author_name = serializers.SerializerMethodField()

    class Meta:
        model = ApplicationNote
        fields = ('id', 'application', 'author', 'author_name', 'note', 'created_at')
        read_only_fields = ('author',)
        extra_kwargs = {
            'application': {'required': False},
        }

    def get_author_name(self, obj):
        if not obj.author:
            return None
        return obj.author.get_full_name() or obj.author.username


class LoanApplicationSerializer(serializers.ModelSerializer):
    customer_detail = CustomerSerializer(source='customer', read_only=True)
    lending_partner_detail = LendingPartnerSerializer(source='lending_partner', read_only=True)
    notes = ApplicationNoteSerializer(many=True, read_only=True)

    class Meta:
        model = LoanApplication
        fields = '__all__'
        extra_kwargs = {
            'customer': {'required': False, 'allow_null': True}
        }
