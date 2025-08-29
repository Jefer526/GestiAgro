from rest_framework import serializers
from .models import ProgramacionLabor

class ProgramacionLaborSerializer(serializers.ModelSerializer):
    # 🔹 Campos adicionales de solo lectura
    finca_nombre = serializers.CharField(source="finca.nombre", read_only=True)
    lote_nombre = serializers.CharField(source="lote.lote", read_only=True)

    class Meta:
        model = ProgramacionLabor
        fields = [
            "id",
            "semana",
            "finca",         # ID de la finca
            "finca_nombre",  # Nombre de la finca
            "lote",          # ID del lote
            "lote_nombre",   # Nombre del lote
            "labor",
            "jornales",
            "estado",
            "creado_por",
        ]
        read_only_fields = ("finca", "creado_por")
