# accounts/views.py
from django.conf import settings
from django.contrib.auth import get_user_model
from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode
from rest_framework_simplejwt.authentication import JWTAuthentication
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
    UserUpdateSerializer,  # 👈 nuevo serializer para update
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
            token.blacklist()
        except Exception:
            return Response(
                {"detail": "No se pudo cerrar sesión."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        return Response({"detail": "Logout correcto."}, status=status.HTTP_200_OK)

# ===== Alta DEMO (sin contraseña) =====
class DemoSignupAPIView(APIView):
    permission_classes = [permissions.AllowAny]
    throttle_classes = [AnonRateThrottle]

    def post(self, request):
        ser = DemoSignupSerializer(data=request.data)
        ser.is_valid(raise_exception=True)
        user: AbstractBaseUser = ser.save()

        token_gen = PasswordResetTokenGenerator()
        token = token_gen.make_token(user)
        uid = urlsafe_base64_encode(force_bytes(user.pk))
        frontend = getattr(settings, "FRONTEND_URL", "http://localhost:5173")
        set_password_url = f"{frontend}/establecer-contrasena?uid={uid}&token={token}"

        return Response(
            {
                "message": "Registro recibido. Revisa tu correo para establecer la contraseña.",
                "set_password_url_demo": set_password_url,  # solo en desarrollo
            },
            status=status.HTTP_201_CREATED,
        )

# ===== Establecer contraseña =====
class SetPasswordAPIView(APIView):
    permission_classes = [permissions.AllowAny]
    throttle_classes = [AnonRateThrottle]

    def post(self, request):
        ser = SetPasswordSerializer(data=request.data)
        ser.is_valid(raise_exception=True)

        try:
            user: AbstractBaseUser = ser.save()
        except Exception:
            return Response(
                {"message": "No fue posible establecer la contraseña."},
                status=status.HTTP_400_BAD_REQUEST,
            )

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
            return Response(
                {"message": "Contraseña establecida correctamente."},
                status=status.HTTP_200_OK,
            )

# ===== Listado de usuarios =====
class UsersListView(generics.ListAPIView):
    queryset = User.objects.all().order_by('id')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAdminUser]
    authentication_classes = [JWTAuthentication]

# ===== Activar / desactivar usuario =====
class AccountsUserToggleActiveAPIView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def patch(self, request, pk):
        try:
            user = User.objects.get(pk=pk)
        except User.DoesNotExist:
            return Response({"detail": "Usuario no encontrado"}, status=404)

        # 🚫 Bloqueo para superusuarios
        if user.is_superuser and request.data.get("is_active") is False:
            return Response(
                {"detail": "No se puede desactivar un superusuario."},
                status=400
            )
        if user.is_superuser and not request.data.get("is_active") and user.is_active:
            # Caso toggle (sin is_active explícito) → también bloquear
            return Response(
                {"detail": "No se puede desactivar un superusuario."},
                status=400
            )

        is_active = request.data.get("is_active")
        if isinstance(is_active, bool):
            user.is_active = is_active
        else:
            user.is_active = not user.is_active

        user.save()
        return Response({"id": user.id, "is_active": user.is_active}, status=200)

# ===== Detalle y actualización de usuario =====
class UserDetailUpdateView(generics.RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserUpdateSerializer
    permission_classes = [permissions.IsAdminUser]
    authentication_classes = [JWTAuthentication]

    def update(self, request, *args, **kwargs):
        kwargs['partial'] = True  # permite actualizar solo algunos campos

        # ⚠️ Normaliza si el frontend manda "nombre" pero no "first_name"
        data = request.data.copy()
        if 'nombre' in data and 'first_name' not in data:
            data['first_name'] = data['nombre']

        serializer = self.get_serializer(self.get_object(), data=data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)