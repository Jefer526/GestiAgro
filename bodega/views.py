from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from .models import Producto, Movimiento, StockFinca
from .serializers import ProductoSerializer, MovimientoSerializer
from fincas.models import Finca

class ProductoViewSet(viewsets.ModelViewSet):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer

    def perform_create(self, serializer):
        producto = serializer.save(creado_por=self.request.user)  # 👈 asigna creado_por
        # Asociar a todas las fincas con stock 0
        for finca in Finca.objects.all():
            StockFinca.objects.create(producto=producto, finca=finca, cantidad=0)


class MovimientoViewSet(viewsets.ModelViewSet):
    queryset = Movimiento.objects.all()
    serializer_class = MovimientoSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        producto = self.request.query_params.get("producto")
        finca = self.request.query_params.get("finca")
        if producto:
            qs = qs.filter(producto_id=producto)
        if finca:
            qs = qs.filter(finca_id=finca)
        return qs

    def perform_create(self, serializer):
        movimiento = serializer.save(creado_por=self.request.user)  # 👈 asigna creado_por
        stock, _ = StockFinca.objects.get_or_create(
            producto=movimiento.producto,
            finca=movimiento.finca,
            defaults={"cantidad": 0},
        )
        if movimiento.tipo == "Entrada":
            stock.cantidad += movimiento.cantidad
        elif movimiento.tipo == "Salida":
            stock.cantidad -= movimiento.cantidad
        stock.save()
