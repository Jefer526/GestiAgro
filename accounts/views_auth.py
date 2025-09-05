from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers_auth import EmailTokenObtainPairSerializer


# Vista para autenticación con email utilizando JWT
class EmailLoginView(TokenObtainPairView):
    serializer_class = EmailTokenObtainPairSerializer