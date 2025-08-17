// src/pages/agronomo/Historial_labores.jsx
import React, { useState, useRef, useEffect } from "react";
import {
  IconChevronLeft,
  IconFilter,
  IconSortAscending2,
  IconSortDescending2,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import LayoutAgronomo from "../../layouts/LayoutAgronomo";

const Historial_labores = () => {
  const navigate = useNavigate();

  // Datos base
  const historialCompleto = [
    { fecha: "2025-06-15", actividad: "Siembra", responsable: "Carlos Andrés Pérez", observaciones: "Se sembraron 500 árboles", estado: "Cerrado" },
    { fecha: "2025-06-16", actividad: "Siembra", responsable: "María Fernanda Ríos", observaciones: "Se sembraron 120 árboles", estado: "Cerrado" },
    { fecha: "2025-06-17", actividad: "Siembra", responsable: "Juan David Avila", observaciones: "Se sembraron 100 árboles", estado: "Cerrado" },
  ];

  const datosCabecera = {
    finca: "La Esmeralda",
    lote: "Lote 1",
    labor: "Siembra",
    semana: 22,
    estadoActual: "En progreso",
    avance: 50,
  };

  const columnas = ["fecha", "actividad", "responsable", "estado"];

  // Estados para filtros y ordenamiento
  const [filtroActivo, setFiltroActivo] = useState(null);
  const [valoresSeleccionados, setValoresSeleccionados] = useState({});
  const [ordenCampo, setOrdenCampo] = useState(null);
  const [busquedas, setBusquedas] = useState({});
  const [filtroPosicion, setFiltroPosicion] = useState({ top: 0, left: 0 });
  const filtroRef = useRef(null);

  // Obtener valores únicos para filtros
  const getValoresUnicos = (campo) => {
    const search = (busquedas[campo] || "").toLowerCase();
    return [...new Set(historialCompleto.map(e => e[campo]))].filter(v =>
      v.toLowerCase().includes(search)
    );
  };

  // Mostrar/ocultar menú de filtro
  const toggleFiltro = (campo, e) => {
    const icono = e.currentTarget.getBoundingClientRect();
    setFiltroActivo(filtroActivo === campo ? null : campo);
    setFiltroPosicion({
      top: icono.bottom + window.scrollY + 4,
      left: icono.left + window.scrollX
    });
  };

  // Seleccionar/deseleccionar valores de filtro
  const toggleValor = (campo, valor) => {
    const seleccionados = new Set(valoresSeleccionados[campo] || []);
    seleccionados.has(valor) ? seleccionados.delete(valor) : seleccionados.add(valor);
    setValoresSeleccionados({ ...valoresSeleccionados, [campo]: [...seleccionados] });
  };

  // Limpiar un filtro
  const limpiarFiltro = (campo) => {
    const actualizado = { ...valoresSeleccionados };
    delete actualizado[campo];
    setValoresSeleccionados(actualizado);
  };

  // Ordenar datos
  const ordenar = (campo, orden) => {
    setOrdenCampo({ campo, orden });
  };

  // Guardar texto de búsqueda
  const handleBusqueda = (campo, texto) => {
    setBusquedas({ ...busquedas, [campo]: texto });
  };

  // Filtrado y ordenamiento de historial
  const historialFiltrado = historialCompleto
    .filter(item =>
      columnas.every(campo =>
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

  // Cerrar menús al hacer click fuera
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
    <LayoutAgronomo>
      {/* Botón volver */}
      <button onClick={() => navigate("/Laboresagro")} className="flex items-center text-green-600 font-semibold mb-4 text-lg hover:underline">
        <IconChevronLeft className="w-5 h-5 mr-1" /> Volver
      </button>

      {/* Título */}
      <h1 className="text-3xl font-bold text-green-600 mb-6">Historial labores</h1>

      {/* Datos cabecera */}
      <div className="bg-white border border-gray-300 rounded-xl shadow-md mb-6 p-4 flex flex-wrap justify-between items-center">
        <div className="space-y-1 text-[15px]">
          <p><strong>Finca:</strong> {datosCabecera.finca}</p>
          <p><strong>Lote:</strong> {datosCabecera.lote}</p>
          <p><strong>Labor:</strong> {datosCabecera.labor}</p>
          <p><strong>Semana:</strong> {datosCabecera.semana}</p>
          <p><strong>Estado actual:</strong> {datosCabecera.estadoActual}</p>
        </div>
        <div className="w-full md:w-1/2 mt-4 md:mt-0">
          <p className="font-bold text-sm">Avance actual:</p>
          <div className="w-full bg-gray-200 h-4 rounded overflow-hidden">
            <div className="bg-green-600 h-4" style={{ width: `${datosCabecera.avance}%` }} />
          </div>
          <p className="text-right text-sm">{datosCabecera.avance}%</p>
        </div>
      </div>

      {/* Tabla historial */}
      <div className="bg-white border border-gray-300 rounded-xl shadow-md overflow-x-auto relative">
        <table className="w-full text-base text-center">
          <thead className="bg-green-600 text-white">
            <tr>
              {columnas.map((col, idx) => (
                <th key={idx} className="px-4 py-4 font-bold border">
                  <div className="flex justify-center items-center gap-2">
                    <span className="uppercase">{col}</span>
                    <button onClick={(e) => toggleFiltro(col, e)}>
                      <IconFilter className="w-4 h-4" />
                    </button>
                  </div>
                </th>
              ))}
              <th className="px-4 py-4 font-bold border uppercase">OBSERVACIONES</th>
            </tr>
          </thead>
          <tbody>
            {historialFiltrado.map((item, i) => (
              <tr key={i} className="border-t hover:bg-gray-50 transition">
                <td className="px-6 py-4 border border-gray-200">{item.fecha}</td>
                <td className="px-6 py-4 border border-gray-200">{item.actividad}</td>
                <td className="px-6 py-4 border border-gray-200">{item.responsable}</td>
                <td className="px-6 py-4 border border-gray-200">{item.estado}</td>
                <td className="px-6 py-4 border border-gray-200">{item.observaciones}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Filtros */}
        {filtroActivo === "fecha" ? (
          <div ref={filtroRef} className="fixed bg-white text-black shadow-md border rounded z-50 p-3 w-60 text-left text-sm" style={{ top: filtroPosicion.top, left: filtroPosicion.left }}>
            <div className="font-semibold mb-2">Filtrar por Fecha</div>
            {Object.entries(
              historialCompleto.reduce((acc, { fecha }) => {
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
            <button onClick={() => limpiarFiltro("fecha")} className="text-blue-600 hover:underline text-xs lowercase mt-2">
              borrar filtro
            </button>
          </div>
        ) : filtroActivo && (
          <div ref={filtroRef} className="fixed bg-white text-black shadow-md border rounded z-50 p-3 w-60 text-left text-sm" style={{ top: filtroPosicion.top, left: filtroPosicion.left }}>
            <div className="font-semibold mb-2">
              Filtrar por {filtroActivo.charAt(0).toUpperCase() + filtroActivo.slice(1)}
            </div>
            <button onClick={() => ordenar(filtroActivo, "asc")} className="text-green-700 flex items-center gap-1 mb-1">
              <IconSortAscending2 className="w-4 h-4" />Ordenar A → Z
            </button>
            <button onClick={() => ordenar(filtroActivo, "desc")} className="text-green-700 flex items-center gap-1 mb-2">
              <IconSortDescending2 className="w-4 h-4" />Ordenar Z → A
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
            <button onClick={() => limpiarFiltro(filtroActivo)} className="text-blue-600 hover:underline text-xs mt-2">
              Borrar filtro
            </button>
          </div>
        )}
      </div>

      {/* Botón exportar */}
      <div className="mt-4 flex justify-end">
        <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition text-base font-semibold">
          Exportar historial
        </button>
      </div>
    </LayoutAgronomo>
  );
};

export default Historial_labores;




