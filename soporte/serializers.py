# soporte/serializers.py
from rest_framework import serializers
from .models import Ticket

class TicketSerializer(serializers.ModelSerializer):
    solicitado_por_nombre = serializers.CharField(
        source="solicitado_por.nombre", 
        read_only=True
    )
    estado_display = serializers.SerializerMethodField()  # 👈 Estado con primera letra mayúscula

    class Meta:
        model = Ticket
        fields = "__all__"
        read_only_fields = ("numero", "fecha_solicitud", "solicitado_por")

    def get_estado_display(self, obj):
        # Usa el label definido en choices (ej. "Abierto", "En proceso", "Cerrado")
        return obj.get_estado_display()
