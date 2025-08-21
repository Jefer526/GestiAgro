from rest_framework import serializers
from .models import Trabajador

class TrabajadorSerializer(serializers.ModelSerializer):
    finca_nombre = serializers.SerializerMethodField()

    class Meta:
        model = Trabajador
        fields = ["id", "codigo", "nombre", "cargo", "estado", "finca", "finca_nombre", "telefono"]
        read_only_fields = ["codigo"]  # 👈 el frontend no lo llena

    def get_finca_nombre(self, obj):
        return obj.finca.nombre if obj.finca else "Sin finca"
