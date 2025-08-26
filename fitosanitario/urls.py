from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MonitoreoViewSet

router = DefaultRouter()
router.register("monitoreos", MonitoreoViewSet, basename="monitoreos")

urlpatterns = [
    path("", include(router.urls)),
]
