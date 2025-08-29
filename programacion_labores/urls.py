from rest_framework.routers import DefaultRouter
from .views import ProgramacionLaborViewSet

router = DefaultRouter()
router.register(r'', ProgramacionLaborViewSet)  

urlpatterns = router.urls
