from django.db import models
from trabajadores.models import Trabajadores
from labores.models import Labores  # si usas una app separada para labores

class Jornales(models.Model):
    id_jornal = models.AutoField(primary_key=True)
    id_trabajador = models.ForeignKey(
        Trabajadores,
        on_delete=models.SET_NULL,
        db_column='id_trabajador',
        blank=True,
        null=True
    )
    id_labores = models.ForeignKey(
        Labores,
        on_delete=models.SET_NULL,
        db_column='id_labores',
        blank=True,
        null=True
    )
    fecha = models.DateField(blank=True, null=True)
    costo = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    creado_por = models.CharField(max_length=100, blank=True, null=True)
    fecha_creacion = models.DateTimeField(blank=True, null=True)

    class Meta:
        db_table = 'jornales'

    def __str__(self):
        return f"Jornal {self.id_jornal} - {self.fecha}"

class HistorialJornales(models.Model):
    id_historial = models.AutoField(primary_key=True)
    id_jornal = models.ForeignKey(
        Jornales,
        on_delete=models.CASCADE,
        db_column='id_jornal',
        blank=True,
        null=True
    )
    fecha = models.DateField(blank=True, null=True)
    observaciones = models.TextField(blank=True, null=True)
    creado_por = models.CharField(max_length=100, blank=True, null=True)
    fecha_creacion = models.DateTimeField(blank=True, null=True)

    class Meta:
        db_table = 'historial_jornales'

    def __str__(self):
        return f"Historial {self.id_historial} - {self.fecha}"
