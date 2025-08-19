// src/pages/mayordomo/Historial_trabajom.jsx
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  IconChevronLeft,
  IconFilter,
  IconSortAscending2,
  IconSortDescending2,
} from "@tabler/icons-react";
import LayoutMayordomo from "../../layouts/LayoutMayordomo";

const Historial_trabajom = () => {
  const navigate = useNavigate();
  const filtroRef = useRef(null);

  // Datos generales
  const infoGeneral = {
    codigo: 1,
    maquina: "Tractor",
    referencia: "JD 5055",
    ubicacion: "La Esmeralda",
    estado: "Óptimo",
  };

  // Datos del historial
  const historial = [
    { fecha: "2025-06-15", labor: "Siembra", "horas trabajadas": "6 horas", "horas maquina": "4 horas", observaciones: "Se limpió lote 2, clima nublado" },
    { fecha: "2025-06-15", labor: "Desyerba guadaña", "horas trabajadas": "8 horas", "horas maquina": "3 horas", observaciones: "Cuchilla se atascó temporalmente. Se solucionó" },
    { fecha: "2025-06-15", labor: "Recolección", "horas trabajadas": "4 horas", "horas maquina": "1 hora", observaciones: "Trabajo en área común. Máquina en estado óptimo" },
  ];

  const columnas = ["fecha", "labor", "horas trabajadas", "horas maquina", "observaciones"];

  // Estados
  const [filtroActivo, setFiltroActivo] = useState(null);
  const [filtroPosicion, setFiltroPosicion] = useState({ top: 0, left: 0 });
  const [valoresSeleccionados, setValoresSeleccionados] = useState({});
  const [busquedas, setBusquedas] = useState({});
  const [ordenCampo, setOrdenCampo] = useState(null);

  // Obtener valores únicos para filtros
  const getValoresUnicos = (campo) => {
    if (campo === "fecha" || campo === "observaciones") return [];
    const search = (busquedas[campo] || "").toLowerCase();
    return [...new Set(historial.map((e) => e[campo]))].filter((v) =>
      v.toLowerCase().includes(search)
    );
  };

  // Toggle filtro
  const toggleFiltro = (campo, e) => {
    if (campo === "observaciones") return;
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
    setValoresSeleccionados({ ...valoresSeleccionados, [campo]: [...seleccionados] });
  };

  const limpiarFiltro = (campo) => {
    const actualizado = { ...valoresSeleccionados };
    delete actualizado[campo];
    setValoresSeleccionados(actualizado);
  };

  // Ordenamiento
  const ordenar = (campo, orden) => setOrdenCampo({ campo, orden });

  // Búsqueda
  const handleBusqueda = (campo, texto) => {
    setBusquedas({ ...busquedas, [campo]: texto });
  };

  // Filtrado y ordenado
  const historialFiltrado = historial
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
        ? a[campo].localeCompare(b[campo])
        : b[campo].localeCompare(a[campo]);
    });

  // Cerrar filtro al hacer click afuera
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
    <LayoutMayordomo>
      {/* Volver */}
      <button
        onClick={() => navigate("/equipos_mayordomo")}
        className="flex items-center text-green-700 font-semibold mb-4 text-lg hover:underline"
      >
        <IconChevronLeft className="w-6 h-6 mr-1" /> Volver
      </button>

      {/* Título */}
      <h1 className="text-3xl font-bold text-green-700 mb-6">Historial de trabajo</h1>

      {/* Info general */}
      <div className="bg-white border border-gray-300 p-6 rounded-xl mb-6 max-w-4xl shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-green-700">Información general</h2>
        <div className="grid grid-cols-2 gap-x-12 gap-y-2 text-lg">
          <p><strong>Código Equipo:</strong> {infoGeneral.codigo}</p>
          <p><strong>Ubicación:</strong> {infoGeneral.ubicacion}</p>
          <p><strong>Máquina:</strong> {infoGeneral.maquina}</p>
          <p><strong>Estado:</strong> {infoGeneral.estado}</p>
          <p><strong>Referencia:</strong> {infoGeneral.referencia}</p>
        </div>
      </div>

      {/* Tabla */}
      <div className="bg-white border border-gray-300 rounded-xl shadow-md overflow-x-auto relative">
        <table className="w-full text-base text-center">
          <thead className="bg-green-600 text-white">
            <tr>
              {columnas.map((col, idx) => (
                <th key={idx} className="px-4 py-4 font-bold border">
                  <div className="flex justify-center items-center gap-2">
                    <span className="uppercase">{col}</span>
                    {col !== "observaciones" && (
                      <button onClick={(e) => toggleFiltro(col, e)}>
                        <IconFilter className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {historialFiltrado.map((item, i) => (
              <tr key={i} className="border-t hover:bg-gray-50 transition">
                {columnas.map((campo, j) => (
                  <td key={j} className="px-6 py-4 border border-gray-200">{item[campo]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Filtros dinámicos */}
        {filtroActivo && (
          filtroActivo === "fecha" ? (
            <div
              ref={filtroRef}
              className="fixed bg-white text-black shadow-md border rounded z-50 p-3 w-60 text-left text-sm"
              style={{ top: filtroPosicion.top, left: filtroPosicion.left }}
            >
              <div className="font-semibold mb-2">Filtrar por Fecha</div>
              {Object.entries(
                historial.reduce((acc, { fecha }) => {
                  const [year, month, day] = fecha.split("-");
                  const monthName = new Date(fecha).toLocaleString("default", { month: "long" });
                  acc[year] = acc[year] || {};
                  acc[year][monthName] = acc[year][monthName] || new Set();
                  acc[year][monthName].add(day);
                  return acc;
                }, {})
              ).map(([year, months]) => (
                <div key={year} className="mb-2">
                  <div className="font-medium">{year}</div>
                  {Object.entries(months).map(([month, days]) => (
                    <div key={month} className="ml-4">
                      <div className="font-medium">{month}</div>
                      {[...days].map((day) => {
                        const monthNum = new Date(`${month} 1`).getMonth() + 1;
                        const fullDate = `${year}-${String(monthNum).padStart(2, "0")}-${day}`;
                        return (
                          <label key={day} className="ml-6 flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={(valoresSeleccionados["fecha"] || []).includes(fullDate)}
                              onChange={() => toggleValor("fecha", fullDate)}
                              className="accent-green-600"
                            />
                            {day}
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
                    {val.charAt(0).toUpperCase() + val.slice(1)}
                  </label>
                ))}
              </div>
              <button
                onClick={() => limpiarFiltro(filtroActivo)}
                className="text-blue-600 hover:underline text-xs mt-2"
              >
                borrar filtro
              </button>
            </div>
          )
        )}
      </div>

      {/* Botón Descargar */}
      <div className="flex justify-center gap-10 mt-10">
        <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold text-lg">
          Descargar PDF
        </button>
      </div>
    </LayoutMayordomo>
  );
};

export default Historial_trabajom;

