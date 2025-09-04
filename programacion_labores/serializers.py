from rest_framework import serializers
from .models import ProgramacionLabor


# Serializer para registrar y mostrar la programación de labores agrícolas
class ProgramacionLaborSerializer(serializers.ModelSerializer):
    finca_nombre = serializers.CharField(source="finca.nombre", read_only=True)
    lote_nombre = serializers.CharField(source="lote.lote", read_only=True)

    class Meta:
        model = ProgramacionLabor
        fields = [
            "id",
            "semana",
            "finca",
            "finca_nombre",
            "lote",
            "lote_nombre",
            "labor",
            "jornales",
            "estado",
            "creado_por",
        ]
        read_only_fields = ("finca", "creado_por")
