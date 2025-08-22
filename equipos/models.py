# equipos/models.py
from django.db import models
from fincas.models import Finca   # si ya tienes fincas creadas

class Maquina(models.Model):
    codigo_equipo = models.CharField(max_length=50, unique=True)  # asignado por el usuario
    maquina = models.CharField(max_length=100)  # ej: Tractor
    referencia = models.CharField(max_length=100)
    ubicacion = models.ForeignKey(Finca, on_delete=models.SET_NULL, null=True, blank=True)
    estado = models.CharField(
        max_length=20,
        choices=[("Óptimo", "Óptimo"), ("Mantenimiento", "Mantenimiento"), ("Averiado", "Averiado")],
        default="Óptimo",
    )

    def __str__(self):
        return f"{self.codigo_equipo} - {self.maquina}"
    



class Mantenimiento(models.Model):
    maquina = models.ForeignKey(Maquina, related_name="mantenimientos", on_delete=models.CASCADE)
    fecha = models.DateField()
    tipo = models.CharField(max_length=50, choices=[("preventivo", "Preventivo"), ("correctivo", "Correctivo")])
    descripcion = models.TextField()
    realizado_por = models.CharField(max_length=100)
    estado = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.maquina.codigo_equipo} - {self.fecha} ({self.tipo})"
