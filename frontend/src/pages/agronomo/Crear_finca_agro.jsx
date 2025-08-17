// src/pages/agronomo/Crear_finca_agro.jsx
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
  IconFilter,
  IconDotsVertical,
  IconEdit,
  IconTrash,
  IconMapPin,
  IconTool,
  IconLogout,
  IconPlant2,
  IconBook,
} from "@tabler/icons-react";
import faviconBlanco from "../../assets/favicon-blanco.png";

const Crear_finca_agro = () => {
  const navigate = useNavigate();
  const location = useLocation();

  /* ----------------------------------
     📌 ESTADOS Y REFERENCIAS
  ---------------------------------- */
  const filtroRef = useRef(null);
  const [mostrarTarjetaPerfil, setMostrarTarjetaPerfil] = useState(false);
  const tarjetaPerfilRef = useRef(null);
  const iconListRef = useRef(null); // Scroll automático sidebar

  const columnas = ["nombre", "ubicacion", "coordenadas", "area"];
  const [fincas, setFincas] = useState([
    { nombre: "La Esmeralda", ubicacion: "Huila", coordenadas: "2.40,-75.25", area: "12 ha" },
    { nombre: "Las Palmas", ubicacion: "Caquetá", coordenadas: "1.62,-75.55", area: "18 ha" },
  ]);

  const [formData, setFormData] = useState({ nombre: "", ubicacion: "", coordenadas: "", area: "" });
  const [filtroActivo, setFiltroActivo] = useState(null);
  const [busquedas, setBusquedas] = useState({});
  const [valoresSeleccionados, setValoresSeleccionados] = useState({});
  const [ordenCampo, setOrdenCampo] = useState(null);
  const [posicionTarjeta, setPosicionTarjeta] = useState({});
  const [visibleTarjeta, setVisibleTarjeta] = useState(null);

  const nombreUsuario = "Juan Pérez";
  const letraInicial = (nombreUsuario?.trim()?.[0] || "U").toUpperCase();

  /* ----------------------------------
     📌 HANDLERS
  ---------------------------------- */
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const agregarFinca = () => {
    if (!formData.nombre || !formData.ubicacion || !formData.coordenadas || !formData.area) return;
    setFincas([...fincas, { ...formData }]);
    setFormData({ nombre: "", ubicacion: "", coordenadas: "", area: "" });
  };

  const toggleFiltro = (campo, e) => {
    const icono = e.currentTarget.getBoundingClientRect();
    setFiltroActivo(filtroActivo === campo ? null : campo);
    setPosicionTarjeta({ top: icono.bottom + window.scrollY + 4, left: icono.left + window.scrollX });
  };

  const getValoresUnicos = (campo) => {
    const search = (busquedas[campo] || "").toLowerCase();
    return [...new Set(fincas.map((e) => e[campo]?.toString()))].filter((v) =>
      v.toLowerCase().includes(search)
    );
  };

  const datosFiltrados = fincas
    .filter((item) =>
      columnas.every((campo) =>
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

  /* ----------------------------------
     📌 EFECTOS
  ---------------------------------- */
  useEffect(() => {
    const clickFuera = (e) => {
      if (
        filtroRef.current && !filtroRef.current.contains(e.target) &&
        (!tarjetaPerfilRef.current || !tarjetaPerfilRef.current.contains(e.target))
      ) {
        setFiltroActivo(null);
        setVisibleTarjeta(null);
        setMostrarTarjetaPerfil(false);
      }
    };
    document.addEventListener("mousedown", clickFuera);
    return () => document.removeEventListener("mousedown", clickFuera);
  }, []);

  useEffect(() => {
    if (!iconListRef.current) return;
    if (location.pathname.includes("/crearfinca")) {
      iconListRef.current.scrollTo({ top: iconListRef.current.scrollHeight, behavior: "instant" });
    } else {
      iconListRef.current.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [location.pathname]);

  /* ----------------------------------
     📌 RENDER
  ---------------------------------- */
  return (
    <div className="flex">
      {/* ---------------------- SIDEBAR ---------------------- */}
      <div className="bg-green-600 w-28 h-screen flex flex-col items-center py-6 justify-between relative">
        {/* Logo */}
        <div className="sticky top-0 mb-6 bg-green-600 z-10">
          <img src={faviconBlanco} alt="Logo" className="w-11 h-11 mx-auto" />
        </div>

        {/* Navegación */}
        <div
          ref={iconListRef}
          className="flex-1 flex flex-col items-center space-y-8 pr-1 overflow-y-auto scrollbar-hide-only pb-24"
        >
          <button onClick={() => navigate("/homeagro")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition" title="Inicio">
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
          <button onClick={() => navigate("/manejopersonal")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition" title="Manejo de Personal">
            <IconUsersGroup className="text-white w-11 h-11" />
          </button>

          {/* Activo: gestión finca */}
          <div className="relative">
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-11 bg-white rounded-full" />
            <button onClick={() => navigate("/crearfinca")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition" title="Gestión finca">
              <IconPlant className="text-white w-11 h-11" />
            </button>
          </div>

          <button onClick={() => navigate("/crearlote")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition" title="Gestión lote">
            <IconFrame className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/produccionagro")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconPlant2 className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/cuadernocampo")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconBook className="text-white w-11 h-11" />
          </button>
        </div>

        {/* Perfil */}
        <div className="relative mb-4 mt-auto">
          <button onClick={() => setMostrarTarjetaPerfil(!mostrarTarjetaPerfil)} className="bg-white w-12 h-12 rounded-full flex items-center justify-center text-green-600 font-bold text-xl shadow hover:scale-110 transition" title="Perfil">
            {letraInicial}
          </button>
          {mostrarTarjetaPerfil && (
            <div ref={tarjetaPerfilRef} className="absolute bottom-16 left-14 w-52 bg-white/95 border-2 border-gray-300 rounded-xl shadow-2xl py-3 z-50">
              <button onClick={() => { setMostrarTarjetaPerfil(false); navigate("/ajustesagro"); }} className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                <IconSettings className="w-5 h-5 mr-2 text-green-600" /> Ajustes
              </button>
              <button onClick={() => { setMostrarTarjetaPerfil(false); navigate("/soporteagro"); }} className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                <IconTool className="w-5 h-5 mr-2 text-green-600" /> Soporte
              </button>
              <button onClick={() => { setMostrarTarjetaPerfil(false); navigate("/login"); }} className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-600">
                <IconLogout className="w-5 h-5 mr-2 text-red-600" /> Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ---------------------- CONTENIDO PRINCIPAL ---------------------- */}
      <div className="flex-1 p-10 overflow-auto">
        <h1 className="text-3xl font-bold text-green-700 mb-6">Crear finca</h1>

        {/* Formulario */}
        <div className="bg-white border border-gray-200 shadow-gray-300 shadow-md p-6 rounded-lg mb-10 max-w-4xl">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-bold block mb-1">Nombre finca</label>
              <input name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Nombre finca" className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="font-bold block mb-1 items-center gap-1 flex">
                <IconMapPin className="w-4 h-4 mr-1" /> Ubicación finca
              </label>
              <input name="ubicacion" value={formData.ubicacion} onChange={handleChange} placeholder="Ubicación finca" className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="font-bold block mb-1">Coordenadas</label>
              <input name="coordenadas" value={formData.coordenadas} onChange={handleChange} placeholder="Coordenadas" className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="font-bold block mb-1">Área finca</label>
              <input name="area" value={formData.area} onChange={handleChange} placeholder="Área finca" className="w-full p-2 border rounded" />
            </div>
          </div>
          <button onClick={agregarFinca} className="bg-green-600 text-white mt-4 px-4 py-2 rounded hover:bg-green-700">
            Crear finca
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
              {datosFiltrados.map((finca, idx) => (
                <tr key={idx} className="hover:bg-gray-100">
                  <td className="p-4 border">{finca.nombre}</td>
                  <td className="p-4 border">{finca.ubicacion}</td>
                  <td className="p-4 border">{finca.coordenadas}</td>
                  <td className="p-4 border">{finca.area}</td>
                  <td className="p-4 border">
                    <button onClick={(e) => mostrarTarjeta(idx, e)}>
                      <IconDotsVertical className="w-5 h-5" />
                    </button>
                    {visibleTarjeta === idx && (
                      <div ref={filtroRef} className="fixed bg-white border shadow-lg rounded-md z-50 w-44 py-2" style={{ top: posicionTarjeta.top, left: posicionTarjeta.left }}>
                        <div onClick={() => navigate("/editarfinca")} className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-black gap-2">
                          <IconEdit className="w-4 h-4 text-blue-600" /> <span>Editar</span>
                        </div>
                        <div className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-red-600 gap-2">
                          <IconTrash className="w-4 h-4" /> <span>Eliminar</span>
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Filtro */}
          {filtroActivo && (
            <div ref={filtroRef} className="fixed bg-white text-black shadow-md border rounded z-50 p-3 w-60 text-left text-sm" style={{ top: posicionTarjeta.top, left: posicionTarjeta.left }}>
              <div className="font-semibold mb-2 capitalize">Filtrar por {filtroActivo}</div>
              <input
                type="text"
                placeholder="Buscar..."
                value={busquedas[filtroActivo] || ""}
                onChange={(e) => setBusquedas({ ...busquedas, [filtroActivo]: e.target.value })}
                className="w-full px-2 py-1 border rounded mb-2 text-sm"
              />
              <div className="max-h-40 overflow-y-auto flex flex-col gap-1">
                {getValoresUnicos(filtroActivo).map((val, idx) => (
                  <label key={idx} className="flex items-center gap-2 text-sm">
                    <input type="checkbox" className="accent-green-600" checked={(valoresSeleccionados[filtroActivo] || []).includes(val)} onChange={() => toggleValor(filtroActivo, val)} />
                    {val}
                  </label>
                ))}
              </div>
              <button onClick={() => limpiarFiltro(filtroActivo)} className="text-blue-600 hover:underline text-xs mt-2">
                Borrar filtro
              </button>
            </div>
          )}
        </div>

        {/* Botón guardar cambios */}
        <div className="flex justify-center mt-6">
          <button className="bg-green-600 text-white text-lg px-6 py-3 rounded-lg hover:bg-green-700 font-bold">
            Guardar cambios
          </button>
        </div>
      </div>
    </div>
  );
};

export default Crear_finca_agro;





