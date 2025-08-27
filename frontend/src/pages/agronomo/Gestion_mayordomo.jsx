// src/pages/agronomo/Gestion_mayordomos.jsx
import React, { useState, useRef, useEffect } from "react";
import {
  IconUserCog,
  IconFilter,
  IconSortAscending2,
  IconSortDescending2,
  IconCheck,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import LayoutAgronomo from "../../layouts/LayoutAgronomo";
import api from "../../services/apiClient";

const Gestion_mayordomos = () => {
  const navigate = useNavigate();
  const filtroRef = useRef(null);

  const [usuarios, setUsuarios] = useState([]);
  const [fincas, setFincas] = useState([]);
  const [seleccionPendiente, setSeleccionPendiente] = useState({});
  const [mensaje, setMensaje] = useState(null); // 👈 alerta de confirmación

  // --- Filtros y orden ---
  const [filtroActivo, setFiltroActivo] = useState(null);
  const [filtroPosicion, setFiltroPosicion] = useState({ top: 0, left: 0 });
  const [busquedas, setBusquedas] = useState({});
  const [valoresSeleccionados, setValoresSeleccionados] = useState({});
  const [ordenCampo, setOrdenCampo] = useState(null);

  const columnas = ["nombre", "rol", "estado", "fincaNombre", "telefono"];

  // 👉 Traer usuarios y fincas
  useEffect(() => {
    api
      .get("/api/accounts/users/")
      .then((res) => {
        const soloMayordomos = res.data.filter((u) => u.rol === "mayordomo");
        const normalizados = soloMayordomos.map((u) => ({
          ...u,
          estado: u.is_active ? "Activo" : "Inactivo",
          fincaNombre: u.finca_asignada?.nombre || "Sin finca",
          telefono: u.telefono || "-",
        }));
        setUsuarios(normalizados);
      })
      .catch((err) => console.error("❌ Error cargando usuarios:", err));

    api
      .get("/api/fincas/")
      .then((res) => setFincas(res.data))
      .catch((err) => console.error("❌ Error cargando fincas:", err));
  }, []);

  const getEstadoColor = (estado) => {
    switch (estado?.toLowerCase()) {
      case "activo":
        return "bg-green-200 text-green-800 font-semibold px-2 py-1 rounded";
      case "inactivo":
        return "bg-gray-200 text-gray-700 font-semibold px-2 py-1 rounded";
      default:
        return "";
    }
  };

  // 👉 Confirmar asignación
  const handleAsignarFinca = (usuarioId) => {
    const fincaId = seleccionPendiente[usuarioId];
    if (!fincaId) return;

    api
      .patch(`/api/accounts/users/${usuarioId}/`, {
        finca_asignada: parseInt(fincaId, 10),
      })
      .then((res) => {
        setUsuarios((prev) =>
          prev.map((u) =>
            u.id === usuarioId
              ? {
                  ...u,
                  finca_asignada: res.data.finca_asignada,
                  fincaNombre: res.data.finca_asignada?.nombre || "Sin finca",
                }
              : u
          )
        );
        setSeleccionPendiente((prev) => ({ ...prev, [usuarioId]: "" }));

        // ✅ Mensaje de éxito
        setMensaje(`Finca asignada a ${res.data.nombre}`);
        setTimeout(() => setMensaje(null), 3000);
      })
      .catch((err) => console.error("❌ Error asignando finca:", err));
  };

  // === 🔎 Filtros ===
  const getValoresUnicos = (campo) => {
    const search = (busquedas[campo] || "").toLowerCase();
    return [...new Set(usuarios.map((u) => String(u[campo] || "")))].filter(
      (v) => v.toLowerCase().includes(search)
    );
  };

  const toggleFiltro = (campo, e) => {
    const icono = e.currentTarget.getBoundingClientRect();
    setFiltroActivo(filtroActivo === campo ? null : campo);
    setFiltroPosicion({
      top: icono.bottom + window.scrollY + 4,
      left: icono.left + window.scrollX,
    });
  };

  const toggleValor = (campo, valor) => {
    const seleccionados = new Set(valoresSeleccionados[campo] || []);
    seleccionados.has(valor)
      ? seleccionados.delete(valor)
      : seleccionados.add(valor);
    setValoresSeleccionados({
      ...valoresSeleccionados,
      [campo]: [...seleccionados],
    });
  };

  const limpiarFiltro = (campo) => {
    const actualizado = { ...valoresSeleccionados };
    delete actualizado[campo];
    setValoresSeleccionados(actualizado);
  };

  const ordenar = (campo, orden) => setOrdenCampo({ campo, orden });

  const handleBusqueda = (campo, texto) =>
    setBusquedas({ ...busquedas, [campo]: texto });

  // === 🔎 Filtrar y ordenar ===
  const usuariosFiltrados = usuarios
    .filter((u) =>
      columnas.every((campo) => {
        const seleccionados = valoresSeleccionados[campo] || [];
        if (seleccionados.length === 0) return true;
        return seleccionados.includes(String(u[campo]));
      })
    )
    .sort((a, b) => {
      if (!ordenCampo) return 0;
      const { campo, orden } = ordenCampo;
      const valA = a[campo];
      const valB = b[campo];
      return orden === "asc"
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA));
    });

  // === Cerrar filtro al hacer click fuera ===
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (filtroRef.current && !filtroRef.current.contains(e.target)) {
        setFiltroActivo(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <LayoutAgronomo>
      {/* Encabezado */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-green-700">
          Gestión de Mayordomos
        </h1>
        <button
          onClick={() => navigate("/manejopersonal")}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 font-semibold shadow"
        >
          <IconUserCog className="w-5 h-5" />
          Volver a personal
        </button>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="min-w-full text-center text-base bg-white">
          <thead className="bg-green-600 text-white font-bold">
            <tr>
              {columnas.map((campo) => (
                <th key={campo} className="p-4 border text-center">
                  <div className="flex items-center justify-center gap-2">
                    {campo === "nombre"
                      ? "NOMBRE"
                      : campo === "fincaNombre"
                      ? "FINCA"
                      : campo === "telefono"
                      ? "TELÉFONO"
                      : campo.toUpperCase()}
                    <button onClick={(e) => toggleFiltro(campo, e)}>
                      <IconFilter className="w-4 h-4" />
                    </button>
                  </div>
                </th>
              ))}
              <th className="p-4 border">Acción</th>
            </tr>
          </thead>
          <tbody>
            {usuariosFiltrados.map((u) => (
              <tr key={u.id} className="hover:bg-gray-100">
                <td className="p-4 border">{u.nombre}</td>
                <td className="p-4 border capitalize">{u.rol}</td>
                <td className="p-4 border">
                  <span className={getEstadoColor(u.estado)}>{u.estado}</span>
                </td>
                <td className="p-4 border">
                  <select
                    value={seleccionPendiente[u.id] ?? u.finca_asignada?.id ?? ""}
                    onChange={(e) =>
                      setSeleccionPendiente({
                        ...seleccionPendiente,
                        [u.id]: e.target.value,
                      })
                    }
                    className="border rounded px-2 py-1"
                  >
                    <option value="">-- Seleccionar finca --</option>
                    {fincas.map((f) => (
                      <option key={f.id} value={f.id}>
                        {f.nombre}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="p-4 border">{u.telefono}</td>
                <td className="p-4 border text-center">
                  <button
                    onClick={() => handleAsignarFinca(u.id)}
                    className="flex items-center justify-center gap-1 bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 transition mx-auto"
                  >
                    <IconCheck className="w-4 h-4" /> Asignar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ Mensaje de confirmación */}
      {mensaje && (
        <div className="mt-4 p-3 text-green-800 bg-green-100 border border-green-300 rounded-lg shadow text-center font-medium">
          {mensaje}
        </div>
      )}
    </LayoutAgronomo>
  );
};

export default Gestion_mayordomos;
