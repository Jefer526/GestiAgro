from rest_framework.routers import DefaultRouter
from .views import ProductoViewSet, MovimientoViewSet

router = DefaultRouter()
router.register(r'productos', ProductoViewSet)
router.register(r'movimientos', MovimientoViewSet)

urlpatterns = router.urls
