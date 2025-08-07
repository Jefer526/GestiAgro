from django.db import models
from fincas.models import Finca

class VariablesClimaticas(models.Model):
    id_variable = models.AutoField(primary_key=True)
    id_finca = models.ForeignKey(
        Finca,
        on_delete=models.SET_NULL,
        db_column='id_finca',
        blank=True,
        null=True
    )
    tipo_clima = models.CharField(max_length=255)
    valor = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    fecha = models.DateField(blank=True, null=True)
    creado_por = models.CharField(max_length=100, blank=True, null=True)
    fecha_creacion = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'variables_climaticas'

    def __str__(self):
        return f"{self.tipo_clima} - {self.valor} ({self.fecha})"

