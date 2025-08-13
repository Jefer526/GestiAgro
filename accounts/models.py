from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    telefono = models.CharField(max_length=20, blank=True, null=True)
    is_demo = models.BooleanField(default=True)  # True hasta que defina contraseña

    def __str__(self):
        return self.username