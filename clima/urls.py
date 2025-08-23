from rest_framework.routers import DefaultRouter
from .views import VariableClimaticaViewSet

router = DefaultRouter()
router.register(r'variablesclimaticas', VariableClimaticaViewSet)

urlpatterns = router.urls
