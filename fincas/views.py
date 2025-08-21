# fincas/views.py
from rest_framework import viewsets
from .models import Finca, Lote
from .serializers import FincaSerializer, LoteSerializer


class FincaViewSet(viewsets.ModelViewSet):
    queryset = Finca.objects.all()
    serializer_class = FincaSerializer

    def get_queryset(self):
        user = self.request.user
        qs = super().get_queryset()

        # Si es mayordomo, solo ve su finca asignada
        if user.rol == "mayordomo" and user.finca_asignada:
            return qs.filter(id=user.finca_asignada.id)

        # Admin y agrónomo ven todas
        return qs


class LoteViewSet(viewsets.ModelViewSet):
    queryset = Lote.objects.all()
    serializer_class = LoteSerializer

    def get_queryset(self):
        user = self.request.user
        qs = super().get_queryset()

        # Si es mayordomo, solo puede ver los lotes de su finca asignada
        if user.rol == "mayordomo" and user.finca_asignada:
            return qs.filter(finca=user.finca_asignada)

        # Admin y agrónomo pueden filtrar por finca vía query param
        finca_id = self.request.query_params.get("finca")
        if finca_id:
            qs = qs.filter(finca_id=finca_id)

        return qs
