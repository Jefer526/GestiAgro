from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied, ValidationError

from .models import ProgramacionLabor
from .serializers import ProgramacionLaborSerializer


class ProgramacionLaborViewSet(viewsets.ModelViewSet):
    queryset = ProgramacionLabor.objects.all()
    serializer_class = ProgramacionLaborSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user

        if user.rol == "mayordomo":
            finca = getattr(user, "finca_asignada", None)
            return ProgramacionLabor.objects.filter(finca=finca) if finca else ProgramacionLabor.objects.none()

        if user.rol == "agronomo":
            # ✅ Ahora ve TODAS las labores, no filtradas por finca
            return ProgramacionLabor.objects.all()

        if user.rol == "admin":
            return ProgramacionLabor.objects.all()

        return ProgramacionLabor.objects.none()

    def perform_create(self, serializer):
        user = self.request.user

        if user.rol == "mayordomo":
            finca = getattr(user, "finca_asignada", None)
            if not finca:
                raise ValidationError("El mayordomo no tiene una finca asignada.")
            serializer.save(creado_por=user, finca=finca)

        elif user.rol == "admin":
            serializer.save(creado_por=user)

        else:
            raise PermissionDenied("No tienes permisos para crear labores.")

    def partial_update(self, request, *args, **kwargs):
        instance = self.get_object()
        user = request.user

        if user.rol == "mayordomo":
            estado = request.data.get("estado")
            if not estado:
                raise ValidationError("Debes enviar el estado.")
            instance.estado = estado
            instance.save()
            return Response(self.get_serializer(instance).data)

        # ✅ Admin y Agrónomo pueden actualizar todo
        return super().partial_update(request, *args, **kwargs)
