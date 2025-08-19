// src/pages/mayordomo/Historial_trabajom.jsx
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IconChevronLeft, IconFilter } from "@tabler/icons-react";

// Importa el layout reutilizable
import LayoutMayordomo from "../../layouts/LayoutMayordomo";

const Historial_trabajom = () => {
  const navigate = useNavigate();
  const filtroRef = useRef(null);
  const [filtroActivo, setFiltroActivo] = useState(null);
  const [valoresSeleccionados, setValoresSeleccionados] = useState({});
  const [filtroPosicion, setFiltroPosicion] = useState({ top: 0, left: 0 });

  const maquina = {
    id: 1,
    nombre: "Tractor",
    referencia: "JD 5055",
    ubicacion: "La Esmeralda",
    estado: "Óptimo",
  };

  const historial = [
    {
      fecha: "2025-06-15",
      labor: "Siembra",
      horasTrabajadas: "6 horas",
      horasMaquina: "4 horas",
      observaciones: "Se limpió lote 2, clima nublado",
    },
    {
      fecha: "2025-06-15",
      labor: "Desyerba guadaña",
      horasTrabajadas: "8 horas",
      horasMaquina: "3 horas",
      observaciones: "Cuchilla se atascó temporalmente. Se solucionó",
    },
    {
      fecha: "2025-06-15",
      labor: "Recolección",
      horasTrabajadas: "4 horas",
      horasMaquina: "1 hora",
      observaciones: "Trabajo en área común. Máquina en estado óptimo",
    },
  ];

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

  const datosFiltrados = historial.filter((d) => {
    return ["fecha", "labor", "horasTrabajadas", "horasMaquina"].every((campo) => {
      const filtro = valoresSeleccionados[campo];
      return !filtro || filtro.includes(d[campo]);
    });
  });

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (filtroRef.current && !filtroRef.current.contains(e.target)) {
        setFiltroActivo(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const renderFiltroSimple = (campo) => {
    const opcionesUnicas = [...new Set(historial.map((d) => d[campo]))];
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
      const [year, month] = fecha.split("-");
      const mesNombre = new Date(`${year}-${month}-01`).toLocaleString("default", {
        month: "long",
      });
      acc[year] = acc[year] || {};
      acc[year][mesNombre] = acc[year][mesNombre] || [];
      acc[year][mesNombre].push(fecha);
      return acc;
    }, {});

    return (
      <div
        ref={filtroRef}
        className="fixed bg-white text-black shadow-md border rounded z-50 p-3 w-60 text-left text-sm"
        style={{ top: filtroPosicion.top, left: filtroPosicion.left }}
      >
        <div className="font-semibold mb-2">Filtrar por Fecha</div>
        {Object.entries(estructura).map(([year, meses]) => (
          <div key={year} className="mb-2">
            <div className="font-medium">{year}</div>
            {Object.entries(meses).map(([mes, fechas]) => (
              <div key={mes} className="ml-4">
                <div className="font-medium">{mes}</div>
                {fechas.map((fecha) => {
                  const day = fecha.split("-")[2];
                  return (
                    <label key={fecha} className="ml-6 flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={(valoresSeleccionados["fecha"] || []).includes(fecha)}
                        onChange={() => toggleValor("fecha", fecha)}
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

      <h2 className="text-3xl font-bold text-green-700 mb-6">Historial de trabajo</h2>

      {/* Información general */}
      <div className="bg-white border border-gray-300 p-6 rounded-xl mb-6 max-w-4xl">
        <h2 className="text-xl font-semibold mb-4 text-green-700">Información general</h2>
        <div className="grid grid-cols-2 gap-x-12 gap-y-2 text-lg">
          <div>
            <strong>ID Máquina:</strong> {maquina.id}
          </div>
          <div>
            <strong>Ubicación:</strong> {maquina.ubicacion}
          </div>
          <div>
            <strong>Máquina:</strong> {maquina.nombre}
          </div>
          <div>
            <strong>Estado:</strong> {maquina.estado}
          </div>
          <div>
            <strong>Referencia:</strong> {maquina.referencia}
          </div>
        </div>
      </div>

      {/* Tabla de historial */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-sm md:text-base text-center">
          <thead className="bg-green-600 text-white font-semibold">
            <tr>
              {[
                { campo: "fecha", titulo: "FECHA" },
                { campo: "labor", titulo: "LABOR" },
                { campo: "horasTrabajadas", titulo: "HORAS TRABAJADAS" },
                { campo: "horasMaquina", titulo: "HORAS MÁQUINA" },
                { campo: "observaciones", titulo: "OBSERVACIONES" },
              ].map(({ campo, titulo }) => (
                <th
                  key={campo}
                  className="p-4 border border-gray-300 text-center"
                >
                  <div className="flex justify-center items-center gap-2">
                    {titulo}
                    {campo !== "observaciones" && (
                      <button onClick={(e) => toggleFiltro(campo, e)}>
                        <IconFilter className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-black">
            {datosFiltrados.map((item, idx) => (
              <tr key={idx} className="border-t border-gray-300">
                <td className="p-4 border border-gray-300 text-center">
                  {item.fecha}
                </td>
                <td className="p-4 border border-gray-300 text-center">
                  {item.labor}
                </td>
                <td className="p-4 border border-gray-300 text-center">
                  {item.horasTrabajadas}
                </td>
                <td className="p-4 border border-gray-300 text-center">
                  {item.horasMaquina}
                </td>
                <td className="p-4 border border-gray-300 text-center">
                  {item.observaciones}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtroActivo &&
          (filtroActivo === "fecha"
            ? renderFiltroFecha()
            : renderFiltroSimple(filtroActivo))}
      </div>

      <div className="flex justify-end mt-4">
        <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 font-semibold">
          Descargar PDF
        </button>
      </div>
    </LayoutMayordomo>
  );
};

export default Historial_trabajom;
