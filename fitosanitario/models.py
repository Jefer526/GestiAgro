from django.db import models
from fincas.models import Finca, Lote
from core.models import BaseAuditModel

class Monitoreo(BaseAuditModel):
    fecha = models.DateField()
    finca = models.ForeignKey(Finca, on_delete=models.CASCADE, related_name="monitoreos")
    lote = models.ForeignKey(Lote, on_delete=models.CASCADE, related_name="monitoreos")
    observaciones = models.TextField(blank=True)

    def __str__(self):
        return f"Monitoreo {self.id} - {self.fecha} ({self.finca.nombre} / {self.lote.lote})"


class RegistroPlaga(BaseAuditModel):
    monitoreo = models.ForeignKey(Monitoreo, on_delete=models.CASCADE, related_name="registros")
    familia = models.CharField(max_length=100)
    plaga = models.CharField(max_length=100)
    promedio = models.FloatField()

    def __str__(self):
        return f"{self.familia} - {self.plaga} ({self.promedio})"
