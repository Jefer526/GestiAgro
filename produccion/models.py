from django.db import models
from fincas.models import Finca, Lote
from core.models import BaseAuditModel


# Modelo para registrar la producción agrícola de cada finca y lote
class Produccion(BaseAuditModel):
    fecha = models.DateField()
    finca = models.ForeignKey(Finca, on_delete=models.CASCADE)
    lote = models.ForeignKey(Lote, on_delete=models.CASCADE)
    cantidad = models.DecimalField(max_digits=10, decimal_places=2)
    unidad = models.CharField(max_length=20, default="Kg")
    observaciones = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.lote.cultivo} - {self.cantidad} {self.unidad}"
