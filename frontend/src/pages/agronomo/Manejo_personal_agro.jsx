// src/pages/agronomo/Manejo_personal_agro.jsx
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  IconFilter,
  IconSortAscending2,
  IconSortDescending2,
} from "@tabler/icons-react";
import LayoutAgronomo from "../../layouts/LayoutAgronomo";

const Manejo_personal_agro = () => {
  const navigate = useNavigate();
  const filtroRef = useRef(null);

  // --- Estado de filtros ---
  const columnas = ["id", "nombre", "cargo", "estado", "finca", "telefono"];
  const [filtroActivo, setFiltroActivo] = useState(null);
  const [filtroPosicion, setFiltroPosicion] = useState({ top: 0, left: 0 });
  const [busquedas, setBusquedas] = useState({});
  const [valoresSeleccionados, setValoresSeleccionados] = useState({});
  const [ordenCampo, setOrdenCampo] = useState(null);

  // Tamaño del panel de filtro
  const PANEL_W = 240;
  const PANEL_H = 320;

  // --- Datos de empleados (mock) ---
  const empleados = [
    { id: "01", nombre: "Juan Pérez", cargo: "Gerente", estado: "Activo", telefono: "3124567890", finca: "La Esmeralda", acceso: "Completo" },
    { id: "02", nombre: "Pedro Ramírez", cargo: "Ing Agrónomo", estado: "Activo", telefono: "3201112233", finca: "La Carolina", acceso: "Limitado" },
    { id: "03", nombre: "Ana González", cargo: "Mayordomo", estado: "Inactivo", telefono: "3119876543", finca: "Las Palmas", acceso: "Sin acceso" },
    { id: "04", nombre: "María Rojas", cargo: "Operario de campo", estado: "Activo", telefono: "3188888888", finca: "La Carolina", acceso: "Limitado" },
  ];

  // --- Obtiene valores únicos para filtros ---
  const getValoresUnicos = (campo) => {
    const search = (busquedas[campo] || "").toLowerCase();
    return [...new Set(empleados.map(e => e[campo]?.toString()))].filter(v =>
      v.toLowerCase().includes(search)
    );
  };

  // --- Abrir/cerrar filtro en posición calculada ---
  const toggleFiltro = (campo, e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const scrollX = window.scrollX || window.pageXOffset;
    const scrollY = window.scrollY || window.pageYOffset;

    let top = r.bottom + scrollY + 4;
    let left = r.left + scrollX;

    const maxLeft = window.innerWidth - PANEL_W - 8 + scrollX;
    if (left > maxLeft) left = Math.max(8 + scrollX, maxLeft);

    const maxTop = window.innerHeight - PANEL_H - 8 + scrollY;
    if (top > maxTop) top = r.top + scrollY - PANEL_H - 8;

    setFiltroActivo(filtroActivo === campo ? null : campo);
    setFiltroPosicion({ top, left });
  };

  const toggleValor = (campo, valor) => {
    const seleccionados = new Set(valoresSeleccionados[campo] || []);
    seleccionados.has(valor) ? seleccionados.delete(valor) : seleccionados.add(valor);
    setValoresSeleccionados({ ...valoresSeleccionados, [campo]: [...seleccionados] });
  };

  const limpiarFiltro = (campo) => {
    const actualizado = { ...valoresSeleccionados };
    delete actualizado[campo];
    setValoresSeleccionados(actualizado);
  };

  const ordenar = (campo, orden) => {
    setOrdenCampo({ campo, orden });
  };

  const handleBusqueda = (campo, texto) => {
    setBusquedas({ ...busquedas, [campo]: texto });
  };

  // --- Filtrado y orden ---
  const datosFiltrados = empleados
    .filter(item =>
      columnas.every(campo =>
        !valoresSeleccionados[campo] || valoresSeleccionados[campo].length === 0
          ? true
          : valoresSeleccionados[campo].includes(item[campo]?.toString())
      )
    )
    .sort((a, b) => {
      if (!ordenCampo) return 0;
      const { campo, orden } = ordenCampo;
      return orden === "asc"
        ? a[campo]?.toString().localeCompare(b[campo]?.toString())
        : b[campo]?.toString().localeCompare(a[campo]?.toString());
    });

  // --- Cierra panel de filtro al hacer clic fuera ---
  useEffect(() => {
    const clickFuera = (e) => {
      if (filtroRef.current && !filtroRef.current.contains(e.target)) {
        setFiltroActivo(null);
      }
    };
    document.addEventListener("mousedown", clickFuera);
    return () => document.removeEventListener("mousedown", clickFuera);
  }, []);

  return (
    <LayoutAgronomo active="/manejopersonal">
      <div className="p-10 overflow-auto">
        <h1 className="text-3xl font-bold text-green-600 mb-6">Manejo personal</h1>

        {/* Tabla de empleados */}
        <div className="overflow-x-auto rounded-lg shadow-lg relative">
          <table className="min-w-full text-base bg-white text-center">
            <thead className="bg-green-600 text-white font-bold">
              <tr>
                {columnas.map((col, idx) => (
                  <th key={idx} className="p-4 border">
                    <div className="flex items-center justify-center gap-2">
                      <span>{col === "telefono" ? "TELÉFONO" : col.toUpperCase()}</span>
                      <button onClick={(e) => toggleFiltro(col, e)}>
                        <IconFilter className="w-4 h-4" />
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {datosFiltrados.map((e, idx) => (
                <tr key={idx} className="hover:bg-gray-100">
                  <td className="p-4 border">{e.id}</td>
                  <td className="p-4 border">{e.nombre}</td>
                  <td className="p-4 border">{e.cargo}</td>
                  <td className="p-4 border">{e.estado}</td>
                  <td className="p-4 border">{e.finca}</td>
                  <td className="p-4 border">{e.telefono}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Panel de filtros */}
          {filtroActivo && (
            <div
              ref={filtroRef}
              className="fixed bg-white text-black shadow-md border rounded z-50 p-3 text-left text-sm"
              style={{ top: filtroPosicion.top, left: filtroPosicion.left, width: PANEL_W }}
            >
              <div className="font-semibold mb-2">
                Filtrar por {filtroActivo.charAt(0).toUpperCase() + filtroActivo.slice(1)}
              </div>
              <button onClick={() => ordenar(filtroActivo, "asc")} className="text-green-700 flex items-center gap-1 mb-1 capitalize">
                <IconSortAscending2 className="w-4 h-4" /> Ordenar A → Z
              </button>
              <button onClick={() => ordenar(filtroActivo, "desc")} className="text-green-700 flex items-center gap-1 mb-2 capitalize">
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
                {getValoresUnicos(filtroActivo).map((val, idx) => (
                  <label key={idx} className="flex items-center gap-2 mb-1 capitalize">
                    <input
                      type="checkbox"
                      checked={(valoresSeleccionados[filtroActivo] || []).includes(val)}
                      onChange={() => toggleValor(filtroActivo, val)}
                      className="accent-green-600"
                    />
                    {val.charAt(0).toUpperCase() + val.slice(1)}
                  </label>
                ))}
              </div>
              <button onClick={() => limpiarFiltro(filtroActivo)} className="text-blue-600 hover:underline text-xs capitalize mt-2">
                Borrar filtro
              </button>
            </div>
          )}
        </div>

        {/* Botones de acciones */}
        <div className="flex justify-center gap-8 mt-8">
          <button onClick={() => navigate("/registrarempleado")} className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 text-lg font-semibold">
            Registrar empleado
          </button>
          <button onClick={() => navigate("/editarempleado")} className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 text-lg font-semibold">
            Editar empleado
          </button>
          <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 text-lg font-semibold">
            Exportar
          </button>
        </div>
      </div>
    </LayoutAgronomo>
  );
};

export default Manejo_personal_agro;
