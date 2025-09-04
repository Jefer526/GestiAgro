from rest_framework.routers import DefaultRouter
from .views import ProduccionViewSet


# Definición de rutas para la aplicación Producción
router = DefaultRouter()
router.register(r"", ProduccionViewSet, basename="produccion")

urlpatterns = router.urls
