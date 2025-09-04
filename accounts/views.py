from django.conf import settings
from django.contrib.auth import get_user_model
from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode
from django.utils.crypto import get_random_string
from django.core.mail import send_mail
from django.core.cache import cache
from django.utils import timezone
from datetime import timedelta
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError

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

from .permissions import EsAdminOAgronomo  

User = get_user_model()


# Serializador para login extendido con información adicional del usuario
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


# Vista para obtener token JWT con datos de usuario
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


# Vista para registro de usuario con contraseña
class RegisterView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = RegisterSerializer
    throttle_classes = [AnonRateThrottle]


# Vista para obtener datos del usuario autenticado
class MeView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]
    throttle_classes = [UserRateThrottle]

    def get_object(self):
        return self.request.user


# Vista para cierre de sesión (blacklist de token)
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


# Vista para registro de usuarios demo (sin contraseña inicial)
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
                "set_password_url_demo": set_password_url,
            },
            status=status.HTTP_201_CREATED,
        )


# Vista para establecer contraseña en usuarios demo o con link de recuperación
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


# Vista para cambiar contraseña de un usuario autenticado
class ChangePasswordAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    throttle_classes = [UserRateThrottle]

    def post(self, request):
        user = request.user
        old_password = request.data.get("old_password")
        new_password = request.data.get("new_password")

        if not old_password or not new_password:
            return Response({"detail": "Faltan campos."}, status=400)

        if not user.check_password(old_password):
            return Response({"detail": "Contraseña actual incorrecta."}, status=400)

        try:
            validate_password(new_password, user=user)
        except ValidationError as e:
            return Response({"detail": e.messages}, status=400)

        user.set_password(new_password)
        user.save()
        return Response({"detail": "Contraseña cambiada correctamente."}, status=200)


# Vista para listar usuarios
class UsersListView(generics.ListAPIView):
    queryset = User.objects.all().order_by('id')
    serializer_class = UserSerializer
    permission_classes = [EsAdminOAgronomo]
    authentication_classes = [JWTAuthentication]


# Vista para activar o desactivar usuarios
class AccountsUserToggleActiveAPIView(APIView):
    permission_classes = [EsAdminOAgronomo]

    def patch(self, request, pk):
        try:
            user = User.objects.get(pk=pk)
        except User.DoesNotExist:
            return Response({"detail": "Usuario no encontrado"}, status=404)

        if user.is_superuser and request.data.get("is_active") is False:
            return Response({"detail": "No se puede desactivar un superusuario."}, status=400)

        if user.is_superuser and not request.data.get("is_active") and user.is_active:
            return Response({"detail": "No se puede desactivar un superusuario."}, status=400)

        is_active = request.data.get("is_active")
        if isinstance(is_active, bool):
            user.is_active = is_active
        else:
            user.is_active = not user.is_active

        user.save()
        return Response({"id": user.id, "is_active": user.is_active}, status=200)


# Vista para detalle y actualización de usuario
class UserDetailUpdateView(generics.RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserUpdateSerializer
    permission_classes = [EsAdminOAgronomo]
    authentication_classes = [JWTAuthentication]

    def update(self, request, *args, **kwargs):
        kwargs['partial'] = True
        data = request.data.copy()
        if 'nombre' in data and 'first_name' not in data:
            data['first_name'] = data['nombre']

        serializer = self.get_serializer(self.get_object(), data=data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)


# Vista para enviar contraseña temporal por correo
class SendTemporaryPasswordAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk):
        try:
            user = User.objects.get(pk=pk)
        except User.DoesNotExist:
            return Response({"detail": "Usuario no encontrado."}, status=404)

        if user.is_superuser:
            return Response({"detail": "No se puede cambiar la contraseña de un superusuario."}, status=400)

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
            return Response({"detail": f"Error al enviar el correo: {str(e)}"}, status=500)

        return Response({"detail": "Contraseña temporal enviada por correo."}, status=200)


# Vista para actualizar el rol de un usuario
class UpdateUserRoleView(generics.UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRoleUpdateSerializer
    permission_classes = [EsAdminOAgronomo]
    authentication_classes = [JWTAuthentication]

    def update(self, request, *args, **kwargs):
        kwargs['partial'] = True
        instance = self.get_object()

        nuevo_rol = request.data.get("rol", "").strip()
        roles_validos = ["admin", "agronomo", "mayordomo"]

        if nuevo_rol not in roles_validos:
            return Response({"detail": "Rol inválido. Debe ser admin, agronomo o mayordomo."}, status=400)

        instance.rol = nuevo_rol
        instance.save()

        return Response(UserSerializer(instance).data, status=200)


# Vista para listar los roles disponibles
class RolesListView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get(self, request):
        roles = [
            {"id": 1, "nombre": "Administrador"},
            {"id": 2, "nombre": "Agrónomo"},
            {"id": 3, "nombre": "Mayordomo"},
        ]
        return Response(roles, status=200)


# Vista para obtener el rol del usuario autenticado
class MyRolesView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response([user.get_rol_display()])


# Vista para verificar si un email existe en el sistema
class CheckEmailView(APIView):
    permission_classes = [permissions.AllowAny]
    throttle_classes = [AnonRateThrottle]

    def post(self, request):
        email = request.data.get("email")
        if not email:
            return Response({"detail": "Email requerido."}, status=400)

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({"detail": "No existe este correo."}, status=404)

        tiene_password = bool(user.password and user.has_usable_password())

        return Response({"detail": "Correo válido.", "tiene_password": tiene_password}, status=200)


# Vista para enviar código de verificación por email
class SendVerificationCodeAPIView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        email = request.data.get("email")
        if not email:
            return Response({"detail": "Email requerido."}, status=400)

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({"detail": "Correo no registrado."}, status=404)

        limit_key = f"verify_count_{user.id}"
        expire_key = f"verify_expire_{user.id}"
        count = cache.get(limit_key, 0)

        if count >= settings.PASSWORD_RESET_LIMIT:
            expire_at = cache.get(expire_key)
            if expire_at:
                now = timezone.now()
                remaining = int((expire_at - now).total_seconds())
                if remaining > 0:
                    minutos = remaining // 60
                    segundos = remaining % 60
                    return Response(
                        {"detail": f"Has alcanzado el límite de envíos. Intenta de nuevo en {minutos} min {segundos} seg."},
                        status=429,
                    )
            return Response(
                {"detail": "Has alcanzado el límite de envíos. Intenta más tarde."},
                status=429,
            )

        code = get_random_string(length=6, allowed_chars="0123456789")
        cache.set(f"verify_code_{user.id}", code, timeout=settings.PASSWORD_RESET_CODE_TIMEOUT)

        window = settings.PASSWORD_RESET_LIMIT_WINDOW
        cache.set(limit_key, count + 1, timeout=window)
        cache.set(expire_key, timezone.now() + timedelta(seconds=window), timeout=window)

        try:
            send_mail(
                subject="Código de verificación - GestiAgro",
                message=f"Tu código de verificación es: {code}\n\nSi no solicitaste este cambio, ignora este mensaje.",
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[user.email],
                fail_silently=False,
            )
        except Exception as e:
            return Response({"detail": f"Error enviando correo: {str(e)}"}, status=500)

        return Response({"detail": "Código enviado al correo."}, status=200)


# Vista para verificar el código recibido por email
class VerifyCodeAPIView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        email = request.data.get("email")
        code = request.data.get("code")

        if not email or not code:
            return Response({"detail": "Faltan datos."}, status=400)

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({"detail": "Correo no registrado."}, status=404)

        saved_code = cache.get(f"verify_code_{user.id}")

        if not saved_code or saved_code != code:
            return Response({"detail": "Código inválido o expirado."}, status=400)

        cache.delete(f"verify_code_{user.id}")
        cache.delete(f"verify_count_{user.id}")
        cache.delete(f"verify_expire_{user.id}")

        return Response({"detail": "Código verificado."}, status=200)


# Vista para resetear contraseña de usuario
class ResetPasswordAPIView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        if not email or not password:
            return Response({"detail": "Faltan datos."}, status=400)

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({"detail": "Usuario no encontrado."}, status=404)

        try:
            validate_password(password, user=user)
        except ValidationError as e:
            return Response({"detail": e.messages}, status=400)

        user.set_password(password)
        user.save()
        return Response({"detail": "Contraseña restablecida correctamente."}, status=200)
