from django.conf import settings
from django.contrib.auth import get_user_model
from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode
from django.utils.crypto import get_random_string
from django.core.mail import send_mail

from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.throttling import AnonRateThrottle, UserRateThrottle

from .serializers import (
    RegisterSerializer,
    UserSerializer,
    DemoSignupSerializer,
    SetPasswordSerializer,
    UserUpdateSerializer,
    UserRoleUpdateSerializer,
)
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

User = get_user_model()

# ===== Login extendido (tokens + usuario) =====
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        data["user"] = {
            "id": self.user.id,
            "email": self.user.email,
            "nombre": getattr(self.user, "nombre", ""),
            "rol": getattr(self.user, "rol", ""),
            "is_superuser": self.user.is_superuser,
            "is_staff": self.user.is_staff,
            "is_active": self.user.is_active,
        }
        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


# ===== Registro normal (con contraseña) =====
class RegisterView(generics.CreateAPIView):
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


# ===== Nuevo: Cambiar contraseña (usuario autenticado) =====
class ChangePasswordAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    throttle_classes = [UserRateThrottle]

    def post(self, request):
        user = request.user
        old_password = request.data.get("old_password")
        new_password = request.data.get("new_password")

        if not old_password or not new_password:
            return Response({"detail": "Faltan campos."}, status=status.HTTP_400_BAD_REQUEST)

        if not user.check_password(old_password):
            return Response({"detail": "Contraseña actual incorrecta."}, status=status.HTTP_400_BAD_REQUEST)

        if len(new_password) < 8:
            return Response({"detail": "La nueva contraseña debe tener al menos 8 caracteres."}, status=status.HTTP_400_BAD_REQUEST)

        user.set_password(new_password)
        user.save()
        return Response({"detail": "Contraseña cambiada correctamente."}, status=status.HTTP_200_OK)


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
        data = request.data.copy()
        if 'nombre' in data and 'first_name' not in data:
            data['first_name'] = data['nombre']

        serializer = self.get_serializer(self.get_object(), data=data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)


class SendTemporaryPasswordAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk):
        try:
            user = User.objects.get(pk=pk)
        except User.DoesNotExist:
            return Response({"detail": "Usuario no encontrado."}, status=status.HTTP_404_NOT_FOUND)

        if user.is_superuser:
            return Response(
                {"detail": "No se puede cambiar la contraseña de un superusuario."},
                status=status.HTTP_400_BAD_REQUEST
            )

        temp_password = get_random_string(length=8)
        user.set_password(temp_password)
        user.save()

        try:
            send_mail(
                subject="Contraseña temporal - GestiAgro",
                message=(
                    f"Hola {user.nombre or ''},\n\n"
                    f"Tu nueva contraseña temporal es: {temp_password}\n\n"
                    f"Por favor, cámbiala después de iniciar sesión."
                ),
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[user.email],
                fail_silently=False,
            )
        except Exception as e:
            return Response(
                {"detail": f"Error al enviar el correo: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        return Response(
            {
                "detail": "Contraseña temporal enviada por correo."
            },
            status=status.HTTP_200_OK
        )


# ===== Actualizar rol de usuario =====
class UpdateUserRoleView(generics.UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRoleUpdateSerializer
    permission_classes = [permissions.IsAdminUser]
    authentication_classes = [JWTAuthentication]

    def update(self, request, *args, **kwargs):
        kwargs['partial'] = True
        instance = self.get_object()

        nuevo_rol = request.data.get("rol", "").strip()
        roles_validos = ["admin", "agronomo", "mayordomo"]

        if nuevo_rol not in roles_validos:
            return Response(
                {"detail": "Rol inválido. Debe ser admin, agronomo o mayordomo."},
                status=status.HTTP_400_BAD_REQUEST
            )

        instance.rol = nuevo_rol
        instance.save()

        return Response(UserSerializer(instance).data, status=status.HTTP_200_OK)


# ===== Listado de roles =====
class RolesListView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get(self, request):
        roles = [
            {"id": 1, "nombre": "Administrador"},
            {"id": 2, "nombre": "Agrónomo"},
            {"id": 3, "nombre": "Mayordomo"},
        ]
        return Response(roles, status=status.HTTP_200_OK)


class MyRolesView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response([user.get_rol_display()])
