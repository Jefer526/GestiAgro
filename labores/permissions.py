from rest_framework import permissions

class EsMayordomoOAgronomoOAdmin(permissions.BasePermission):
    """
    Permite acceso a usuarios con rol mayordomo, agrónomo o admin.
    """
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.rol in ["mayordomo", "agronomo", "admin"]
