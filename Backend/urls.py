"""
URL configuration for Backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from accounts.views import DemoSignupAPIView 

urlpatterns = [
    path('admin/', admin.site.urls),

    # --- Si aún necesitas las rutas de la app usuarios para otras cosas ---
    # path('api/usuarios/', include('usuarios.urls')),

    # --- Rutas antiguas que registraban en usuarios ---
    # Eliminadas para que el frontend ya no use /api/registro/
    # path('api/registro/', RegistroUsuarioAPIView.as_view()),

    path('api/registro/', DemoSignupAPIView.as_view()),

    # --- Rutas de accounts ---
    # Prefijo claro para que sepas que es el módulo de autenticación
    path("api/accounts/", include("accounts.urls")),
]
