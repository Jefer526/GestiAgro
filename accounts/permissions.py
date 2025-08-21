from rest_framework.permissions import BasePermission

class EsAdmin(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.rol == 'admin'


class EsAgronomo(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.rol == 'agronomo'


class EsMayordomo(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.rol == 'mayordomo'


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
