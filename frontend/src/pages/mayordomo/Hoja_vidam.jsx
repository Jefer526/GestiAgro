import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  IconHome,
  IconClipboardList,
  IconHistory,
  IconChartBar,
  IconBox,
  IconCloudRain,
  IconTractor,
  IconSettings,
  IconChevronLeft,
  IconFilter,
} from "@tabler/icons-react";
import faviconBlanco from "../../assets/favicon-blanco.png";

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
    return ["fecha", "prev", "correcc", "realizado"].every((campo) => {
      const filtro = valoresSeleccionados[campo];
      const valor = campo === "prev" || campo === "correcc" ? (d[campo] ? "Sí" : "No") : String(d[campo]);
      return !filtro || filtro.includes(valor);
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
    let opcionesUnicas;
    if (campo === "prev" || campo === "correcc") {
      opcionesUnicas = ["Sí", "No"];
    } else {
      opcionesUnicas = [...new Set(historial.map((d) => String(d[campo])))];
    }

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
        <button onClick={() => limpiarFiltro(campo)} className="text-blue-600 hover:underline text-xs mt-2">
          Borrar filtro
        </button>
      </div>
    );
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="bg-green-600 w-28 h-full flex flex-col items-center py-6 justify-between">
        <div className="flex flex-col items-center space-y-8">
          <img src={faviconBlanco} alt="Logo" className="w-11 h-11" />
          <button onClick={() => navigate("/homemayordomo")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconHome className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/registrolabores")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconClipboardList className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/historial_labores")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconHistory className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/bodega_insumos")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconBox className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/variables_climaticasm")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconCloudRain className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/informes_mayordomo")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconChartBar className="text-white w-11 h-11" />
          </button>
          <div className="relative w-full flex justify-center">
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-11 bg-white rounded-full z-10" />
            <button className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
              <IconTractor className="text-white w-11 h-11" />
            </button>
          </div>
        </div>
        <div className="mb-6">
          <button className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconSettings className="text-white w-11 h-11" />
          </button>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 px-10 py-8 overflow-auto">
        <h2 className="text-3xl font-bold text-green-600 mb-6">Hoja de vida</h2>
        <button
          onClick={() => navigate("/equipos_mayordomo")}
          className="flex items-center text-green-600 hover:text-green-800 mb-6"
        >
          <IconChevronLeft className="w-6 h-6 mr-1" />
          <span className="text-base font-medium">Volver</span>
        </button>

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

        <h2 className="text-2xl font-bold text-green-600 mb-4">Historial de mantenimiento</h2>
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
                ].map(({ campo, titulo }) => (
                  <th key={campo} className="p-3 border text-center">
                    {campo !== "descripcion" ? (
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
                  <td className="p-3 border text-center">{item.fecha}</td>
                  <td className="p-3 border text-center">{item.prev ? "Sí" : "No"}</td>
                  <td className="p-3 border text-center">{item.correcc ? "Sí" : "No"}</td>
                  <td className="p-3 border text-center">{item.descripcion}</td>
                  <td className="p-3 border text-center">{item.realizado}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {filtroActivo && (filtroActivo === "fecha"
            ? (
              <div
                ref={filtroRef}
                className="fixed bg-white text-black shadow-md border rounded z-50 p-3 w-60 text-left text-sm"
                style={{ top: filtroPosicion.top, left: filtroPosicion.left }}
              >
                <div className="font-semibold mb-2">Filtrar por Fecha</div>
                {Object.entries(
                  historial.reduce((acc, { fecha }) => {
                    const [year, month, day] = fecha.split("-");
                    const monthName = new Date(`${year}-${month}-01`).toLocaleString("default", { month: "long" });
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
                          const fullDate = `${year}-${String(month).padStart(2, "0")}-${day}`;
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
                  className="text-blue-600 hover:underline text-xs mt-2"
                >
                  Borrar filtro
                </button>
              </div>
            )
            : renderFiltroSimple(filtroActivo)
          )}
        </div>

        <div className="flex justify-center gap-10 mt-10">
          <button onClick={() => navigate("/registrar_mantenimientom")}
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold text-lg px-6 py-3 rounded-lg">
            Registrar mantenimiento
          </button>
          <button className="bg-green-600 hover:bg-green-700 text-white font-semibold text-lg px-6 py-3 rounded-lg">
            Descargar PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hoja_vidam;
