from rest_framework.routers import DefaultRouter
from .views import TrabajadorViewSet


# Definición de rutas para la aplicación Trabajadores
router = DefaultRouter()
router.register(r"trabajadores", TrabajadorViewSet)

urlpatterns = router.urls
