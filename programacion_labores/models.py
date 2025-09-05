from django.db import models
from django.conf import settings
from fincas.models import Finca, Lote


# Modelo para programar labores agrícolas en fincas y lotes
class ProgramacionLabor(models.Model):
    ESTADOS = [
        ("Iniciada", "Iniciada"),
        ("En Proceso", "En Proceso"),
        ("Terminada", "Terminada"),
        ("Cancelada", "Cancelada"),
    ]

    semana = models.IntegerField()
    finca = models.ForeignKey(Finca, on_delete=models.CASCADE, related_name="labores_programadas")
    lote = models.ForeignKey(Lote, on_delete=models.CASCADE, related_name="labores_programadas")
    labor = models.CharField(max_length=200)
    jornales = models.PositiveIntegerField()
    estado = models.CharField(max_length=20, choices=ESTADOS, default="Iniciada")
    creado_por = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    creado_en = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Semana {self.semana} - {self.labor} ({self.finca})"
