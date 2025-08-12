from django.db import models

from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    # agrega lo que necesites; ejemplo:
    telefono = models.CharField(max_length=20, blank=True, null=True)

    def __str__(self):
        return self.username
# Create your models here.
