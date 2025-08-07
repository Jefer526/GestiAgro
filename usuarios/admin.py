from django.contrib import admin
from .models import Usuarios, Roles, Permisos, RolesPermisos
from django.utils.timezone import now

@admin.register(Usuarios)
class UsuariosAdmin(admin.ModelAdmin):
    list_display = ['id_usuario', 'nombre_completo', 'email', 'telefono', 'creado_por', 'fecha_creacion']
    fields = ['nombre_completo', 'email', 'telefono', 'contrasena', 'creado_por', 'fecha_creacion']

    def save_model(self, request, obj, form, change):
        if not change:
            obj.creado_por = str(request.user)
            obj.fecha_creacion = now()
        super().save_model(request, obj, form, change)
