# labores/models.py
from django.db import models
from fincas.models import Finca, Lote
from trabajadores.models import Trabajador

# labores/models.py
class Labor(models.Model):
    fecha = models.DateField()
    finca = models.ForeignKey(
        Finca,
        on_delete=models.CASCADE,
        related_name="labores"
    )
    lote = models.ForeignKey(
        Lote,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="labores"
    )
    
    # Campo de la labor (qué se hizo)
    descripcion = models.TextField()
    
    # Nuevo campo para observaciones adicionales
    observaciones = models.TextField(null=True, blank=True)

    trabajador_interno = models.ForeignKey(
        Trabajador,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="labores_internas"
    )
    trabajador_externo = models.CharField(
        max_length=200,
        null=True,
        blank=True,
        help_text="Si la labor fue realizada por alguien no asignado a la finca."
    )

    creado_en = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Labor {self.id} - {self.fecha} - {self.finca.nombre}"
