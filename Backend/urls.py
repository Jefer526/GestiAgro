from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/accounts/", include("accounts.urls")),
    path("api/soporte/", include("soporte.urls")),
    path("api/fincas/", include("fincas.urls")),
    path("api/trabajadores/", include("trabajadores.urls")),
    path("api/equipos/", include("equipos.urls")),
    path("api/clima/", include("clima.urls")),
    path("api/bodega/", include("bodega.urls")),
    path("api/cuaderno/", include("cuaderno_campo.urls")),
    path("api/produccion/", include("produccion.urls")),
    path("api/fitosanitario/", include("fitosanitario.urls")),
    path("api/labores/", include("labores.urls")),
    path("api/programacionlabores/", include("programacion_labores.urls")),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)