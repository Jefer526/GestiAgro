from rest_framework import serializers
from .models import Labor, DetalleLabor


class DetalleLaborSerializer(serializers.ModelSerializer):
    trabajador_nombre = serializers.CharField(source="trabajador.nombre", read_only=True)

    class Meta:
        model = DetalleLabor
        fields = [
            "id",
            "trabajador",          # FK si es trabajador interno
            "trabajador_nombre",   # nombre solo lectura
            "trabajador_externo",  # texto si es trabajador externo
            "jornal",
            "ejecucion",
            "um",
        ]


class LaborSerializer(serializers.ModelSerializer):
    detalles = DetalleLaborSerializer(many=True)

    class Meta:
        model = Labor
        fields = [
            "id",
            "fecha",
            "finca",
            "lote",
            "descripcion",
            "observaciones",
            "detalles",
        ]
        read_only_fields = ["finca"]

    def create(self, validated_data):
        detalles_data = validated_data.pop("detalles", [])
        labor = Labor.objects.create(**validated_data)
        for detalle_data in detalles_data:
            DetalleLabor.objects.create(labor=labor, **detalle_data)
        return labor

    def update(self, instance, validated_data):
        detalles_data = validated_data.pop("detalles", None)
        instance = super().update(instance, validated_data)
        if detalles_data is not None:
            instance.detalles.all().delete()
            for detalle_data in detalles_data:
                DetalleLabor.objects.create(labor=instance, **detalle_data)
        return instance
