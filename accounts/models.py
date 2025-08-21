from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

class CustomUserManager(BaseUserManager):
    def create_user(self, email, nombre, password=None, **extra_fields):
        if not email:
            raise ValueError("El usuario debe tener un email")
        email = self.normalize_email(email)
        user = self.model(email=email, nombre=nombre, **extra_fields)
        if password:
            user.set_password(password)
        else:
            user.set_unusable_password()
        user.save(using=self._db)
        return user

    def create_superuser(self, email, nombre, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        return self.create_user(email, nombre, password, **extra_fields)

class CustomUser(AbstractBaseUser, PermissionsMixin):
    ROLES = (
        ("admin", "Administrador"),
        ("agronomo", "Agrónomo"),
        ("mayordomo", "Mayordomo"),
    )

    email = models.EmailField(unique=True)
    nombre = models.CharField(max_length=150)
    telefono = models.CharField(max_length=20, blank=True, null=True)

    rol = models.CharField(max_length=20, choices=ROLES, default="mayordomo")


    finca_asignada = models.ForeignKey(   # 👈 nuevo
        "fincas.Finca",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="mayordomos"
    )


    is_demo = models.BooleanField(default=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["nombre"]

    objects = CustomUserManager()

    def save(self, *args, **kwargs):
        # Si es demo pero ya tiene contraseña usable, lo marcamos como no demo
        if self.is_demo and self.has_usable_password():
            self.is_demo = False
        super().save(*args, **kwargs)

    is_demo = models.BooleanField(default=True)  # True hasta que defina contraseña

    rol = models.CharField(max_length=20, choices=(
        ('admin', 'Administrador'),
        ('agronomo', 'Agrónomo'),
        ('mayordomo', 'Mayordomo'),
    ),    default='agronomo',)
   

    rol = models.CharField(max_length=20, choices=ROLES, default="agronomo")
    is_demo = models.BooleanField(default=True)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["nombre"]

    objects = CustomUserManager()

    def save(self, *args, **kwargs):
        # Si es demo pero ya tiene contraseña usable, lo marcamos como no demo
        if self.is_demo and self.has_usable_password():
            self.is_demo = False
        super().save(*args, **kwargs)


    def __str__(self):
        return f"{self.nombre} ({self.rol})"
