from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    UsuarioViewSet, RolViewSet, PermisoViewSet,
    UsuarioRolViewSet, RolPermisoViewSet
)

router = DefaultRouter()
router.register(r'usuarios', UsuarioViewSet)
router.register(r'roles', RolViewSet)
router.register(r'permisos', PermisoViewSet)
router.register(r'usuarios-roles', UsuarioRolViewSet)
router.register(r'roles-permisos', RolPermisoViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
