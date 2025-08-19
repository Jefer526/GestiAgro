// src/pages/mayordomo/Hoja_vidam.jsx
import React, { useState, useRef, useEffect } from "react";
import {
  IconChevronLeft,
  IconFilter,
  IconSortAscending2,
  IconSortDescending2,
  IconEye,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import LayoutMayordomo from "../../layouts/LayoutMayordomo";

const Hoja_vidam = () => {
  const navigate = useNavigate();
  const filtroRef = useRef(null);

  // Estados de filtros
  const [filtroActivo, setFiltroActivo] = useState(null);
  const [filtroPosicion, setFiltroPosicion] = useState({ top: 0, left: 0 });
  const [valoresSeleccionados, setValoresSeleccionados] = useState({});
  const [busquedas, setBusquedas] = useState({});
  const [ordenCampo, setOrdenCampo] = useState(null);

  // Datos de la máquina
  const maquina = {
    codigo: 1,
    maquina: "Tractor",
    referencia: "JD 5055",
    ubicacion: "La Esmeralda",
    estado: "Óptimo",
  };

  // Historial
  const historial = [
    { fecha: "2025-05-20", prev: true, correcc: false, descripcion: "Mantenimiento 1500 horas", realizado: "John Deere" },
    { fecha: "2025-05-21", prev: false, correcc: true, descripcion: "Reparación Radiador", realizado: "Alex Condza" },
    { fecha: "2025-05-22", prev: false, correcc: false, descripcion: "Cambio Refrigerante", realizado: "Alex Condza" },
    { fecha: "2025-05-23", prev: false, correcc: false, descripcion: "Cambio de llantas", realizado: "Montalantas" },
  ];

  const columnas = [
    { campo: "fecha", label: "Fecha" },
    { campo: "prev", label: "Mantenimiento preventivo" },
    { campo: "correcc", label: "Mantenimiento correctivo" },
    { campo: "descripcion", label: "Descripción" },
    { campo: "realizado", label: "Realizado" },
    { campo: "detalle", label: "Detalle" },
  ];

  // Valores únicos por campo
  const getValoresUnicos = (campo) => {
    if (campo === "fecha" || campo === "descripcion" || campo === "detalle") return [];
    const search = (busquedas[campo] || "").toLowerCase();
    return [...new Set(historial.map((e) => {
      if (typeof e[campo] === "boolean") return e[campo] ? "Sí" : "No";
      return e[campo] || "";
    }))].filter((v) => v.toLowerCase().includes(search));
  };

  // Manejo de filtros
  const toggleFiltro = (campo, e) => {
    if (campo === "detalle") return;
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

  const ordenar = (campo, orden) => setOrdenCampo({ campo, orden });
  const handleBusqueda = (campo, texto) => setBusquedas({ ...busquedas, [campo]: texto });

  // Filtrado y orden
  const historialFiltrado = historial
    .filter((item) =>
      columnas.every(({ campo }) => {
        if (campo === "detalle") return true;
        const val = typeof item[campo] === "boolean" ? (item[campo] ? "Sí" : "No") : item[campo];
        return !valoresSeleccionados[campo] || valoresSeleccionados[campo].length === 0
          ? true
          : valoresSeleccionados[campo].includes(val);
      })
    )
    .sort((a, b) => {
      if (!ordenCampo) return 0;
      const { campo, orden } = ordenCampo;
      const valA = typeof a[campo] === "boolean" ? (a[campo] ? "Sí" : "No") : a[campo];
      const valB = typeof b[campo] === "boolean" ? (b[campo] ? "Sí" : "No") : b[campo];
      return orden === "asc" ? valA.localeCompare(valB) : valB.localeCompare(valA);
    });

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
    <LayoutMayordomo active="/equipos_mayordomo">
      {/* Botón volver */}
      <button
        onClick={() => navigate("/equipos_mayordomo")}
        className="flex items-center text-green-700 font-semibold mb-4 text-lg hover:underline"
      >
        <IconChevronLeft className="w-5 h-5 mr-1" /> Volver
      </button>

      {/* Título */}
      <h1 className="text-3xl font-bold text-green-700 mb-6">Hoja de vida</h1>

      {/* Información general */}
      <div className="bg-white border border-gray-300 rounded-xl shadow-md mb-8 p-6 max-w-4xl">
        <h2 className="text-2xl font-bold mb-4 text-green-700">Información general</h2>
        <div className="grid grid-cols-2 gap-x-12 gap-y-2 text-lg">
          <p><strong>Código Equipo:</strong> {maquina.codigo}</p>
          <p><strong>Ubicación:</strong> {maquina.ubicacion}</p>
          <p><strong>Máquina:</strong> {maquina.maquina}</p>
          <p><strong>Estado:</strong> {maquina.estado}</p>
          <p><strong>Referencia:</strong> {maquina.referencia}</p>
        </div>
      </div>

      {/* Historial */}
      <h2 className="text-3xl font-bold text-green-700 mb-4">Historial de mantenimiento</h2>
      <div className="bg-white border border-gray-300 rounded-xl shadow-md overflow-x-auto relative">
        <table className="w-full text-base text-center">
          <thead className="bg-green-600 text-white">
            <tr>
              {columnas.map(({ campo, label }) => (
                <th key={campo} className="px-4 py-4 font-bold border">
                  <div className="flex justify-center items-center gap-2">
                    <span className="uppercase">{label}</span>
                    {campo !== "detalle" && (
                      <button onClick={(e) => toggleFiltro(campo, e)}>
                        <IconFilter className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {historialFiltrado.map((item, index) => (
              <tr key={index} className="border-t hover:bg-gray-50 transition">
                <td className="px-6 py-4 border border-gray-200">{item.fecha}</td>
                <td className="px-6 py-4 border border-gray-200">{item.prev ? "Sí" : "No"}</td>
                <td className="px-6 py-4 border border-gray-200">{item.correcc ? "Sí" : "No"}</td>
                <td className="px-6 py-4 border border-gray-200">{item.descripcion}</td>
                <td className="px-6 py-4 border border-gray-200">{item.realizado}</td>
                <td className="px-6 py-4 border border-gray-200">
                  <button
                    onClick={() => navigate("/detalle_mantenimientom", { state: item })}
                    className="flex items-center gap-1 bg-blue-100 text-blue-600 px-3 py-1 rounded-md text-sm font-medium hover:bg-blue-200 mx-auto"
                  >
                    <IconEye className="w-4 h-4" />
                    Detalle
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Filtros dinámicos */}
        {filtroActivo === "fecha" ? (
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
            <button onClick={() => limpiarFiltro("fecha")} className="text-blue-600 hover:underline text-xs lowercase mt-2">
              borrar filtro
            </button>
          </div>
        ) : filtroActivo && (
          <div
            ref={filtroRef}
            className="fixed bg-white text-black shadow-md border rounded z-50 p-3 w-60 text-left text-sm"
            style={{ top: filtroPosicion.top, left: filtroPosicion.left }}
          >
            <div className="font-semibold mb-2">
              Filtrar por {filtroActivo.charAt(0).toUpperCase() + filtroActivo.slice(1)}
            </div>
            <button onClick={() => ordenar(filtroActivo, "asc")} className="text-green-700 flex items-center gap-1 mb-1">
              <IconSortAscending2 className="w-4 h-4" /> Ordenar A → Z
            </button>
            <button onClick={() => ordenar(filtroActivo, "desc")} className="text-green-700 flex items-center gap-1 mb-2">
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
            <button onClick={() => limpiarFiltro(filtroActivo)} className="text-blue-600 hover:underline text-xs mt-2">
              Borrar filtro
            </button>
          </div>
        )}
      </div>

      {/* Botones finales */}
      <div className="flex justify-center gap-10 mt-10">
        <button
          onClick={() => navigate("/registrar_novedad_hoja")}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold text-lg px-6 py-3 rounded-lg"
        >
          Registrar novedad
        </button>
        <button className="bg-green-600 hover:bg-green-700 text-white font-semibold text-lg px-6 py-3 rounded-lg">
          Descargar PDF
        </button>
      </div>
    </LayoutMayordomo>
  );
};

export default Hoja_vidam;

