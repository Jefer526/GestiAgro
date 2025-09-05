from rest_framework import serializers
from .models import Maquina, Mantenimiento, LaborMaquinaria


# Serializer para registrar y mostrar mantenimientos de máquinas
class MantenimientoSerializer(serializers.ModelSerializer):
    fecha = serializers.DateField(format="%Y-%m-%d", input_formats=["%Y-%m-%d"])

    class Meta:
        model = Mantenimiento
        fields = "__all__"
        read_only_fields = ["creado_por", "fecha_creacion"]


# Serializer para registrar y mostrar máquinas
class MaquinaSerializer(serializers.ModelSerializer):
    ubicacion_nombre = serializers.CharField(source="ubicacion.nombre", read_only=True)
    mantenimientos = MantenimientoSerializer(many=True, read_only=True)

    class Meta:
        model = Maquina
        fields = [
            "id",
            "codigo_equipo",
            "maquina",
            "referencia",
            "ubicacion",
            "ubicacion_nombre",
            "estado",
            "mantenimientos",
        ]
        read_only_fields = ["creado_por", "fecha_creacion"]


# Serializer para registrar y mostrar labores realizadas con maquinaria
class LaborMaquinariaSerializer(serializers.ModelSerializer):
    maquina_nombre = serializers.CharField(source="maquina.maquina", read_only=True)
    finca_nombre = serializers.CharField(source="finca.nombre", read_only=True)
    lote_nombre = serializers.CharField(source="lote.lote", read_only=True)

    class Meta:
        model = LaborMaquinaria
        fields = [
            "id",
            "maquina", "maquina_nombre",
            "fecha",
            "labor",
            "horometro_inicio",
            "horometro_fin",
            "finca", "finca_nombre",
            "lote", "lote_nombre",
            "observaciones",
        ]
        read_only_fields = ["creado_por", "fecha_creacion"]

    def validate(self, data):
        maquina = data.get("maquina")
        horometro_inicio = data.get("horometro_inicio")
        horometro_fin = data.get("horometro_fin")

        ultima_labor = (
            LaborMaquinaria.objects.filter(maquina=maquina)
            .order_by("-fecha", "-id")
            .first()
        )

        if ultima_labor:
            if horometro_inicio != ultima_labor.horometro_fin:
                raise serializers.ValidationError(
                    {"horometro_inicio": f"Debe ser igual al último horómetro final registrado ({ultima_labor.horometro_fin})."}
                )

        if horometro_fin <= horometro_inicio:
            raise serializers.ValidationError(
                {"horometro_fin": "El horómetro final debe ser mayor que el inicial."}
            )

        if horometro_fin is None:
            raise serializers.ValidationError({"horometro_fin": "Este campo es obligatorio."})
        return data
