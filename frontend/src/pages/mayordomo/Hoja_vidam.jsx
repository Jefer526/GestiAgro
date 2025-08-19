// src/pages/mayordomo/Hoja_vidam.jsx
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  IconChevronLeft,
  IconFilter,
  IconEye,
} from "@tabler/icons-react";

// Importa el layout con el sidebar ya integrado
import LayoutMayordomo from "../../layouts/LayoutMayordomo";

const Hoja_vidam = () => {
  const navigate = useNavigate();
  const filtroRef = useRef(null);
  const [filtroActivo, setFiltroActivo] = useState(null);
  const [valoresSeleccionados, setValoresSeleccionados] = useState({});
  const [filtroPosicion, setFiltroPosicion] = useState({ top: 0, left: 0 });

  const maquina = {
    id: 1,
    maquina: "Tractor",
    referencia: "JD 5055",
    ubicacion: "La Esmeralda",
    estado: "Óptimo",
  };

  const historial = [
    { fecha: "2025-05-20", prev: true, correcc: false, descripcion: "Mantenimiento 1500 horas", realizado: "John Deere" },
    { fecha: "2025-05-21", prev: false, correcc: true, descripcion: "Reparación Radiador", realizado: "Alex Condza" },
    { fecha: "2025-05-22", prev: false, correcc: false, descripcion: "Cambio Refrigerante", realizado: "Alex Condza" },
    { fecha: "2025-05-23", prev: false, correcc: false, descripcion: "Cambio de llantas", realizado: "Montalantas" },
  ];

  // === Filtros ===
  const toggleFiltro = (campo, event) => {
    const icono = event.currentTarget.getBoundingClientRect();
    setFiltroActivo(filtroActivo === campo ? null : campo);
    setFiltroPosicion({
      top: icono.bottom + window.scrollY + 4,
      left: Math.min(icono.left + window.scrollX, window.innerWidth - 280),
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

  const datosFiltrados = historial.filter((d) =>
    ["fecha", "prev", "correcc", "realizado"].every((campo) => {
      const filtro = valoresSeleccionados[campo];
      const valor =
        campo === "prev" || campo === "correcc" ? (d[campo] ? "Sí" : "No") : String(d[campo]);
      return !filtro || filtro.includes(valor);
    })
  );

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (filtroRef.current && !filtroRef.current.contains(e.target)) {
        setFiltroActivo(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Render de filtros
  const renderFiltroSimple = (campo) => {
    let opcionesUnicas =
      campo === "prev" || campo === "correcc"
        ? ["Sí", "No"]
        : [...new Set(historial.map((d) => String(d[campo])))];

    return (
      <div
        ref={filtroRef}
        className="fixed bg-white text-black shadow-md border rounded z-50 p-3 w-60 text-left text-sm"
        style={{ top: filtroPosicion.top, left: filtroPosicion.left }}
      >
        <div className="font-semibold mb-2">Filtrar por {campo}</div>
        {opcionesUnicas.map((valor) => (
          <label key={valor} className="flex items-center gap-2 mb-1">
            <input
              type="checkbox"
              checked={(valoresSeleccionados[campo] || []).includes(valor)}
              onChange={() => toggleValor(campo, valor)}
              className="accent-green-600"
            />
            {valor}
          </label>
        ))}
        <button
          onClick={() => limpiarFiltro(campo)}
          className="text-blue-600 hover:underline text-xs mt-2"
        >
          Borrar filtro
        </button>
      </div>
    );
  };

  const renderFiltroFecha = () => {
    const estructura = historial.reduce((acc, { fecha }) => {
      const d = new Date(fecha + "T00:00:00");
      const y = d.getFullYear();
      const m = d.getMonth() + 1;
      const day = d.getDate();

      if (!acc[y]) acc[y] = {};
      if (!acc[y][m]) acc[y][m] = new Set();
      acc[y][m].add(day);
      return acc;
    }, {});

    const monthName = (m) =>
      new Date(2000, m - 1, 1).toLocaleString("default", { month: "long" });

    return (
      <div
        ref={filtroRef}
        className="fixed bg-white text-black shadow-md border rounded z-50 p-3 w-60 text-left text-sm"
        style={{ top: filtroPosicion.top, left: filtroPosicion.left }}
      >
        <div className="font-semibold mb-2">Filtrar por Fecha</div>
        {Object.keys(estructura)
          .sort((a, b) => Number(a) - Number(b))
          .map((yearKey) => {
            const y = Number(yearKey);
            const meses = estructura[y];
            return (
              <div key={y} className="mb-2">
                <div className="font-medium">{y}</div>
                {Object.keys(meses)
                  .map(Number)
                  .sort((a, b) => a - b)
                  .map((m) => (
                    <div key={`${y}-${m}`} className="ml-4">
                      <div className="font-medium">{monthName(m)}</div>
                      {[...meses[m]]
                        .sort((a, b) => a - b)
                        .map((day) => {
                          const fullDate = `${y}-${String(m).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                          return (
                            <label key={`${y}-${m}-${day}`} className="ml-6 flex items-center gap-2">
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
            );
          })}
        <button
          onClick={() => limpiarFiltro("fecha")}
          className="text-blue-600 hover:underline text-xs mt-2"
        >
          Borrar filtro
        </button>
      </div>
    );
  };

  return (
    <LayoutMayordomo>
      <button
        onClick={() => navigate("/equipos_mayordomo")}
        className="flex items-center text-green-700 font-semibold mb-6 text-lg hover:underline"
      >
        <IconChevronLeft className="w-5 h-5 mr-1" /> Volver
      </button>

      <h2 className="text-3xl font-bold text-green-700 mb-6">Hoja de vida</h2>

      {/* Información general */}
      <div className="bg-white border border-gray-300 p-6 rounded-xl mb-6 max-w-4xl">
        <h2 className="text-2xl font-bold mb-4 text-green-600">Información general</h2>
        <div className="grid grid-cols-2 gap-x-12 gap-y-2 text-lg">
          <div><strong>ID Máquina:</strong> {maquina.id}</div>
          <div><strong>Ubicación:</strong> {maquina.ubicacion}</div>
          <div><strong>Máquina:</strong> {maquina.maquina}</div>
          <div><strong>Estado:</strong> {maquina.estado}</div>
          <div><strong>Referencia:</strong> {maquina.referencia}</div>
        </div>
      </div>

      {/* Historial */}
      <h2 className="text-2xl font-bold text-green-700 mb-4">Historial de mantenimiento</h2>
      <div className="overflow-x-auto relative">
        <table className="w-full bg-white border border-gray-300 text-base text-center">
          <thead className="bg-green-600 text-white font-bold text-base">
            <tr>
              {[
                { campo: "fecha", titulo: "FECHA" },
                { campo: "prev", titulo: "MANTENIMIENTO PREV" },
                { campo: "correcc", titulo: "MANTENIMIENTO CORREC" },
                { campo: "descripcion", titulo: "DESCRIPCIÓN" },
                { campo: "realizado", titulo: "REALIZADO POR" },
                { campo: "detalle", titulo: "DETALLE" },
              ].map(({ campo, titulo }) => (
                <th key={campo} className="p-3 border text-center">
                  {campo !== "descripcion" && campo !== "detalle" ? (
                    <div className="flex justify-center items-center gap-2">
                      {titulo}
                      <button onClick={(e) => toggleFiltro(campo, e)}>
                        <IconFilter className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    titulo
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {datosFiltrados.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="p-3 border">{item.fecha}</td>
                <td className="p-3 border">{item.prev ? "Sí" : "No"}</td>
                <td className="p-3 border">{item.correcc ? "Sí" : "No"}</td>
                <td className="p-3 border">{item.descripcion}</td>
                <td className="p-3 border">{item.realizado}</td>
                <td className="p-3 border">
                  <div className="flex justify-center">
                    <button
                      onClick={() => navigate("/detalle_mantenimientom", { state: item })}
                      className="flex items-center gap-2 px-3 py-1 rounded-md bg-blue-100 text-blue-700 hover:bg-blue-200 transition"
                    >
                      <IconEye className="w-4 h-4" />
                      <span className="text-sm font-medium">Detalle</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Filtros dinámicos */}
        {filtroActivo &&
          (filtroActivo === "fecha" ? renderFiltroFecha() : renderFiltroSimple(filtroActivo))}
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
