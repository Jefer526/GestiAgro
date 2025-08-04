from django.contrib import admin
from .models import Finca, Lote, FincaEquipos, TrabajadoresFincas

admin.site.register(Finca)
admin.site.register(Lote)
admin.site.register(FincaEquipos)
admin.site.register(TrabajadoresFincas)
