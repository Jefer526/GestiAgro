from django.contrib import admin
from django.urls import path, include
from accounts.views import DemoSignupAPIView 

urlpatterns = [
    path('admin/', admin.site.urls),

    path('api/registro/', DemoSignupAPIView.as_view()),

    # Monta accounts dos veces para cubrir ambas rutas que espera el FE
    path("api/", include("accounts.urls")),          # para /api/token/
    path("api/auth/", include("accounts.urls")),     # para /api/auth/logout/
    path('api/accounts/', include('accounts.urls')),
    path("soporte/", include("soporte.urls")),
    path("api/", include("fincas.urls")),
    path("api/", include("trabajadores.urls")),  
    path("api/equipos/", include("equipos.urls")),
]
