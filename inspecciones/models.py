from django.db import models
from fincas.models import Finca
from fincas.models import Lote  # Si ya tienes el modelo Lote en la app fincas

class InspeccionesCampo(models.Model):
    id_inspeccion = models.AutoField(primary_key=True)
    id_finca = models.ForeignKey(
        Finca,
        on_delete=models.SET_NULL,
        db_column='id_finca',
        blank=True,
        null=True
    )
    id_lote = models.ForeignKey(
        Lote,
        on_delete=models.SET_NULL,
        db_column='id_lote',
        blank=True,
        null=True
    )
    fecha = models.DateField(blank=True, null=True)
    observaciones = models.TextField(blank=True, null=True)
    riesgos = models.CharField(max_length=255, blank=True, null=True)
    recomendaciones = models.TextField(blank=True, null=True)
    creado_por = models.CharField(max_length=100, blank=True, null=True)
    fecha_creacion = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'inspecciones_campo'

    def __str__(self):
        return f"Inspección {self.id_inspeccion} - {self.fecha}"
