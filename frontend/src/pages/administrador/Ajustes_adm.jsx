import React, { useState, useRef, useEffect } from "react";
import {
  IconHome,
  IconUsers,
  IconCloudUpload,
  IconTool,
  IconSettings,
  IconTool as IconSupport,
  IconLogout,
  IconLock,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import faviconBlanco from "../../assets/favicon-blanco.png";

const Ajustes_adm = () => {
  const navigate = useNavigate();

  const [notificaciones, setNotificaciones] = useState(true);
  const [modoOscuro, setModoOscuro] = useState(false);

  // Datos perfil
  const nombreUsuario = "Juan Pérez"; // Cambiar por el nombre real
  const correoUsuario = "juan.perez@ejemplo.com"; // Ejemplo de correo
  const rolUsuario = "Administrador";
  const letraInicial = (nombreUsuario?.trim()?.[0] || "U").toUpperCase();
  const [mostrarTarjeta, setMostrarTarjeta] = useState(false);
  const tarjetaRef = useRef(null);

  // Cierra tarjeta al hacer clic fuera
  useEffect(() => {
    const handler = (e) => {
      if (tarjetaRef.current && !tarjetaRef.current.contains(e.target)) {
        setMostrarTarjeta(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="bg-green-600 w-28 h-screen flex flex-col items-center py-6 justify-between">
        <div className="flex flex-col items-center space-y-8">
          <img src={faviconBlanco} alt="Logo" className="w-11 h-11" />
          <button
            onClick={() => navigate("/homeadm")}
            className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
          >
            <IconHome className="text-white w-11 h-11" />
          </button>
          <button
            onClick={() => navigate("/admuser")}
            className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
          >
            <IconUsers className="text-white w-11 h-11" />
          </button>
          <button
            onClick={() => navigate("/copias")}
            className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
          >
            <IconCloudUpload className="text-white w-11 h-11" />
          </button>
          <button
            onClick={() => navigate("/soporte")}
            className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
          >
            <IconTool className="text-white w-11 h-11" />
          </button>
        </div>

        {/* Botón perfil */}
        <div className="relative mb-6">
          <button
            onClick={() => setMostrarTarjeta(!mostrarTarjeta)}
            className="bg-white w-12 h-12 rounded-full flex items-center justify-center text-green-600 font-bold text-xl shadow hover:scale-110 transition"
          >
            {letraInicial}
          </button>

          {/* Tarjeta flotante */}
          {mostrarTarjeta && (
            <div
              ref={tarjetaRef}
              className="absolute bottom-16 left-14 w-52 bg-white/95 border-2 border-gray-300 rounded-xl shadow-2xl py-3 z-50"
            >
              <button
                onClick={() => {
                  setMostrarTarjeta(false);
                  navigate("/ajustesadm");
                }}
                className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              >
                <IconSettings className="w-5 h-5 mr-2 text-green-600" />
                Ajustes
              </button>
              <button
                onClick={() => {
                  setMostrarTarjeta(false);
                  alert("Cerrar sesión");
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
                className="flex-1 border border-gray-300 rounded px-4 py-2"
              />
              <button className="bg-green-600 text-white px-4 rounded hover:bg-green-700 flex items-center">
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
              onChange={() => setNotificaciones(!notificaciones)}
              className="h-5 w-5 text-green-600"
            />
          </div>

          {/* Tema oscuro */}
          <div className="flex items-center justify-between">
            <label className="text-gray-700">Tema oscuro</label>
            <input
              type="checkbox"
              checked={modoOscuro}
              onChange={() => setModoOscuro(!modoOscuro)}
              className="h-5 w-5 text-green-600"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ajustes_adm;
