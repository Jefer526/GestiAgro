from django.db import models

class Trabajadores(models.Model):
    id_trabajador = models.AutoField(primary_key=True)
    nombre_trabajador = models.CharField(max_length=255)
    cargo = models.CharField(max_length=255)
    fecha_ingreso = models.DateField(blank=True, null=True)
    creado_por = models.CharField(max_length=100, blank=True, null=True)
    fecha_creacion = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'trabajadores'

    def __str__(self):
        return self.nombre_trabajador

class TrabajadoresFincas(models.Model):
    id_finca = models.ForeignKey('fincas.Finca', on_delete=models.CASCADE, related_name='fincas_trabajadores_trab')
    id_trabajador = models.ForeignKey('Trabajadores', on_delete=models.CASCADE, related_name='trabajadores_fincas_trab')


    class Meta:
        managed = False
        db_table = 'trabajadores_fincas'
        unique_together = (('id_trabajador', 'id_finca'),)

    def __str__(self):
        return f"{self.id_trabajador} en {self.id_finca}"
