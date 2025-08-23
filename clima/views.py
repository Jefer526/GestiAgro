from rest_framework import viewsets
from .models import VariableClimatica
from .serializers import VariableClimaticaSerializer

class VariableClimaticaViewSet(viewsets.ModelViewSet):
    queryset = VariableClimatica.objects.all()
    serializer_class = VariableClimaticaSerializer
