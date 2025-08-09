import React, { useState, useRef, useEffect } from "react";
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
  IconLock,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import faviconBlanco from "../../assets/favicon-blanco.png";

const Ajustes_agro = () => {
  const navigate = useNavigate();
  const tarjetaRef = useRef(null);
  const [mostrarTarjeta, setMostrarTarjeta] = useState(false);

  // Datos de perfil (mock: reemplaza con tu estado global o API)
  const [nombreUsuario] = useState("Juan Pérez");
  const [rolUsuario] = useState("Ing. Agrónomo");
  const [correoUsuario] = useState("juan.perez@gestiagro.com");

  const letraInicial = (nombreUsuario?.trim()?.[0] || "U").toUpperCase();

  // Preferencias
  const [notificaciones, setNotificaciones] = useState(true);
  const [modoOscuro, setModoOscuro] = useState(false);

  // Cambio de contraseña
  const [nuevaContrasena, setNuevaContrasena] = useState("");

  useEffect(() => {
    const clickFueraTarjeta = (e) => {
      if (tarjetaRef.current && !tarjetaRef.current.contains(e.target)) {
        setMostrarTarjeta(false);
      }
    };
    document.addEventListener("mousedown", clickFueraTarjeta);
    return () => document.removeEventListener("mousedown", clickFueraTarjeta);
  }, []);

  const handleCambiarContrasena = () => {
    if (!nuevaContrasena.trim()) return;
    // Aquí harías la llamada al backend
    // await api.post('/cambiar-contrasena', { password: nuevaContrasena })
    alert("Contraseña actualizada");
    setNuevaContrasena("");
  };

  return (
    <div className={`flex ${modoOscuro ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}>
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
            <button
              onClick={() => navigate("/homemayordomo")}
              className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
              aria-label="Inicio"
              title="Inicio"
            >
              <IconHome className="text-white w-11 h-11" />
            </button>
          </div>

          {/* Navegación */}
          <button onClick={() => navigate("/Laboresagro")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition" title="Labores">
            <IconClipboardList className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/Informesagro")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition" title="Informes">
            <IconChartBar className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/Bodegaagro")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition" title="Bodega">
            <IconBox className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/variablesclimaticas")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition" title="Variables Climáticas">
            <IconCloudRain className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/maquinariaequipos")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition" title="Maquinaria y Equipos">
            <IconTractor className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/manejopersonal")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition" title="Manejo de Personal">
            <IconUsersGroup className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/crearfinca")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition" title="Crear Finca">
            <IconPlant className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/crearlote")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition" title="Crear Lote">
            <IconFrame className="text-white w-11 h-11" />
          </button>
        </div>

        {/* Perfil */}
        <div className="relative mb-4 mt-auto">
          <button
            onClick={() => setMostrarTarjeta((v) => !v)}
            className="bg-white w-12 h-12 rounded-full flex items-center justify-center text-green-600 font-bold text-xl shadow hover:scale-110 transition"
            aria-haspopup="menu"
            aria-expanded={mostrarTarjeta}
            title="Perfil"
          >
            {letraInicial}
          </button>
          {mostrarTarjeta && (
            <div
              ref={tarjetaRef}
              className="absolute bottom-16 left-14 w-52 bg-white/95 border-2 border-gray-300 rounded-xl shadow-2xl py-3 z-50"
              role="menu"
            >
              <button
                onClick={() => navigate("/ajustes")}
                className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                role="menuitem"
              >
                <IconSettings className="w-5 h-5 mr-2 text-green-600" /> Ajustes
              </button>
              <button
                onClick={() => navigate("/soporteagro")}
                className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                role="menuitem"
              >
                <IconTool className="w-5 h-5 mr-2 text-green-600" /> Soporte
              </button>
              <button
                onClick={() => navigate("/")}
                className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-600"
                role="menuitem"
              >
                <IconLogout className="w-5 h-5 mr-2 text-red-600" /> Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-green-600 mb-6">Perfil de la cuenta</h1>

        {/* Sección perfil */}
        <div className={`border rounded-xl p-6 shadow-md w-full max-w-xl space-y-6 ${modoOscuro ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"}`}>
          {/* Datos de perfil */}
          <div className="flex items-center space-x-4">
            <div className="bg-green-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold">
              {letraInicial}
            </div>
            <div>
              <h2 className="text-xl font-semibold">{nombreUsuario}</h2>
              <p className="text-gray-500">{rolUsuario}</p>
              <p className="text-gray-500 text-sm">{correoUsuario}</p>
            </div>
          </div>

          {/* Cambiar contraseña */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Cambiar contraseña
            </label>
            <div className="flex space-x-2">
              <input
                type="password"
                value={nuevaContrasena}
                onChange={(e) => setNuevaContrasena(e.target.value)}
                placeholder="Nueva contraseña"
                className={`flex-1 border rounded px-4 py-2 ${modoOscuro ? "bg-gray-700 border-gray-600 text-white placeholder-gray-300" : "bg-white border-gray-300"}`}
              />
              <button
                onClick={handleCambiarContrasena}
                className="bg-green-600 text-white px-4 rounded hover:bg-green-700 flex items-center"
              >
                <IconLock className="w-5 h-5 mr-1" /> Cambiar
              </button>
            </div>
          </div>

          {/* Notificaciones */}
          <div className="flex items-center justify-between">
            <label className="font-medium">Notificaciones</label>
            <input
              type="checkbox"
              checked={notificaciones}
              onChange={(e) => setNotificaciones(e.target.checked)}
              className="h-5 w-5 accent-green-600"
            />
          </div>

          {/* Tema oscuro */}
          <div className="flex items-center justify-between">
            <label className="font-medium">Tema oscuro</label>
            <input
              type="checkbox"
              checked={modoOscuro}
              onChange={(e) => setModoOscuro(e.target.checked)}
              className="h-5 w-5 accent-green-600"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ajustes_agro;
