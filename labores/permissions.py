from rest_framework import permissions


# Permiso para usuarios con rol mayordomo, agrónomo o administrador
class EsMayordomoOAgronomoOAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.rol in ["mayordomo", "agronomo", "admin"]
