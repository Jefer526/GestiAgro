# cuaderno_campo/urls.py
from rest_framework.routers import DefaultRouter
from .views import RegistroCampoViewSet

router = DefaultRouter()
router.register(r"", RegistroCampoViewSet, basename="cuaderno")  # 👈 sin prefijo

urlpatterns = router.urls
