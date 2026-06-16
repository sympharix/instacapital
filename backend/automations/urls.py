from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import WorkflowRuleViewSet

router = DefaultRouter()
router.register(r'', WorkflowRuleViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
