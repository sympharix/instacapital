import json
from rest_framework import viewsets, permissions
from .models import Document, DocumentType
from .serializers import DocumentSerializer

def mock_ocr_extraction(document_type):
    """Mocks the output of AWS Textract based on document type."""
    if document_type == DocumentType.PAN:
        return {"pan_number": "ABCDE1234F", "name": "MOCK USER"}
    elif document_type == DocumentType.AADHAAR:
        return {"aadhaar_number": "1234 5678 9012", "dob": "1990-01-01"}
    return {"message": "OCR not supported for this document type"}

class DocumentViewSet(viewsets.ModelViewSet):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer

    def get_permissions(self):
        if self.action == 'create':
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]

    def get_queryset(self):
        queryset = super().get_queryset()
        application = self.request.query_params.get('application', None)
        if application:
            queryset = queryset.filter(application=application)
        return queryset

    def perform_create(self, serializer):
        user = self.request.user if self.request.user.is_authenticated else None
        document = serializer.save(uploaded_by=user)
        extracted_data = mock_ocr_extraction(document.document_type)
        if extracted_data:
            document.ocr_extracted_data = extracted_data
            document.save()
