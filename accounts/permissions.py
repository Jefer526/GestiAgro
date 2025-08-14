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