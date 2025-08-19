// src/pages/mayordomo/Cuaderno_campo.jsx
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  IconPlus,
  IconEye,
  IconFilter,
  IconSortAscending2,
  IconSortDescending2,
} from "@tabler/icons-react";
import LayoutMayordomo from "../../layouts/LayoutMayordomo";

const Historial_cuadernoc = () => {
  const navigate = useNavigate();
  const filtroRef = useRef(null);

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

  // Columnas con filtro
  const columnas = ["fecha", "finca", "lote"];

  // Estados de filtros
  const [filtroActivo, setFiltroActivo] = useState(null);
  const [filtroPosicion, setFiltroPosicion] = useState({ top: 0, left: 0 });
  const [valoresSeleccionados, setValoresSeleccionados] = useState({});
  const [busquedas, setBusquedas] = useState({});
  const [ordenCampo, setOrdenCampo] = useState(null);

  // Cerrar popover si clic fuera
  useEffect(() => {
    const clickFuera = (e) => {
      if (filtroRef.current && !filtroRef.current.contains(e.target)) {
        setFiltroActivo(null);
      }
    };
    document.addEventListener("mousedown", clickFuera);
    return () => document.removeEventListener("mousedown", clickFuera);
  }, []);

  // Funciones de filtro/orden
  const getValoresUnicos = (campo) => {
    if (campo === "fecha") return [];
    const search = (busquedas[campo] || "").toLowerCase();
    return [...new Set(registros.map((e) => e[campo]))].filter((v) =>
      String(v).toLowerCase().includes(search)
    );
  };

  const toggleFiltro = (campo, e) => {
    const icono = e.currentTarget.getBoundingClientRect();
    const ancho = 260;
    let left = icono.left + window.scrollX;
    if (left + ancho > window.innerWidth) left = window.innerWidth - ancho - 10;
    setFiltroActivo(filtroActivo === campo ? null : campo);
    setFiltroPosicion({ top: icono.bottom + window.scrollY + 4, left });
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

  const ordenar = (campo, orden) => setOrdenCampo({ campo, orden });
  const handleBusqueda = (campo, texto) =>
    setBusquedas({ ...busquedas, [campo]: texto });

  const registrosFiltrados = registros
    .filter((item) =>
      columnas.every((campo) =>
        !valoresSeleccionados[campo] || valoresSeleccionados[campo].length === 0
          ? true
          : valoresSeleccionados[campo].includes(item[campo])
      )
    )
    .sort((a, b) => {
      if (!ordenCampo) return 0;
      const { campo, orden } = ordenCampo;
      return orden === "asc"
        ? String(a[campo]).localeCompare(String(b[campo]))
        : String(b[campo]).localeCompare(String(a[campo]));
    });

  return (
    <LayoutMayordomo>
      {/* ✅ Título */}
      <h1 className="text-3xl font-bold text-green-700 mb-6">
        Historial de Campo
      </h1>

      {/* ✅ Botón registro */}
      <div className="mb-6">
        <button
          onClick={() => navigate("/registro_campom")}
          className="bg-green-600 text-white px-5 py-2 rounded-md hover:bg-green-700 text-lg font-semibold flex items-center gap-2"
        >
          <IconPlus className="w-6 h-6" />
          Nuevo registro de campo
        </button>
      </div>

      {/* ✅ Tabla con filtros */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-auto relative">
        <table className="w-full text-base">
          <thead className="bg-green-600 text-white">
            <tr>
              {["fecha", "finca", "lote", "anotaciones", "acciones"].map((col, idx) => (
                <th key={idx} className="px-4 py-3 border text-center uppercase">
                  {columnas.includes(col) ? (
                    <div className="flex justify-center items-center gap-2">
                      <span>{col}</span>
                      <button onClick={(e) => toggleFiltro(col, e)}>
                        <IconFilter className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    col
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {registrosFiltrados.map((r, i) => (
              <tr
                key={i}
                className="border-b border-gray-200 text-center align-middle hover:bg-gray-50 transition"
              >
                <td className="px-4 py-2 border">{r.fecha}</td>
                <td className="px-4 py-2 border">{r.finca}</td>
                <td className="px-4 py-2 border">{r.lote}</td>
                <td className="px-4 py-2 border text-center">{r.anotaciones}</td>
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
            {registrosFiltrados.length === 0 && (
              <tr>
                <td colSpan={5} className="p-6 text-gray-500 text-center">
                  Sin registros
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* === Popover de filtros === */}
        {filtroActivo === "fecha" ? (
          <div
            ref={filtroRef}
            className="fixed bg-white text-black shadow-md border rounded z-50 p-3 w-60 text-left text-sm"
            style={{ top: filtroPosicion.top, left: filtroPosicion.left }}
          >
            <div className="font-semibold mb-2">Filtrar por Fecha</div>
            {Object.entries(
              registros.reduce((acc, { fecha }) => {
                const [year, month, day] = fecha.split("-");
                const monthName = new Date(fecha).toLocaleString("default", { month: "long" });
                acc[year] = acc[year] || {};
                acc[year][monthName] = acc[year][monthName] || { days: new Set(), monthNum: month };
                acc[year][monthName].days.add(day);
                return acc;
              }, {})
            ).map(([year, months]) => (
              <div key={year} className="mb-2">
                <div className="font-medium">{year}</div>
                {Object.entries(months).map(([monthName, info]) => (
                  <div key={monthName} className="ml-4">
                    <div className="font-medium">{monthName}</div>
                    {[...info.days].map((day) => {
                      const fullDate = `${year}-${String(info.monthNum).padStart(
                        2,
                        "0"
                      )}-${String(day).padStart(2, "0")}`;
                      return (
                        <label key={fullDate} className="ml-6 flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={(valoresSeleccionados["fecha"] || []).includes(fullDate)}
                            onChange={() => toggleValor("fecha", fullDate)}
                            className="accent-green-600"
                          />
                          {String(day).padStart(2, "0")}
                        </label>
                      );
                    })}
                  </div>
                ))}
              </div>
            ))}
            <button
              onClick={() => limpiarFiltro("fecha")}
              className="text-blue-600 hover:underline text-xs lowercase mt-2"
            >
              borrar filtro
            </button>
          </div>
        ) : (
          filtroActivo && (
            <div
              ref={filtroRef}
              className="fixed bg-white text-black shadow-md border rounded z-50 p-3 w-60 text-left text-sm"
              style={{ top: filtroPosicion.top, left: filtroPosicion.left }}
            >
              <div className="font-semibold mb-2">
                Filtrar por {filtroActivo.charAt(0).toUpperCase() + filtroActivo.slice(1)}
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
                {getValoresUnicos(filtroActivo).map((val, idx) => (
                  <label key={idx} className="flex items-center gap-2 mb-1">
                    <input
                      type="checkbox"
                      checked={(valoresSeleccionados[filtroActivo] || []).includes(val)}
                      onChange={() => toggleValor(filtroActivo, val)}
                      className="accent-green-600"
                    />
                    {val}
                  </label>
                ))}
              </div>
              <button
                onClick={() => limpiarFiltro(filtroActivo)}
                className="text-blue-600 hover:underline text-xs mt-2"
              >
                Borrar filtro
              </button>
            </div>
          )
        )}
      </div>
    </LayoutMayordomo>
  );
};

export default Historial_cuadernoc;

