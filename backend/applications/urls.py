from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import LoanApplicationViewSet, LendingPartnerViewSet

router = DefaultRouter()
router.register(r'partners', LendingPartnerViewSet, basename='lending-partners')
router.register(r'', LoanApplicationViewSet, basename='applications')

urlpatterns = [
    path('', include(router.urls)),
]
