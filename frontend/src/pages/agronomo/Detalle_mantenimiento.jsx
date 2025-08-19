// src/pages/agronomo/Detalle_mantenimiento.jsx
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { IconChevronLeft } from "@tabler/icons-react";
import LayoutAgronomo from "../../layouts/LayoutAgronomo";

const Detalle_mantenimiento = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Fallback si entran directo a la ruta
  const fallback = {
    idMaquina: "1",
    prev: true,
    correcc: false,
    maquina: "Tractor John Deere",
    referencia: "JD 5055E",
    ubicacion: "La Esmeralda",
    estado: "Óptimo",
    fecha: "2025-08-01",
    tipo: "Mantenimiento Preventivo",
    descripcion: `Se realizó un mantenimiento preventivo completo que incluyó el cambio de aceite del motor, filtros de aire y combustible, revisión del sistema hidráulico y lubricación de todas las articulaciones. También se inspeccionó el sistema eléctrico, se verificó la presión de neumáticos y se realizó una limpieza general para evitar acumulación de suciedad en partes móviles.

El mantenimiento correctivo no fue necesario, ya que no se detectaron fallas críticas durante la revisión.`,
    realizadoPor: "Carlos Rodríguez",
  };

  const state = location.state;
  const data = { ...fallback, ...(state && typeof state === "object" ? state : {}) };

  // Si no viene "tipo", lo inferimos a partir de prev/correcc
  const tipoInferido =
    data.tipo ??
    (data.prev && data.correcc
      ? "Preventivo y Correctivo"
      : data.prev
      ? "Preventivo"
      : data.correcc
      ? "Correctivo"
      : "—");

  // Datos usuario (para Layout)
  const nombreUsuario = "Juan Pérez";
  const letraInicial = (nombreUsuario?.trim()?.[0] || "U").toUpperCase();

  return (
    <LayoutAgronomo active="/maquinariaequipos" letraInicial={letraInicial}>
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-green-700 font-semibold mb-4 text-lg hover:underline"
      >
        <IconChevronLeft className="w-5 h-5 mr-2" /> Volver
      </button>

      <div className="bg-white border border-gray-200 rounded-xl shadow-md p-10 w-[900px] max-w-full mx-auto">
        <h1 className="text-3xl font-bold text-green-700 mb-6">
          Detalle de Mantenimiento
        </h1>

        <div className="space-y-5 text-lg">
          <p>
            <strong>Código equipo:</strong> {data.idMaquina}
          </p>
          <p>
            <strong>Máquina:</strong> {data.maquina}
          </p>
          <p>
            <strong>Referencia:</strong> {data.referencia}
          </p>
          <p>
            <strong>Ubicación:</strong> {data.ubicacion}
          </p>
          <p>
            <strong>Estado:</strong> {data.estado}
          </p>
          <p>
            <strong>Fecha:</strong> {data.fecha}
          </p>
          <p>
            <strong>Tipo de mantenimiento:</strong> {tipoInferido}
          </p>

          <div>
            <strong>Descripción:</strong>
            <p className="mt-2 text-justify">{data.descripcion}</p>
          </div>

          <p>
            <strong>Realizado por:</strong> {data.realizadoPor}
          </p>
        </div>
      </div>
    </LayoutAgronomo>
  );
};

export default Detalle_mantenimiento;
