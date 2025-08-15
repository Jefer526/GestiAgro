import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  IconFilter,
  IconSortAscending2,
  IconSortDescending2,
  IconTool,
  IconLogout,
  IconPlant2,
  IconBook,
} from "@tabler/icons-react";
import faviconBlanco from "../../assets/favicon-blanco.png";

const Manejo_personal_agro = () => {
  const navigate = useNavigate();
  const filtroRef = useRef(null);

  // Datos de usuario
  const nombreUsuario = "Juan Pérez";
  const letraInicial = (nombreUsuario?.trim()?.[0] || "U").toUpperCase();

  const [mostrarTarjeta, setMostrarTarjeta] = useState(false);
  const tarjetaRef = useRef(null);

  // Cierra la tarjeta de perfil al hacer clic fuera
  useEffect(() => {
    const manejarClickFuera = (e) => {
      if (
        tarjetaRef.current &&
        !tarjetaRef.current.contains(e.target) &&
        e.target.id !== "btnPerfil"
      ) {
        setMostrarTarjeta(false);
      }
    };
    document.addEventListener("mousedown", manejarClickFuera);
    return () => document.removeEventListener("mousedown", manejarClickFuera);
  }, []);

  // Datos de empleados
  const empleados = [
    { id: "01", nombre: "Juan Pérez", cargo: "Gerente", estado: "Activo", telefono: "3124567890", finca: "La Esmeralda", acceso: "Completo" },
    { id: "02", nombre: "Pedro Ramírez", cargo: "Ing Agrónomo", estado: "Activo", telefono: "3201112233", finca: "La Carolina", acceso: "Limitado" },
    { id: "03", nombre: "Ana González", cargo: "Mayordomo", estado: "Inactivo", telefono: "3119876543", finca: "Las Palmas", acceso: "Sin acceso" },
    { id: "04", nombre: "María Rojas", cargo: "Operario de campo", estado: "Activo", telefono: "3188888888", finca: "La Carolina", acceso: "Limitado" },
  ];

  const columnas = ["id", "nombre", "cargo", "estado", "finca", "telefono"];
  const [filtroActivo, setFiltroActivo] = useState(null);
  const [filtroPosicion, setFiltroPosicion] = useState({ top: 0, left: 0 });
  const [busquedas, setBusquedas] = useState({});
  const [valoresSeleccionados, setValoresSeleccionados] = useState({});
  const [ordenCampo, setOrdenCampo] = useState(null);

  // Tamaño del panel de filtro
  const PANEL_W = 240;
  const PANEL_H = 320;

  const getValoresUnicos = (campo) => {
    const search = (busquedas[campo] || "").toLowerCase();
    return [...new Set(empleados.map(e => e[campo]?.toString()))].filter(v =>
      v.toLowerCase().includes(search)
    );
  };

  // Muestra el filtro en una posición segura
  const toggleFiltro = (campo, e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const scrollX = window.scrollX || window.pageXOffset;
    const scrollY = window.scrollY || window.pageYOffset;

    let top = r.bottom + scrollY + 4;
    let left = r.left + scrollX;

    const maxLeft = window.innerWidth - PANEL_W - 8 + scrollX;
    if (left > maxLeft) left = Math.max(8 + scrollX, maxLeft);

    const maxTop = window.innerHeight - PANEL_H - 8 + scrollY;
    if (top > maxTop) top = r.top + scrollY - PANEL_H - 8;

    setFiltroActivo(filtroActivo === campo ? null : campo);
    setFiltroPosicion({ top, left });
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

  const datosFiltrados = empleados
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

  // Cierra panel de filtro al hacer clic fuera
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

        {/* Menú navegación */}
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

        {/* Perfil */}
        <div className="relative mb-4 flex justify-center">
          <button
            id="btnPerfil"
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
              <button onClick={() => { setMostrarTarjeta(false); navigate("/ajustesagro"); }} className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100"><IconSettings className="w-5 h-5 mr-2 text-green-600" /> Ajustes</button>
              <button onClick={() => { setMostrarTarjeta(false); navigate("/soporteagro"); }} className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100"><IconTool className="w-5 h-5 mr-2 text-green-600" /> Soporte</button>
              <button onClick={() => { setMostrarTarjeta(false); navigate("/login"); }} className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-600"><IconLogout className="w-5 h-5 mr-2 text-red-600" /> Cerrar sesión</button>
            </div>
          )}
        </div>
      </div>

      {/* Contenido */}
      <div className="flex-1 p-10 overflow-auto">
        <h1 className="text-3xl font-bold text-green-600 mb-6">Manejo personal</h1>

        {/* Tabla de empleados */}
        <div className="overflow-x-auto rounded-lg shadow-lg relative">
          <table className="min-w-full text-base bg-white text-center">
            <thead className="bg-green-600 text-white font-bold">
              <tr>
                {columnas.map((col, idx) => (
                  <th key={idx} className="p-4 border">
                    <div className="flex items-center justify-center gap-2">
                      <span>{col === "telefono" ? "TELÉFONO" : col.toUpperCase()}</span>
                      <button onClick={(e) => toggleFiltro(col, e)}>
                        <IconFilter className="w-4 h-4" />
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {datosFiltrados.map((e, idx) => (
                <tr key={idx} className="hover:bg-gray-100">
                  <td className="p-4 border">{e.id}</td>
                  <td className="p-4 border">{e.nombre}</td>
                  <td className="p-4 border">{e.cargo}</td>
                  <td className="p-4 border">{e.estado}</td>
                  <td className="p-4 border">{e.finca}</td>
                  <td className="p-4 border">{e.telefono}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Panel de filtros */}
          {filtroActivo && (
            <div
              ref={filtroRef}
              className="fixed bg-white text-black shadow-md border rounded z-50 p-3 text-left text-sm"
              style={{ top: filtroPosicion.top, left: filtroPosicion.left, width: PANEL_W }}
            >
              <div className="font-semibold mb-2">
                Filtrar por {filtroActivo.charAt(0).toUpperCase() + filtroActivo.slice(1)}
              </div>
              <button onClick={() => ordenar(filtroActivo, "asc")} className="text-green-700 flex items-center gap-1 mb-1 capitalize">
                <IconSortAscending2 className="w-4 h-4" /> Ordenar A → Z
              </button>
              <button onClick={() => ordenar(filtroActivo, "desc")} className="text-green-700 flex items-center gap-1 mb-2 capitalize">
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
                    {val.charAt(0).toUpperCase() + val.slice(1)}
                  </label>
                ))}
              </div>
              <button onClick={() => limpiarFiltro(filtroActivo)} className="text-blue-600 hover:underline text-xs capitalize mt-2">
                Borrar filtro
              </button>
            </div>
          )}
        </div>

        {/* Botones de acciones */}
        <div className="flex justify-center gap-8 mt-8">
          <button onClick={() => navigate("/registrarempleado")} className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 text-lg font-semibold">
            Registrar empleado
          </button>
          <button onClick={() => navigate("/editarempleado")} className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 text-lg font-semibold">
            Editar empleado
          </button>
          <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 text-lg font-semibold">
            Exportar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Manejo_personal_agro;



