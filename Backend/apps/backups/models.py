from django.db import models
from apps.usuarios.models import Usuario

class Backup(models.Model):
    archivo = models.FileField(upload_to="backups/")
    fecha = models.DateTimeField(auto_now_add=True)
    usuario = models.ForeignKey(Usuario, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return f"Backup {self.id} - {self.fecha.strftime('%Y-%m-%d %H:%M')}"
