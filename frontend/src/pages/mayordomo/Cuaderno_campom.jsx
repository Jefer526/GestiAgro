// src/pages/mayordomo/Cuaderno_campo.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { IconPlus, IconEye } from "@tabler/icons-react";
import LayoutMayordomo from "../../layouts/LayoutMayordomo";

const Cuaderno_campo = () => {
  const navigate = useNavigate();

  // 📌 Datos de ejemplo
  const registros = [
    {
      fecha: "2025-08-15",
      finca: "La Esmeralda",
      lote: "Lote 1",
      anotaciones: "Revisión de plagas en cultivo de aguacate.",
    },
    {
      fecha: "2025-08-16",
      finca: "Las Palmas",
      lote: "Lote 2",
      anotaciones: "Aplicación de fertilizantes orgánicos.",
    },
    {
      fecha: "2025-08-17",
      finca: "La Carolina",
      lote: "Lote 3",
      anotaciones: "Observación de humedad del suelo.",
    },
  ];

  return (
    <LayoutMayordomo>
      {/* ✅ Título */}
      <h1 className="text-3xl font-bold text-green-700 mb-6">
        Historial de Campo
      </h1>

      {/* ✅ Botón nuevo registro */}
      <div className="mb-6">
        <button
          onClick={() => navigate("/registro_campom")}
          className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition flex items-center gap-2"
        >
          <IconPlus className="w-5 h-5" />
          Nuevo Registro de Campo
        </button>
      </div>

      {/* ✅ Tabla */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-auto relative">
        <table className="w-full text-base">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="px-4 py-3 border text-center uppercase">Fecha</th>
              <th className="px-4 py-3 border text-center uppercase">Finca</th>
              <th className="px-4 py-3 border text-center uppercase">Lote</th>
              <th className="px-4 py-3 border text-center uppercase">Anotaciones</th>
              <th className="px-4 py-3 border text-center uppercase">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {registros.map((r, i) => (
              <tr
                key={i}
                className="border-b border-gray-200 text-center align-middle hover:bg-gray-50 transition"
              >
                <td className="px-4 py-2 border">{r.fecha}</td>
                <td className="px-4 py-2 border">{r.finca}</td>
                <td className="px-4 py-2 border">{r.lote}</td>
                {/* ✅ contenido de anotaciones alineado a la izquierda */}
                <td className="px-4 py-2 border text-left">{r.anotaciones}</td>
                <td className="px-4 py-2 border text-center">
                  <button
                    onClick={() => navigate("/detalle_registrocampom")}
                    className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1 justify-center mx-auto hover:bg-blue-200 transition"
                  >
                    <IconEye className="w-4 h-4" /> Detalles
                  </button>
                </td>
              </tr>
            ))}
            {registros.length === 0 && (
              <tr>
                <td colSpan={5} className="p-6 text-gray-500 text-center">
                  Sin registros
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </LayoutMayordomo>
  );
};

export default Cuaderno_campo;

