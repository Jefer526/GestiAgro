from django.db import models

class Roles(models.Model):
    id_rol = models.AutoField(primary_key=True)
    nombre_rol = models.CharField(max_length=255)
    descripcion = models.TextField(blank=True, null=True)
    creado_por = models.CharField(max_length=100, blank=True, null=True)
    fecha_creacion = models.DateTimeField(blank=True, null=True)

    class Meta:
        db_table = 'roles'

    def __str__(self):
        return self.nombre_rol
    
class Usuarios(models.Model):
    id_usuario = models.AutoField(primary_key=True)
    nombre_completo = models.CharField(max_length=255)
    email = models.CharField(max_length=255)
    telefono = models.CharField(max_length=15, blank=True, null=True)
    contrasena = models.CharField(max_length=255, blank=True, null=True)
    creado_por = models.CharField(max_length=100, blank=True, null=True)
    fecha_creacion = models.DateTimeField(blank=True, null=True)
    id_rol = models.ForeignKey(Roles, models.DO_NOTHING, db_column='id_rol', blank=True, null=True)

    class Meta:
        db_table = 'usuarios'
    def __str__(self):
        return self.nombre_completo
    




class Permisos(models.Model):
    id_permiso = models.AutoField(primary_key=True)
    nombre_permiso = models.CharField(max_length=255)
    creado_por = models.CharField(max_length=100, blank=True, null=True)
    fecha_creacion = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'permisos'

    def __str__(self):
        return self.nombre_permiso


class RolesPermisos(models.Model):
    id_rol = models.ForeignKey(Roles, on_delete=models.CASCADE, db_column='id_rol')
    id_permiso = models.ForeignKey(Permisos, on_delete=models.CASCADE, db_column='id_permiso')
    creado_por = models.CharField(max_length=100, blank=True, null=True)
    fecha_creacion = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'roles_permisos'
        unique_together = (('id_rol', 'id_permiso'),)

    def __str__(self):
        return f"{self.id_rol} - {self.id_permiso}"

