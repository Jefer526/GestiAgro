from rest_framework import serializers
from .models import RegistroCampo

class RegistroCampoSerializer(serializers.ModelSerializer):
    # 👇 campos "extra" que se calculan desde las relaciones
    finca_nombre = serializers.CharField(source="finca.nombre", read_only=True)
    lote_nombre = serializers.CharField(source="lote.lote", read_only=True)

    class Meta:
        model = RegistroCampo
        fields = [
            "id",
            "fecha",
            "finca",
            "finca_nombre",
            "lote",
            "lote_nombre",
            "anotaciones",
            "foto",
            "creado",
            "actualizado",
        ]
