from django.db import models
from fincas.models import Finca  # 👈 relacionamos con las fincas ya creadas

class VariableClimatica(models.Model):
    finca = models.ForeignKey(Finca, on_delete=models.CASCADE, related_name="climas")
    fecha = models.DateField()
    precipitacion = models.DecimalField(max_digits=6, decimal_places=2, null=True, blank=True)  # mm
    temp_min = models.DecimalField(max_digits=4, decimal_places=1, null=True, blank=True)       # °C
    temp_max = models.DecimalField(max_digits=4, decimal_places=1, null=True, blank=True)       # °C
    humedad = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)        # %

    class Meta:
        unique_together = ('finca', 'fecha')  # ✅ un registro por finca y fecha
        ordering = ['-fecha']

    def __str__(self):
        return f"{self.finca.nombre} - {self.fecha}"
