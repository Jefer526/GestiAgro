from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.utils.http import urlsafe_base64_decode
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from fincas.models import Finca

User = get_user_model()


# Serializer para mostrar información de usuarios
class UserSerializer(serializers.ModelSerializer):
    tiene_password = serializers.SerializerMethodField()
    finca_asignada = serializers.PrimaryKeyRelatedField(
        queryset=Finca.objects.all(),
        allow_null=True,
        required=False
    )

    class Meta:
        model = User
        fields = [
            "id",
            "email",
            "nombre",
            "telefono",
            "rol",
            "is_active",
            "is_superuser",
            "is_staff",
            "is_demo",
            "tiene_password",
            "finca_asignada",
        ]

    def get_tiene_password(self, obj):
        return obj.has_usable_password()

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        if instance.finca_asignada:
            rep["finca_asignada"] = {
                "id": instance.finca_asignada.id,
                "nombre": instance.finca_asignada.nombre,
            }
        else:
            rep["finca_asignada"] = None
        return rep


# Serializer para registro de usuarios normales
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = User
        fields = ["email", "nombre", "telefono", "password"]

    def create(self, validated_data):
        password = validated_data.pop("password")
        user = User(**validated_data)
        user.set_password(password)
        user.is_demo = False
        user.save()
        return user


# Serializer para registro de usuarios en modo demo
class DemoSignupSerializer(serializers.Serializer):
    nombre = serializers.CharField(max_length=255)
    telefono = serializers.CharField(max_length=20, allow_blank=True, required=False)
    email = serializers.EmailField()

    def validate_email(self, value):
        if User.objects.filter(email__iexact=value).exists():
            raise serializers.ValidationError("Este correo ya está registrado.")
        return value

    def create(self, data):
        user = User(
            email=data["email"].lower(),
            nombre=data["nombre"],
            telefono=data.get("telefono", ""),
            is_demo=True,
            is_active=True
        )
        user.set_unusable_password()
        user.save()
        return user


# Serializer para asignar contraseña a usuarios
class SetPasswordSerializer(serializers.Serializer):
    uid = serializers.CharField()
    token = serializers.CharField()
    new_password = serializers.CharField(min_length=8)

    def validate(self, attrs):
        try:
            pk = urlsafe_base64_decode(attrs["uid"]).decode()
            user = User.objects.get(pk=pk)
        except Exception:
            raise serializers.ValidationError("Link inválido")

        if not PasswordResetTokenGenerator().check_token(user, attrs["token"]):
            raise serializers.ValidationError("Token inválido o expirado")

        attrs["user"] = user
        return attrs

    def create(self, data):
        user = data["user"]
        user.set_password(data["new_password"])
        if user.is_demo:
            user.is_demo = False
        user.save()
        return user


# Serializer para actualizar datos de usuario
class UserUpdateSerializer(serializers.ModelSerializer):
    tiene_password = serializers.SerializerMethodField()
    finca_asignada = serializers.PrimaryKeyRelatedField(
        queryset=Finca.objects.all(),
        allow_null=True,
        required=False
    )

    class Meta:
        model = User
        fields = [
            "id",
            "email",
            "nombre",
            "telefono",
            "rol",
            "is_active",
            "is_superuser",
            "is_staff",
            "is_demo",
            "tiene_password",
            "finca_asignada",
        ]
        extra_kwargs = {
            "email": {"required": False}
        }

    def get_tiene_password(self, obj):
        return obj.has_usable_password()

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        if instance.finca_asignada:
            rep["finca_asignada"] = {
                "id": instance.finca_asignada.id,
                "nombre": instance.finca_asignada.nombre,
            }
        else:
            rep["finca_asignada"] = None
        return rep


# Serializer para actualizar rol y finca asignada del usuario
class UserRoleUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "rol", "finca_asignada"]
