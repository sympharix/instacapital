from django.contrib import admin
from django.urls import path, include
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from django.conf import settings
from django.conf.urls.static import static
from .views import dashboard_stats

schema_view = get_schema_view(
   openapi.Info(
      title="Instacapital API",
      default_version='v1',
      description="API for Instacapital CRM",
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('users.urls')),
    path('api/leads/', include('leads.urls')),
    path('api/customers/', include('customers.urls')),
    path('api/applications/', include('applications.urls')),
    path('api/documents/', include('documents.urls')),
    path('api/automations/', include('automations.urls')),
    path('api/integrations/', include('integrations.urls')),
    path('api/dashboard/stats/', dashboard_stats, name='dashboard-stats'),


    # Swagger docs
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
