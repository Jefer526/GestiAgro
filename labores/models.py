from django.db import models
from fincas.models import Finca, Lote
from trabajadores.models import Trabajador
from core.models import BaseAuditModel


# Modelo para registrar labores realizadas en una finca o lote
class Labor(BaseAuditModel):
    fecha = models.DateField()
    finca = models.ForeignKey(Finca, on_delete=models.CASCADE, related_name="labores")
    lote = models.ForeignKey(Lote, on_delete=models.SET_NULL, null=True, blank=True, related_name="labores")
    descripcion = models.TextField()
    observaciones = models.TextField(null=True, blank=True)

    def __str__(self):
        return f"Labor {self.id} - {self.fecha} - {self.finca.nombre}"


# Modelo para registrar los detalles de cada labor (trabajadores y ejecución)
class DetalleLabor(BaseAuditModel):
    labor = models.ForeignKey(Labor, on_delete=models.CASCADE, related_name="detalles")
    trabajador = models.ForeignKey(Trabajador, on_delete=models.SET_NULL, null=True, blank=True)
    trabajador_externo = models.CharField(max_length=200, null=True, blank=True)
    jornal = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    ejecucion = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    um = models.CharField(max_length=50, null=True, blank=True)

    def __str__(self):
        return f"Detalle {self.id} - {self.trabajador or self.trabajador_externo} - {self.labor}"
