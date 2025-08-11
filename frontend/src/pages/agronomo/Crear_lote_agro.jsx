// src/pages/agronomo/Crear_lote_agro.jsx
import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
  IconDotsVertical,
  IconFilter,
  IconPencil,
  IconTrash,
  IconTool,
  IconLogout,
} from "@tabler/icons-react";
import faviconBlanco from "../../assets/favicon-blanco.png";

const Crear_lote_agro = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [lotes, setLotes] = useState([
    { finca: "La Esmeralda", lote: "1", coordenadas: "2.42,-75.20", area: "3 ha", cultivo: "Macadamia" },
    { finca: "Las Palmas", lote: "2", coordenadas: "2.45,-75.22", area: "2.5 ha", cultivo: "Aguacate" },
  ]);
  const [formData, setFormData] = useState({ finca: "", lote: "", coordenadas: "", area: "", cultivo: "" });

  const [filtroActivo, setFiltroActivo] = useState(null);
  const [busquedas, setBusquedas] = useState({});
  const [valoresSeleccionados, setValoresSeleccionados] = useState({});
  const [ordenCampo, setOrdenCampo] = useState(null);

  const [posicionTarjeta, setPosicionTarjeta] = useState({});
  const [visibleTarjeta, setVisibleTarjeta] = useState(null);
  const filtroRef = useRef(null);

  const columnas = ["finca", "lote", "coordenadas", "area", "cultivo"];

  // Perfil
  const nombreUsuario = "Juan Pérez";
  const letraInicial = (nombreUsuario?.trim()?.[0] || "U").toUpperCase();
  const [mostrarTarjetaPerfil, setMostrarTarjetaPerfil] = useState(false);
  const tarjetaPerfilRef = useRef(null);

  // Contenedor scrollable del sidebar para auto-scroll
  const iconListRef = useRef(null);

  useEffect(() => {
    const clickFuera = (e) => {
      if (filtroRef.current && !filtroRef.current.contains(e.target)) {
        setFiltroActivo(null);
        setVisibleTarjeta(null);
      }
      if (tarjetaPerfilRef.current && !tarjetaPerfilRef.current.contains(e.target)) {
        setMostrarTarjetaPerfil(false);
      }
    };
    document.addEventListener("mousedown", clickFuera);
    return () => document.removeEventListener("mousedown", clickFuera);
  }, []);

  // Auto-scroll del contenedor de iconos para que el último no quede oculto
  useEffect(() => {
    if (!iconListRef.current) return;
    if (location.pathname.includes("/crearlote")) {
      iconListRef.current.scrollTo({
        top: iconListRef.current.scrollHeight,
        behavior: "instant",
      });
    } else {
      iconListRef.current.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [location.pathname]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const agregarLote = () => {
    if (!formData.finca || !formData.lote || !formData.coordenadas || !formData.area || !formData.cultivo) return;
    setLotes((prev) => [...prev, { ...formData }]);
    setFormData({ finca: "", lote: "", coordenadas: "", area: "", cultivo: "" });
  };

  const toggleFiltro = (campo, e) => {
    const icono = e.currentTarget.getBoundingClientRect();
    setFiltroActivo(filtroActivo === campo ? null : campo);
    setPosicionTarjeta({ top: icono.bottom + window.scrollY + 4, left: icono.left + window.scrollX });
  };

  const getValoresUnicos = (campo) => {
    const search = (busquedas[campo] || "").toLowerCase();
    return [...new Set(lotes.map((e) => e[campo]?.toString()))].filter((v) => v.toLowerCase().includes(search));
  };

  const datosFiltrados = lotes
    .filter((item) =>
      columnas.every((campo) =>
        !valoresSeleccionados[campo] || valoresSeleccionados[campo].length === 0
          ? true
          : valoresSeleccionados[campo].includes(item[campo]?.toString())
      )
    )
    .sort((a, b) => {
      if (!ordenCampo) return 0;
      const { campo, orden } = ordenCampo || {};
      return orden === "asc"
        ? a[campo]?.toString().localeCompare(b[campo]?.toString())
        : b[campo]?.toString().localeCompare(a[campo]?.toString());
    });

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

  const mostrarTarjeta = (idx, e) => {
    const boton = e.currentTarget.getBoundingClientRect();
    setVisibleTarjeta(idx);
    setPosicionTarjeta({ top: boton.bottom + window.scrollY + 4, left: boton.left + window.scrollX });
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="bg-green-600 w-28 h-screen flex flex-col items-center py-6 justify-between relative">
        {/* Logo */}
        <div className="sticky top-0 mb-6 bg-green-600 z-10">
          <img src={faviconBlanco} alt="Logo" className="w-11 h-11 mx-auto" />
        </div>

        {/* Íconos con scroll */}
        <div
          ref={iconListRef}
          className="flex-1 flex flex-col items-center space-y-8 pr-1 overflow-y-auto scrollbar-hide-only pb-24"
        >
          <button onClick={() => navigate("/Homeagro")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition" title="Inicio">
            <IconHome className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/Laboresagro")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition" title="Labores">
            <IconClipboardList className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/Informesagro")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition" title="Informes">
            <IconChartBar className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/Bodegaagro")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition" title="Bodega">
            <IconBox className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/variablesclimaticas")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition" title="Variables climáticas">
            <IconCloudRain className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/maquinariaequipos")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition" title="Maquinaria y equipos">
            <IconTractor className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/manejopersonal")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition" title="Manejo personal">
            <IconUsersGroup className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/crearfinca")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition" title="Gestión finca">
            <IconPlant className="text-white w-11 h-11" />
          </button>

          {/* Gestión lote (activo) */}
          <div className="relative">
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-11 bg-white rounded-full" />
            <button
              onClick={() => navigate("/crearlote")}
              className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
              title="Gestión lote"
            >
              <IconFrame className="text-white w-11 h-11" />
            </button>
          </div>
        </div>

        {/* Perfil */}
        <div className="relative mb-4 mt-auto">
          <button
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
                onClick={() => {
                  setMostrarTarjetaPerfil(false);
                  navigate("/ajustesagro");
                }}
                className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              >
                <IconSettings className="w-5 h-5 mr-2 text-green-600" />
                Ajustes
              </button>
              <button
                onClick={() => {
                  setMostrarTarjetaPerfil(false);
                  navigate("/soporteagro");
                }}
                className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              >
                <IconTool className="w-5 h-5 mr-2 text-green-600" />
                Soporte
              </button>
              <button
                onClick={() => {
                  setMostrarTarjetaPerfil(false);
                  navigate("/login");
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

      {/* Contenido */}
      <div className="flex-1 p-10 overflow-auto">
        <h1 className="text-3xl font-bold text-green-700 mb-6">Crear lote</h1>

        {/* Formulario */}
        <div className="bg-white border border-gray-200 shadow-gray-300 p-6 rounded-lg shadow-md mb-10 max-w-5xl">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="font-bold block mb-1">Finca</label>
              <input
                name="finca"
                value={formData.finca}
                onChange={handleChange}
                placeholder="Nombre finca"
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="font-bold block mb-1">Número de lote</label>
              <input
                name="lote"
                value={formData.lote}
                onChange={handleChange}
                placeholder="Número"
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="font-bold block mb-1">Coordenadas</label>
              <input
                name="coordenadas"
                value={formData.coordenadas}
                onChange={handleChange}
                placeholder="Coordenadas"
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="font-bold block mb-1">Área lote</label>
              <input
                name="area"
                value={formData.area}
                onChange={handleChange}
                placeholder="Área"
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="col-span-1">
              <label className="font-bold block mb-1">Cultivo</label>
              <input
                name="cultivo"
                value={formData.cultivo}
                onChange={handleChange}
                placeholder="Tipo cultivo"
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
          <button onClick={agregarLote} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Crear lote
          </button>
        </div>

        {/* Tabla */}
        <div className="overflow-x-auto rounded-lg shadow-lg relative">
          <table className="min-w-full text-base bg-white text-center">
            <thead className="bg-green-600 text-white font-bold">
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
                <th className="p-4 border">ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {datosFiltrados.map((lote, idx) => (
                <tr key={idx} className="hover:bg-gray-100">
                  <td className="p-4 border">{lote.finca}</td>
                  <td className="p-4 border">{lote.lote}</td>
                  <td className="p-4 border">{lote.coordenadas}</td>
                  <td className="p-4 border">{lote.area}</td>
                  <td className="p-4 border">{lote.cultivo}</td>
                  <td className="p-4 border">
                    <button onClick={(e) => mostrarTarjeta(idx, e)}>
                      <IconDotsVertical className="w-5 h-5" />
                    </button>
                    {visibleTarjeta === idx && (
                      <div
                        ref={filtroRef}
                        className="fixed bg-white border shadow-md p-3 rounded z-50 w-40 text-sm"
                        style={{ top: posicionTarjeta.top, left: posicionTarjeta.left }}
                      >
                        <div
                          onClick={() => navigate("/editarlote", { state: lote })}
                          className="flex items-center gap-2 text-blue-600 hover:text-green-600 cursor-pointer mb-2"
                        >
                          <IconPencil className="w-4 h-4" />
                          <span>Editar</span>
                        </div>
                        <div className="flex items-center gap-2 text-red-600 hover:text-red-700 cursor-pointer">
                          <IconTrash className="w-4 h-4" />
                          <span>Eliminar</span>
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Filtro emergente */}
          {filtroActivo && (
            <div
              ref={filtroRef}
              className="fixed bg-white text-black shadow-md border rounded z-50 p-3 w-60 text-left text-sm"
              style={{ top: posicionTarjeta.top, left: posicionTarjeta.left }}
            >
              <div className="font-semibold mb-2">
                Filtrar por {filtroActivo.charAt(0).toUpperCase() + filtroActivo.slice(1)}
              </div>
              <input
                type="text"
                placeholder="Buscar..."
                className="w-full border px-2 py-1 rounded mb-2"
                value={busquedas[filtroActivo] || ""}
                onChange={(e) => setBusquedas({ ...busquedas, [filtroActivo]: e.target.value })}
              />
              <div className="flex flex-col max-h-40 overflow-y-auto">
                {getValoresUnicos(filtroActivo).map((val, i) => (
                  <label key={i} className="flex items-center gap-2 mb-1 capitalize">
                    <input
                      type="checkbox"
                      className="accent-green-600"
                      checked={(valoresSeleccionados[filtroActivo] || []).includes(val)}
                      onChange={() => toggleValor(filtroActivo, val)}
                    />
                    {val.charAt(0).toUpperCase() + val.slice(1)}
                  </label>
                ))}
              </div>
              <button onClick={() => limpiarFiltro(filtroActivo)} className="text-blue-600 hover:underline text-xs mt-2">
                Borrar filtro
              </button>
            </div>
          )}
        </div>

        <div className="flex justify-center mt-6">
          <button className="bg-green-600 text-white text-lg px-6 py-3 rounded-lg hover:bg-green-700 font-bold">
            Guardar cambios
          </button>
        </div>
      </div>
    </div>
  );
};

export default Crear_lote_agro;


