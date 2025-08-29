# views.py
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Sum, Avg
from django.db.models.functions import TruncMonth, TruncYear, TruncDay, ExtractMonth
from .models import VariableClimatica
from .serializers import VariableClimaticaSerializer


class VariableClimaticaViewSet(viewsets.ModelViewSet):
    queryset = VariableClimatica.objects.all()
    serializer_class = VariableClimaticaSerializer

    def perform_create(self, serializer):
        serializer.save(creado_por=self.request.user)

    @action(detail=False, methods=["get"])
    def resumen(self, request):
        fincas = request.query_params.getlist("fincas")
        meses = request.query_params.getlist("meses") or request.query_params.getlist("meses[]")
        periodo = request.query_params.get("periodo", "mes").lower()
        variables = request.query_params.getlist("variables")

        # Normalizamos
        fincas = [int(f) for f in fincas if f.isdigit()]
        meses = [int(m) for m in meses if m.isdigit()]

        queryset = self.get_queryset()
        if fincas:
            queryset = queryset.filter(finca_id__in=fincas)
        if meses:
            queryset = queryset.annotate(mes=ExtractMonth("fecha")).filter(mes__in=meses)

        # 🔹 Detectar si solo se pidió 1 mes → agrupar por día
        if len(meses) == 1 and periodo == "mes":
            queryset = queryset.annotate(periodo=TruncDay("fecha"))
        elif periodo == "año":
            queryset = queryset.annotate(periodo=TruncYear("fecha"))
        else:
            queryset = queryset.annotate(periodo=TruncMonth("fecha"))

        resumen = queryset.values("periodo").annotate(
            precipitacion_total=Sum("precipitacion"),
            temp_min_avg=Avg("temp_min"),
            temp_max_avg=Avg("temp_max"),
            humedad_avg=Avg("humedad"),
        ).order_by("periodo")

        data = []
        for item in resumen:
            periodo_val = item["periodo"]
            if periodo_val:
                if len(meses) == 1 and periodo == "mes":
                    periodo_str = periodo_val.strftime("%Y-%m-%d")  # 🔹 formato diario
                elif periodo == "año":
                    periodo_str = periodo_val.strftime("%Y")
                else:
                    periodo_str = periodo_val.strftime("%Y-%m")
            else:
                periodo_str = None

            row = {"periodo": periodo_str}
            if not variables or "precipitacion" in variables:
                row["precipitacion_total"] = item["precipitacion_total"] or 0
            if not variables or "temp_min" in variables:
                row["temp_min_avg"] = round(item["temp_min_avg"] or 0, 1)
            if not variables or "temp_max" in variables:
                row["temp_max_avg"] = round(item["temp_max_avg"] or 0, 1)
            if not variables or "humedad" in variables:
                row["humedad_avg"] = round(item["humedad_avg"] or 0, 1)

            data.append(row)

        return Response(data)