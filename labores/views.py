# labores/views.py
from rest_framework import viewsets, permissions
from .models import Labor
from trabajadores.models import Trabajador
from .serializers import LaborSerializer
from fincas.models import Finca
from trabajadores.serializers import TrabajadorSerializer


class IsMayordomo(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.rol == "mayordomo"

class LaborViewSet(viewsets.ModelViewSet):
    serializer_class = LaborSerializer
    permission_classes = [permissions.IsAuthenticated, IsMayordomo]

    def get_queryset(self):
        # Solo ver labores de la finca asignada al mayordomo
        finca = getattr(self.request.user, "finca_asignada", None)
        if finca:
            return Labor.objects.filter(finca=finca)
        return Labor.objects.none()

    def perform_create(self, serializer):
        # Asigna la finca automáticamente
        finca = getattr(self.request.user, "finca_asignada", None)
        serializer.save(finca=finca)

# trabajadores/views.py
class TrabajadorViewSet(viewsets.ModelViewSet):
    serializer_class = TrabajadorSerializer
    queryset = Trabajador.objects.all()

    def get_queryset(self):
        qs = super().get_queryset()
        finca_id = self.request.query_params.get("finca")
        externos_de = self.request.query_params.get("externos_de")

        if finca_id:
            qs = qs.filter(finca_id=finca_id)
        if externos_de:
            qs = qs.exclude(finca_id=externos_de)
        return qs