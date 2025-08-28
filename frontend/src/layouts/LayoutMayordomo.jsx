// src/layouts/LayoutMayordomo.jsx
import React, { useEffect, useState } from "react";
import SidebarMayordomo from "../components/SidebarMayordomo";
import { getMe } from "../services/apiClient";

const LayoutMayordomo = ({ children, titulo, accionesTop }) => {
  const [finca, setFinca] = useState(null);

  useEffect(() => {
    const fetchFinca = async () => {
      try {
        const resUser = await getMe();
        setFinca(resUser.data.finca_asignada || null);
      } catch (err) {
        console.error("❌ Error cargando finca asignada:", err);
      }
    };
    fetchFinca();
  }, []);

  return (
    <div className="flex">
      <SidebarMayordomo />
      <main className="ml-28 min-h-[100dvh] p-10 w-full">
        {/* 🔹 Acciones superiores (ej: botón Volver) */}
        {accionesTop && <div className="mb-4">{accionesTop}</div>}

        {/* 🔹 Encabezado unificado */}
        <div className="flex justify-between items-center mb-8">
          {titulo && (
            <h1 className="text-3xl font-bold text-green-700">{titulo}</h1>
          )}
          {finca && (
            <span className="text-3xl font-bold text-green-700">
              {finca.nombre}
            </span>
          )}
        </div>

        {children}
      </main>
    </div>
  );
};

export default LayoutMayordomo;
