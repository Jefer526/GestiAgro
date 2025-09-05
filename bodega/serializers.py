from rest_framework import serializers
from .models import Producto, Movimiento, StockFinca


# Serializer para el stock de productos en una finca
class StockFincaSerializer(serializers.ModelSerializer):
    finca_nombre = serializers.CharField(source="finca.nombre", read_only=True)

    class Meta:
        model = StockFinca
        fields = ["id", "finca", "finca_nombre", "cantidad"]
        read_only_fields = ["creado_por", "fecha_creacion"]


# Serializer para productos de la bodega
class ProductoSerializer(serializers.ModelSerializer):
    stocks = StockFincaSerializer(many=True, read_only=True)

    class Meta:
        model = Producto
        fields = ["id", "nombre", "categoria", "ingrediente", "unidad", "stocks"]
        read_only_fields = ["creado_por", "fecha_creacion"]


# Serializer para movimientos de productos en la bodega
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
        read_only_fields = ["creado_por", "fecha_creacion"]

    def get_lote_nombre(self, obj):
        return obj.lote.lote if obj.lote else "-"
