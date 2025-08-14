// src/pages/agronomo/Registrar_novedad_agro.jsx
import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import {
  IconHome,
  IconClipboardList,
  IconChartBar,
  IconBox,
  IconCloudRain,
  IconTractor,
  IconUsersGroup,
  IconPlant,
  IconFrame,
  IconSettings,
  IconTool,
  IconLogout,
  IconChevronLeft,
  IconCheck,
  IconDotsVertical,
  IconAlertTriangle,
  IconCircleCheck,
  IconFilter,
  IconSortAscending2,
  IconSortDescending2,
  IconPlant2,
} from "@tabler/icons-react";
import faviconBlanco from "../../assets/favicon-blanco.png";

const MENU_WIDTH_PX = 288; // w-72
const MENU_MARGIN_PX = 8;

const Registrar_novedad_agro = () => {
  const navigate = useNavigate();

  // === Datos base + columnas para filtros ===
  const columnas = ["id", "maquina", "referencia", "estado"];
  const [maquinas, setMaquinas] = useState([
    // estado: "" (no marcado) o "Averiado"
    { id: 1, maquina: "Tractor", referencia: "JD 5055", estado: "" },
    { id: 2, maquina: "Guadaña", referencia: "Stihl MS 450", estado: "" },
    { id: 3, maquina: "Podadora", referencia: "Stihl BR 130", estado: "" },
  ]);

  // === Filtros ===
  const filtroRef = useRef(null);
  const [filtroActivo, setFiltroActivo] = useState(null);
  const [filtroPosicion, setFiltroPosicion] = useState({ top: 0, left: 0 });
  const [busquedas, setBusquedas] = useState({});
  const [valoresSeleccionados, setValoresSeleccionados] = useState({});
  const [ordenCampo, setOrdenCampo] = useState(null);

  const getValoresUnicos = (campo) => {
    const search = (busquedas[campo] || "").toLowerCase();
    return [...new Set(maquinas.map((e) => (e[campo] ?? "").toString()))].filter((v) =>
      (v || "").toLowerCase().includes(search)
    );
  };

  const toggleFiltro = (campo, e) => {
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
  const handleBusqueda = (campo, texto) =>
    setBusquedas({ ...busquedas, [campo]: texto });

  // === Alerta guardar ===
  const [alertaVisible, setAlertaVisible] = useState(false);

  // === Perfil (Sidebar original) ===
  const nombreUsuario = "Juan Pérez";
  const letraInicial = (nombreUsuario?.trim()?.[0] || "U").toUpperCase();
  const [mostrarTarjeta, setMostrarTarjeta] = useState(false);
  const tarjetaRef = useRef(null);

  // === Menú contextual (overlay con portal) ===
  const [menuIndex, setMenuIndex] = useState(null);
  const menuRef = useRef(null);
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0 });

  const openMenu = (rowIndex, e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const maxLeft =
      window.scrollX +
      document.documentElement.clientWidth -
      MENU_WIDTH_PX -
      MENU_MARGIN_PX;
    const desiredLeft = rect.right + window.scrollX - MENU_WIDTH_PX;
    const safeLeft = Math.max(
      MENU_MARGIN_PX + window.scrollX,
      Math.min(desiredLeft, maxLeft)
    );
    const top = rect.bottom + window.scrollY + MENU_MARGIN_PX;

    setMenuPos({ top, left: safeLeft });
    setMenuIndex(rowIndex);
  };

  const closeMenu = () => setMenuIndex(null);

  // Cerrar tarjeta perfil al hacer click fuera
  useEffect(() => {
    const manejarClickFuera = (e) => {
      if (tarjetaRef.current && !tarjetaRef.current.contains(e.target)) {
        setMostrarTarjeta(false);
      }
    };
    document.addEventListener("mousedown", manejarClickFuera);
    return () => document.removeEventListener("mousedown", manejarClickFuera);
  }, []);

  // Cerrar menú contextual y popover de filtros al hacer click fuera
  useEffect(() => {
    const clickFuera = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        closeMenu();
      }
      if (filtroRef.current && !filtroRef.current.contains(e.target)) {
        setFiltroActivo(null);
      }
    };
    document.addEventListener("mousedown", clickFuera);
    return () => document.removeEventListener("mousedown", clickFuera);
  }, []);

  // Acciones: marcar/desmarcar “Averiado”
  const handleEstadoChange = (index, marcarAveriado) => {
    const nuevas = [...maquinas];
    nuevas[index].estado = marcarAveriado ? "Averiado" : "";
    setMaquinas(nuevas);
  };

  const handleGuardar = () => {
    console.log("Estados actualizados:", maquinas);
    setAlertaVisible(true);
    setTimeout(() => {
      setAlertaVisible(false);
      navigate("/maquinariaequipos");
    }, 2000);
  };

  // Badge de AVERIADO (rojo si marcado, gris si no)
  const EstadoAveriadoBadge = ({ isAveriado }) => {
    const classes = isAveriado
      ? "bg-red-50 text-red-700 ring-red-200"
      : "bg-gray-50 text-gray-600 ring-gray-300";
    const iconClass = isAveriado ? "text-red-600" : "text-gray-500";
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full ring-1 text-sm font-semibold shadow-sm ${classes}`}
      >
        <IconAlertTriangle className={`w-4 h-4 ${iconClass}`} />
        Averiado
      </span>
    );
  };

  // === Aplicar filtros y orden ===
  const datosFiltrados = maquinas
    .filter((item) =>
      columnas.every((campo) =>
        !valoresSeleccionados[campo] || valoresSeleccionados[campo].length === 0
          ? true
          : valoresSeleccionados[campo].includes((item[campo] ?? "").toString())
      )
    )
    .sort((a, b) => {
      if (!ordenCampo) return 0;
      const { campo, orden } = ordenCampo;
      return orden === "asc"
        ? (a[campo] ?? "").toString().localeCompare((b[campo] ?? "").toString())
        : (b[campo] ?? "").toString().localeCompare((a[campo] ?? "").toString());
    });

  // === Portal del menú contextual (overlay) ===
  const MenuOverlay = ({ children }) => {
    return createPortal(children, document.body);
  };

  return (
    <div className="flex">
      {/* Sidebar (conservado del registrar_novedad_agro original) */}
      <div className="bg-green-600 w-28 h-screen flex flex-col items-center py-6 justify-between relative">
        <div className="sticky top-0 mb-6 bg-green-600 z-10">
          <img src={faviconBlanco} alt="Logo" className="w-11 h-11 mx-auto" />
        </div>

        <div className="flex-1 flex flex-col items-center space-y-8 pr-1 overflow-y-auto scrollbar-hide-only">
          <div className="relative">
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-11 bg-white rounded-full" />
            <button
              onClick={() => navigate("/Homeagro")}
              className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
            >
              <IconHome className="text-white w-11 h-11" />
            </button>
          </div>

          <button
            onClick={() => navigate("/Laboresagro")}
            className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
          >
            <IconClipboardList className="text-white w-11 h-11" />
          </button>
          <button
            onClick={() => navigate("/Informesagro")}
            className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
          >
            <IconChartBar className="text-white w-11 h-11" />
          </button>
          <button
            onClick={() => navigate("/Bodegaagro")}
            className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
          >
            <IconBox className="text-white w-11 h-11" />
          </button>
          <button
            onClick={() => navigate("/variablesclimaticas")}
            className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
          >
            <IconCloudRain className="text-white w-11 h-11" />
          </button>
          <button
            onClick={() => navigate("/maquinariaequipos")}
            className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
          >
            <IconTractor className="text-white w-11 h-11" />
          </button>
          <button
            onClick={() => navigate("/manejopersonal")}
            className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
          >
            <IconUsersGroup className="text-white w-11 h-11" />
          </button>
          <button
            onClick={() => navigate("/crearfinca")}
            className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
          >
            <IconPlant className="text-white w-11 h-11" />
          </button>
          <button
            onClick={() => navigate("/crearlote")}
            className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
          >
            <IconFrame className="text-white w-11 h-11" />
          </button>
          <button 
            onClick={() => navigate("/produccionagro")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconPlant2 className="text-white w-11 h-11" />
          </button>
        </div>

        <div className="relative mb-4 flex justify-center">
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
                <IconSettings className="w-5 h-5 mr-2 text-green-600" /> Ajustes
              </button>
              <button
                onClick={() => {
                  setMostrarTarjeta(false);
                  navigate("/soporteagro");
                }}
                className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              >
                <IconTool className="w-5 h-5 mr-2 text-green-600" /> Soporte
              </button>
              <button
                onClick={() => {
                  setMostrarTarjeta(false);
                  navigate("/login");
                }}
                className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-600"
              >
                <IconLogout className="w-5 h-5 mr-2 text-red-600" /> Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 p-10 overflow-auto relative bg-gray-50">
        {alertaVisible && (
          <div className="fixed top-3 left-1/2 -translate-x-1/2 z-[1000] bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 text-base font-semibold">
            <IconCheck className="w-5 h-5" /> Estados actualizados exitosamente
          </div>
        )}

        <button
          onClick={() => navigate("/maquinariaequipos")}
          className="flex items-center text-green-600 font-semibold mb-6 text-lg hover:underline"
        >
          <IconChevronLeft className="w-5 h-5 mr-1" /> Volver
        </button>

        <h2 className="text-3xl font-bold text-green-700 mb-4">
          Registrar novedad de máquina
        </h2>

        {/* Tabla con filtros */}
        <div className="overflow-x-auto rounded-lg shadow-lg relative bg-white">
          <table className="min-w-full text-base">
            <thead className="bg-green-600 text-white font-bold text-center">
              <tr>
                {columnas.map((col, idx) => (
                  <th key={idx} className="p-4 border">
                    <div className="flex items-center justify-center gap-2">
                      <span>{col.toUpperCase()}</span>
                      <button onClick={(e) => toggleFiltro(col, e)}>
                        <IconFilter className="w-4 h-4" />
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="text-center">
              {datosFiltrados.map((m, index) => {
                const isAveriado = m.estado === "Averiado";
                return (
                  <tr key={m.id} className="hover:bg-gray-100">
                    <td className="p-4 border">{m.id}</td>
                    <td className="p-4 border">{m.maquina}</td>
                    <td className="p-4 border">{m.referencia}</td>
                    <td className="p-4 border">
                      <div className="inline-flex items-center gap-2">
                        <EstadoAveriadoBadge isAveriado={isAveriado} />
                        <button
                          onClick={(e) => openMenu(index, e)}
                          className={`inline-flex items-center justify-center w-9 h-9 rounded-lg border shadow-sm transition
                            ${
                              isAveriado
                                ? "border-red-200 bg-red-50 text-red-600 hover:bg-red-100"
                                : "border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100"
                            }`}
                        >
                          <IconDotsVertical className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Popover de filtros */}
          {filtroActivo && (
            <div
              ref={filtroRef}
              className="fixed bg-white text-black shadow-md border rounded z-[1100] p-3 w-60 text-left text-sm"
              style={{ top: filtroPosicion.top, left: filtroPosicion.left }}
            >
              <div className="font-semibold mb-2">
                Filtrar por{" "}
                {filtroActivo.charAt(0).toUpperCase() + filtroActivo.slice(1)}
              </div>

              <button
                onClick={() => ordenar(filtroActivo, "asc")}
                className="text-green-700 flex items-center gap-1 mb-1 capitalize"
              >
                <IconSortAscending2 className="w-4 h-4" /> Ordenar A → Z
              </button>
              <button
                onClick={() => ordenar(filtroActivo, "desc")}
                className="text-green-700 flex items-center gap-1 mb-2 capitalize"
              >
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
                    {val === "" ? "—" : val}
                  </label>
                ))}
              </div>

              <button
                onClick={() => limpiarFiltro(filtroActivo)}
                className="text-blue-600 hover:underline text-xs capitalize mt-2"
              >
                Borrar filtro
              </button>
            </div>
          )}
        </div>

        {/* Menú contextual en PORTAL (overlay real) */}
        {menuIndex !== null && (
          <MenuOverlay>
            <div
              ref={menuRef}
              className="fixed w-72 bg-white border border-gray-100 rounded-2xl shadow-2xl p-2 z-[1200]"
              style={{ top: menuPos.top, left: menuPos.left }}
            >
              <div className="px-3 pt-2 pb-1 text-xs font-medium text-gray-500">
                Selecciona una opción
              </div>

              {/* Marcar como AVERIADO (si NO está marcado) */}
              {maquinas[menuIndex]?.estado !== "Averiado" && (
                <button
                  onClick={() => {
                    handleEstadoChange(menuIndex, true);
                    closeMenu();
                  }}
                  className="w-full flex items-center gap-3 px-3 py-3 rounded-xl transition text-left hover:bg-gray-100"
                >
                  <div className="shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-lg border">
                    <IconCircleCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">Marcar como averiado</div>
                    <div className="text-xs text-gray-500">
                      El equipo quedará en estado “Averiado”.
                    </div>
                  </div>
                </button>
              )}

              {/* DESMARCAR AVERIADO (si está marcado) */}
              {maquinas[menuIndex]?.estado === "Averiado" && (
                <button
                  onClick={() => {
                    handleEstadoChange(menuIndex, false);
                    closeMenu();
                  }}
                  className="w-full flex items-center gap-3 px-3 py-3 rounded-xl transition text-left hover:bg-gray-100"
                >
                  <div className="shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-lg border">
                    <IconCircleCheck className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-green-700">
                      Desmarcar averiado
                    </div>
                    <div className="text-xs text-gray-500">
                      El equipo dejará de estar marcado.
                    </div>
                  </div>
                </button>
              )}
            </div>
          </MenuOverlay>
        )}

        <div className="flex justify-end mt-4">
          <button
            onClick={handleGuardar}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Registrar_novedad_agro;










