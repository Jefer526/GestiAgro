import React, { useState, useRef, useEffect } from "react";
import {
  IconFilter,
  IconSortAscending2,
  IconSortDescending2,
} from "@tabler/icons-react";
import LayoutMayordomo from "../../layouts/LayoutMayordomo";
import { programacionLaboresApi } from "../../services/apiClient";

const Seguimiento_laboresm = () => {
  const filtroRef = useRef(null);

  // Estados
  const [labores, setLabores] = useState([]);
  const [filtroActivo, setFiltroActivo] = useState(null);
  const [filtroPosicion, setFiltroPosicion] = useState({ top: 0, left: 0 });
  const [valoresSeleccionados, setValoresSeleccionados] = useState({});
  const [ordenCampo, setOrdenCampo] = useState(null);
  const [busquedas, setBusquedas] = useState({});

  const campos = ["semana", "finca_nombre", "labor", "lote_nombre", "estado"];

  // === Cargar datos del backend ===
  useEffect(() => {
    const fetchLabores = async () => {
      try {
        const res = await programacionLaboresApi.list();
        setLabores(res.data);
      } catch (err) {
        console.error("❌ Error cargando labores:", err);
      }
    };
    fetchLabores();
  }, []);

  // === Actualizar estado de una labor ===
  const handleEstadoChange = async (index, nuevoEstado) => {
    const nuevasLabores = [...labores];
    const laborEditada = nuevasLabores[index];
    laborEditada.estado = nuevoEstado;
    setLabores(nuevasLabores);

    try {
      await programacionLaboresApi.update(laborEditada.id, { estado: nuevoEstado });
    } catch (err) {
      console.error("❌ Error actualizando estado:", err.response?.data || err);
      alert("No se pudo actualizar el estado");
    }
  };

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

  // === Colores dinámicos por estado ===
  const getEstadoClass = (estado) => {
    switch (estado) {
      case "Iniciada":
        return "text-blue-700 bg-blue-50 border-blue-400";
      case "En Proceso":
        return "text-yellow-700 bg-yellow-50 border-yellow-400";
      case "Terminada":
        return "text-green-700 bg-green-50 border-green-400";
      case "Cancelada":
        return "text-red-700 bg-red-50 border-red-400";
      default:
        return "text-gray-700 bg-gray-50 border-gray-300";
    }
  };

  return (
    <LayoutMayordomo titulo="Seguimiento de Labores">
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
                <td className="p-4 border">
                  <select
                    value={l.estado}
                    onChange={(e) => handleEstadoChange(i, e.target.value)}
                    className={`border rounded-lg px-3 py-1 text-sm font-medium focus:outline-none focus:ring-2 transition ${getEstadoClass(
                      l.estado
                    )}`}
                  >
                    <option value="Iniciada">Iniciada</option>
                    <option value="En Proceso">En Proceso</option>
                    <option value="Terminada">Terminada</option>
                    <option value="Cancelada">Cancelada</option>
                  </select>
                </td>
              </tr>
            ))}
            {laboresFiltradas.length === 0 && (
              <tr>
                <td colSpan={5} className="p-6 text-gray-500 text-center">
                  Cargando ...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* === Filtro flotante === */}
      {filtroActivo && (
        <div
          ref={filtroRef}
          className="fixed bg-white text-black shadow-md border rounded z-50 p-3 w-60"
          style={{ top: filtroPosicion.top, left: filtroPosicion.left }}
        >
          <div className="font-semibold mb-2">
            Filtrar por {filtroActivo.replace("_nombre", "").toUpperCase()}
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

          {/* Botones Borrar / Aceptar */}
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
    </LayoutMayordomo>
  );
};

export default Seguimiento_laboresm;
