from django.db import models
from equipos.models import Equipos


class Finca(models.Model):
    id_finca = models.AutoField(primary_key=True)
    nombre_finca = models.CharField(max_length=255)
    ubicacion_finca = models.CharField(max_length=255)
    coordenadas_finca = models.CharField(max_length=255)
    area_finca_has = models.FloatField(db_column='area_finca_has')
    creado_por = models.CharField(max_length=100, blank=True, null=True)
    fecha_creacion = models.DateTimeField(blank=True, null=True)

    class Meta:
        db_table = 'finca'

    def __str__(self):
        return self.nombre_finca


class Lote(models.Model):
    id_lote = models.AutoField(primary_key=True)
    numero_lote = models.CharField(max_length=255)
    id_finca = models.ForeignKey(
        Finca,
        on_delete=models.CASCADE,
        db_column='id_finca',
        blank=True,
        null=True
    )
    coordenadas_lote = models.CharField(max_length=255, blank=True, null=True)
    area_lote_has = models.FloatField(db_column='area_lote_has')
    cultivolote = models.CharField(max_length=255, blank=True, null=True)
    creado_por = models.CharField(max_length=100, blank=True, null=True)
    fecha_creacion = models.DateTimeField(blank=True, null=True)

    class Meta:
        db_table = 'lote'

    def __str__(self):
        return f"Lote {self.numero_lote} - {self.id_finca}"


class FincaEquipos(models.Model):
    id_finca = models.ForeignKey(Finca, on_delete=models.CASCADE, db_column='id_finca')
    id_equipo = models.ForeignKey(Equipos, on_delete=models.CASCADE, db_column='id_equipo')
    fecha_asignacion = models.DateField()
    estado_equipo = models.CharField(max_length=100, blank=True, null=True)
    creado_por = models.CharField(max_length=100, blank=True, null=True)
    fecha_creacion = models.DateTimeField(blank=True, null=True)

    class Meta:
        db_table = 'finca_equipos'
        unique_together = (('id_finca', 'id_equipo'),)

    def __str__(self):
        return f"{self.id_finca} - {self.id_equipo}"


