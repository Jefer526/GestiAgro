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
  IconTool,
  IconLogout,
  IconChevronLeft,
  IconFilter,
  IconPlant2,
  IconBook,
  IconEye
} from "@tabler/icons-react";
import faviconBlanco from "../../assets/favicon-blanco.png";

const Hoja_vidam = () => {
  const navigate = useNavigate();
  const filtroRef = useRef(null);
  const [filtroActivo, setFiltroActivo] = useState(null);
  const [valoresSeleccionados, setValoresSeleccionados] = useState({});
  const [filtroPosicion, setFiltroPosicion] = useState({ top: 0, left: 0 });

  // Perfil
  const nombreUsuario = "Juan Pérez";
  const letraInicial = (nombreUsuario?.trim()?.[0] || "U").toUpperCase();
  const [mostrarTarjeta, setMostrarTarjeta] = useState(false);
  const tarjetaRef = useRef(null);

  const maquina = {
    id: 1,
    maquina: "Tractor",
    referencia: "JD 5055",
    ubicacion: "La Esmeralda",
    estado: "Óptimo",
  };

  const historial = [
    { fecha: "2025-05-20", prev: true,  correcc: false, descripcion: "Mantenimiento 1500 horas", realizado: "John Deere" },
    { fecha: "2025-05-21", prev: false, correcc: true,  descripcion: "Reparación Radiador",       realizado: "Alex Condza" },
    { fecha: "2025-05-22", prev: false, correcc: false, descripcion: "Cambio Refrigerante",       realizado: "Alex Condza" },
    { fecha: "2025-05-23", prev: false, correcc: false, descripcion: "Cambio de llantas",         realizado: "Montalantas" },
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

  // Cierre de filtros y menú perfil
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (filtroRef.current && !filtroRef.current.contains(e.target)) {
        setFiltroActivo(null);
      }
      if (tarjetaRef.current && !tarjetaRef.current.contains(e.target)) {
        setMostrarTarjeta(false);
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
    <div className="min-h-dvh bg-gray-50">
      {/* SIDEBAR FIJO */}
      <aside className="fixed left-0 top-0 w-28 h-[100dvh] bg-green-600 flex flex-col justify-between">
        {/* Logo fijo */}
        <div className="pt-6 flex justify-center">
          <img src={faviconBlanco} alt="Logo" className="w-11 h-11" />
        </div>

        {/* Íconos con scroll */}
        <div className="flex-1 flex flex-col items-center space-y-8 mt-6 overflow-y-auto scrollbar-hide-only">
          {/* Home */}
          <div className="relative">
            {location.pathname === "/homemayordomo" && (
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-11 bg-white rounded-full" />
            )}
            <button onClick={() => navigate("/homemayordomo")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
              <IconHome className="text-white w-11 h-11" />
            </button>
          </div>

          {/* Registro labores */}
          <div className="relative">
            {location.pathname === "/registrolabores" && (
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-11 bg-white rounded-full" />
            )}
            <button onClick={() => navigate("/registrolabores")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
              <IconClipboardList className="text-white w-11 h-11" />
            </button>
          </div>

          {/* Historial labores */}
          <div className="relative">
            {location.pathname === "/historial_labores" && (
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-11 bg-white rounded-full" />
            )}
            <button onClick={() => navigate("/historial_labores")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
              <IconHistory className="text-white w-11 h-11" />
            </button>
          </div>

          {/* Bodega */}
          <div className="relative">
            {location.pathname === "/bodega_insumos" && (
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-11 bg-white rounded-full" />
            )}
            <button onClick={() => navigate("/bodega_insumos")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
              <IconBox className="text-white w-11 h-11" />
            </button>
          </div>

          {/* Variables climáticas */}
          <div className="relative">
            {location.pathname === "/variables_climaticasm" && (
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-11 bg-white rounded-full" />
            )}
            <button onClick={() => navigate("/variables_climaticasm")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
              <IconCloudRain className="text-white w-11 h-11" />
            </button>
          </div>

          {/* Informes */}
          <div className="relative">
            {location.pathname === "/informes_mayordomo" && (
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-11 bg-white rounded-full" />
            )}
            <button onClick={() => navigate("/informes_mayordomo")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
              <IconChartBar className="text-white w-11 h-11" />
            </button>
          </div>

          {/* Maquinaria */}
          <div className="relative">
            {location.pathname === "/hoja_vidam" && (
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-11 bg-white rounded-full" />
            )}
            <button onClick={() => navigate("/equipos_mayordomo")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
              <IconTractor className="text-white w-11 h-11" />
            </button>
          </div>

          {/* Producción */}
          <div className="relative">
            {location.pathname === "/produccion_mayor" && (
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-11 bg-white rounded-full" />
            )}
            <button onClick={() => navigate("/produccion_mayor")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
              <IconPlant2 className="text-white w-11 h-11" />
            </button>
          </div>

          {/* Cuaderno de Campo */}
          <div className="relative">
            {location.pathname === "/cuaderno_campom" && (
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-11 bg-white rounded-full" />
            )}
            <button onClick={() => navigate("/cuaderno_campom")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
              <IconBook className="text-white w-11 h-11" />
            </button>
          </div>
        </div>

        {/* Perfil */}
        <div className="relative mb-6 flex justify-center">
          <button
            onClick={() => setMostrarTarjeta(!mostrarTarjeta)}
            className="bg-white w-12 h-12 rounded-full flex items-center justify-center text-green-600 font-bold text-xl shadow hover:scale-110 transition"
          >
            {letraInicial}
          </button>
          {mostrarTarjeta && (
            <div
              ref={tarjetaRef}
              className="absolute bottom-16 left-14 w-56 bg-white/95 border border-gray-200 rounded-xl shadow-2xl py-3 z-[10000] backdrop-blur"
            >
              <button onClick={() => { setMostrarTarjeta(false); navigate("/ajustesmayordomo"); }} className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-100">
                <IconSettings className="w-5 h-5 mr-2 text-green-600" /> Ajustes
              </button>
              <button onClick={() => { setMostrarTarjeta(false); navigate("/soportemayordomo"); }} className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-100">
                <IconTool className="w-5 h-5 mr-2 text-green-600" /> Soporte
              </button>
              <button onClick={() => { setMostrarTarjeta(false); navigate("/login"); }} className="flex items-center w-full text-left px-4 py-2 hover:bg-red-50 text-red-600">
                <IconLogout className="w-5 h-5 mr-2 text-red-600" /> Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* CONTENIDO */}
      <main className="pl-28 min-h-dvh">
        <div className="px-10 py-8 overflow-auto">
          <h2 className="text-3xl font-bold text-green-600 mb-6">Hoja de vida</h2>
          <button
            onClick={() => navigate("/equipos_mayordomo")}
            className="flex items-center text-green-600 hover:text-green-800 mb-6"
          >
            <IconChevronLeft className="w-6 h-6 mr-1" />
            <span className="text-base font-medium">Volver</span>
          </button>

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
          <h2 className="text-2xl font-bold text-green-600 mb-4">
            Historial de mantenimiento
          </h2>
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
                    { campo: "detalle", titulo: "DETALLE" }, // 👈 Nueva columna
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

                    {/* Columna Detalle centrada */}
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

            {/* Filtros */}
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
        </div>
      </main>
    </div>
  );
};

export default Hoja_vidam;
