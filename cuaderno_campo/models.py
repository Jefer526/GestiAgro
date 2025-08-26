# cuaderno_campo/models.py
from django.db import models
from fincas.models import Finca, Lote   # ✅ importar desde tu app actual

class RegistroCampo(models.Model):
    fecha = models.DateField()
    finca = models.ForeignKey(
        Finca,
        on_delete=models.CASCADE,
        related_name="registros_campo"
    )
    lote = models.ForeignKey(
        Lote,
        on_delete=models.CASCADE,
        related_name="registros_campo"
    )
    anotaciones = models.TextField()
    foto = models.ImageField(
        upload_to="cuaderno_fotos/",
        blank=True,
        null=True
    )

    creado = models.DateTimeField(auto_now_add=True)   # fecha de creación
    actualizado = models.DateTimeField(auto_now=True)  # última edición

    class Meta:
        ordering = ["-fecha", "-creado"]
        verbose_name = "Registro de Campo"
        verbose_name_plural = "Registros de Campo"

    def __str__(self):
        return f"{self.fecha} - {self.finca.nombre} - {self.lote.lote}"
