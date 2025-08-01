from django.contrib.auth.models import User
from django.db import models

class Rol(models.Model):
    nombre_rol = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.nombre_rol

class Permiso(models.Model):
    nombre_permiso = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.nombre_permiso

class RolPermiso(models.Model):
    rol = models.ForeignKey(Rol, on_delete=models.CASCADE)
    permiso = models.ForeignKey(Permiso, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('rol', 'permiso')

class PerfilUsuario(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    telefono = models.CharField(max_length=20, blank=True, null=True)
    creado_por = models.CharField(max_length=100)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    roles = models.ManyToManyField(Rol, through='UsuarioRol')

    def __str__(self):
        return self.user.get_full_name()

class UsuarioRol(models.Model):
    perfil_usuario = models.ForeignKey(PerfilUsuario, on_delete=models.CASCADE)
    rol = models.ForeignKey(Rol, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('perfil_usuario', 'rol')
