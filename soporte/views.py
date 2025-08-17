from rest_framework import generics, permissions
from .models import Ticket
from .serializers import TicketSerializer

# 👨‍🌾 Para listar y crear tickets
class TicketListCreateView(generics.ListCreateAPIView):
    serializer_class = TicketSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        # Admin ve todos, los demás solo los suyos
        if user.is_staff or user.is_superuser:
            return Ticket.objects.all().order_by("-fecha_solicitud")
        return Ticket.objects.filter(solicitado_por=user).order_by("-fecha_solicitud")

    def perform_create(self, serializer):
        serializer.save(solicitado_por=self.request.user)


# 👀 Para ver / editar un ticket
class TicketDetailView(generics.RetrieveUpdateAPIView):
    serializer_class = TicketSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = Ticket.objects.all()
