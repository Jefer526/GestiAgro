# accounts/views.py
from django.conf import settings
from django.contrib.auth import get_user_model
from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode

from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.throttling import AnonRateThrottle, UserRateThrottle
from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import (
    RegisterSerializer,
    UserSerializer,
    DemoSignupSerializer,
    SetPasswordSerializer,
)

User = get_user_model()


# ===== Registro normal (con contraseña) =====
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = RegisterSerializer
    throttle_classes = [AnonRateThrottle]   # protección básica


# ===== Yo mismo =====
class MeView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]
    throttle_classes = [UserRateThrottle]

    def get_object(self):
        return self.request.user


# ===== Logout (blacklist JWT) =====
class LogoutView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    throttle_classes = [UserRateThrottle]

    def post(self, request):
        refresh = request.data.get("refresh")
        if not refresh or not isinstance(refresh, str):
            return Response(
                {"detail": "Refresh token requerido."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        try:
            token = RefreshToken(refresh)
            # Si tienes 'rest_framework_simplejwt.token_blacklist' en INSTALLED_APPS
            token.blacklist()
        except Exception:
            # No exponemos si el token es válido o no
            return Response(
                {"detail": "No se pudo cerrar sesión."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        return Response({"detail": "Logout correcto."}, status=status.HTTP_200_OK)


# ===== Alta DEMO (sin contraseña) =====
class DemoSignupAPIView(APIView):
    """
    Crea un usuario demo sin contraseña (set_unusable_password),
    marca is_demo=True y devuelve el enlace para establecer contraseña.
    """
    permission_classes = [permissions.AllowAny]
    throttle_classes = [AnonRateThrottle]

    def post(self, request):
        ser = DemoSignupSerializer(data=request.data)
        ser.is_valid(raise_exception=True)
        # IMPORTANTE: NO usar `User` (variable) como tipo. Usamos la superclase conocida.
        user: AbstractBaseUser = ser.save()

        token_gen = PasswordResetTokenGenerator()
        token = token_gen.make_token(user)
        uid = urlsafe_base64_encode(force_bytes(user.pk))
        frontend = getattr(settings, "FRONTEND_URL", "http://localhost:5173")
        set_password_url = f"{frontend}/establecer-contrasena?uid={uid}&token={token}"

        # En producción: enviar email real con `set_password_url`
        return Response(
            {
                "message": "Registro recibido. Revisa tu correo para establecer la contraseña.",
                # Solo para desarrollo hasta tener SMTP:
                "set_password_url_demo": set_password_url,
            },
            status=status.HTTP_201_CREATED,
        )


# ===== Establecer contraseña desde el link (uid+token) =====
class SetPasswordAPIView(APIView):
    """
    Valida uid/token, fija la nueva contraseña, desmarca is_demo
    y opcionalmente emite JWT para loguear al usuario.
    """
    permission_classes = [permissions.AllowAny]
    throttle_classes = [AnonRateThrottle]

    def post(self, request):
        ser = SetPasswordSerializer(data=request.data)
        ser.is_valid(raise_exception=True)

        try:
            user: AbstractBaseUser = ser.save()  # set_password + is_demo=False
        except Exception:
            # Evitamos filtrar si fue por token/uid inválido u otra razón
            return Response(
                {"message": "No fue posible establecer la contraseña."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Opcional: emitir JWT para login automático
        try:
            refresh = RefreshToken.for_user(user)
            return Response(
                {
                    "message": "Contraseña establecida correctamente.",
                    "access": str(refresh.access_token),
                    "refresh": str(refresh),
                },
                status=status.HTTP_200_OK,
            )
        except Exception:
            # Si no usas SimpleJWT aquí, devolvemos solo confirmación
            return Response(
                {"message": "Contraseña establecida correctamente."},
                status=status.HTTP_200_OK,
            )
