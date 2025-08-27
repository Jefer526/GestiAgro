// src/pages/mayordomo/Detalle_mantenimientom.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IconChevronLeft } from "@tabler/icons-react";
import LayoutMayordomo from "../../layouts/LayoutMayordomo";
import { equiposApi, mantenimientosApi } from "../../services/apiClient";

const Detalle_mantenimientom = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // id del mantenimiento en la URL

  const [loading, setLoading] = useState(true);
  const [mantenimiento, setMantenimiento] = useState(null);
  const [maquina, setMaquina] = useState(null);

  // 📌 Cargar mantenimiento + máquina asociada
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resMant = await mantenimientosApi.get(id);
        setMantenimiento(resMant.data);

        if (resMant.data.maquina) {
          const resMaq = await equiposApi.get(resMant.data.maquina);
          setMaquina(resMaq.data);
        }
      } catch (err) {
        console.error("❌ Error al cargar mantenimiento:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <LayoutMayordomo>
        <p>Cargando detalle del mantenimiento...</p>
      </LayoutMayordomo>
    );
  }

  if (!mantenimiento || !maquina) {
    return (
      <LayoutMayordomo>
        <p>No se encontró el detalle del mantenimiento.</p>
      </LayoutMayordomo>
    );
  }

  // --- Capitalizar tipo ---
  const tipo = mantenimiento.tipo
    ? mantenimiento.tipo.charAt(0).toUpperCase() +
      mantenimiento.tipo.slice(1).toLowerCase()
    : "—";

  return (
    <LayoutMayordomo active="/equipos_mayordomo">
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
          Detalle de Mantenimiento
        </h1>

        <div className="space-y-5 text-lg">
          <p>
            <strong>Código equipo:</strong> {maquina.codigo_equipo}
          </p>
          <p>
            <strong>Máquina:</strong> {maquina.maquina}
          </p>
          <p>
            <strong>Referencia:</strong> {maquina.referencia}
          </p>
          <p>
            <strong>Ubicación:</strong> {maquina.ubicacion_nombre}
          </p>
          <p>
            <strong>Estado actual:</strong> {maquina.estado}
          </p>
          <hr className="my-4" />
          <p>
            <strong>Fecha del mantenimiento:</strong> {mantenimiento.fecha}
          </p>
          <p>
            <strong>Tipo de mantenimiento:</strong> {tipo}
          </p>
          <div>
            <strong>Descripción:</strong>
            <p className="mt-2 text-justify">{mantenimiento.descripcion}</p>
          </div>
          <p>
            <strong>Realizado por:</strong> {mantenimiento.realizado_por}
          </p>
        </div>
      </div>
    </LayoutMayordomo>
  );
};

export default Detalle_mantenimientom;
