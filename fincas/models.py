from django.db import models
from core.models import BaseAuditModel


# Modelo para registrar la información de las fincas
class Finca(BaseAuditModel):
    nombre = models.CharField(max_length=100)
    municipio = models.CharField(max_length=100)
    departamento = models.CharField(max_length=100)
    area_bruta = models.DecimalField(max_digits=10, decimal_places=2)
    area_neta = models.DecimalField(max_digits=10, decimal_places=2)
    estado = models.CharField(
        max_length=20,
        choices=[("Activa", "Activa"), ("Inactiva", "Inactiva")],
        default="Activa"
    )

    def __str__(self):
        return self.nombre

    @property
    def numero_arboles(self):
        return sum(
            arbol.cantidad
            for lote in self.lotes.all()
            for arbol in lote.arboles.all()
        )


# Modelo para registrar los lotes asociados a una finca
class Lote(BaseAuditModel):
    finca = models.ForeignKey(Finca, related_name="lotes", on_delete=models.CASCADE)
    lote = models.CharField(max_length=50)
    cultivo = models.CharField(max_length=100)
    numero_arboles = models.PositiveIntegerField(default=0)
    area_bruta = models.DecimalField(max_digits=10, decimal_places=2)
    area_neta = models.DecimalField(max_digits=10, decimal_places=2)
    estado = models.CharField(
        max_length=20,
        choices=[("Activo", "Activo"), ("Inactivo", "Inactivo")],
        default="Activo"
    )

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=["finca", "lote"], name="unique_lote_por_finca")
        ]

    def __str__(self):
        return f"Lote {self.lote} - {self.finca.nombre}"


# Modelo para registrar árboles dentro de un lote
class Arbol(BaseAuditModel):
    lote = models.ForeignKey(Lote, related_name="arboles", on_delete=models.CASCADE)
    variedad = models.CharField(max_length=100)
    cantidad = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.variedad} ({self.cantidad})"
