# equipos/serializers.py
from rest_framework import serializers
from .models import Maquina, Mantenimiento, LaborMaquinaria


class MantenimientoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mantenimiento
        fields = "__all__"


class MaquinaSerializer(serializers.ModelSerializer):
    # 👇 nombre legible de la finca
    ubicacion_nombre = serializers.CharField(source="ubicacion.nombre", read_only=True)
    # 👇 lista de mantenimientos relacionados
    mantenimientos = MantenimientoSerializer(many=True, read_only=True)

    class Meta:
        model = Maquina
        fields = [
            "id",
            "codigo_equipo",
            "maquina",
            "referencia",
            "ubicacion",          # ID de la finca
            "ubicacion_nombre",   # nombre de la finca
            "estado",
            "mantenimientos",     # mantenimientos asociados
        ]


class LaborMaquinariaSerializer(serializers.ModelSerializer):
    maquina_nombre = serializers.CharField(source="maquina.maquina", read_only=True)
    finca_nombre = serializers.CharField(source="finca.nombre", read_only=True)
    lote_nombre = serializers.CharField(source="lote.lote", read_only=True)

    class Meta:
        model = LaborMaquinaria
        fields = [
            "id",
            "maquina",
            "maquina_nombre",
            "fecha",
            "labor",
            "horometro_inicio",
            "horometro_fin",
            "finca",
            "finca_nombre",
            "lote",
            "lote_nombre",
            "observaciones",
        ]

    def validate(self, data):
        maquina = data.get("maquina")
        horometro_inicio = data.get("horometro_inicio")
        horometro_fin = data.get("horometro_fin")

        # Buscar la última labor de esa máquina
        ultima_labor = (
            LaborMaquinaria.objects.filter(maquina=maquina)
            .order_by("-fecha", "-id")
            .first()
        )

        if ultima_labor:
            # El horómetro inicio debe coincidir con el último fin
            if horometro_inicio != ultima_labor.horometro_fin:
                raise serializers.ValidationError(
                    {
                        "horometro_inicio": f"Debe ser igual al último horómetro final registrado ({ultima_labor.horometro_fin})."
                    }
                )

        # Validar que el horómetro fin sea mayor
        if horometro_fin <= horometro_inicio:
            raise serializers.ValidationError(
                {"horometro_fin": "El horómetro final debe ser mayor que el inicial."}
            )

        return data
