from rest_framework import viewsets
from .models import Trabajador
from .serializers import TrabajadorSerializer

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