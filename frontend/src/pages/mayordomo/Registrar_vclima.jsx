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
  IconPlant2,
  IconBook
} from "@tabler/icons-react";
import { useNavigate, useLocation } from "react-router-dom";
import faviconBlanco from "../../assets/favicon-blanco.png";

const Registrar_vclima = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [alertaVisible, setAlertaVisible] = useState(false);

  // Perfil
  const nombreUsuario = "Juan Pérez";
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setAlertaVisible(true);
    setTimeout(() => {
      setAlertaVisible(false);
      navigate("/variables_climaticasm");
    }, 2000);
  };

  return (
    <div className="min-h-[100dvh] bg-[#f6f6f6]">
      {/* Sidebar fijo */}
      <aside className="fixed left-0 top-0 w-28 h-[100dvh] bg-green-600 flex flex-col justify-between z-[200]">
        
        {/* Logo fijo */}
        <div className="pt-6 flex justify-center">
          <img src={faviconBlanco} alt="Logo" className="w-11 h-11" />
        </div>

        {/* Zona de iconos con scroll */}
        <div className="flex-1 flex flex-col items-center space-y-8 mt-6 overflow-y-auto scrollbar-hide-only">

          {/* Home */}
          <div className="relative">
            {location.pathname === "/homemayordomo" && (
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-11 bg-white rounded-full" />
            )}
            <button
              onClick={() => navigate("/homemayordomo")}
              className="hover:bg-white/10 p-2 rounded-lg transition"
            >
              <IconHome className="text-white w-11 h-11" />
            </button>
          </div>

          {/* Registro Labores */}
          <div className="relative">
            {location.pathname === "/registrolabores" && (
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-11 bg-white rounded-full" />
            )}
            <button
              onClick={() => navigate("/registrolabores")}
              className="hover:bg-white/10 p-2 rounded-lg transition"
            >
              <IconClipboardList className="text-white w-11 h-11" />
            </button>
          </div>

          {/* Historial labores */}
          <div className="relative">
            {location.pathname === "/historial_labores" && (
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-11 bg-white rounded-full" />
            )}
            <button
              onClick={() => navigate("/historial_labores")}
              className="hover:bg-white/10 p-2 rounded-lg transition"
            >
              <IconHistory className="text-white w-11 h-11" />
            </button>
          </div>

          {/* Cuaderno de campo */}
          <div className="relative">
            {location.pathname === "/cuaderno_campom" && (
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-11 bg-white rounded-full" />
            )}
            <button
              onClick={() => navigate("/cuaderno_campom")}
              className="hover:bg-white/10 p-2 rounded-lg transition"
            >
              <IconBook className="text-white w-11 h-11" />
            </button>
          </div>
          
          {/* Producción */}
          <div className="relative">
            {location.pathname === "/produccion_mayor" && (
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-11 bg-white rounded-full" />
            )}
            <button
              onClick={() => navigate("/produccion_mayor")}
              className="hover:bg-white/10 p-2 rounded-lg transition"
            >
              <IconPlant2 className="text-white w-11 h-11" />
            </button>
          </div>

          

          {/* Bodega */}
          <div className="relative">
            {location.pathname === "/bodega_insumos" && (
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-11 bg-white rounded-full" />
            )}
            <button
              onClick={() => navigate("/bodega_insumos")}
              className="hover:bg-white/10 p-2 rounded-lg transition"
            >
              <IconBox className="text-white w-11 h-11" />
            </button>
          </div>

          {/* Variables climáticas ACTIVO */}
          <div className="relative">
            {location.pathname === "/registrar_climam" && (
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-11 bg-white rounded-full" />
            )}
            <button
              onClick={() => navigate("/variables_climaticasm")}
              className="hover:bg-white/10 p-2 rounded-lg transition"
            >
              <IconCloudRain className="text-white w-11 h-11" />
            </button>
          </div>

          {/* Informes */}
          <div className="relative">
            {location.pathname === "/informes_mayordomo" && (
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-11 bg-white rounded-full" />
            )}
            <button
              onClick={() => navigate("/informes_mayordomo")}
              className="hover:bg-white/10 p-2 rounded-lg transition"
            >
              <IconChartBar className="text-white w-11 h-11" />
            </button>
          </div>

          {/* Maquinaria */}
          <div className="relative">
            {location.pathname === "/equipos_mayordomo" && (
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-11 bg-white rounded-full" />
            )}
            <button
              onClick={() => navigate("/equipos_mayordomo")}
              className="hover:bg-white/10 p-2 rounded-lg transition"
            >
              <IconTractor className="text-white w-11 h-11" />
            </button>
          </div> 
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
              className="absolute bottom-16 left-14 w-52 bg-white/95 backdrop-blur border-2 border-gray-300 rounded-xl shadow-2xl py-3"
            >
              <button
                onClick={() => { setMostrarTarjeta(false); navigate("/ajustesmayordomo"); }}
                className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              >
                <IconSettings className="w-5 h-5 mr-2 text-green-600" /> Ajustes
              </button>
              <button
                onClick={() => { setMostrarTarjeta(false); navigate("/soportemayordomo"); }}
                className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              >
                <IconTool className="w-5 h-5 mr-2 text-green-600" /> Soporte
              </button>
              <button
                onClick={() => { setMostrarTarjeta(false); navigate("/login"); }}
                className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-600"
              >
                <IconLogout className="w-5 h-5 mr-2 text-red-600" /> Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Contenido principal */}
      <main className="ml-28 min-h-[100dvh] flex flex-col items-center pt-8 relative">
        {alertaVisible && (
          <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 z-[11000] font-semibold text-base">
            <IconCheck className="w-5 h-5" /> Variables registradas exitosamente
          </div>
        )}

        {/* Volver */}
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
      </main>
    </div>
  );
};

export default Registrar_vclima;

