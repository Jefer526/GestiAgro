from rest_framework import viewsets
from .models import RegistroCampo
from .serializers import RegistroCampoSerializer

class RegistroCampoViewSet(viewsets.ModelViewSet):
    queryset = RegistroCampo.objects.all().order_by("-fecha", "-fecha_creacion")
    serializer_class = RegistroCampoSerializer

    def perform_create(self, serializer):
        serializer.save(creado_por=self.request.user)  # 👈
