from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import DestroyAPIView
from .models import Usuarios
from .serializers import UsuarioRegistroSerializer, UsuarioListaSerializer

class RegistroUsuarioAPIView(APIView):
    def post(self, request):
        serializer = UsuarioRegistroSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response({"mensaje": "Usuario registrado correctamente"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ListaUsuariosAPIView(APIView):
    def get(self, request):
        usuarios = Usuarios.objects.all()
        serializer = UsuarioListaSerializer(usuarios, many=True)
        return Response(serializer.data)
    
class EliminarUsuarioAPIView(DestroyAPIView):
    queryset = Usuarios.objects.all()
    serializer_class = UsuarioListaSerializer
    lookup_field = 'id_usuario'