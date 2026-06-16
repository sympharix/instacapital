from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import IntegrationLogViewSet

router = DefaultRouter()
router.register(r'', IntegrationLogViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
