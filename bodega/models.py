from django.db import models
from fincas.models import Finca, Lote   # suponiendo que ya existen


class Producto(models.Model):
    CATEGORIAS = [
        ("Combustible", "Combustible"),
        ("Fertilizante", "Fertilizante"),
        ("Insecticida", "Insecticida"),
        ("Fungicida", "Fungicida"),
        ("Biologico", "Biológico"),
        ("Otros", "Otros"),
    ]
    UNIDADES = [("Kg", "Kg"), ("Lt", "Lt")]

    nombre = models.CharField(max_length=100)
    categoria = models.CharField(max_length=30, choices=CATEGORIAS)
    ingrediente = models.CharField(max_length=150, blank=True, null=True)
    unidad = models.CharField(max_length=5, choices=UNIDADES, default="Kg")

    def __str__(self):
        return self.nombre


class StockFinca(models.Model):
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE, related_name="stocks")
    finca = models.ForeignKey(Finca, on_delete=models.CASCADE, related_name="stocks")
    cantidad = models.DecimalField(max_digits=12, decimal_places=2, default=0)

    class Meta:
        unique_together = ("producto", "finca")

    def __str__(self):
        return f"{self.producto.nombre} - {self.finca.nombre} ({self.cantidad}{self.producto.unidad})"
    

class Movimiento(models.Model):
    TIPOS = [("Entrada", "Entrada"), ("Salida", "Salida")]

    fecha = models.DateField()
    tipo = models.CharField(max_length=20, choices=TIPOS)
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE, related_name="movimientos")
    finca = models.ForeignKey(Finca, on_delete=models.CASCADE, related_name="movimientos")
    lote = models.ForeignKey(Lote, on_delete=models.SET_NULL, null=True, blank=True, related_name="movimientos")
    cantidad = models.DecimalField(max_digits=10, decimal_places=2)
    unidad = models.CharField(max_length=5, default="Kg")

    def __str__(self):
        return f"{self.tipo} {self.producto.nombre} ({self.cantidad}{self.unidad})"
