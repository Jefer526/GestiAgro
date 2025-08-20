from django.db import models

class Finca(models.Model):
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
        """
        Retorna la suma de árboles de todos los lotes relacionados,
        sumando las cantidades de la tabla Arbol.
        """
        return sum(
            arbol.cantidad
            for lote in self.lotes.all()
            for arbol in lote.arboles.all()
        )


class Lote(models.Model):
    finca = models.ForeignKey(
        Finca,
        related_name="lotes",
        on_delete=models.CASCADE  
    )
    lote = models.CharField(max_length=50)
    cultivo = models.CharField(max_length=100)
    numero_arboles = models.PositiveIntegerField(default=0)  # <- sigue existiendo
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
        verbose_name = "Lote"
        verbose_name_plural = "Lotes"

    def __str__(self):
        return f"Lote {self.lote} - {self.finca.nombre}"


class Arbol(models.Model):
    lote = models.ForeignKey(
        Lote,
        related_name="arboles",
        on_delete=models.CASCADE  
    )
    variedad = models.CharField(max_length=100)  # Ej: "Tambor", "A90"
    cantidad = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.variedad} ({self.cantidad})"
