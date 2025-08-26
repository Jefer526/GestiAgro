from rest_framework.routers import DefaultRouter
from .views import ProduccionViewSet

router = DefaultRouter()
router.register(r"", ProduccionViewSet, basename="produccion")

urlpatterns = router.urls
