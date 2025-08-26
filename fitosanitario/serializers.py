from rest_framework import serializers
from .models import Monitoreo, RegistroPlaga

class RegistroPlagaSerializer(serializers.ModelSerializer):
    class Meta:
        model = RegistroPlaga
        fields = ["id", "familia", "plaga", "promedio"]

class MonitoreoSerializer(serializers.ModelSerializer):
    registros = RegistroPlagaSerializer(many=True)

    class Meta:
        model = Monitoreo
        fields = ["id", "fecha", "finca", "lote", "observaciones", "registros"]

    def create(self, validated_data):
        registros_data = validated_data.pop("registros")
        monitoreo = Monitoreo.objects.create(**validated_data)
        for r in registros_data:
            RegistroPlaga.objects.create(monitoreo=monitoreo, **r)
        return monitoreo
