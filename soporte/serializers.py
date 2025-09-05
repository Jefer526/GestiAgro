from rest_framework import serializers
from .models import Ticket


# Serializer para registrar y mostrar los tickets de soporte
class TicketSerializer(serializers.ModelSerializer):
    solicitado_por_nombre = serializers.CharField(
        source="solicitado_por.nombre", 
        read_only=True
    )
    solicitado_por_rol = serializers.SerializerMethodField()
    estado_display = serializers.SerializerMethodField()

    class Meta:
        model = Ticket
        fields = "__all__"
        read_only_fields = ("numero", "fecha_solicitud", "solicitado_por")

    def get_estado_display(self, obj):
        return obj.get_estado_display()

    def get_solicitado_por_rol(self, obj):
        return obj.solicitado_por.get_rol_display()
