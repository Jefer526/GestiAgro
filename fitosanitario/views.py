from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Avg
from django.db.models.functions import ExtractMonth, ExtractYear
from .models import Monitoreo, RegistroPlaga
from .serializers import MonitoreoSerializer


# ViewSet para gestionar monitoreos fitosanitarios y generar resúmenes de plagas
class MonitoreoViewSet(viewsets.ModelViewSet):
    queryset = Monitoreo.objects.all().order_by("-fecha")
    serializer_class = MonitoreoSerializer

    def perform_create(self, serializer):
        serializer.save(creado_por=self.request.user)

    @action(detail=False, methods=["get"], url_path="resumen")
    def resumen(self, request):
        finca = request.query_params.get("finca")
        lote = request.query_params.get("lote")
        familia = request.query_params.get("familia")
        plaga = request.query_params.get("plaga")
        anio = request.query_params.get("anio")

        registros = RegistroPlaga.objects.select_related("monitoreo", "monitoreo__finca", "monitoreo__lote")

        if finca:
            finca_ids = finca.split(",")
            registros = registros.filter(monitoreo__finca_id__in=finca_ids)

        if lote:
            lote_ids = lote.split(",")
            registros = registros.filter(monitoreo__lote_id__in=lote_ids)

        if familia:
            familias = familia.split(",")
            registros = registros.filter(familia__in=familias)

        if plaga:
            plagas = plaga.split(",")
            registros = registros.filter(plaga__in=plagas)

        if anio:
            registros = registros.filter(monitoreo__fecha__year=anio)

        resumen = (
            registros
            .annotate(anio=ExtractYear("monitoreo__fecha"), mes=ExtractMonth("monitoreo__fecha"))
            .values(
                "monitoreo__finca_id",
                "monitoreo__finca__nombre",
                "monitoreo__lote_id",
                "monitoreo__lote__lote",
                "familia",
                "plaga",
                "anio",
                "mes",
            )
            .annotate(promedio=Avg("promedio"))
            .order_by("anio", "mes")
        )

        return Response(resumen)
