from rest_framework.routers import DefaultRouter
from .views import VariableClimaticaViewSet


# Definición de rutas para la aplicación Clima
router = DefaultRouter()
router.register(r'variablesclimaticas', VariableClimaticaViewSet)

urlpatterns = router.urls
