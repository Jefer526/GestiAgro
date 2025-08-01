from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PerfilUsuarioViewSet, RolViewSet, PermisoViewSet

router = DefaultRouter()
router.register(r'usuarios', PerfilUsuarioViewSet)
router.register(r'roles', RolViewSet)
router.register(r'permisos', PermisoViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
