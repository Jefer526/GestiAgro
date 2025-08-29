from django.contrib import admin
from django.urls import path, include
from accounts.views import DemoSignupAPIView 
from django.conf import settings
from django.conf.urls.static import static

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
    path("api/clima/", include("clima.urls")),
    path("api/bodega/", include("bodega.urls")),  # Nueva ruta para la app bodega
    path("api/cuaderno/", include("cuaderno_campo.urls")),
    path("api/produccion/", include("produccion.urls")),
    path("api/fitosanitario/", include("fitosanitario.urls")),
    path("api/labores/", include("labores.urls")),
    path("api/programacionlabores/", include("programacion_labores.urls")),

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)