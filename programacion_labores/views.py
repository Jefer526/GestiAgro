from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework import status

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
            return ProgramacionLabor.objects.filter(finca__agronomo=user)

        if user.rol == "admin":
            return ProgramacionLabor.objects.all()

        return ProgramacionLabor.objects.none()

    def perform_create(self, serializer):
        user = self.request.user

        if user.rol == "mayordomo":
            finca = getattr(user, "finca_asignada", None)
            if not finca:
                raise ValueError("El mayordomo no tiene una finca asignada")
            serializer.save(creado_por=user, finca=finca)

        elif user.rol == "admin":
            serializer.save(creado_por=user)

        else:
            raise PermissionError("No tienes permisos para crear labores")

    # 👇 Nuevo método
    def partial_update(self, request, *args, **kwargs):
        instance = self.get_object()
        user = request.user

        # Mayordomo: solo puede cambiar el estado
        if user.rol == "mayordomo":
            estado = request.data.get("estado")
            if not estado:
                return Response(
                    {"detail": "Debes enviar el estado"},
                    status=status.HTTP_400_BAD_REQUEST
                )
            instance.estado = estado
            instance.save()
            return Response(self.get_serializer(instance).data)

        # Admin y agrónomo: pueden actualizar todo
        return super().partial_update(request, *args, **kwargs)
