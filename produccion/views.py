from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Sum
from django.db.models.functions import TruncMonth, TruncYear, TruncDay, ExtractMonth
from .models import Produccion
from .serializers import ProduccionSerializer


class ProduccionViewSet(viewsets.ModelViewSet):
    queryset = Produccion.objects.all().order_by("-fecha")
    serializer_class = ProduccionSerializer

    def perform_create(self, serializer):
        serializer.save(creado_por=self.request.user)

    @action(detail=False, methods=["get"])
    def resumen_mensual(self, request):
        finca_id = request.query_params.get("finca")
        lote_id = request.query_params.get("lote")
        periodo = request.query_params.get("periodo", "mes").lower()

        # 🔹 Captura meses (acepta ?meses=3 o ?meses[]=3)
        meses = request.query_params.getlist("meses") or request.query_params.getlist("meses[]")
        meses = [int(m) for m in meses if str(m).isdigit()]

        queryset = self.get_queryset()
        if finca_id:
            queryset = queryset.filter(finca_id=finca_id)
        if lote_id:
            queryset = queryset.filter(lote_id=lote_id)

        # 🔹 Filtro por meses
        if meses:
            queryset = queryset.annotate(mes=ExtractMonth("fecha")).filter(mes__in=meses)

        # 🔹 Agrupación dinámica
        if len(meses) == 1 and periodo == "mes":
            queryset = queryset.annotate(periodo=TruncDay("fecha"))  # 👈 agrupación diaria
        elif periodo == "año":
            queryset = queryset.annotate(periodo=TruncYear("fecha"))
        else:
            queryset = queryset.annotate(periodo=TruncMonth("fecha"))

        resumen = (
            queryset.values("periodo")
            .annotate(total=Sum("cantidad"))
            .order_by("periodo")
        )

        data = []
        for item in resumen:
            periodo_val = item["periodo"]
            if periodo_val:
                if len(meses) == 1 and periodo == "mes":
                    periodo_str = periodo_val.strftime("%Y-%m-%d")  # 👈 formato diario
                elif periodo == "año":
                    periodo_str = periodo_val.strftime("%Y")
                else:
                    periodo_str = periodo_val.strftime("%Y-%m")
            else:
                periodo_str = None
            data.append({"periodo": periodo_str, "total": item["total"] or 0})

        return Response(data)

    @action(detail=False, methods=["get"])
    def resumen_finca_mensual(self, request):
        fincas = request.query_params.getlist("fincas")
        meses = request.query_params.getlist("meses")
        periodo = request.query_params.get("periodo", "mes").lower()

        # Normalizamos meses
        meses = [int(m) for m in meses if str(m).isdigit()]
        fincas = [int(f) for f in fincas if str(f).isdigit()]

        queryset = self.get_queryset()
        if fincas:
            queryset = queryset.filter(finca_id__in=fincas)
        if meses:
            queryset = queryset.annotate(mes=ExtractMonth("fecha")).filter(mes__in=meses)

        # 🔹 Agrupación dinámica
        if len(meses) == 1 and periodo == "mes":
            queryset = queryset.annotate(periodo=TruncDay("fecha"))  # 👈 diario
        elif periodo == "año":
            queryset = queryset.annotate(periodo=TruncYear("fecha"))
        else:
            queryset = queryset.annotate(periodo=TruncMonth("fecha"))

        resumen = (
            queryset.values("finca__nombre", "periodo")
            .annotate(total=Sum("cantidad"))
            .order_by("finca__nombre", "periodo")
        )

        data = []
        for item in resumen:
            periodo_val = item["periodo"]
            if periodo_val:
                if len(meses) == 1 and periodo == "mes":
                    periodo_str = periodo_val.strftime("%Y-%m-%d")  # 👈 diario
                elif periodo == "año":
                    periodo_str = periodo_val.strftime("%Y")
                else:
                    periodo_str = periodo_val.strftime("%Y-%m")
            else:
                periodo_str = None

            data.append({
                "finca": item["finca__nombre"],
                "periodo": periodo_str,
                "total": item["total"] or 0
            })

        return Response(data)
