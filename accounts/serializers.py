from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.utils.http import urlsafe_base64_decode
from django.contrib.auth.tokens import PasswordResetTokenGenerator


User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email", "first_name", "last_name", "telefono"]

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = User
        fields = ["username", "email", "password", "first_name", "last_name", "telefono"]

    def create(self, validated_data):
        password = validated_data.pop("password")
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user

# --- NUEVO: Alta de DEMO sin contraseña ---
class DemoSignupSerializer(serializers.Serializer):
    nombre = serializers.CharField(max_length=255)
    telefono = serializers.CharField(max_length=20, allow_blank=True, required=False)
    email = serializers.EmailField()

    def validate_email(self, value):
        if User.objects.filter(email__iexact=value).exists():
            raise serializers.ValidationError("Este correo ya está registrado.")
        return value

    def create(self, data):
        email = data["email"].lower()
        user = User(
            username=email,                # cómodo: usa email como username
            email=email,
            first_name=data["nombre"],
            telefono=data.get("telefono", ""),
        )
        if hasattr(user, "is_demo"):
            user.is_demo = True
        user.is_active = True
        user.set_unusable_password()      # clave: sin contraseña
        user.save()
        return user

# --- NUEVO: Establecer contraseña desde el link (uid+token) ---
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
        if hasattr(user, "is_demo"):
            user.is_demo = False
        user.save()
        return user