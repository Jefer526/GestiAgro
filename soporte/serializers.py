from rest_framework import serializers
from .models import Ticket

class TicketSerializer(serializers.ModelSerializer):
    solicitado_por_nombre = serializers.CharField(source="solicitado_por.nombre", read_only=True)

    class Meta:
        model = Ticket
        fields = "__all__"
        read_only_fields = ("numero", "fecha_solicitud", "solicitado_por")
