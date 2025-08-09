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
  IconLock,          // ✅ faltaba
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import faviconBlanco from "../../assets/favicon-blanco.png";

const Ajustes_mayordomo = () => {
  const navigate = useNavigate();

  // ✅ Datos del usuario (conecta esto a tu auth luego)
  const nombreUsuario = "Juan Pérez";
  const rolUsuario = "Mayordomo";
  const correoUsuario = "juan.perez@example.com";
  const letraInicial = (nombreUsuario?.trim()?.[0] || "U").toUpperCase();

  // ✅ Estados que faltaban
  const [notificaciones, setNotificaciones] = useState(true);
  const [modoOscuro, setModoOscuro] = useState(false);
  const [nuevaContrasena, setNuevaContrasena] = useState("");

  const [mostrarTarjeta, setMostrarTarjeta] = useState(false);
  const tarjetaRef = useRef(null);

  // Cierra la tarjeta si se hace clic fuera
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
    // TODO: Conectar a tu endpoint para cambiar contraseña.
    // Ejemplo:
    // await axios.post("/api/usuarios/cambiar-password", { password: nuevaContrasena })
    //   .then(() => toast.success("Contraseña actualizada"))
    //   .catch(() => toast.error("Error al actualizar"));
    alert("Contraseña cambiada (demo).");
    setNuevaContrasena("");
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="bg-green-600 w-28 h-screen flex flex-col items-center py-6 justify-between relative">
        {/* Arriba: Logo */}
        <div className="flex flex-col items-center space-y-8">
          <img src={faviconBlanco} alt="Logo" className="w-11 h-11" />

          {/* Icono HOME con indicador */}
          <div className="relative">
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-11 bg-white rounded-full" />
            <button
              onClick={() => navigate("/homemayordomo")}
              className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
            >
              <IconHome className="text-white w-11 h-11" />
            </button>
          </div>

          {/* Resto de iconos */}
          <button
            onClick={() => navigate("/registrolabores")}
            className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
          >
            <IconClipboardList className="text-white w-11 h-11" />
          </button>
          <button
            onClick={() => navigate("/historial_labores")}
            className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
          >
            <IconHistory className="text-white w-11 h-11" />
          </button>
          <button
            onClick={() => navigate("/bodega_insumos")}
            className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
          >
            <IconBox className="text-white w-11 h-11" />
          </button>
          <button
            onClick={() => navigate("/variables_climaticasm")}
            className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
          >
            <IconCloudRain className="text-white w-11 h-11" />
          </button>
          <button
            onClick={() => navigate("/informes_mayordomo")}
            className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
          >
            <IconChartBar className="text-white w-11 h-11" />
          </button>
          <button
            onClick={() => navigate("/equipos_mayordomo")}
            className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
          >
            <IconTractor className="text-white w-11 h-11" />
          </button>
        </div>

        {/* Abajo: Perfil con tarjeta */}
        <div className="relative mb-6">
          <button
            onClick={() => setMostrarTarjeta(!mostrarTarjeta)}
            className="bg-white w-12 h-12 rounded-full flex items-center justify-center text-green-600 font-bold text-xl shadow hover:scale-110 transition"
            aria-haspopup="menu"
            aria-expanded={mostrarTarjeta}
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
                onClick={() => {
                  setMostrarTarjeta(false);
                  navigate("/ajustesmayordomo");
                }}
                className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                role="menuitem"
              >
                <IconSettings className="w-5 h-5 mr-2 text-green-600" />
                Ajustes
              </button>
              <button
                onClick={() => {
                  setMostrarTarjeta(false);
                  navigate("/soportemayordomo");
                }}
                className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                role="menuitem"
              >
                <IconTool className="w-5 h-5 mr-2 text-green-600" />
                Soporte
              </button>
              <button
                onClick={() => {
                  setMostrarTarjeta(false);
                  navigate("/login");
                }}
                className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-600"
                role="menuitem"
              >
                <IconLogout className="w-5 h-5 mr-2 text-red-600" />
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-green-600 mb-6">Perfil de la cuenta</h1>

        {/* Sección perfil */}
        <div className="bg-white border border-gray-300 rounded-xl p-6 shadow-md w-full max-w-xl space-y-6">
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
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cambiar contraseña
            </label>
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
              onChange={() => setNotificaciones((v) => !v)}
              className="h-5 w-5 text-green-600"
            />
          </div>

          {/* Tema oscuro */}
          <div className="flex items-center justify-between">
            <label className="text-gray-700">Tema oscuro</label>
            <input
              type="checkbox"
              checked={modoOscuro}
              onChange={() => setModoOscuro((v) => !v)}
              className="h-5 w-5 text-green-600"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ajustes_mayordomo;
