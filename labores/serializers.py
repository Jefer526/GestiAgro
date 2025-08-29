# labores/serializers.py
from rest_framework import serializers
from .models import Labor

class LaborSerializer(serializers.ModelSerializer):
    class Meta:
        model = Labor
        fields = "__all__"
        read_only_fields = ["finca"]  # El mayordomo no puede cambiar la finca
