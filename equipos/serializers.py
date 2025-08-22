# equipos/serializers.py
from rest_framework import serializers
from .models import Maquina, Mantenimiento

class MantenimientoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mantenimiento
        fields = "__all__"


class MaquinaSerializer(serializers.ModelSerializer):
    ubicacion_nombre = serializers.CharField(source="ubicacion.nombre", read_only=True)
    mantenimientos = MantenimientoSerializer(many=True, read_only=True)

    class Meta:
        model = Maquina
        fields = ["id", "codigo_equipo", "maquina", "referencia", "ubicacion", "ubicacion_nombre", "estado", "mantenimientos"]
