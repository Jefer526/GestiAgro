from rest_framework import serializers
from .models import VariableClimatica

class VariableClimaticaSerializer(serializers.ModelSerializer):
    finca_nombre = serializers.CharField(source="finca.nombre", read_only=True)

    class Meta:
        model = VariableClimatica
        fields = ["id", "finca", "finca_nombre", "fecha", "precipitacion", "temp_min", "temp_max", "humedad"]
