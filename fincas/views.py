from rest_framework import viewsets
from .models import Finca, Lote
from .serializers import FincaSerializer, LoteSerializer


# ViewSet para gestionar las fincas
class FincaViewSet(viewsets.ModelViewSet):
    queryset = Finca.objects.all()
    serializer_class = FincaSerializer

    def get_queryset(self):
        user = self.request.user
        qs = super().get_queryset()
        if user.rol == "mayordomo" and user.finca_asignada:
            return qs.filter(id=user.finca_asignada.id)
        return qs

    def perform_create(self, serializer):
        serializer.save(creado_por=self.request.user)


# ViewSet para gestionar los lotes de una finca
class LoteViewSet(viewsets.ModelViewSet):
    queryset = Lote.objects.all().order_by("lote")
    serializer_class = LoteSerializer

    def get_queryset(self):
        user = self.request.user
        qs = super().get_queryset()
        if user.rol == "mayordomo" and user.finca_asignada:
            return qs.filter(finca=user.finca_asignada)
        finca_id = self.request.query_params.get("finca")
        if finca_id:
            qs = qs.filter(finca_id=finca_id)
        return qs

    def perform_create(self, serializer):
        serializer.save(creado_por=self.request.user)
