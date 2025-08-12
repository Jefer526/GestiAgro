from django.db import models
from jornales.models import Jornales  # Asegúrate de tener esta app creada y configurada

class Insumos(models.Model):
    id_insumo = models.AutoField(primary_key=True)
    nombre_comercial = models.CharField(max_length=255)
    ingrediente_activo = models.CharField(max_length=255, blank=True, null=True)
    unidad_medida = models.CharField(max_length=50, blank=True, null=True)
    tipo_insumo = models.CharField(max_length=50, blank=True, null=True)
    creado_por = models.CharField(max_length=100, blank=True, null=True)
    fecha_creacion = models.DateTimeField(blank=True, null=True)
    estado = models.CharField(max_length=10, blank=True, null=True)

    class Meta:
        db_table = 'insumos'

    def __str__(self):
        return self.nombre_comercial
    

class InsumosJornales(models.Model):
    id_insumo = models.ForeignKey(
        Insumos,
        on_delete=models.CASCADE,
        db_column='id_insumo'
    )
    id_jornal = models.ForeignKey(
        Jornales,
        on_delete=models.CASCADE,
        db_column='id_jornal'
    )
    cantidad_utilizada = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    fecha = models.DateField(blank=True, null=True)
    creado_por = models.CharField(max_length=100, blank=True, null=True)
    fecha_creacion = models.DateTimeField(blank=True, null=True)

    class Meta:
        db_table = 'insumos_jornales'
        unique_together = (('id_insumo', 'id_jornal'),)

    def __str__(self):
        return f"{self.id_insumo} - {self.id_jornal}"
