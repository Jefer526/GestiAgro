from django.db import models
from usuarios.models import Usuarios
from fincas.models import Finca

class Alertas(models.Model):
    id_alerta = models.AutoField(primary_key=True)
    id_usuario_destinatario = models.ForeignKey(
        Usuarios,
        on_delete=models.SET_NULL,
        db_column='id_usuario_destinatario',
        blank=True,
        null=True
    )
    id_finca = models.ForeignKey(
        Finca,
        on_delete=models.SET_NULL,
        db_column='id_finca',
        blank=True,
        null=True
    )
    tipo_alerta = models.CharField(max_length=255, blank=True, null=True)
    mensaje = models.TextField(blank=True, null=True)
    fecha_envio = models.DateField(blank=True, null=True)
    creado_por = models.CharField(max_length=100, blank=True, null=True)
    fecha_creacion = models.DateTimeField(blank=True, null=True)

    class Meta:
        db_table = 'alertas'

    def __str__(self):
        return f"{self.tipo_alerta} - {self.mensaje[:30]}"
