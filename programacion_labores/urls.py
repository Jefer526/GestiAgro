from rest_framework.routers import DefaultRouter
from .views import ProgramacionLaborViewSet

# Definición de rutas para la aplicación Programación de Labores
router = DefaultRouter()
router.register(r'', ProgramacionLaborViewSet)  

urlpatterns = router.urls
