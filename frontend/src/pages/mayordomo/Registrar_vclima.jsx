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
  IconArrowLeft,
  IconCheck,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import faviconBlanco from "../../assets/favicon-blanco.png";

const Registrar_vclima = () => {
  const navigate = useNavigate();
  const [alertaVisible, setAlertaVisible] = useState(false);

  // Datos de perfil
  const nombreUsuario = "Juan Pérez"; // reemplazar por el nombre real
  const letraInicial = (nombreUsuario?.trim()?.[0] || "U").toUpperCase();
  const [mostrarTarjeta, setMostrarTarjeta] = useState(false);
  const tarjetaRef = useRef(null);

  // Cierra la tarjeta si se hace clic fuera
  useEffect(() => {
    const handler = (e) => {
      if (tarjetaRef.current && !tarjetaRef.current.contains(e.target)) {
        setMostrarTarjeta(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setAlertaVisible(true);
    setTimeout(() => {
      setAlertaVisible(false);
      navigate("/variables_climaticasm");
    }, 2000);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="bg-green-600 w-28 h-full flex flex-col items-center py-6 justify-between">
        <div className="flex flex-col items-center space-y-8">
          <img src={faviconBlanco} alt="Logo" className="w-11 h-11" />
          <button onClick={() => navigate("/homemayordomo")} className="hover:bg-white/10 p-2 rounded-lg transition">
            <IconHome className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/registrolabores")} className="hover:bg-white/10 p-2 rounded-lg transition">
            <IconClipboardList className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/historial_labores")} className="hover:bg-white/10 p-2 rounded-lg transition">
            <IconHistory className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/bodega_insumos")} className="hover:bg-white/10 p-2 rounded-lg transition">
            <IconBox className="text-white w-11 h-11" />
          </button>
          <div className="relative w-full flex justify-center">
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-11 bg-white rounded-full z-10" />
            <button className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
              <IconCloudRain className="text-white w-11 h-11" />
            </button>
          </div>
          <button onClick={() => navigate("/informes_mayordomo")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconChartBar className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/equipos_mayordomo")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconTractor className="text-white w-11 h-11" />
          </button>
        </div>

        {/* Botón de perfil con tarjeta */}
        <div className="relative mb-6">
          <button
            onClick={() => setMostrarTarjeta(!mostrarTarjeta)}
            className="bg-white w-12 h-12 rounded-full flex items-center justify-center text-green-600 font-bold text-xl shadow hover:scale-110 transition"
          >
            {letraInicial}
          </button>

          {mostrarTarjeta && (
            <div
              ref={tarjetaRef}
              className="absolute bottom-16 left-14 w-52 bg-white/95 border-2 border-green-300 rounded-xl shadow-2xl py-3 z-50"
            >
              <button
                onClick={() => { setMostrarTarjeta(false); navigate("/ajustes"); }}
                className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              >
                <IconSettings className="w-5 h-5 mr-2 text-green-600" />
                Ajustes
              </button>
              <button
                onClick={() => { setMostrarTarjeta(false); navigate("/soporte"); }}
                className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              >
                <IconTool className="w-5 h-5 mr-2 text-green-600" />
                Soporte
              </button>
              <button
                onClick={() => { setMostrarTarjeta(false); alert("Cerrar sesión"); }}
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
      <div className="flex-1 flex flex-col items-center pt-8 bg-[#f6f6f6] relative">
        {/* Alerta flotante */}
        {alertaVisible && (
          <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 z-50 font-semibold text-base">
            <IconCheck className="w-5 h-5" /> Variables registradas exitosamente
          </div>
        )}

        {/* Botón Volver */}
        <button
          type="button"
          onClick={() => navigate("/variables_climaticasm")}
          className="flex items-center text-green-600 text-lg mb-6 self-start ml-12 hover:underline"
        >
          <IconArrowLeft className="w-5 h-5 mr-1" /> Volver
        </button>

        {/* Formulario */}
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-green-300 shadow-md p-10 rounded-xl w-full max-w-2xl space-y-6 text-black"
        >
          <h2 className="text-3xl font-bold text-green-700 text-center">
            Registrar variables climáticas
          </h2>
          <p className="text-center text-green-700 font-semibold text-lg">
            Hacienda La Esmeralda
          </p>

          <div>
            <label className="block font-bold mb-1">Fecha</label>
            <input type="date" className="border px-4 py-2 rounded w-full text-lg" required />
          </div>

          <div>
            <label className="block font-bold mb-1">Precipitación (mm)</label>
            <input type="text" placeholder="Ej: 10" className="border px-4 py-2 rounded w-full text-lg" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-bold mb-1">Temperatura mínima (°C)</label>
              <input type="text" placeholder="Ej: 16°" className="border px-4 py-2 rounded w-full text-lg" />
            </div>
            <div>
              <label className="block font-bold mb-1">Temperatura máxima (°C)</label>
              <input type="text" placeholder="Ej: 29°" className="border px-4 py-2 rounded w-full text-lg" />
            </div>
          </div>

          <div>
            <label className="block font-bold mb-1">Humedad relativa (%)</label>
            <input type="text" placeholder="Ej: 85%" className="border px-4 py-2 rounded w-full text-lg" />
          </div>

          <div className="text-center">
            <button className="bg-green-600 text-white px-8 py-3 rounded hover:bg-green-700 text-lg">
              Registrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registrar_vclima;

