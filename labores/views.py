from rest_framework import viewsets
from .models import Labor
from .serializers import LaborSerializer
from .permissions import EsMayordomoOAgronomoOAdmin

class LaborViewSet(viewsets.ModelViewSet):
    serializer_class = LaborSerializer
    permission_classes = [EsMayordomoOAgronomoOAdmin]

    def get_queryset(self):
        user = self.request.user
        if user.rol == "mayordomo":
            finca = getattr(user, "finca_asignada", None)
            return Labor.objects.filter(finca=finca) if finca else Labor.objects.none()
        if user.rol in ["admin", "agronomo"]:
            return Labor.objects.all()
        return Labor.objects.none()

    def perform_create(self, serializer):
        user = self.request.user
        if user.rol == "mayordomo":
            finca = getattr(user, "finca_asignada", None)
            serializer.save(finca=finca, creado_por=user)
        else:
            serializer.save(creado_por=user)
