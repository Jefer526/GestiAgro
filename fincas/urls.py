from rest_framework.routers import DefaultRouter
from .views import FincaViewSet, LoteViewSet

router = DefaultRouter()
router.register(r'fincas', FincaViewSet)
router.register(r'lotes', LoteViewSet)

urlpatterns = router.urls
