from django.contrib import admin
from .models import Finca, Lote


# Configuración de Finca en el panel de administración
@admin.register(Finca)
class FincaAdmin(admin.ModelAdmin):
    list_display = ("nombre", "municipio", "departamento", "area_bruta", "area_neta", "estado", "get_numero_arboles")

    def get_numero_arboles(self, obj):
        return obj.numero_arboles
    get_numero_arboles.short_description = "N° Árboles"


# Configuración de Lote en el panel de administración
@admin.register(Lote)
class LoteAdmin(admin.ModelAdmin):
    list_display = ("id", "lote", "cultivo", "finca", "estado", "get_variedades")

    def get_variedades(self, obj):
        return ", ".join([f"{a.variedad} ({a.cantidad})" for a in obj.arboles.all()])
    get_variedades.short_description = "Árboles por variedad"
