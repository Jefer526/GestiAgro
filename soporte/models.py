from django.db import models
from django.conf import settings


# Modelo para gestionar tickets de soporte en el sistema
class Ticket(models.Model):
    ESTADOS = [
        ("abierto", "Abierto"),
        ("proceso", "En proceso"),
        ("cerrado", "Cerrado"),
    ]

    numero = models.CharField(max_length=20, unique=True, editable=False)
    asunto = models.CharField(max_length=200)
    descripcion = models.TextField()
    estado = models.CharField(max_length=20, choices=ESTADOS, default="abierto")
    solicitado_por = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    fecha_solicitud = models.DateField(auto_now_add=True)
    seguimiento = models.TextField(blank=True, null=True)

    def save(self, *args, **kwargs):
        if not self.numero:
            ultimo = Ticket.objects.all().order_by("id").last()
            nuevo_numero = 1 if not ultimo else int(ultimo.numero.split("-")[1]) + 1
            self.numero = f"TK-{nuevo_numero:04d}"
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.numero} - {self.asunto}"
