from django.db import models
from fincas.models import Finca, Lote
from core.models import BaseAuditModel


# Modelo para registrar actividades y observaciones en el cuaderno de campo
class RegistroCampo(BaseAuditModel):
    fecha = models.DateField()
    finca = models.ForeignKey(Finca, on_delete=models.CASCADE, related_name="registros_campo")
    lote = models.ForeignKey(Lote, on_delete=models.CASCADE, related_name="registros_campo")
    anotaciones = models.TextField()
    foto = models.ImageField(upload_to="cuaderno_fotos/", blank=True, null=True)

    class Meta:
        ordering = ["-fecha", "-fecha_creacion"]
        verbose_name = "Registro de Campo"
        verbose_name_plural = "Registros de Campo"

    def __str__(self):
        return f"{self.fecha} - {self.finca.nombre} - {self.lote.lote}"
