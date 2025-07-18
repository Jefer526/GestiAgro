from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin, Group, Permission


# Gestor personalizado de usuarios
class UsuarioManager(BaseUserManager):
    def create_user(self, email, nombre_completo, password=None, **extra_fields):
        if not email:
            raise ValueError('El email es obligatorio')
        email = self.normalize_email(email)
        usuario = self.model(email=email, nombre_completo=nombre_completo, **extra_fields)
        usuario.set_password(password)
        usuario.save(using=self._db)
        return usuario

    def create_superuser(self, email, nombre_completo, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, nombre_completo, password, **extra_fields)


# Modelo de usuario personalizado
class Usuario(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True, max_length=255)
    nombre_completo = models.CharField(max_length=255)
    telefono = models.CharField(max_length=15, blank=True, null=True)
    creado_por = models.CharField(max_length=100, blank=True, null=True)
    fecha_creacion = models.DateTimeField(auto_now_add=True)

    roles = models.ManyToManyField('Rol', through='UsuarioRol')

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    # ✅ Evita conflicto con auth.User
    groups = models.ManyToManyField(
        Group,
        related_name='usuarios_grupo',
        blank=True,
        help_text='Grupos a los que pertenece este usuario.'
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name='usuarios_permiso',
        blank=True,
        help_text='Permisos específicos para este usuario.'
    )

    objects = UsuarioManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['nombre_completo']

    def __str__(self):
        return self.nombre_completo


# Modelo de Rol
class Rol(models.Model):
    nombre = models.CharField(max_length=255)
    descripcion = models.TextField(blank=True, null=True)
    creado_por = models.CharField(max_length=100, blank=True, null=True)
    fecha_creacion = models.DateTimeField(auto_now_add=True)

    permisos = models.ManyToManyField('Permiso', through='RolPermiso')

    def __str__(self):
        return self.nombre


# Modelo de Permiso
class Permiso(models.Model):
    nombre = models.CharField(max_length=255)
    creado_por = models.CharField(max_length=100, blank=True, null=True)
    fecha_creacion = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nombre


# Tabla intermedia Usuario ↔ Rol
class UsuarioRol(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    rol = models.ForeignKey(Rol, on_delete=models.CASCADE)
    creado_por = models.CharField(max_length=100, blank=True, null=True)
    fecha_creacion = models.DateTimeField(auto_now_add=True)


# Tabla intermedia Rol ↔ Permiso
class RolPermiso(models.Model):
    rol = models.ForeignKey(Rol, on_delete=models.CASCADE)
    permiso = models.ForeignKey(Permiso, on_delete=models.CASCADE)
    creado_por = models.CharField(max_length=100, blank=True, null=True)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
