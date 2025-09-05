from rest_framework.routers import DefaultRouter
from .views import RegistroCampoViewSet


# Definición de rutas para la aplicación Cuaderno de Campo
router = DefaultRouter()
router.register(r"", RegistroCampoViewSet, basename="cuaderno")

urlpatterns = router.urls
