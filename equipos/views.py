# equipos/views.py
from rest_framework import viewsets
from .models import Maquina, Mantenimiento
from .serializers import MaquinaSerializer, MantenimientoSerializer

class MaquinaViewSet(viewsets.ModelViewSet):
    queryset = Maquina.objects.all()
    serializer_class = MaquinaSerializer


class MantenimientoViewSet(viewsets.ModelViewSet):
    queryset = Mantenimiento.objects.all()
    serializer_class = MantenimientoSerializer