from django.urls import path
from .views import RegistroUsuarioAPIView, ListaUsuariosAPIView

urlpatterns = [
    path('registrar/', RegistroUsuarioAPIView.as_view(), name='registro-usuario'),
    path('listar/', ListaUsuariosAPIView.as_view(), name='lista-usuarios'),
]
