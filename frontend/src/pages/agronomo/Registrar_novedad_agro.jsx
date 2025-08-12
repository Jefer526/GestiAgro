import React, { useState, useRef, useEffect } from "react";
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
} from "@tabler/icons-react";
import faviconBlanco from "../../assets/favicon-blanco.png";

const Registrar_novedad_agro = () => {
  const navigate = useNavigate();

  const nombreUsuario = "Juan Pérez";
  const letraInicial = (nombreUsuario?.trim()?.[0] || "U").toUpperCase();

  // Datos base
  const columnas = ["id", "maquina", "referencia", "estado"];
  const [maquinas, setMaquinas] = useState([
    { id: 1, maquina: "Tractor", referencia: "JD 5055", estado: "Averiado" },
    { id: 2, maquina: "Guadaña", referencia: "Stihl MS 450", estado: "Averiado" },
    { id: 3, maquina: "Podadora", referencia: "Stihl BR 130", estado: "Averiado" },
  ]);

  // Alerta guardar
  const [alertaVisible, setAlertaVisible] = useState(false);

  // Tarjeta perfil
  const [mostrarTarjeta, setMostrarTarjeta] = useState(false);
  const tarjetaRef = useRef(null);

  // Menú de acciones por fila (3 puntitos)
  const [menuIndex, setMenuIndex] = useState(null);
  const opcionesRef = useRef(null);
  const [menuCoords, setMenuCoords] = useState({ top: 0, left: 0 }); // coords del menú

  // === Filtros tipo Maquinaria_equipos ===
  const filtroRef = useRef(null);
  const [filtroActivo, setFiltroActivo] = useState(null);
  const [filtroPosicion, setFiltroPosicion] = useState({ top: 0, left: 0 });
  const [busquedas, setBusquedas] = useState({});
  const [valoresSeleccionados, setValoresSeleccionados] = useState({});
  const [ordenCampo, setOrdenCampo] = useState(null);

  const getValoresUnicos = (campo) => {
    const search = (busquedas[campo] || "").toLowerCase();
    return [...new Set(maquinas.map(e => e[campo]?.toString()))].filter(v =>
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

  const ordenar = (campo, orden) => setOrdenCampo({ campo, orden });

  const handleBusqueda = (campo, texto) =>
    setBusquedas({ ...busquedas, [campo]: texto });

  // Estados/menus: cerrar al hacer click fuera
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
      if (opcionesRef.current && !opcionesRef.current.contains(e.target)) {
        setMenuIndex(null);
      }
      if (filtroRef.current && !filtroRef.current.contains(e.target)) {
        setFiltroActivo(null);
      }
    };
    document.addEventListener("mousedown", clickFuera);
    return () => document.removeEventListener("mousedown", clickFuera);
  }, []);

  // Acciones
  const handleEstadoChange = (index, nuevoEstado) => {
    const nuevas = [...maquinas];
    nuevas[index].estado = nuevoEstado;
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

  // Abrir menú (coloca arriba si no hay espacio hacia abajo)
  const abrirMenu = (index, e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const menuWidth = 288; // w-72
    const menuHeight = 160; // estimado
    const gap = 8;

    const spaceBelow = window.innerHeight - rect.bottom;
    const top = spaceBelow < menuHeight + gap
      ? rect.top + window.scrollY - menuHeight - gap
      : rect.bottom + window.scrollY + gap;

    const left = rect.right + window.scrollX - menuWidth;

    setMenuCoords({ top, left });
    setMenuIndex(prev => (prev === index ? null : index));
  };

  // Aplicar filtros y orden
  const datosFiltrados = maquinas
    .filter(item =>
      columnas.every(campo =>
        !valoresSeleccionados[campo] || valoresSeleccionados[campo].length === 0
          ? true
          : valoresSeleccionados[campo].includes(item[campo]?.toString())
      )
    )
    .sort((a, b) => {
      if (!ordenCampo) return 0;
      const { campo, orden } = ordenCampo;
      return orden === "asc"
        ? a[campo]?.toString().localeCompare(b[campo]?.toString())
        : b[campo]?.toString().localeCompare(a[campo]?.toString());
    });

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
            <button
              onClick={() => navigate("/Homeagro")}
              className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
            >
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
              <button onClick={() => { setMostrarTarjeta(false); navigate("/ajustesagro"); }} className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                <IconSettings className="w-5 h-5 mr-2 text-green-600" /> Ajustes
              </button>
              <button onClick={() => { setMostrarTarjeta(false); navigate("/soporteagro"); }} className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                <IconTool className="w-5 h-5 mr-2 text-green-600" /> Soporte
              </button>
              <button onClick={() => { setMostrarTarjeta(false); navigate("/login"); }} className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-600">
                <IconLogout className="w-5 h-5 mr-2 text-red-600" /> Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 p-10 overflow-auto relative bg-gray-50">
        {alertaVisible && (
          <div className="fixed top-3 left-1/2 -translate-x-1/2 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 text-base font-semibold">
            <IconCheck className="w-5 h-5" /> Estados actualizados exitosamente
          </div>
        )}

        <button onClick={() => navigate("/maquinariaequipos")} className="flex items-center text-green-600 font-semibold mb-6 text-lg hover:underline">
          <IconChevronLeft className="w-5 h-5 mr-1" /> Volver
        </button>

        <h2 className="text-3xl font-bold text-green-700 mb-4">Registrar novedad de máquina</h2>

        {/* TABLA con filtros tipo Maquinaria_equipos */}
        <div className="overflow-x-auto rounded-lg shadow-lg relative">
          <table className="min-w-full text-base bg-white">
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
              {datosFiltrados.map((m, index) => (
                <tr key={m.id} className="hover:bg-gray-100">
                  <td className="p-4 border">{m.id}</td>
                  <td className="p-4 border">{m.maquina}</td>
                  <td className="p-4 border">{m.referencia}</td>
                  <td className="p-4 border">
                    <div className="relative inline-flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full ring-1 text-sm font-semibold shadow-sm bg-red-50 text-red-700 ring-red-200">
                        <IconAlertTriangle className="w-4 h-4" /> Averiado
                      </span>
                      <button
                        onClick={(e) => abrirMenu(index, e)}
                        className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-700 shadow-sm transition"
                      >
                        <IconDotsVertical className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Menú de acciones (fixed para no cortarse) */}
          {menuIndex !== null && (
            <div
              ref={opcionesRef}
              className="fixed w-72 bg-white border border-gray-100 rounded-2xl shadow-2xl p-2 z-50"
              style={{ top: menuCoords.top, left: menuCoords.left }}
            >
              <div className="px-3 pt-2 pb-1 text-xs font-medium text-gray-500">
                Selecciona una opción
              </div>

              <button
                onClick={() => {
                  handleEstadoChange(menuIndex, "Averiado");
                  setMenuIndex(null);
                }}
                className="w-full flex items-center gap-3 px-3 py-3 rounded-xl transition text-left bg-red-50"
              >
                <div className="shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-lg border border-red-200">
                  <IconCircleCheck className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-red-700">
                    Marcar como averiado
                  </div>
                  <div className="text-xs text-gray-500">
                    El equipo quedará en estado “Averiado”.
                  </div>
                </div>
              </button>
            </div>
          )}

          {filtroActivo && (
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
                    {val}
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









