from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Sum
from django.db.models.functions import TruncMonth, TruncYear
from .models import Produccion
from .serializers import ProduccionSerializer


class ProduccionViewSet(viewsets.ModelViewSet):
    queryset = Produccion.objects.all().order_by("-fecha")
    serializer_class = ProduccionSerializer

    # 📊 Resumen de producción agrupado por mes o año
    @action(detail=False, methods=["get"])
    def resumen_mensual(self, request):
        finca_id = request.query_params.get("finca")
        lote_id = request.query_params.get("lote")
        periodo = request.query_params.get("periodo", "mes").lower()  # 👈 "mes" o "año"

        queryset = self.get_queryset()

        if finca_id:
            queryset = queryset.filter(finca_id=finca_id)
        if lote_id:
            queryset = queryset.filter(lote_id=lote_id)

        # 👇 Agrupamos según el parámetro
        if periodo == "año":
            queryset = queryset.annotate(periodo=TruncYear("fecha"))
        else:
            queryset = queryset.annotate(periodo=TruncMonth("fecha"))

        resumen = (
            queryset.values("periodo")
            .annotate(total=Sum("cantidad"))
            .order_by("periodo")
            .distinct()
        )

        # 🔹 Convertir periodo a string (evita problemas de serialización)
        data = []
        for item in resumen:
            periodo_val = item["periodo"]
            if periodo_val:
                if periodo == "año":
                    periodo_str = periodo_val.strftime("%Y")
                else:
                    periodo_str = periodo_val.strftime("%Y-%m")  # formato AAAA-MM
            else:
                periodo_str = None

            data.append({"periodo": periodo_str, "total": item["total"] or 0})

        return Response(data)

    # 📊 Resumen de producción por finca
    @action(detail=False, methods=["get"])
    def resumen_finca(self, request):
        finca_id = request.query_params.get("finca")
        lote_id = request.query_params.get("lote")

        queryset = self.get_queryset()

        if finca_id:
            queryset = queryset.filter(finca_id=finca_id)
        if lote_id:
            queryset = queryset.filter(lote_id=lote_id)

        resumen = (
            queryset.values("finca__nombre")
            .annotate(total=Sum("cantidad"))
            .order_by("finca__nombre")
            .distinct()
        )

        # 🔹 Normalizar salida
        data = [{"finca": r["finca__nombre"], "total": r["total"] or 0} for r in resumen]
        return Response(data)

    # 🛠 Endpoint de depuración (opcional)
    @action(detail=False, methods=["get"])
    def resumen_debug(self, request):
        finca_id = request.query_params.get("finca")
        queryset = self.get_queryset()

        if finca_id:
            queryset = queryset.filter(finca_id=finca_id)

        data = list(queryset.values("id", "fecha", "cantidad", "finca_id", "lote_id"))
        return Response(data)
