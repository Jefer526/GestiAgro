from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.utils.http import urlsafe_base64_decode
from django.contrib.auth.tokens import PasswordResetTokenGenerator

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    tiene_password = serializers.SerializerMethodField()

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
        ]

    def get_tiene_password(self, obj):
        return obj.has_usable_password()


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = User
        fields = ["email", "nombre", "telefono", "password"]

    def create(self, validated_data):
        password = validated_data.pop("password")
        user = User(**validated_data)
        user.set_password(password)
        user.is_demo = False  # Si se registra con contraseña, no es demo
        user.save()
        return user


# --- Alta de usuario DEMO (sin contraseña) ---
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


# --- Establecer contraseña desde link ---
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
            user.is_demo = False  # Una vez que se asigna contraseña, deja de ser demo
        user.save()
        return user


class UserUpdateSerializer(serializers.ModelSerializer):
    tiene_password = serializers.SerializerMethodField()

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
        ]
        extra_kwargs = {
            "email": {"required": False}
        }

    def get_tiene_password(self, obj):
        return obj.has_usable_password()


class UserRoleUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "rol"]
