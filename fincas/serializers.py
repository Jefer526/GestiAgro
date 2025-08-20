from rest_framework import serializers
from .models import Finca, Lote, Arbol


class FincaSerializer(serializers.ModelSerializer):
    numero_arboles = serializers.ReadOnlyField()  # viene del @property

    class Meta:
        model = Finca
        fields = [
            "id",
            "nombre",
            "area_bruta",
            "area_neta",
            "municipio",
            "departamento",
            "numero_arboles",
        ]


class ArbolSerializer(serializers.ModelSerializer):
    class Meta:
        model = Arbol
        fields = ["id", "variedad", "cantidad"]


class LoteSerializer(serializers.ModelSerializer):
    arboles = ArbolSerializer(many=True, required=False)
    numero_arboles = serializers.SerializerMethodField()
    variedades = serializers.SerializerMethodField()           # solo nombres (para filtros)
    variedades_detalle = serializers.SerializerMethodField()   # objetos {variedad, cantidad}
    finca_nombre = serializers.CharField(source="finca.nombre", read_only=True)

    class Meta:
        model = Lote
        fields = [
            "id",
            "finca",
            "finca_nombre",
            "lote",
            "cultivo",
            "numero_arboles",
            "variedades",          # solo nombres
            "variedades_detalle",  # objetos {variedad, cantidad}
            "area_bruta",
            "area_neta",
            "estado",
            "arboles",
        ]

    # ✅ Total de árboles del lote
    def get_numero_arboles(self, obj):
        return sum(arbol.cantidad for arbol in obj.arboles.all())

    # ✅ Solo nombres únicos de variedades (para los filtros)
    def get_variedades(self, obj):
        return list(obj.arboles.values_list("variedad", flat=True).distinct())

    # ✅ Variedades con cantidad (objeto JSON)
    def get_variedades_detalle(self, obj):
        return [
            {"variedad": arbol.variedad, "cantidad": arbol.cantidad}
            for arbol in obj.arboles.all()
        ]

    # 🚨 Validación de unicidad (lote por finca)
    def validate(self, data):
        finca = data.get("finca") or getattr(self.instance, "finca", None)
        lote = data.get("lote") or getattr(self.instance, "lote", None)

        if finca and lote:
            qs = Lote.objects.filter(finca=finca, lote=lote)
            if self.instance:  # si está en edición, excluir el actual
                qs = qs.exclude(pk=self.instance.pk)
            if qs.exists():
                raise serializers.ValidationError(
                    {"lote": f"El lote '{lote}' ya existe en la finca '{finca.nombre}'."}
                )
        return data

    # ✅ Crear lote junto con árboles
    def create(self, validated_data):
        arboles_data = validated_data.pop("arboles", [])
        lote = Lote.objects.create(**validated_data)
        for arbol_data in arboles_data:
            Arbol.objects.create(lote=lote, **arbol_data)
        return lote

    # ✅ Actualizar lote y reemplazar árboles
    def update(self, instance, validated_data):
        arboles_data = validated_data.pop("arboles", None)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        if arboles_data is not None:
            instance.arboles.all().delete()
            for arbol_data in arboles_data:
                Arbol.objects.create(lote=instance, **arbol_data)

        return instance
