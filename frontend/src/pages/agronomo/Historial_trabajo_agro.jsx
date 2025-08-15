// src/pages/agronomo/Historial_trabajo_agro.jsx
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  IconHome, IconClipboardList, IconChartBar, IconBox, IconCloudRain,
  IconTractor, IconUsersGroup, IconPlant, IconFrame, IconSettings,
  IconTool, IconLogout, IconArrowLeft, IconFilter, IconSortAscending2,
  IconSortDescending2, IconPlant2, IconBook
} from "@tabler/icons-react";
import faviconBlanco from "../../assets/favicon-blanco.png";

const Historial_trabajo_agro = () => {
  const navigate = useNavigate();

  // Referencias para menú perfil y filtros
  const tarjetaRef = useRef(null);
  const filtroRef = useRef(null);

  // Usuario y letra inicial para avatar
  const nombreUsuario = "Juan Pérez"; // Reemplazar por el usuario real
  const letraInicial = (nombreUsuario?.trim()?.[0] || "U").toUpperCase();

  // Estados menú perfil
  const [mostrarTarjeta, setMostrarTarjeta] = useState(false);

  // Cerrar tarjeta al hacer click fuera
  useEffect(() => {
    const manejarClickFuera = (e) => {
      if (tarjetaRef.current && !tarjetaRef.current.contains(e.target)) {
        setMostrarTarjeta(false);
      }
    };
    document.addEventListener("mousedown", manejarClickFuera);
    return () => document.removeEventListener("mousedown", manejarClickFuera);
  }, []);

  // Datos de información general
  const infoGeneral = {
    codigo: 1,
    maquina: "Tractor",
    referencia: "JD 5055",
    ubicacion: "La Esmeralda",
    estado: "Óptimo",
  };

  // Datos de historial
  const historial = [
    { fecha: "2025-06-15", labor: "Siembra", "horas trabajadas": "6 horas", "horas maquina": "4 horas", observaciones: "Se limpió lote 2, clima nublado" },
    { fecha: "2025-06-15", labor: "Desyerba guadaña", "horas trabajadas": "8 horas", "horas maquina": "3 horas", observaciones: "Cuchilla se atascó temporalmente. Se solucionó" },
    { fecha: "2025-06-15", labor: "Recolección", "horas trabajadas": "4 horas", "horas maquina": "1 hora", observaciones: "Trabajo en área común. Máquina en estado óptimo" },
  ];

  const columnas = ["fecha", "labor", "horas maquina", "observaciones"];

  // Estados para filtros y ordenamiento
  const [filtroActivo, setFiltroActivo] = useState(null);
  const [filtroPosicion, setFiltroPosicion] = useState({ top: 0, left: 0 });
  const [valoresSeleccionados, setValoresSeleccionados] = useState({});
  const [busquedas, setBusquedas] = useState({});
  const [ordenCampo, setOrdenCampo] = useState(null);

  // Obtener valores únicos por campo
  const getValoresUnicos = (campo) => {
    const search = (busquedas[campo] || "").toLowerCase();
    return [...new Set(historial.map((e) => e[campo]))].filter((v) =>
      v.toLowerCase().includes(search)
    );
  };

  // Abrir/cerrar filtro
  const toggleFiltro = (campo, e) => {
    const icono = e.currentTarget.getBoundingClientRect();
    setFiltroActivo(filtroActivo === campo ? null : campo);
    setFiltroPosicion({
      top: icono.bottom + window.scrollY + 4,
      left: icono.left + window.scrollX,
    });
  };

  // Seleccionar/deseleccionar valor de filtro
  const toggleValor = (campo, valor) => {
    const seleccionados = new Set(valoresSeleccionados[campo] || []);
    seleccionados.has(valor) ? seleccionados.delete(valor) : seleccionados.add(valor);
    setValoresSeleccionados({ ...valoresSeleccionados, [campo]: [...seleccionados] });
  };

  // Limpiar filtro
  const limpiarFiltro = (campo) => {
    const actualizado = { ...valoresSeleccionados };
    delete actualizado[campo];
    setValoresSeleccionados(actualizado);
  };

  // Ordenar resultados
  const ordenar = (campo, orden) => setOrdenCampo({ campo, orden });

  // Buscar dentro de un filtro
  const handleBusqueda = (campo, texto) => {
    setBusquedas({ ...busquedas, [campo]: texto });
  };

  // Aplicar filtros y ordenamiento
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

  // Cerrar filtro al hacer click fuera
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
    <div className="flex">
      {/* Sidebar */}
      <div className="bg-green-600 w-28 h-screen flex flex-col items-center py-6 justify-between relative">
        {/* Logo */}
        <div className="sticky top-0 mb-6 bg-green-600 z-10">
          <img src={faviconBlanco} alt="Logo" className="w-11 h-11 mx-auto" />
        </div>

        {/* Menú navegación */}
        <div className="flex-1 flex flex-col items-center space-y-8 pr-1 overflow-y-auto scrollbar-hide-only">
          {/* Icono activo */}
          <div className="relative">
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-11 bg-white rounded-full" />
            <button onClick={() => navigate("/Homeagro")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
              <IconHome className="text-white w-11 h-11" />
            </button>
          </div>
          <button onClick={() => navigate("/Laboresagro")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"><IconClipboardList className="text-white w-11 h-11" /></button>
          <button onClick={() => navigate("/Informesagro")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"><IconChartBar className="text-white w-11 h-11" /></button>
          <button onClick={() => navigate("/Bodegaagro")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"><IconBox className="text-white w-11 h-11" /></button>
          <button onClick={() => navigate("/variablesclimaticas")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"><IconCloudRain className="text-white w-11 h-11" /></button>
          <button onClick={() => navigate("/maquinariaequipos")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"><IconTractor className="text-white w-11 h-11" /></button>
          <button onClick={() => navigate("/manejopersonal")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"><IconUsersGroup className="text-white w-11 h-11" /></button>
          <button onClick={() => navigate("/crearfinca")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"><IconPlant className="text-white w-11 h-11" /></button>
          <button onClick={() => navigate("/crearlote")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"><IconFrame className="text-white w-11 h-11" /></button>
          <button onClick={() => navigate("/produccionagro")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"><IconPlant2 className="text-white w-11 h-11" /></button>
          <button onClick={() => navigate("/cuadernocampo")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"><IconBook className="text-white w-11 h-11" /></button>
        </div>

        {/* Botón perfil */}
        <div className="relative mb-4">
          <button onClick={() => setMostrarTarjeta(!mostrarTarjeta)} className="bg-white w-12 h-12 rounded-full flex items-center justify-center text-green-600 font-bold text-xl shadow hover:scale-110 transition">
            {letraInicial}
          </button>
          {mostrarTarjeta && (
            <div ref={tarjetaRef} className="absolute bottom-16 left-14 w-52 bg-white/95 border-2 border-gray-300 rounded-xl shadow-2xl py-3 z-50">
              <button onClick={() => { setMostrarTarjeta(false); navigate("/ajustes"); }} className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100"><IconSettings className="w-5 h-5 mr-2 text-green-600" /> Ajustes</button>
              <button onClick={() => { setMostrarTarjeta(false); navigate("/soporteagro"); }} className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100"><IconTool className="w-5 h-5 mr-2 text-green-600" /> Soporte</button>
              <button onClick={() => { setMostrarTarjeta(false); navigate("/"); }} className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-600"><IconLogout className="w-5 h-5 mr-2 text-red-600" /> Cerrar sesión</button>
            </div>
          )}
        </div>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 p-10 overflow-auto">
        {/* Botón volver */}
        <button onClick={() => navigate("/maquinariaequipos")} className="flex items-center text-green-600 font-medium mb-6">
          <IconArrowLeft className="w-6 h-6 mr-1" /> Volver
        </button>

        {/* Título */}
        <h1 className="text-3xl font-bold text-green-600 mb-6">Historial de trabajo</h1>

        {/* Información general */}
        <div className="bg-white border border-gray-300 p-6 rounded-xl mb-6 max-w-4xl">
          <h2 className="text-2xl font-bold mb-4 text-green-600">Información general</h2>
          <div className="grid grid-cols-2 gap-x-12 gap-y-2 text-lg">
            <p><strong>Código Equipo:</strong> {infoGeneral.codigo}</p>
            <p><strong>Ubicación:</strong> {infoGeneral.ubicacion}</p>
            <p><strong>Máquina:</strong> {infoGeneral.maquina}</p>
            <p><strong>Estado:</strong> {infoGeneral.estado}</p>
            <p><strong>Referencia:</strong> {infoGeneral.referencia}</p>
          </div>
        </div>

        {/* Tabla historial */}
        <div className="overflow-x-auto relative">
          <table className="w-full bg-white text-center border border-gray-300 text-base">
            <thead className="bg-green-600 text-white font-bold">
              <tr>
                {columnas.map((col, idx) => (
                  <th key={idx} className="p-3 border">
                    <div className="flex justify-center items-center gap-2">
                      <span>{col.toUpperCase()}</span>
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
                <tr key={i} className="hover:bg-gray-50">
                  {columnas.map((campo, j) => (
                    <td key={j} className="p-3 border">{item[campo]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          {/* Filtros */}
          {filtroActivo === "fecha"
            ? /* Filtro por fecha agrupada */
              <div ref={filtroRef} className="fixed bg-white text-black shadow-md border rounded z-50 p-3 w-60 text-left text-sm" style={{ top: filtroPosicion.top, left: filtroPosicion.left }}>
                {/* Agrupación por año, mes y día */}
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
                              <input type="checkbox" checked={(valoresSeleccionados["fecha"] || []).includes(fullDate)} onChange={() => toggleValor("fecha", fullDate)} className="accent-green-600" />
                              {day}
                            </label>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                ))}
                <button onClick={() => limpiarFiltro("fecha")} className="text-blue-600 hover:underline text-xs lowercase mt-2">borrar filtro</button>
              </div>
            : filtroActivo && (
              /* Filtro genérico */
              <div ref={filtroRef} className="fixed bg-white text-black shadow-md border rounded z-50 p-3 w-64 text-left text-sm" style={{ top: filtroPosicion.top, left: filtroPosicion.left }}>
                <div className="font-semibold mb-2">Filtrar por {filtroActivo.charAt(0).toUpperCase() + filtroActivo.slice(1)}</div>
                <button onClick={() => ordenar(filtroActivo, "asc")} className="text-green-700 flex items-center gap-1 mb-1"><IconSortAscending2 className="w-4 h-4" /> Ordenar A → Z</button>
                <button onClick={() => ordenar(filtroActivo, "desc")} className="text-green-700 flex items-center gap-1 mb-2"><IconSortDescending2 className="w-4 h-4" /> Ordenar Z → A</button>
                <input type="text" placeholder="Buscar..." className="w-full border border-gray-300 px-2 py-1 rounded mb-2 text-sm" value={busquedas[filtroActivo] || ""} onChange={(e) => handleBusqueda(filtroActivo, e.target.value)} />
                <div className="flex flex-col max-h-40 overflow-y-auto">
                  {getValoresUnicos(filtroActivo).map((val, idx) => (
                    <label key={idx} className="flex items-center gap-2 mb-1">
                      <input type="checkbox" checked={(valoresSeleccionados[filtroActivo] || []).includes(val)} onChange={() => toggleValor(filtroActivo, val)} className="accent-green-600" />
                      {val.charAt(0).toUpperCase() + val.slice(1)}
                    </label>
                  ))}
                </div>
                <button onClick={() => limpiarFiltro(filtroActivo)} className="text-blue-600 hover:underline text-xs lowercase mt-2">Borrar filtro</button>
              </div>
            )}
        </div>

        {/* Botón descargar */}
        <div className="flex justify-center gap-10 mt-10">
          <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded font-semibold text-lg">
            Descargar PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default Historial_trabajo_agro;




