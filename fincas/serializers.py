from rest_framework import serializers
from .models import Finca, Lote, Arbol


# Serializer para registrar y mostrar información de las fincas
class FincaSerializer(serializers.ModelSerializer):
    numero_arboles = serializers.ReadOnlyField()

    class Meta:
        model = Finca
        fields = [
            "id", "nombre", "area_bruta", "area_neta",
            "municipio", "departamento", "numero_arboles"
        ]
        read_only_fields = ["creado_por", "fecha_creacion"]


# Serializer para registrar y mostrar árboles de un lote
class ArbolSerializer(serializers.ModelSerializer):
    class Meta:
        model = Arbol
        fields = ["id", "variedad", "cantidad"]
        read_only_fields = ["creado_por", "fecha_creacion"]


# Serializer para registrar y mostrar lotes de una finca
class LoteSerializer(serializers.ModelSerializer):
    arboles = ArbolSerializer(many=True, required=False)
    numero_arboles = serializers.SerializerMethodField()
    variedades = serializers.SerializerMethodField()
    variedades_detalle = serializers.SerializerMethodField()
    finca_nombre = serializers.CharField(source="finca.nombre", read_only=True)

    class Meta:
        model = Lote
        fields = [
            "id", "finca", "finca_nombre",
            "lote", "cultivo",
            "numero_arboles",
            "variedades", "variedades_detalle",
            "area_bruta", "area_neta", "estado",
            "arboles",
        ]
        read_only_fields = ["creado_por", "fecha_creacion"]

    def get_numero_arboles(self, obj):
        return sum(arbol.cantidad for arbol in obj.arboles.all())

    def get_variedades(self, obj):
        return list(obj.arboles.values_list("variedad", flat=True).distinct())

    def get_variedades_detalle(self, obj):
        return [{"variedad": arbol.variedad, "cantidad": arbol.cantidad} for arbol in obj.arboles.all()]

    def validate(self, data):
        finca = data.get("finca") or getattr(self.instance, "finca", None)
        lote = data.get("lote") or getattr(self.instance, "lote", None)
        if finca and lote:
            qs = Lote.objects.filter(finca=finca, lote=lote)
            if self.instance:
                qs = qs.exclude(pk=self.instance.pk)
            if qs.exists():
                raise serializers.ValidationError(
                    {"lote": f"El lote '{lote}' ya existe en la finca '{finca.nombre}'."}
                )
        return data

    def create(self, validated_data):
        arboles_data = validated_data.pop("arboles", [])
        lote = Lote.objects.create(**validated_data)
        for arbol_data in arboles_data:
            Arbol.objects.create(lote=lote, **arbol_data)
        return lote

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
