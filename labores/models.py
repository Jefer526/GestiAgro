from django.db import models

class Labores(models.Model):
    id_labores = models.AutoField(primary_key=True)
    nombre_labora = models.CharField(max_length=255)
    creado_por = models.CharField(max_length=100, blank=True, null=True)
    fecha_creacion = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'labores'

    def __str__(self):
        return self.nombre_labora
