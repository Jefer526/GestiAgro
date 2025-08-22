# equipos/urls.py
from rest_framework.routers import DefaultRouter
from .views import MaquinaViewSet, MantenimientoViewSet, LaborMaquinariaViewSet

router = DefaultRouter()
router.register(r"maquinas", MaquinaViewSet)
router.register(r"mantenimientos", MantenimientoViewSet)
router.register(r"labores-maquinaria", LaborMaquinariaViewSet)

urlpatterns = router.urls
