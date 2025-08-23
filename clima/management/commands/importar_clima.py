import csv
from django.core.management.base import BaseCommand
from clima.models import VariableClimatica
from fincas.models import Finca

class Command(BaseCommand):
    help = "Importa datos climáticos desde un archivo CSV usando bulk_create"

    def add_arguments(self, parser):
        parser.add_argument("archivo_csv", type=str, help="Ruta al archivo CSV")

    def handle(self, *args, **kwargs):
        archivo_csv = kwargs["archivo_csv"]

        registros = []
        with open(archivo_csv, newline="", encoding="utf-8") as csvfile:
            reader = csv.DictReader(csvfile)
            total = 0
            for row in reader:
                try:
                    finca = Finca.objects.get(id=row["finca"])
                    registros.append(
                        VariableClimatica(
                            finca=finca,
                            fecha=row["fecha"],
                            precipitacion=row["precipitacion"],
                            temp_min=row["temp_min"],
                            temp_max=row["temp_max"],
                            humedad=row["humedad"],
                        )
                    )
                    total += 1
                    if total % 100 == 0:
                        self.stdout.write(f"📥 Preparados {total} registros...")
                except Finca.DoesNotExist:
                    self.stdout.write(self.style.ERROR(
                        f"❌ Finca con ID {row['finca']} no existe"
                    ))

        # Insertar todo en bloque
        VariableClimatica.objects.bulk_create(registros, ignore_conflicts=True)
        self.stdout.write(self.style.SUCCESS(
            f"✅ Importación completada: {total} registros insertados."
        ))
