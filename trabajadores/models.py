from django.db import models
from fincas.models import Finca
from core.models import BaseAuditModel


# Modelo para registrar trabajadores asociados a una finca
class Trabajador(BaseAuditModel):
    ESTADOS = [
        ("activo", "Activo"),
        ("inactivo", "Inactivo"),
        ("vacaciones", "Vacaciones"),
        ("suspendido", "Suspendido"),
    ]

    codigo = models.CharField(max_length=20, unique=True, editable=False)
    nombre = models.CharField(max_length=200)
    cargo = models.CharField(max_length=100)
    estado = models.CharField(max_length=20, choices=ESTADOS, default="activo")
    finca = models.ForeignKey(Finca, on_delete=models.SET_NULL, null=True, blank=True, related_name="trabajadores")
    telefono = models.CharField(max_length=15)

    def save(self, *args, **kwargs):
        if not self.codigo:
            ultimo = Trabajador.objects.all().order_by("-id").first()
            if ultimo and ultimo.codigo:
                try:
                    numero = int(ultimo.codigo.split("-")[1]) + 1
                except:
                    numero = 1
            else:
                numero = 1
            self.codigo = f"CE-{numero:03d}"
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.codigo} - {self.nombre}"
