from rest_framework import serializers
from .models import Labor, DetalleLabor


# Serializer para registrar y mostrar los detalles de una labor
class DetalleLaborSerializer(serializers.ModelSerializer):
    trabajador_nombre = serializers.CharField(source="trabajador.nombre", read_only=True)

    class Meta:
        model = DetalleLabor
        fields = [
            "id",
            "trabajador",
            "trabajador_nombre",
            "trabajador_externo",
            "jornal",
            "ejecucion",
            "um",
        ]
        read_only_fields = ["creado_por", "fecha_creacion"]


# Serializer para registrar y mostrar labores
class LaborSerializer(serializers.ModelSerializer):
    detalles = DetalleLaborSerializer(many=True)
    finca_nombre = serializers.CharField(source="finca.nombre", read_only=True)
    lote_nombre = serializers.CharField(source="lote.nombre", read_only=True, default="")

    class Meta:
        model = Labor
        fields = [
            "id",
            "fecha",
            "finca",
            "finca_nombre",
            "lote",
            "lote_nombre",
            "descripcion",
            "observaciones",
            "detalles",
        ]
        read_only_fields = ["finca", "creado_por", "fecha_creacion"]

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
