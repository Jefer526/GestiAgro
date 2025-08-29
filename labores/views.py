from rest_framework import viewsets
from .models import Labor
from .serializers import LaborSerializer
from .permissions import EsMayordomoOAgronomoOAdmin

class LaborViewSet(viewsets.ModelViewSet):
    serializer_class = LaborSerializer
    permission_classes = [EsMayordomoOAgronomoOAdmin]

    def get_queryset(self):
        user = self.request.user

        # Mayordomo: solo las labores de su finca asignada
        if user.rol == "mayordomo":
            finca = getattr(user, "finca_asignada", None)
            return Labor.objects.filter(finca=finca) if finca else Labor.objects.none()

        # Admin y Agrónomo: todas las labores
        if user.rol in ["admin", "agronomo"]:
            return Labor.objects.all()

        # Otros roles: nada
        return Labor.objects.none()

    def perform_create(self, serializer):
        user = self.request.user
        if user.rol == "mayordomo":
            # asigna automáticamente la finca del mayordomo
            finca = getattr(user, "finca_asignada", None)
            serializer.save(finca=finca)
        else:
            # admin y agrónomo pueden guardar sin restricción de finca
            serializer.save()
