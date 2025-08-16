from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers_auth import EmailTokenObtainPairSerializer

class EmailLoginView(TokenObtainPairView):
    serializer_class = EmailTokenObtainPairSerializer
