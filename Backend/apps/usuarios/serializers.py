from rest_framework import serializers
from .models import Usuario, Rol, Permiso, UsuarioRol, RolPermiso


class PermisoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Permiso
        fields = '__all__'


class RolPermisoSerializer(serializers.ModelSerializer):
    permiso = PermisoSerializer(read_only=True)

    class Meta:
        model = RolPermiso
        fields = '__all__'


class RolSerializer(serializers.ModelSerializer):
    permisos = serializers.SerializerMethodField()

    class Meta:
        model = Rol
        fields = '__all__'

    def get_permisos(self, obj):
        permisos = obj.permisos.all()
        return PermisoSerializer(permisos, many=True).data


class UsuarioRolSerializer(serializers.ModelSerializer):
    rol = RolSerializer(read_only=True)

    class Meta:
        model = UsuarioRol
        fields = '__all__'


class UsuarioSerializer(serializers.ModelSerializer):
    roles = RolSerializer(many=True, read_only=True)

    class Meta:
        model = Usuario
        fields = [
            'id', 'email', 'nombre_completo', 'telefono',
            'creado_por', 'fecha_creacion',
            'is_active', 'is_staff', 'roles', 'password'
        ]
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        user = Usuario(**validated_data)
        if password:
            user.set_password(password)
        user.save()
        return user

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if password:
            instance.set_password(password)
        instance.save()
        return instance
