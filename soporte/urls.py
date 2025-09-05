from django.urls import path
from .views import TicketListCreateView, TicketDetailView

# Definición de rutas para la aplicación Soporte
urlpatterns = [
    path("tickets/", TicketListCreateView.as_view(), name="ticket-list-create"),
    path("tickets/<int:pk>/", TicketDetailView.as_view(), name="ticket-detail"),
]
