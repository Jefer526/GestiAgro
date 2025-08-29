// src/pages/agronomo/Labores_agro.jsx
import React, { useState, useRef, useEffect } from "react";
import {
  IconFilter,
  IconSortAscending2,
  IconSortDescending2,
} from "@tabler/icons-react";
import LayoutAgronomo from "../../layouts/LayoutAgronomo";

// ✅ API
import { programacionLaboresApi } from "../../services/apiClient";

const Labores_agro = () => {
  const filtroRef = useRef(null);

  // 📌 Estados de filtros
  const [filtroActivo, setFiltroActivo] = useState(null);
  const [filtroPosicion, setFiltroPosicion] = useState({ top: 0, left: 0 });
  const [valoresSeleccionados, setValoresSeleccionados] = useState({});
  const [ordenCampo, setOrdenCampo] = useState(null);
  const [busquedas, setBusquedas] = useState({});

  // 📌 Datos desde backend
  const [labores, setLabores] = useState([]);

  // === Cargar labores desde backend ===
  useEffect(() => {
    const cargarLabores = async () => {
      try {
        const res = await programacionLaboresApi.list();
        setLabores(res.data);
      } catch (err) {
        console.error("❌ Error cargando labores:", err);
        alert("Hubo un error cargando las labores.");
      }
    };
    cargarLabores();
  }, []);

  const campos = ["semana", "finca_nombre", "labor", "lote_nombre", "estado"];

  // === Filtros ===
  const getValoresUnicos = (campo) => {
    const search = (busquedas[campo] || "").toLowerCase();
    return [...new Set(labores.map((d) => String(d[campo] || "")))].filter((v) =>
      v.toLowerCase().includes(search)
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
    seleccionados.has(valor) ? seleccionados.delete(valor) : seleccionados.add(valor);
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

  // === Aplicar filtros y orden ===
  const laboresFiltradas = labores
    .filter((d) =>
      campos.every((campo) => {
        const seleccionados = valoresSeleccionados[campo] || [];
        if (seleccionados.length === 0) return true;
        return seleccionados.includes(String(d[campo]));
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

  // === Cerrar filtros al hacer click fuera ===
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (filtroRef.current && !filtroRef.current.contains(e.target)) {
        setFiltroActivo(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // === Colores dinámicos de estado ===
  const getEstadoClass = (estado) => {
    switch (estado) {
      case "Iniciada":
        return "bg-blue-100 text-blue-700";
      case "En Proceso":
        return "bg-yellow-100 text-yellow-700";
      case "Terminada":
        return "bg-green-100 text-green-700";
      case "Cancelada":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <LayoutAgronomo>
      {/* ✅ Título */}
      <h1 className="text-3xl font-bold text-green-700 mb-6">
        Seguimiento de Labores
      </h1>

      {/* 📌 Tabla */}
      <div className="overflow-x-auto rounded-lg shadow-lg bg-white">
        <table className="min-w-full text-center text-base bg-white">
          <thead className="bg-green-600 text-white font-bold">
            <tr>
              {campos.map((campo) => (
                <th key={campo} className="p-4 border text-center uppercase">
                  <div className="flex items-center justify-center gap-2">
                    {campo.replace("_nombre", "")}
                    <button onClick={(e) => toggleFiltro(campo, e)}>
                      <IconFilter className="w-4 h-4" />
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {laboresFiltradas.map((l, i) => (
              <tr key={i} className="hover:bg-gray-100">
                <td className="p-4 border">{l.semana}</td>
                <td className="p-4 border">{l.finca_nombre}</td>
                <td className="p-4 border">{l.labor}</td>
                <td className="p-4 border">{l.lote_nombre}</td>

                {/* ✅ Estado solo lectura con badge */}
                <td className="p-4 border">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getEstadoClass(
                      l.estado
                    )}`}
                  >
                    {l.estado}
                  </span>
                </td>
              </tr>
            ))}
            {laboresFiltradas.length === 0 && (
              <tr>
                <td colSpan={5} className="p-6 text-gray-500 text-center">
                  Sin registros
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 📌 Filtro flotante */}
      {filtroActivo && (
        <div
          ref={filtroRef}
          className="fixed bg-white text-black shadow-md border rounded z-50 p-3 w-60"
          style={{ top: filtroPosicion.top, left: filtroPosicion.left }}
        >
          <div className="font-semibold mb-2">
            Filtrar por {filtroActivo.toUpperCase()}
          </div>
          <button
            onClick={() => ordenar(filtroActivo, "asc")}
            className="text-green-700 flex items-center gap-1 mb-1"
          >
            <IconSortAscending2 className="w-4 h-4" /> Ordenar A → Z
          </button>
          <button
            onClick={() => ordenar(filtroActivo, "desc")}
            className="text-green-700 flex items-center gap-1 mb-2"
          >
            <IconSortDescending2 className="w-4 h-4" /> Ordenar Z → A
          </button>
          <input
            type="text"
            placeholder="Buscar..."
            className="w-full border border-gray-300 px-2 py-1 rounded mb-2 text-sm"
            value={busquedas[filtroActivo] || ""}
            onChange={(e) => handleBusqueda(filtroActivo, e.target.value)}
          />
          <div className="flex flex-col max-h-40 overflow-y-auto">
            {getValoresUnicos(filtroActivo).map((val) => (
              <label key={val} className="flex items-center gap-2 mb-1">
                <input
                  type="checkbox"
                  checked={(valoresSeleccionados[filtroActivo] || []).includes(val)}
                  onChange={() => toggleValor(filtroActivo, val)}
                  className="accent-green-600"
                />
                {String(val)}
              </label>
            ))}
          </div>

          {/* Botones */}
          <div className="flex justify-between mt-3">
            <button
              onClick={() => limpiarFiltro(filtroActivo)}
              className="bg-gray-200 text-gray-700 px-3 py-1 rounded-md text-xs font-medium hover:bg-gray-300 transition"
            >
              Borrar
            </button>
            <button
              onClick={() => setFiltroActivo(null)}
              className="bg-green-600 text-white px-3 py-1 rounded-md text-xs font-medium hover:bg-green-700 transition"
            >
              Aceptar
            </button>
          </div>
        </div>
      )}
    </LayoutAgronomo>
  );
};

export default Labores_agro;
