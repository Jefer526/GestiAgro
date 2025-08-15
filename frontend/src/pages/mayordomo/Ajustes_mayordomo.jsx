import React, { useState, useRef, useEffect } from "react";
import {
  IconHome,
  IconClipboardList,
  IconHistory,
  IconChartBar,
  IconBox,
  IconCloudRain,
  IconTractor,
  IconSettings,
  IconTool,
  IconLogout,
  IconBook,
  IconPlant2,
  IconLock
} from "@tabler/icons-react";
import { useNavigate, useLocation } from "react-router-dom";
import faviconBlanco from "../../assets/favicon-blanco.png";

const Ajustes_mayordomo = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Datos usuario (luego conectar a auth real)
  const nombreUsuario = "Juan Pérez";
  const rolUsuario = "Mayordomo";
  const correoUsuario = "juan.perez@example.com";
  const letraInicial = (nombreUsuario?.trim()?.[0] || "U").toUpperCase();

  // Estados
  const [notificaciones, setNotificaciones] = useState(true);
  const [modoOscuro, setModoOscuro] = useState(false);
  const [nuevaContrasena, setNuevaContrasena] = useState("");

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

  const handleCambiarContrasena = () => {
    if (!nuevaContrasena.trim()) return;
    alert("Contraseña cambiada (demo).");
    setNuevaContrasena("");
  };

  return (
    <div className="min-h-[100dvh] bg-[#f6f6f6]">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 w-28 h-[100dvh] bg-green-600 flex flex-col justify-between">
        {/* Logo */}
        <div className="pt-6 flex justify-center">
          <img src={faviconBlanco} alt="Logo" className="w-11 h-11" />
        </div>

        {/* Íconos */}
        <div className="flex-1 flex flex-col items-center space-y-8 mt-6 overflow-y-auto scrollbar-hide-only">
          {[
            { path: "/homemayordomo", icon: IconHome },
            { path: "/registrolabores", icon: IconClipboardList },
            { path: "/historial_labores", icon: IconHistory },
            { path: "/bodega_insumos", icon: IconBox },
            { path: "/variables_climaticasm", icon: IconCloudRain },
            { path: "/informes_mayordomo", icon: IconChartBar },
            { path: "/equipos_mayordomo", icon: IconTractor },
            { path: "/produccion_mayor", icon: IconPlant2 },
            { path: "/cuaderno_campom", icon: IconBook }
          ].map(({ path, icon: IconComp }) => (
            <div className="relative" key={path}>
              {location.pathname === path && (
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-11 bg-white rounded-full" />
              )}
              <button
                onClick={() => navigate(path)}
                className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
              >
                <IconComp className="text-white w-11 h-11" />
              </button>
            </div>
          ))}
        </div>

        {/* Perfil */}
        <div className="relative mb-6 flex justify-center">
          <button
            onClick={() => setMostrarTarjeta(!mostrarTarjeta)}
            className="bg-white w-12 h-12 rounded-full flex items-center justify-center text-green-600 font-bold text-xl shadow hover:scale-110 transition"
          >
            {letraInicial}
          </button>
          {mostrarTarjeta && (
            <div
              ref={tarjetaRef}
              className="absolute bottom-16 left-14 w-56 bg-white/95 border border-gray-200 rounded-xl shadow-2xl py-3 z-[10000] backdrop-blur"
            >
              <button onClick={() => { setMostrarTarjeta(false); navigate("/ajustesmayordomo"); }} className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-100">
                <IconSettings className="w-5 h-5 mr-2 text-green-600" /> Ajustes
              </button>
              <button onClick={() => { setMostrarTarjeta(false); navigate("/soportemayordomo"); }} className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-100">
                <IconTool className="w-5 h-5 mr-2 text-green-600" /> Soporte
              </button>
              <button onClick={() => { setMostrarTarjeta(false); navigate("/login"); }} className="flex items-center w-full text-left px-4 py-2 hover:bg-red-50 text-red-600">
                <IconLogout className="w-5 h-5 mr-2 text-red-600" /> Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Contenido */}
      <main className="ml-28 p-8">
        <h1 className="text-3xl font-bold text-green-600 mb-6">Perfil de la cuenta</h1>

        <div className="bg-white border border-gray-300 rounded-xl p-6 shadow-md w-full max-w-xl space-y-6">
          {/* Datos perfil */}
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Cambiar contraseña</label>
            <div className="flex space-x-2">
              <input
                type="password"
                placeholder="Nueva contraseña"
                value={nuevaContrasena}
                onChange={(e) => setNuevaContrasena(e.target.value)}
                className="flex-1 border border-gray-300 rounded px-4 py-2"
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
            <label className="text-gray-700">Notificaciones</label>
            <input
              type="checkbox"
              checked={notificaciones}
              onChange={() => setNotificaciones(v => !v)}
              className="h-5 w-5 text-green-600"
            />
          </div>

          {/* Tema oscuro */}
          <div className="flex items-center justify-between">
            <label className="text-gray-700">Tema oscuro</label>
            <input
              type="checkbox"
              checked={modoOscuro}
              onChange={() => setModoOscuro(v => !v)}
              className="h-5 w-5 text-green-600"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Ajustes_mayordomo;
