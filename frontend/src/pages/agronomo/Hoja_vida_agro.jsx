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
  IconArrowLeft,
  IconFilter,
  IconSortAscending2,
  IconSortDescending2,
  IconTool,
  IconLogout,
  IconEye,
} from "@tabler/icons-react";
import faviconBlanco from "../../assets/favicon-blanco.png";
import { useNavigate } from "react-router-dom";

const Hoja_vida = () => {
  const navigate = useNavigate();
  const filtroRef = useRef(null);
  const [filtroActivo, setFiltroActivo] = useState(null);
  const [filtroPosicion, setFiltroPosicion] = useState({ top: 0, left: 0, rightAlign: false });
  const [valoresSeleccionados, setValoresSeleccionados] = useState({});
  const [busquedas, setBusquedas] = useState({});
  const [ordenCampo, setOrdenCampo] = useState(null);

  // Datos de la máquina y historial
  const maquina = {
    codigo: 1,
    maquina: "Tractor",
    referencia: "JD 5055",
    ubicacion: "La Esmeralda",
    estado: "Óptimo",
  };

  const historial = [
    { fecha: "2025-05-20", prev: true, correcc: false, descripcion: "Mantenimiento 1500 horas", realizado: "John Deere",
      codigoEquipo: "1", maquina: "Tractor", referencia: "JD 5055", ubicacion: "La Esmeralda", estado: "Óptimo", tipo: "Preventivo", realizadoPor: "John Deere" },
    { fecha: "2025-05-21", prev: false, correcc: true,  descripcion: "Reparación Radiador",   realizado: "Alex Condza",
      codigoEquipo: "1", maquina: "Tractor", referencia: "JD 5055", ubicacion: "La Esmeralda", estado: "Mantenimiento", tipo: "Correctivo", realizadoPor: "Alex Condza" },
    { fecha: "2025-05-22", prev: false, correcc: false, descripcion: "Cambio Refrigerante",    realizado: "Alex Condza",
      codigoEquipo: "1", maquina: "Tractor", referencia: "JD 5055", ubicacion: "La Esmeralda", estado: "En operación", tipo: "Preventivo", realizadoPor: "Alex Condza" },
    { fecha: "2025-05-23", prev: false, correcc: false, descripcion: "Cambio de llantas",      realizado: "Montalantas",
      codigoEquipo: "1", maquina: "Tractor", referencia: "JD 5055", ubicacion: "La Esmeralda", estado: "Óptimo", tipo: "Correctivo", realizadoPor: "Montalantas" },
  ];

  const columnas = [
    { campo: "fecha", label: "Fecha" },
    { campo: "prev", label: "Mantenimiento preventivo" },
    { campo: "correcc", label: "Mantenimiento correctivo" },
    { campo: "descripcion", label: "Descripción" },
    { campo: "realizado", label: "Realizado" },
    { campo: "detalle", label: "Detalle" },
  ];

  // Funciones para filtros y ordenamientos
  const getValoresUnicos = (campo) => {
    if (campo === "fecha" || campo === "descripcion" || campo === "detalle") return [];
    const search = (busquedas[campo] || "").toLowerCase();
    return [...new Set(historial.map((e) => {
      if (typeof e[campo] === "boolean") return e[campo] ? "Sí" : "No";
      return e[campo] || "";
    }))].filter((v) => v.toLowerCase().includes(search));
  };

  const toggleFiltro = (campo, e) => {
    if (campo === "descripcion" || campo === "detalle") return;
    const icono = e.currentTarget.getBoundingClientRect();
    const anchoVentana = window.innerWidth;
    const espacioDerecha = anchoVentana - icono.right;
    const rightAlign = espacioDerecha < 250;
    setFiltroActivo(filtroActivo === campo ? null : campo);
    setFiltroPosicion({
      top: icono.bottom + window.scrollY + 4,
      left: rightAlign ? icono.right - 250 : icono.left,
      rightAlign,
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

  // Menú flotante de perfil
  const nombreUsuario = "Juan Pérez";
  const letraInicial = (nombreUsuario?.trim()?.[0] || "U").toUpperCase();
  const [mostrarTarjeta, setMostrarTarjeta] = useState(false);
  const tarjetaRef = useRef(null);

  useEffect(() => {
    const manejarClickFuera = (e) => {
      if (tarjetaRef.current && !tarjetaRef.current.contains(e.target)) {
        setMostrarTarjeta(false);
      }
    };
    document.addEventListener("mousedown", manejarClickFuera);
    return () => document.removeEventListener("mousedown", manejarClickFuera);
  }, []);

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
        <div className="sticky top-0 mb-6 bg-green-600 z-10">
          <img src={faviconBlanco} alt="Logo" className="w-11 h-11 mx-auto" />
        </div>

        <div className="flex-1 flex flex-col items-center space-y-8 pr-1 overflow-y-auto scrollbar-hide-only">
          <div className="relative">
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-11 bg-white rounded-full" />
            <button onClick={() => navigate("/Homeagro")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
              <IconHome className="text-white w-11 h-11" />
            </button>
          </div>

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
                onClick={() => {
                  setMostrarTarjeta(false);
                  navigate("/ajustesagro");
                }}
                className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              >
                <IconSettings className="w-5 h-5 mr-2 text-green-600" />
                Ajustes
              </button>
              <button
                onClick={() => {
                  setMostrarTarjeta(false);
                  navigate("/soporteagro");
                }}
                className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              >
                <IconTool className="w-5 h-5 mr-2 text-green-600" />
                Soporte
              </button>
              <button
                onClick={() => {
                  setMostrarTarjeta(false);
                  navigate("/");
                }}
                className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-600"
              >
                <IconLogout className="w-5 h-5 mr-2 text-red-600" />
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 px-10 py-8 overflow-auto">
        <button
          onClick={() => navigate("/maquinariaequipos")}
          className="flex items-center text-green-600 hover:text-green-800 mb-4"
        >
          <IconArrowLeft className="w-6 h-6 mr-1" />
          <span className="text-base font-medium">Volver</span>
        </button>

        <h2 className="text-3xl font-bold text-green-600 mb-6">Hoja de vida</h2>

        <div className="bg-white border border-gray-300 p-6 rounded-xl mb-6 max-w-4xl">
          <h2 className="text-2xl font-bold mb-4 text-green-600">Información general</h2>
          <div className="grid grid-cols-2 gap-x-12 gap-y-2 text-lg">
            <div><strong>Código Equipo:</strong> {maquina.codigo}</div>
            <div><strong>Ubicación:</strong> {maquina.ubicacion}</div>
            <div><strong>Máquina:</strong> {maquina.maquina}</div>
            <div><strong>Estado:</strong> {maquina.estado}</div>
            <div><strong>Referencia:</strong> {maquina.referencia}</div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-green-600 mb-4">Historial de mantenimiento</h2>
        <div className="overflow-x-auto">
          <table className="w-full bg-white text-center border border-gray-300 text-base">
            <thead className="bg-green-600 text-white font-bold text-base">
              <tr>
                {columnas.map(({ campo, label }) => (
                  <th key={campo} className="p-3 border">
                    <div className="flex items-center justify-center gap-2">
                      <span>{label.toUpperCase()}</span>
                      {campo !== "descripcion" && campo !== "detalle" && (
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
                <tr key={index} className="hover:bg-gray-50">
                  <td className="p-3 border">{item.fecha}</td>
                  <td className="p-3 border">{item.prev ? "Sí" : "No"}</td>
                  <td className="p-3 border">{item.correcc ? "Sí" : "No"}</td>
                  <td className="p-3 border">{item.descripcion}</td>
                  <td className="p-3 border">{item.realizado}</td>
                  <td className="p-3 border">
                    <div className="flex justify-center">
                      <button
                        onClick={() => navigate("/detalle_mantenimiento", { state: item })}
                        className="flex items-center gap-2 px-3 py-1 rounded-md bg-blue-100 text-blue-700 hover:bg-blue-200 transition"
                        title="Ver detalle"
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

          {filtroActivo && (
            <div
              ref={filtroRef}
              className="fixed bg-white text-black shadow-md border rounded z-50 p-3 w-60 text-left text-sm"
              style={{ top: filtroPosicion.top, left: filtroPosicion.left }}
            >
              <div className="font-semibold mb-2">
                Filtrar por {filtroActivo.charAt(0).toUpperCase() + filtroActivo.slice(1)}
              </div>

              {filtroActivo !== "fecha" ? (
                <>
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
                      <label key={idx} className="flex items-center gap-2 mb-1 capitalize">
                        <input
                          type="checkbox"
                          checked={(valoresSeleccionados[filtroActivo] || []).includes(val)}
                          onChange={() => toggleValor(filtroActivo, val)}
                          className="accent-green-600"
                        />
                        {val.charAt(0).toUpperCase() + val.slice(1).toLowerCase()}
                      </label>
                    ))}
                  </div>
                </>
              ) : (
                <>
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
                </>
              )}

              <button onClick={() => limpiarFiltro(filtroActivo)} className="text-blue-600 hover:underline text-xs lowercase mt-2">
                borrar filtro
              </button>
            </div>
          )}
        </div>

        <div className="flex justify-center gap-10 mt-10">
          <button
            onClick={() => navigate("/registrarnovedadhv")}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold text-lg px-6 py-3 rounded-lg"
          >
            Registrar novedad
          </button>
          <button className="bg-green-600 hover:bg-green-700 text-white font-semibold text-lg px-6 py-3 rounded-lg">
            Descargar PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hoja_vida;








