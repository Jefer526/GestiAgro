import React, { useState, useRef, useEffect } from "react";
import {
  IconFilter,
  IconSortAscending2,
  IconSortDescending2,
  IconPencil,
  IconUserCog,
  IconPlus,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import LayoutAgronomo from "../../layouts/LayoutAgronomo";
import api from "../../services/apiClient";

const Manejo_personal_agro = () => {
  const navigate = useNavigate();
  const filtroRef = useRef(null);

  const [trabajadores, setTrabajadores] = useState([]);
  const [filtroActivo, setFiltroActivo] = useState(null);
  const [filtroPosicion, setFiltroPosicion] = useState({ top: 0, left: 0 });
  const [busquedas, setBusquedas] = useState({});
  const [valoresSeleccionados, setValoresSeleccionados] = useState({});
  const [ordenCampo, setOrdenCampo] = useState(null);

  const columnas = ["codigo", "nombre completo", "cargo", "estado", "finca_nombre", "telefono"];

  useEffect(() => {
    api
      .get("/api/trabajadores/")
      .then((res) => setTrabajadores(res.data))
      .catch((err) => console.error("❌ Error cargando trabajadores:", err));
  }, []);

  const getEstadoColor = (estado) => {
    switch (estado?.toLowerCase()) {
      case "activo":
        return "bg-green-200 text-green-800 font-semibold px-2 py-1 rounded";
      case "inactivo":
        return "bg-gray-200 text-gray-700 font-semibold px-2 py-1 rounded";
      case "vacaciones":
        return "bg-yellow-200 text-yellow-800 font-semibold px-2 py-1 rounded";
      case "suspendido":
        return "bg-red-200 text-red-800 font-semibold px-2 py-1 rounded";
      default:
        return "";
    }
  };

  const capitalize = (text) =>
    text ? text.charAt(0).toUpperCase() + text.slice(1) : "";

  // === Filtros ===
  const getValoresUnicos = (campo) => {
    const search = (busquedas[campo] || "").toLowerCase();
    return [...new Set(trabajadores.map((t) => String(t[campo] || "")))].filter(
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

  // === Filtrar y ordenar ===
  const trabajadoresFiltrados = trabajadores
    .filter((t) =>
      columnas.every((campo) => {
        const seleccionados = valoresSeleccionados[campo] || [];
        if (seleccionados.length === 0) return true;
        return seleccionados.includes(String(t[campo]));
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

  // === Cerrar filtro ===
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
      {/* Título */}
      <h1 className="text-3xl font-bold text-green-700 mb-4">Manejo Personal</h1>

      {/* Botones */}
      <div className="flex justify-end gap-4 mb-6">
        <button
          onClick={() => navigate("/registrarempleado")}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 font-semibold shadow"
        >
          <IconPlus className="w-5 h-5" />
          Registrar empleado
        </button>
        <button
          onClick={() => navigate("/gestionmayordomo")}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 font-semibold shadow"
        >
          <IconUserCog className="w-5 h-5" />
          Gestionar mayordomo
        </button>
      </div>

      {/* === Tabla === */}
      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="min-w-full text-center text-base bg-white">
          <thead className="bg-green-600 text-white font-bold">
            <tr>
              {columnas.map((campo) => (
                <th key={campo} className="p-4 border text-center">
                  <div className="flex items-center justify-center gap-2">
                    {campo === "codigo"
                      ? "CÓDIGO EMPLEADO"
                      : campo === "finca_nombre"
                      ? "FINCA"
                      : campo.toUpperCase()}
                    <button onClick={(e) => toggleFiltro(campo, e)}>
                      <IconFilter className="w-4 h-4" />
                    </button>
                  </div>
                </th>
              ))}
              <th className="p-4 border">OPCIONES</th>
            </tr>
          </thead>
          <tbody>
            {trabajadoresFiltrados.map((emp) => (
              <tr key={emp.id} className="hover:bg-gray-100">
                <td className="p-4 border">{emp.codigo}</td>
                <td className="p-4 border">{emp.nombre}</td>
                <td className="p-4 border">{emp.cargo}</td>
                <td className="p-4 border">
                  <span className={getEstadoColor(emp.estado)}>
                    {capitalize(emp.estado)}
                  </span>
                </td>
                <td className="p-4 border">{emp.finca_nombre}</td>
                <td className="p-4 border">{emp.telefono}</td>
                <td className="p-4 border">
                  <div className="flex justify-center">
                    <button
                      onClick={() => navigate(`/editarempleado/${emp.id}`)}
                      className="text-blue-600 hover:underline flex items-center gap-1"
                    >
                      <IconPencil className="w-4 h-4" /> Editar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
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
    </LayoutAgronomo>
  );
};

export default Manejo_personal_agro;
