// src/pages/agronomo/Historial_labores.jsx
import React, { useState, useRef, useEffect } from "react";
import {
  IconHome, IconClipboardList, IconChartBar, IconCloudRain,
  IconTractor, IconSettings, IconBox, IconUsersGroup, IconPlant,
  IconFrame, IconDownload, IconChevronLeft, IconEye, IconFilter,
  IconSortAscending2, IconSortDescending2, IconTool, IconLogout
} from "@tabler/icons-react";
import faviconBlanco from "../../assets/favicon-blanco.png";
import { useNavigate } from "react-router-dom";

const Historial_labores = () => {
  const navigate = useNavigate();

  // --- Datos e historial (igual que antes)
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

  // --- Estados y referencias para filtros (igual que antes)
  const [filtroActivo, setFiltroActivo] = useState(null);
  const [valoresSeleccionados, setValoresSeleccionados] = useState({});
  const [ordenCampo, setOrdenCampo] = useState(null);
  const [busquedas, setBusquedas] = useState({});
  const [filtroPosicion, setFiltroPosicion] = useState({ top: 0, left: 0 });
  const filtroRef = useRef(null);

  // --- Estados y referencias para menú flotante de perfil
  const nombreUsuario = "Juan Pérez"; // Cambiar por el nombre real del usuario
  const letraInicial = (nombreUsuario?.trim()?.[0] || "U").toUpperCase();
  const [mostrarTarjeta, setMostrarTarjeta] = useState(false);
  const tarjetaRef = useRef(null);

  // --- Funciones para filtros (igual que antes)
  const getValoresUnicos = (campo) => {
    const search = (busquedas[campo] || "").toLowerCase();
    return [...new Set(historialCompleto.map(e => e[campo]))].filter(v =>
      v.toLowerCase().includes(search)
    );
  };

  const toggleFiltro = (campo, e) => {
    const icono = e.currentTarget.getBoundingClientRect();
    setFiltroActivo(filtroActivo === campo ? null : campo);
    setFiltroPosicion({
      top: icono.bottom + window.scrollY + 4,
      left: icono.left + window.scrollX
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

  const ordenar = (campo, orden) => {
    setOrdenCampo({ campo, orden });
  };

  const handleBusqueda = (campo, texto) => {
    setBusquedas({ ...busquedas, [campo]: texto });
  };

  // --- Filtrado y ordenamiento del historial (igual que antes)
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

  // --- Cerrar filtros al click fuera
  useEffect(() => {
    const clickFuera = (e) => {
      if (filtroRef.current && !filtroRef.current.contains(e.target)) {
        setFiltroActivo(null);
      }
      // Cerrar tarjeta perfil si se clic afuera
      if (tarjetaRef.current && !tarjetaRef.current.contains(e.target)) {
        setMostrarTarjeta(false);
      }
    };
    document.addEventListener("mousedown", clickFuera);
    return () => document.removeEventListener("mousedown", clickFuera);
  }, []);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="bg-green-600 w-28 h-screen flex flex-col items-center py-6 justify-between relative">
        {/* Logo fijo */}
        <div className="mb-6">
          <img src={faviconBlanco} alt="Logo" className="w-11 h-11" />
        </div>

        {/* Iconos con scroll */}
        <div className="flex-1 flex flex-col items-center space-y-8 pr-1 overflow-y-auto scrollbar-hide-only">
          {/* Icono activo */}
          <div className="relative">
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-11 bg-white rounded-full" />
            <button onClick={() => navigate("/Homeagro")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconHome className="text-white w-11 h-11" />
          </button>
          </div>

          {/* Navegación */}
          <button onClick={() => navigate("/Laboresagro")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconClipboardList className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/Informesagro")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconChartBar className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/Bodegaagro")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconBox className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/variablesclimaticas")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconCloudRain className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/maquinariaequipos")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconTractor className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/manejopersonal")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconUsersGroup className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/crearfinca")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconPlant className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/crearlote")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconFrame className="text-white w-11 h-11" />
          </button>
        </div>
    

        {/* Botón perfil con inicial fijo abajo */}
        <div className="relative mb-4">
          <button
            onClick={() => setMostrarTarjeta(!mostrarTarjeta)}
            className="bg-white w-12 h-12 rounded-full flex items-center justify-center text-green-600 font-bold text-xl shadow hover:scale-110 transition"
          >
            {letraInicial}
          </button>

          {mostrarTarjeta && (
            <div
              ref={tarjetaRef}
              className="absolute bottom-16 left-14 w-52 bg-white/95 border-2 border-gray-300 rounded-xl shadow-2xl py-3 z-50"
            >
              <button
                onClick={() => { setMostrarTarjeta(false); navigate("/ajustesagro"); }}
                className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              >
                <IconSettings className="w-5 h-5 mr-2 text-green-600" />
                Ajustes
              </button>
              <button
                onClick={() => { setMostrarTarjeta(false); navigate("/soporteagro"); }}
                className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              >
                <IconTool className="w-5 h-5 mr-2 text-green-600" />
                Soporte
              </button>
              <button
                onClick={() => { setMostrarTarjeta(false); navigate("/login"); }}
                className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-600"
              >
                <IconLogout className="w-5 h-5 mr-2 text-red-600" />
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Contenido */}
      <div className="flex-1 p-12 bg-[#f6f6f6] min-h-screen">
        <h1 className="text-3xl font-bold text-green-600 mb-6">Historial labores</h1>

        <button
          onClick={() => navigate("/Laboresagro")}
          className="flex items-center text-green-600 font-semibold mb-6 text-lg hover:underline"
        >
          <IconChevronLeft className="w-5 h-5 mr-1" /> Volver
        </button>

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

        <div className="bg-white border border-gray-300 rounded-xl shadow-md overflow-x-auto relative">
          <table className="w-full text-base text-center">
            <thead className="bg-green-600 text-white">
              <tr>
                {columnas.map((col, idx) => (
                  <th key={idx} className="px-6 py-4">
                    <div className="flex justify-center items-center gap-2">
                      <span className="uppercase">{col}</span>
                      <button onClick={(e) => toggleFiltro(col, e)}>
                        <IconFilter className="w-4 h-4" />
                      </button>
                    </div>
                  </th>
                ))}
                <th className="px-6 py-4">OBSERVACIONES</th>
              </tr>
            </thead>
            <tbody>
              {historialFiltrado.map((item, i) => (
                <tr key={i} className="border-t hover:bg-gray-50 transition">
                  <td className="px-6 py-4 border-gray-200">{item.fecha}</td>
                  <td className="px-6 py-4 border-gray-200">{item.actividad}</td>
                  <td className="px-6 py-4 border-gray-200">{item.responsable}</td>
                  <td className="px-6 py-4 border-gray-200">{item.estado}</td>
                  <td className="px-6 py-4 border-gray-200">{item.observaciones}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Filtros */}
          {filtroActivo === "fecha" ? (
            <div
              ref={filtroRef}
              className="fixed bg-white text-black shadow-md border rounded z-50 p-3 w-60 text-left text-sm"
              style={{ top: filtroPosicion.top, left: filtroPosicion.left }}
            >
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
              <button
                onClick={() => limpiarFiltro("fecha")}
                className="text-blue-600 hover:underline text-xs lowercase mt-2"
              >
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

              <button
                onClick={() => ordenar(filtroActivo, "asc")}
                className="text-green-700 flex items-center gap-1 mb-1"
              >
                <IconSortAscending2 className="w-4 h-4" />
                Ordenar A → Z
              </button>

              <button
                onClick={() => ordenar(filtroActivo, "desc")}
                className="text-green-700 flex items-center gap-1 mb-2"
              >
                <IconSortDescending2 className="w-4 h-4" />
                Ordenar Z → A
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
                Borrar filtro
              </button>
            </div>
          )}
        </div>

        <div className="mt-4 flex justify-end">
          <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition text-base font-semibold">
            Exportar historial
          </button>
        </div>
      </div>
    </div>
  );
};

export default Historial_labores;

