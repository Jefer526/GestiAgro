from django.urls import path
from .views import RegistroUsuarioAPIView, ListaUsuariosAPIView, EliminarUsuarioAPIView

urlpatterns = [
    path('registrar/', RegistroUsuarioAPIView.as_view(), name='registro-usuario'),
    path('listar/', ListaUsuariosAPIView.as_view(), name='lista-usuarios'),
    path('eliminar/<int:id_usuario>/', EliminarUsuarioAPIView.as_view(), name='eliminar_usuario'),
]
