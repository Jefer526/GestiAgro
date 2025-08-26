from rest_framework import serializers
from .models import Produccion

class ProduccionSerializer(serializers.ModelSerializer):
    finca_nombre = serializers.CharField(source="finca.nombre", read_only=True)
    lote_nombre = serializers.CharField(source="lote.lote", read_only=True)
    cultivo_nombre = serializers.CharField(source="lote.cultivo", read_only=True)

    class Meta:
        model = Produccion
        fields = [
            "id", "fecha",
            "finca", "finca_nombre",
            "lote", "lote_nombre", "cultivo_nombre",
            "cantidad", "unidad", "observaciones"
        ]
