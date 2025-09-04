from rest_framework.permissions import BasePermission


# Permiso para usuarios con rol Administrador
class EsAdmin(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.rol == 'admin'


# Permiso para usuarios con rol Agrónomo
class EsAgronomo(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.rol == 'agronomo'


# Permiso para usuarios con rol Mayordomo
class EsMayordomo(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.rol == 'mayordomo'


# Permiso para usuarios con rol Administrador o Agrónomo
class EsAdminOAgronomo(BasePermission):
    """
    Permite acceso a usuarios con rol = admin o agronomo.
    Útil para vistas donde el agrónomo también deba gestionar mayordomos.
    """
    def has_permission(self, request, view):
        return (
            request.user.is_authenticated and
            request.user.rol in ['admin', 'agronomo']
        )
