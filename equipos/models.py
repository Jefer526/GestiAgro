from django.db import models

class Equipos(models.Model):
    id_equipo = models.AutoField(primary_key=True)
    nombre_equipo = models.CharField(max_length=255)
    tipo_equipo = models.CharField(max_length=255, blank=True, null=True)
    fecha_adquisicion = models.DateField(blank=True, null=True)
    creado_por = models.CharField(max_length=100, blank=True, null=True)
    fecha_creacion = models.DateTimeField(blank=True, null=True)
    estado = models.CharField(max_length=10, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'equipos'

    def __str__(self):
        return self.nombre_equipo

class MantenimientoEquipos(models.Model):
    id_mantenimiento = models.AutoField(primary_key=True)
    id_equipo = models.ForeignKey(
        Equipos,
        on_delete=models.CASCADE,
        db_column='id_equipo',
        blank=True,
        null=True
    )
    fecha = models.DateField(blank=True, null=True)
    tipo_mantenimiento = models.CharField(max_length=255, blank=True, null=True)
    observaciones = models.TextField(blank=True, null=True)
    realizado_por = models.TextField(blank=True, null=True)
    creado_por = models.CharField(max_length=100, blank=True, null=True)
    fecha_creacion = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'mantenimiento_equipos'

    def __str__(self):
        return f"{self.tipo_mantenimiento or 'Mantenimiento'} - {self.fecha}"