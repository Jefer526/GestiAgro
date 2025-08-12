from rest_framework_simplejwt.serializers import TokenObtainPairSerializer, PasswordField
from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

class EmailTokenObtainPairSerializer(TokenObtainPairSerializer):
    # Indicamos que el campo de login es 'email'
    username_field = "email"

    # 👇 Definimos explícitamente los campos que el serializer debe esperar
    email = serializers.EmailField(write_only=True)
    password = PasswordField(write_only=True)

    def validate(self, attrs):
        email = attrs.get("email")
        password = attrs.get("password")

        # (debug opcional)
        # print(">>> EmailTokenObtainPairSerializer activo", {"email": email})

        try:
            user = User.objects.get(email__iexact=email)
        except User.DoesNotExist:
            raise serializers.ValidationError({"detail": "Credenciales inválidas."})

        if not user.check_password(password):
            raise serializers.ValidationError({"detail": "Credenciales inválidas."})
        if not user.is_active:
            raise serializers.ValidationError({"detail": "Usuario inactivo."})

        # Delegamos a la clase base pasando username real para generar tokens
        return super().validate({"username": user.username, "password": password})
