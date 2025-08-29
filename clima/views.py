from rest_framework import viewsets
from .models import VariableClimatica
from .serializers import VariableClimaticaSerializer

class VariableClimaticaViewSet(viewsets.ModelViewSet):
    queryset = VariableClimatica.objects.all()
    serializer_class = VariableClimaticaSerializer

    def perform_create(self, serializer):
        serializer.save(creado_por=self.request.user)  # 👈
