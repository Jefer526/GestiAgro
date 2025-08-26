from rest_framework import viewsets
from .models import RegistroCampo
from .serializers import RegistroCampoSerializer

class RegistroCampoViewSet(viewsets.ModelViewSet):
    queryset = RegistroCampo.objects.all().order_by("-fecha", "-creado")
    serializer_class = RegistroCampoSerializer