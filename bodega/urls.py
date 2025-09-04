from rest_framework.routers import DefaultRouter
from .views import ProductoViewSet, MovimientoViewSet


# Definición de rutas para la aplicación Bodega
router = DefaultRouter()
router.register(r'productos', ProductoViewSet)
router.register(r'movimientos', MovimientoViewSet)

urlpatterns = router.urls
