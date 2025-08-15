// src/pages/agronomo/Detalles_agrop.jsx
import React, { useState, useRef, useEffect } from "react";
import {
  IconHome,
  IconClipboardList,
  IconChartBar,
  IconCloudRain,
  IconTractor,
  IconSettings,
  IconBox,
  IconUsersGroup,
  IconPlant,
  IconFrame,
  IconChevronLeft,
  IconFilter,
  IconSortAscending2,
  IconSortDescending2,
  IconTool,
  IconLogout,
  IconPlant2,
  IconBook,
} from "@tabler/icons-react";
import faviconBlanco from "../../assets/favicon-blanco.png";
import { useNavigate } from "react-router-dom";

const Detalles_agrop = () => {
  const navigate = useNavigate();
  const filtroRef = useRef(null);
  const tarjetaPerfilRef = useRef(null);

  // Estado de tarjeta de perfil y filtros
  const [mostrarTarjeta, setMostrarTarjeta] = useState(false);
  const [filtroActivo, setFiltroActivo] = useState(null);
  const [filtroPosicion, setFiltroPosicion] = useState({ top: 0, left: 0 });
  const [valoresSeleccionados, setValoresSeleccionados] = useState({});
  const [busquedas, setBusquedas] = useState({});
  const [ordenCampo, setOrdenCampo] = useState(null);

  // Datos usuario
  const nombreUsuario = "Juan Pérez";
  const letraInicial = (nombreUsuario?.trim()?.[0] || "U").toUpperCase();

  // Datos tabla
  const columnas = ["fecha", "tipo", "lote", "cantidad", "um", "saldo"];
  const movimientos = [
    { fecha: "2025-06-15", tipo: "Entrada", lote: "1", cantidad: "50", um: "Kg", saldo: "350" },
    { fecha: "2025-06-16", tipo: "Salida", lote: "2", cantidad: "20", um: "Kg", saldo: "330" },
    { fecha: "2025-06-17", tipo: "Entrada", lote: "3", cantidad: "45", um: "Kg", saldo: "375" },
  ];

  // Eventos cierre de elementos flotantes
  useEffect(() => {
    const clickFueraFiltro = (e) => {
      if (filtroRef.current && !filtroRef.current.contains(e.target)) setFiltroActivo(null);
    };
    const clickFueraPerfil = (e) => {
      if (tarjetaPerfilRef.current && !tarjetaPerfilRef.current.contains(e.target)) setMostrarTarjeta(false);
    };
    document.addEventListener("mousedown", clickFueraFiltro);
    document.addEventListener("mousedown", clickFueraPerfil);
    return () => {
      document.removeEventListener("mousedown", clickFueraFiltro);
      document.removeEventListener("mousedown", clickFueraPerfil);
    };
  }, []);

  // Utilidades filtro y orden
  const getValoresUnicos = (campo) => {
    if (campo === "fecha") return [];
    const search = (busquedas[campo] || "").toLowerCase();
    return [...new Set(movimientos.map((e) => e[campo]))].filter((v) =>
      String(v).toLowerCase().includes(search)
    );
  };

  const toggleFiltro = (campo, e) => {
    const icono = e.currentTarget.getBoundingClientRect();
    const filtroWidth = 240;
    const pantallaWidth = window.innerWidth;
    let left = icono.left + window.scrollX;
    if (left + filtroWidth > pantallaWidth) left = pantallaWidth - filtroWidth - 10;
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
  const handleBusqueda = (campo, texto) => setBusquedas({ ...busquedas, [campo]: texto });

  const movimientosFiltrados = movimientos
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
    <div className="flex">
      {/* Sidebar */}
      <div className="bg-green-600 w-28 h-screen flex flex-col items-center py-6 justify-between relative">
        <div className="sticky top-0 mb-6 bg-green-600 z-10">
          <img src={faviconBlanco} alt="Logo" className="w-11 h-11 mx-auto" />
        </div>
        <div className="flex-1 flex flex-col items-center space-y-8 pr-1 overflow-y-auto scrollbar-hide-only">
          {/* Icono activo */}
          <div className="relative">
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-11 bg-white rounded-full" />
            <button onClick={() => navigate("/Homeagro")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
              <IconHome className="text-white w-11 h-11" />
            </button>
          </div>
          {/* Navegación */}
          {[{path:"/Laboresagro",icon:IconClipboardList},{path:"/Informesagro",icon:IconChartBar},{path:"/Bodegaagro",icon:IconBox},{path:"/variablesclimaticas",icon:IconCloudRain},{path:"/maquinariaequipos",icon:IconTractor},{path:"/manejopersonal",icon:IconUsersGroup},{path:"/crearfinca",icon:IconPlant},{path:"/crearlote",icon:IconFrame},{path:"/produccionagro",icon:IconPlant2},{path:"/cuadernocampo",icon:IconBook}].map((item,i)=>(
            <button key={i} onClick={()=>navigate(item.path)} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
              <item.icon className="text-white w-11 h-11" />
            </button>
          ))}
        </div>
        {/* Perfil */}
        <div className="relative mb-4">
          <button onClick={() => setMostrarTarjeta(!mostrarTarjeta)} className="bg-white w-12 h-12 rounded-full flex items-center justify-center text-green-600 font-bold text-xl shadow hover:scale-110 transition">
            {letraInicial}
          </button>
          {mostrarTarjeta && (
            <div ref={tarjetaPerfilRef} className="absolute bottom-16 left-14 w-52 bg-white/95 border-2 border-gray-300 rounded-xl shadow-2xl py-3 z-50">
              <button onClick={() => {setMostrarTarjeta(false);navigate("/ajustesagro");}} className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                <IconSettings className="w-5 h-5 mr-2 text-green-600" /> Ajustes
              </button>
              <button onClick={() => {setMostrarTarjeta(false);navigate("/soporteagro");}} className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                <IconTool className="w-5 h-5 mr-2 text-green-600" /> Soporte
              </button>
              <button onClick={() => {setMostrarTarjeta(false);navigate("/");}} className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-600">
                <IconLogout className="w-5 h-5 mr-2 text-red-600" /> Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 p-10">
        <button onClick={() => navigate("/Bodegaagro")} className="flex items-center text-green-600 font-semibold mb-6 text-lg hover:underline">
          <IconChevronLeft className="w-5 h-5 mr-1" /> Volver
        </button>

        {/* Datos producto */}
        <h1 className="text-3xl font-bold text-green-700 mb-6">Detalle del producto</h1>
        <div className="border border-gray-400 rounded-lg p-6 text-lg grid grid-cols-2 gap-y-2 max-w-3xl mb-10">
          <div><span className="font-bold">Producto:</span> Urea</div>
          <div><span className="font-bold">Ingrediente activo:</span> Nitrogeno 46%</div>
          <div><span className="font-bold">Finca:</span> La esmeralda</div>
          <div><span className="font-bold">Categoría:</span> Fertilizante</div>
          <div><span className="font-bold">Saldo:</span> 300</div>
        </div>

        {/* Tabla movimientos */}
        <h2 className="text-2xl font-bold text-green-700 mb-4">Movimiento del producto</h2>
        <div className="bg-white border border-gray-300 rounded-xl overflow-auto relative">
          <table className="w-full text-left text-base">
            <thead className="bg-green-600 text-white">
              <tr>
                {columnas.map((col, idx) => (
                  <th key={idx} className="px-4 py-3 border-r border-gray-300 uppercase text-center">
                    <div className="flex justify-center items-center gap-2">
                      <span>{col.toUpperCase()}</span>
                      <button onClick={(e) => toggleFiltro(col, e)}>
                        <IconFilter className="w-4 h-4" />
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {movimientosFiltrados.map((m, i) => (
                <tr key={i} className="border-b border-gray-200">
                  <td className="px-4 py-2 border-r border-gray-200 text-center">{m.fecha}</td>
                  <td className="px-4 py-2 border-r border-gray-200 text-center">{m.tipo}</td>
                  <td className="px-4 py-2 border-r border-gray-200 text-center">{m.lote}</td>
                  <td className="px-4 py-2 border-r border-gray-200 text-center">{m.cantidad}</td>
                  <td className="px-4 py-2 border-r border-gray-200 text-center">{m.um}</td>
                  <td className="px-4 py-2 border-r border-gray-200 text-center">{m.saldo}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Filtro dinámico */}
          {filtroActivo && (
            <div ref={filtroRef} className="fixed bg-white text-black shadow-md border rounded z-50 p-3 w-60 text-left text-sm" style={{ top: filtroPosicion.top, left: filtroPosicion.left }}>
              <div className="font-semibold mb-2">Filtrar por {filtroActivo.charAt(0).toUpperCase() + filtroActivo.slice(1)}</div>
              {filtroActivo !== "fecha" ? (
                <>
                  <button onClick={() => ordenar(filtroActivo, "asc")} className="text-green-700 flex items-center gap-1 mb-1">
                    <IconSortAscending2 className="w-4 h-4" /> Ordenar A → Z
                  </button>
                  <button onClick={() => ordenar(filtroActivo, "desc")} className="text-green-700 flex items-center gap-1 mb-2">
                    <IconSortDescending2 className="w-4 h-4" /> Ordenar Z → A
                  </button>
                  <input type="text" placeholder="Buscar..." className="w-full border border-gray-300 px-2 py-1 rounded mb-2 text-sm" value={busquedas[filtroActivo] || ""} onChange={(e) => handleBusqueda(filtroActivo, e.target.value)} />
                  <div className="flex flex-col max-h-40 overflow-y-auto">
                    {getValoresUnicos(filtroActivo).map((val, idx) => (
                      <label key={idx} className="flex items-center gap-2 mb-1">
                        <input type="checkbox" checked={(valoresSeleccionados[filtroActivo] || []).includes(val)} onChange={() => toggleValor(filtroActivo, val)} className="accent-green-600" />
                        {String(val).charAt(0).toUpperCase() + String(val).slice(1).toLowerCase()}
                      </label>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  {Object.entries(movimientos.reduce((acc, { fecha }) => {
                    const [year, month, day] = fecha.split("-");
                    const monthName = new Date(fecha).toLocaleString("default", { month: "long" });
                    acc[year] = acc[year] || {};
                    acc[year][monthName] = acc[year][monthName] || new Set();
                    acc[year][monthName].add(day);
                    return acc;
                  }, {})).map(([year, months]) => (
                    <div key={year} className="mb-2">
                      <div className="font-medium">{year}</div>
                      {Object.entries(months).map(([month, days]) => (
                        <div key={month} className="ml-4">
                          <div className="font-medium">{month}</div>
                          {[...days].map((day) => {
                            const fullDate = `2025-${String(new Date(`${month} 1`).getMonth() + 1).padStart(2, "0")}-${day}`;
                            return (
                              <label key={day} className="ml-6 flex items-center gap-2">
                                <input type="checkbox" checked={(valoresSeleccionados["fecha"] || []).includes(fullDate)} onChange={() => toggleValor("fecha", fullDate)} />
                                {day}
                              </label>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  ))}
                </>
              )}
              <button onClick={() => limpiarFiltro(filtroActivo)} className="text-blue-600 hover:underline text-xs lowercase mt-2">Borrar filtro</button>
            </div>
          )}
        </div>

        {/* Botón exportar */}
        <div className="flex justify-end mt-6">
          <button className="bg-green-600 text-white px-8 py-2 rounded-md hover:bg-green-700 text-lg font-semibold">Exportar historial</button>
        </div>
      </div>
    </div>
  );
};

export default Detalles_agrop;




