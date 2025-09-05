from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    list_display = ("email", "nombre", "telefono", "rol", "is_active", "is_staff", "is_superuser")
    ordering = ("email",)
    search_fields = ("email", "nombre", "telefono")

    fieldsets = (
        (None, {"fields": ("email", "nombre", "telefono", "rol", "password")}),
        ("Permisos", {"fields": ("is_active", "is_staff", "is_superuser", "groups", "user_permissions")}),
        ("Fechas importantes", {"fields": ("last_login",)}),
    )

    add_fieldsets = (
        (None, {
            "classes": ("wide",),
            "fields": ("email", "nombre", "telefono", "rol", "password1", "password2", "is_active", "is_staff", "is_superuser"),
        }),
    )
