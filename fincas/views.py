from rest_framework import viewsets
from .models import Finca, Lote
from .serializers import FincaSerializer, LoteSerializer

class FincaViewSet(viewsets.ModelViewSet):
    queryset = Finca.objects.all()
    serializer_class = FincaSerializer


class LoteViewSet(viewsets.ModelViewSet):
    queryset = Lote.objects.all()
    serializer_class = LoteSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        finca_id = self.request.query_params.get("finca")
        if finca_id:
            queryset = queryset.filter(finca_id=finca_id)
        return queryset
