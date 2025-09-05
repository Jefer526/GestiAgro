from rest_framework_simplejwt.serializers import TokenObtainPairSerializer, PasswordField
from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()


# Serializer para autenticación mediante email y generación de token JWT
class EmailTokenObtainPairSerializer(TokenObtainPairSerializer):

    username_field = "email"

    email = serializers.EmailField(write_only=True)
    password = PasswordField(write_only=True)

    def validate(self, attrs):
        email = attrs.get("email")
        password = attrs.get("password")

        try:
            user = User.objects.get(email__iexact=email)
        except User.DoesNotExist:
            raise serializers.ValidationError({"detail": "Credenciales inválidas."})

        if not user.check_password(password):
            raise serializers.ValidationError({"detail": "Credenciales inválidas."})
        if not user.is_active:
            raise serializers.ValidationError({"detail": "Usuario inactivo."})

        data = super().validate({"username": user.username, "password": password})

        data["user"] = {
            "id": user.id,
            "email": user.email,
            "nombre": getattr(user, "nombre", ""),
            "rol": getattr(user, "rol", ""),
            "is_superuser": user.is_superuser,
            "is_staff": user.is_staff,
            "is_active": user.is_active,
        }
        return data
