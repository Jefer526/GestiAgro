from django.conf import settings
from django.db import models


# Modelo abstracto base para auditoría de creación de registros
class BaseAuditModel(models.Model):
    creado_por = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True, blank=True,
        editable=False,
        related_name="%(class)s_creados"
    )
    fecha_creacion = models.DateTimeField(auto_now_add=True, editable=False)

    class Meta:
        abstract = True
