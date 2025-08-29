# labores/urls.py
from rest_framework.routers import DefaultRouter
from .views import LaborViewSet

router = DefaultRouter()
router.register(r"labores", LaborViewSet, basename="labores")

urlpatterns = router.urls
