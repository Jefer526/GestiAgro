from rest_framework.routers import DefaultRouter
from .views import FincaViewSet, LoteViewSet


# Definición de rutas para la aplicación Fincas
router = DefaultRouter()
router.register(r'fincas', FincaViewSet)
router.register(r'lotes', LoteViewSet)

urlpatterns = router.urls
