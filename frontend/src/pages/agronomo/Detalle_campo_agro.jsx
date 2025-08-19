// src/pages/agronomo/Detalle_campo_agro.jsx
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { IconChevronLeft } from "@tabler/icons-react";
import LayoutAgronomo from "../../layouts/LayoutAgronomo";

const Detalle_campo_agro = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 📌 Fallback si entran directo a la ruta
  const fallback = {
    fecha: "2025-08-15",
    finca: "La Esmeralda",
    lote: "Lote 1",
    anotaciones: `Revisión de plagas en cultivo de aguacate. 
Se detectaron algunos focos de insectos, se programará control fitosanitario.`,
    foto: "https://via.placeholder.com/400x250.png?text=Ejemplo+Foto+Campo", // ✅ ejemplo de foto
  };

  const state = location.state;
  const data = { ...fallback, ...(state && typeof state === "object" ? state : {}) };

  return (
    <LayoutAgronomo active="/historialcampo">
      {/* Botón volver */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-green-700 font-semibold mb-4 text-lg hover:underline"
      >
        <IconChevronLeft className="w-5 h-5 mr-2" /> Volver
      </button>

      {/* Card de detalle */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-md p-10 w-[900px] max-w-full mx-auto">
        <h1 className="text-3xl font-bold text-green-700 mb-6">
          Detalle de Registro de Campo
        </h1>

        <div className="space-y-5 text-lg">
          <p>
            <strong>Fecha:</strong> {data.fecha}
          </p>
          <p>
            <strong>Finca:</strong> {data.finca}
          </p>
          <p>
            <strong>Lote:</strong> {data.lote}
          </p>
          <div>
            <strong>Anotaciones:</strong>
            <p className="mt-2 text-justify whitespace-pre-line">{data.anotaciones}</p>
          </div>

          {/* ✅ Foto siempre con ejemplo */}
          <div>
            <strong>Foto:</strong>
            <div className="mt-3">
              <img
                src={data.foto}
                alt="Registro de campo"
                className="max-h-72 rounded-lg border shadow-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </LayoutAgronomo>
  );
};

export default Detalle_campo_agro;
