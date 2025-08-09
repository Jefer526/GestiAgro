import React, { useState, useRef, useEffect } from "react";
import {
  IconHome,
  IconUsers,
  IconCloudUpload,
  IconTool,
  IconSettings,
  IconLogout,
  IconChevronLeft,
  IconDeviceFloppy,
  IconCheck,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import faviconBlanco from "../../assets/favicon-blanco.png";

const Editar_copias = () => {
  const navigate = useNavigate();
  const [fecha, setFecha] = useState("2025-06-12");
  const [hora, setHora] = useState("14:21");
  const [alertaVisible, setAlertaVisible] = useState(false);

  // Datos perfil
  const nombreUsuario = "Juan Pérez"; // cambiar por el real
  const letraInicial = (nombreUsuario?.trim()?.[0] || "U").toUpperCase();
  const [mostrarTarjeta, setMostrarTarjeta] = useState(false);
  const tarjetaRef = useRef(null);

  // Cerrar tarjeta al hacer clic fuera
  useEffect(() => {
    const handler = (e) => {
      if (tarjetaRef.current && !tarjetaRef.current.contains(e.target)) {
        setMostrarTarjeta(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleGuardar = () => {
    console.log("Guardando copia actualizada:", { fecha, hora });
    setAlertaVisible(true);
    setTimeout(() => {
      setAlertaVisible(false);
      navigate("/copias");
    }, 2000);
  };

  return (
    <div className="flex w-full h-full bg-white">
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
          <div className="relative">
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-11 bg-white rounded-full" />
            <button className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
              <IconCloudUpload className="text-white w-11 h-11" />
            </button>
          </div>
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
                  navigate("/");
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
      <div className="flex-1 bg-gray-50 min-h-screen p-10 relative">
        {/* Alerta */}
        {alertaVisible && (
          <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 text-base font-semibold">
            <IconCheck className="w-5 h-5" /> Cambios guardados exitosamente
          </div>
        )}

        <button
          onClick={() => navigate("/copias")}
          className="flex items-center text-green-600 font-semibold mb-6 text-lg hover:underline"
        >
          <IconChevronLeft className="w-5 h-5 mr-1" /> Volver
        </button>

        <div className="bg-white border border-gray-300 shadow-lg rounded-xl p-8 max-w-xl mx-auto">
          <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">
            Editar copia de seguridad
          </h1>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              Fecha de carga
            </label>
            <input
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              Hora de carga
            </label>
            <input
              type="time"
              value={hora}
              onChange={(e) => setHora(e.target.value)}
              className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleGuardar}
              className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 flex items-center gap-2 font-semibold"
            >
              <IconDeviceFloppy className="w-5 h-5" /> Guardar cambios
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editar_copias;

