# equipos/urls.py
from rest_framework.routers import DefaultRouter
from .views import MaquinaViewSet, MantenimientoViewSet

router = DefaultRouter()
router.register(r"maquinas", MaquinaViewSet)
router.register(r"mantenimientos", MantenimientoViewSet)

urlpatterns = router.urls
