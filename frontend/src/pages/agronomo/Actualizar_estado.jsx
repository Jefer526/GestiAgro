import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  IconHome, IconClipboardList, IconChartBar, IconCloudRain,
  IconTractor, IconSettings, IconBox, IconUsersGroup,
  IconPlant, IconFrame, IconFilter, IconSortAscending2, IconSortDescending2, IconArrowLeft, IconCheck, IconTool, IconLogout,
} from "@tabler/icons-react";
import faviconBlanco from "../../assets/favicon-blanco.png";

const empleadosIniciales = [
  { id: "01", nombre: "Juan Pérez", estado: "Activo" },
  { id: "02", nombre: "Pedro Ramírez", estado: "Activo" },
  { id: "03", nombre: "Ana González", estado: "Inactivo" },
  { id: "04", nombre: "María Rojas", estado: "Activo" },
];

const columnas = ["id", "nombre", "estado"];

const Actualizar_estado = () => {
  const navigate = useNavigate();
  const [estados, setEstados] = useState(empleadosIniciales.map(e => ({ ...e })));
  const [filtroActivo, setFiltroActivo] = useState(null);
  const [filtroPosicion, setFiltroPosicion] = useState({ top: 0, left: 0 });
  const [busquedas, setBusquedas] = useState({});
  const [valoresSeleccionados, setValoresSeleccionados] = useState({});
  const [ordenCampo, setOrdenCampo] = useState(null);
  const [alertaVisible, setAlertaVisible] = useState(false);
  const filtroRef = useRef(null);

  // Datos para el menú flotante perfil
  const nombreUsuario = "Juan Pérez"; // Aquí obtén el nombre real
  const letraInicial = (nombreUsuario?.trim()?.[0] || "U").toUpperCase();

  const [mostrarTarjetaPerfil, setMostrarTarjetaPerfil] = useState(false);
  const tarjetaPerfilRef = useRef(null);

  // Manejar clic fuera de la tarjeta filtro
  useEffect(() => {
    const clickFuera = (e) => {
      if (filtroRef.current && !filtroRef.current.contains(e.target)) {
        setFiltroActivo(null);
      }
      if (tarjetaPerfilRef.current && !tarjetaPerfilRef.current.contains(e.target) && !e.target.closest("#btnPerfil")) {
        setMostrarTarjetaPerfil(false);
      }
    };
    document.addEventListener("mousedown", clickFuera);
    return () => document.removeEventListener("mousedown", clickFuera);
  }, []);

  const actualizarEstado = (id, nuevoEstado) => {
    setEstados(prev => prev.map(emp =>
      emp.id === id ? { ...emp, estado: nuevoEstado } : emp
    ));
  };

  const guardarCambios = () => {
    console.log("Estados actualizados:", estados);
    setAlertaVisible(true);
    setTimeout(() => {
      setAlertaVisible(false);
      navigate("/manejopersonal");
    }, 2000);
  };

  const toggleFiltro = (campo, e) => {
    const icono = e.currentTarget.getBoundingClientRect();
    setFiltroActivo(filtroActivo === campo ? null : campo);
    setFiltroPosicion({
      top: icono.bottom + window.scrollY + 4,
      left: icono.left + window.scrollX
    });
  };

  const getValoresUnicos = (campo) => {
    const search = (busquedas[campo] || "").toLowerCase();
    return [...new Set(estados.map(e => e[campo]?.toString()))].filter(v =>
      v.toLowerCase().includes(search)
    );
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

  const datosFiltrados = estados
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
        {/* Logo fijo con sticky */}
        <div className="sticky top-0 mb-6 bg-green-600 z-10">
          <img src={faviconBlanco} alt="Logo" className="w-11 h-11 mx-auto" />
        </div>

        {/* Iconos con scroll */}
        <div className="flex-1 flex flex-col items-center space-y-8 pr-1 overflow-y-auto scrollbar-hide-only">
          {/* Icono activo */}
          <div className="relative">
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-11 bg-white rounded-full" />
            <button
              onClick={() => navigate("/Homeagro")}
              className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
              <IconHome className="text-white w-11 h-11" />
            </button>
          </div>

          {/* Navegación */}
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
        </div>

        {/* Menú perfil flotante abajo */}
        <div className="relative mb-4">
          <button
            id="btnPerfil"
            onClick={() => setMostrarTarjetaPerfil(!mostrarTarjetaPerfil)}
            className="bg-white w-12 h-12 rounded-full flex items-center justify-center text-green-600 font-bold text-xl shadow hover:scale-110 transition"
          >
            {letraInicial}
          </button>

          {mostrarTarjetaPerfil && (
            <div
              ref={tarjetaPerfilRef}
              className="absolute bottom-16 left-14 w-52 bg-white/95 border-2 border-grey-300 rounded-xl shadow-2xl py-3 z-50"
            >
              <button
                onClick={() => { setMostrarTarjetaPerfil(false); navigate("/ajustesagro"); }}
                className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              >
                <IconSettings className="w-5 h-5 mr-2 text-green-600" />
                Ajustes
              </button>
              <button
                onClick={() => { setMostrarTarjetaPerfil(false); navigate("/soporteagro"); }}
                className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              >
                <IconTool className="w-5 h-5 mr-2 text-green-600" />
                Soporte
              </button>
              <button
                onClick={() => { setMostrarTarjetaPerfil(false); navigate("/login"); }}
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
      <div className="flex-1 p-10 overflow-auto relative bg-gray-50">
        {/* Alerta flotante */}
        {alertaVisible && (
          <div className="fixed top-3 left-1/2 -translate-x-1/2 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 text-base font-semibold">
            <IconCheck className="w-5 h-5" /> Cambios guardados exitosamente
          </div>
        )}

        <div className="mb-4">
          <button onClick={() => navigate("/manejopersonal")} className="flex items-center text-green-700 hover:underline">
            <IconArrowLeft className="w-5 h-5 mr-2" /> Volver
          </button>
        </div>

        <h1 className="text-3xl font-bold text-green-700 mb-8">Actualizar estado de empleados</h1>

        <table className="w-full bg-white shadow-md rounded-lg text-center text-base mb-10">
          <thead className="bg-green-600 text-white">
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
          <tbody>
            {datosFiltrados.map((emp, i) => (
              <tr key={i} className="hover:bg-gray-100">
                <td className="p-4 border">{emp.id}</td>
                <td className="p-4 border">{emp.nombre}</td>
                <td className="p-4 border">
                  <select
                    value={emp.estado}
                    onChange={(e) => actualizarEstado(emp.id, e.target.value)}
                    className="border px-2 py-1 rounded"
                  >
                    <option>Activo</option>
                    <option>Inactivo</option>
                    <option>Vacaciones</option>
                  </select>
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
            <div className="font-semibold mb-2 capitalize">Filtrar por {filtroActivo}</div>
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

        <div className="flex justify-center">
          <button
            onClick={guardarCambios}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 text-lg font-semibold"
          >
            Guardar cambios
          </button>
        </div>
      </div>
    </div>
  );
};

export default Actualizar_estado;


