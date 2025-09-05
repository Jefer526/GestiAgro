from rest_framework import serializers
from .models import VariableClimatica


# Serializer para registrar y mostrar variables climáticas
class VariableClimaticaSerializer(serializers.ModelSerializer):
    finca_nombre = serializers.CharField(source="finca.nombre", read_only=True)

    class Meta:
        model = VariableClimatica
        fields = ["id", "finca", "finca_nombre", "fecha", "precipitacion", "temp_min", "temp_max", "humedad"]
        read_only_fields = ["creado_por", "fecha_creacion"]
