from rest_framework import serializers
from .models import Usuarios
from datetime import datetime

class UsuarioRegistroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuarios
        fields = ['nombre_completo', 'telefono', 'email']

    def create(self, validated_data):
        request = self.context.get('request')
        creado_por = request.user.username if request and request.user.is_authenticated else "registro_web"
        fecha_creacion = datetime.now()

        usuario = Usuarios.objects.create(
            nombre_completo=validated_data['nombre_completo'],
            telefono=validated_data.get('telefono'),
            email=validated_data['email'],
            contrasena=None,  # se asigna después
            creado_por=creado_por,
            fecha_creacion=fecha_creacion
        )
        return usuario
