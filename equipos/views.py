from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Maquina, Mantenimiento, LaborMaquinaria
from .serializers import MaquinaSerializer, MantenimientoSerializer, LaborMaquinariaSerializer

class MaquinaViewSet(viewsets.ModelViewSet):
    queryset = Maquina.objects.all()
    serializer_class = MaquinaSerializer

    def get_queryset(self):
        user = self.request.user
        qs = super().get_queryset()

        # ✅ Si es mayordomo → solo máquinas de su finca asignada
        if user.rol == "mayordomo" and user.finca_asignada:
            return qs.filter(ubicacion=user.finca_asignada)

        return qs


class MantenimientoViewSet(viewsets.ModelViewSet):
    queryset = Mantenimiento.objects.all()
    serializer_class = MantenimientoSerializer


class LaborMaquinariaViewSet(viewsets.ModelViewSet):
    queryset = LaborMaquinaria.objects.all().order_by("-fecha", "-id")
    serializer_class = LaborMaquinariaSerializer

    def create(self, request, *args, **kwargs):
        data = request.data

        # Caso múltiple (array de labores en bloque)
        if isinstance(data, list):
            created = []

            ultima_labor = (
                LaborMaquinaria.objects.filter(maquina=data[0].get("maquina"))
                .order_by("-fecha", "-id")
                .first()
            )
            horometro_actual = float(ultima_labor.horometro_fin) if ultima_labor else 0.0

            for item in data:
                inicio = float(item.get("horometro_inicio"))
                fin = float(item.get("horometro_fin"))

                # Validación secuencial de horómetros
                if round(inicio, 1) != round(horometro_actual, 1):
                    return Response(
                        {
                            "error": f"El horómetro inicial ({inicio:.1f}) "
                                     f"no coincide con el esperado ({horometro_actual:.1f})."
                        },
                        status=status.HTTP_400_BAD_REQUEST,
                    )

                if fin <= inicio:
                    return Response(
                        {"error": "El horómetro final debe ser mayor que el inicial."},
                        status=status.HTTP_400_BAD_REQUEST,
                    )

                serializer = self.get_serializer(data=item)
                serializer.is_valid(raise_exception=True)
                self.perform_create(serializer)
                created.append(serializer.data)

                # Actualizar para la siguiente iteración
                horometro_actual = fin

            return Response(created, status=status.HTTP_201_CREATED)

        # Caso normal (una sola labor)
        return super().create(request, *args, **kwargs)
