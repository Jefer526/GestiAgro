from rest_framework import serializers
from .models import Producto, Movimiento, StockFinca



class StockFincaSerializer(serializers.ModelSerializer):
    finca_nombre = serializers.CharField(source="finca.nombre", read_only=True)

    class Meta:
        model = StockFinca
        fields = ["id", "finca", "finca_nombre", "cantidad"]

class ProductoSerializer(serializers.ModelSerializer):
    stocks = StockFincaSerializer(many=True, read_only=True)

    class Meta:
        model = Producto
        fields = ["id", "nombre", "categoria", "ingrediente", "unidad", "stocks"]

from rest_framework import serializers
from .models import Producto, Movimiento, StockFinca


class MovimientoSerializer(serializers.ModelSerializer):
    producto_nombre = serializers.CharField(source="producto.nombre", read_only=True)
    finca_nombre = serializers.CharField(source="finca.nombre", read_only=True)
    lote_nombre = serializers.SerializerMethodField()

    class Meta:
        model = Movimiento
        fields = [
            "id", "fecha", "tipo",
            "producto", "producto_nombre",
            "finca", "finca_nombre",
            "lote", "lote_nombre",
            "cantidad", "unidad"
        ]

    def get_lote_nombre(self, obj):
        return obj.lote.lote if obj.lote else "-"  # ✅ si no hay lote devuelve "-"
