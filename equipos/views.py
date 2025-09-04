from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Maquina, Mantenimiento, LaborMaquinaria
from .serializers import MaquinaSerializer, MantenimientoSerializer, LaborMaquinariaSerializer


# ViewSet para gestionar las máquinas o equipos
class MaquinaViewSet(viewsets.ModelViewSet):
    queryset = Maquina.objects.all()
    serializer_class = MaquinaSerializer

    def get_queryset(self):
        user = self.request.user
        qs = super().get_queryset()
        if user.rol == "mayordomo" and user.finca_asignada:
            return qs.filter(ubicacion=user.finca_asignada)
        return qs

    def perform_create(self, serializer):
        serializer.save(creado_por=self.request.user)


# ViewSet para registrar mantenimientos de las máquinas
class MantenimientoViewSet(viewsets.ModelViewSet):
    queryset = Mantenimiento.objects.all()
    serializer_class = MantenimientoSerializer

    def perform_create(self, serializer):
        serializer.save(creado_por=self.request.user)


# ViewSet para registrar y consultar labores realizadas con maquinaria
class LaborMaquinariaViewSet(viewsets.ModelViewSet):
    queryset = LaborMaquinaria.objects.all().order_by("-fecha", "-id")
    serializer_class = LaborMaquinariaSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        maquina_id = self.request.query_params.get("maquina")
        if maquina_id:
            qs = qs.filter(maquina_id=maquina_id)
        return qs

    def perform_create(self, serializer):
        serializer.save(creado_por=self.request.user)

    def create(self, request, *args, **kwargs):
        data = request.data
        many = isinstance(data, list)
        if not many:
            data = [data]

        created = []
        for item in data:
            serializer = self.get_serializer(data=item)
            serializer.is_valid(raise_exception=True)
            serializer.save(creado_por=request.user)
            created.append(serializer.data)

        return Response(created if many else created[0], status=status.HTTP_201_CREATED)
