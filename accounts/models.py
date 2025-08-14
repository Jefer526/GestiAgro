from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    ROLES = (
        ('admin', 'Administrador'),
        ('agronomo', 'Agrónomo'),
        ('mayordomo', 'Mayordomo'),
    )

    telefono = models.CharField(max_length=20, blank=True, null=True)
    is_demo = models.BooleanField(default=True)  # True hasta que defina contraseña
    rol = models.CharField(
        max_length=20,
        choices=ROLES,
        default='agronomo'  # por defecto será agrónomo
    )

    def __str__(self):
        return f"{self.username} ({self.rol})"
