from rest_framework.routers import DefaultRouter
from .views import LaborViewSet


# Definición de rutas para la aplicación Labores
router = DefaultRouter()
router.register(r"", LaborViewSet, basename="labores")

urlpatterns = router.urls