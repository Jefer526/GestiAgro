from django.db import models
from fincas.models import Finca, Lote
from core.models import BaseAuditModel


# Modelo para registrar la información de las máquinas o equipos
class Maquina(BaseAuditModel):
    codigo_equipo = models.CharField(max_length=50, unique=True)
    maquina = models.CharField(max_length=100)
    referencia = models.CharField(max_length=100)
    ubicacion = models.ForeignKey(Finca, on_delete=models.SET_NULL, null=True, blank=True)
    estado = models.CharField(
        max_length=20,
        choices=[("Óptimo", "Óptimo"), ("Mantenimiento", "Mantenimiento"), ("Averiado", "Averiado")],
        default="Óptimo",
    )

    def __str__(self):
        return f"{self.codigo_equipo} - {self.maquina}"


# Modelo para registrar mantenimientos de las máquinas
class Mantenimiento(BaseAuditModel):
    maquina = models.ForeignKey(Maquina, related_name="mantenimientos", on_delete=models.CASCADE)
    fecha = models.DateField()
    tipo = models.CharField(max_length=50, choices=[("preventivo", "Preventivo"), ("correctivo", "Correctivo")])
    descripcion = models.TextField()
    realizado_por = models.CharField(max_length=100)
    estado = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.maquina.codigo_equipo} - {self.fecha} ({self.tipo})"


# Modelo para registrar labores realizadas con las máquinas
class LaborMaquinaria(BaseAuditModel):
    maquina = models.ForeignKey(Maquina, related_name="labores", on_delete=models.CASCADE)
    fecha = models.DateField()
    labor = models.CharField(max_length=100)
    horometro_inicio = models.DecimalField(max_digits=10, decimal_places=2)
    horometro_fin = models.DecimalField(max_digits=10, decimal_places=2)
    finca = models.ForeignKey(Finca, on_delete=models.SET_NULL, null=True, blank=True)
    lote = models.ForeignKey(Lote, on_delete=models.SET_NULL, null=True, blank=True)
    observaciones = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.maquina.codigo_equipo} - {self.fecha} - {self.labor}"
