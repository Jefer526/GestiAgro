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
  IconCamera,
  IconBook,
  IconPlant2
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import faviconBlanco from "../../assets/favicon-blanco.png";

const Cuaderno_campom = () => {
  const navigate = useNavigate();

  const [filtros, setFiltros] = useState({
    fecha: "",
    finca: "",
    lote: "",
    anotaciones: "",
  });

  // Datos perfil
  const nombreUsuario = "Juan Pérez";
  const letraInicial = (nombreUsuario?.trim()?.[0] || "U").toUpperCase();
  const [mostrarTarjeta, setMostrarTarjeta] = useState(false);
  const tarjetaRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (tarjetaRef.current && !tarjetaRef.current.contains(e.target)) {
        setMostrarTarjeta(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFiltros({ ...filtros, [name]: value });
  };

  const handleTomarFoto = () => {
    alert("Función para tomar foto en desarrollo 📸");
  };

  return (
    <div className="min-h-[100dvh] bg-[#f6f6f6]">
      {/* Sidebar fijo */}
      <aside className="fixed left-0 top-0 w-28 h-[100dvh] bg-green-600 flex flex-col justify-between">
        {/* Logo fijo */}
        <div className="pt-6 flex justify-center">
          <img src={faviconBlanco} alt="Logo" className="w-11 h-11" />
        </div>

        {/* Íconos con scroll */}
        <div className="flex-1 flex flex-col items-center space-y-8 mt-6 overflow-y-auto scrollbar-hide-only">
          {/* Home */}
          <div className="relative">
            {location.pathname === "/homemayordomo" && (
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-11 bg-white rounded-full" />
            )}
            <button onClick={() => navigate("/homemayordomo")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
              <IconHome className="text-white w-11 h-11" />
            </button>
          </div>

          {/* Registro labores */}
          <div className="relative">
            {location.pathname === "/registrolabores" && (
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-11 bg-white rounded-full" />
            )}
            <button onClick={() => navigate("/registrolabores")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
              <IconClipboardList className="text-white w-11 h-11" />
            </button>
          </div>

          {/* Historial labores */}
          <div className="relative">
            {location.pathname === "/historial_labores" && (
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-11 bg-white rounded-full" />
            )}
            <button onClick={() => navigate("/historial_labores")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
              <IconHistory className="text-white w-11 h-11" />
            </button>
          </div>
          {/* Cuaderno de Campo */}
          <div className="relative">
            {location.pathname === "/cuaderno_campom" && (
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-11 bg-white rounded-full" />
            )}
            <button onClick={() => navigate("/cuaderno_campom")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
              <IconBook className="text-white w-11 h-11" />
            </button>
          </div>
          {/* Producción */}
          <div className="relative">
            {location.pathname === "/produccion_mayor" && (
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-11 bg-white rounded-full" />
            )}
            <button onClick={() => navigate("/produccion_mayor")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
              <IconPlant2 className="text-white w-11 h-11" />
            </button>
          </div>
          {/* Bodega */}
          <div className="relative">
            {location.pathname === "/bodega_insumos" && (
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-11 bg-white rounded-full" />
            )}
            <button onClick={() => navigate("/bodega_insumos")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
              <IconBox className="text-white w-11 h-11" />
            </button>
          </div>

          {/* Variables climáticas */}
          <div className="relative">
            {location.pathname === "/variables_climaticasm" && (
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-11 bg-white rounded-full" />
            )}
            <button onClick={() => navigate("/variables_climaticasm")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
              <IconCloudRain className="text-white w-11 h-11" />
            </button>
          </div>

          {/* Informes */}
          <div className="relative">
            {location.pathname === "/informes_mayordomo" && (
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-11 bg-white rounded-full" />
            )}
            <button onClick={() => navigate("/informes_mayordomo")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
              <IconChartBar className="text-white w-11 h-11" />
            </button>
          </div>

          {/* Maquinaria */}
          <div className="relative">
            {location.pathname === "/registrar_novedadm" && (
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-11 bg-white rounded-full" />
            )}
            <button onClick={() => navigate("/equipos_mayordomo")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
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
      <main className="ml-28 min-h-[100dvh] flex justify-center items-center p-8 overflow-auto">
        <div className="bg-white border border-green-300 shadow-md p-10 rounded-xl w-full max-w-3xl space-y-6 text-black">
          <h1 className="text-3xl font-bold text-green-700">Cuaderno de Campo</h1>

          <div>
            <p className="font-bold text-lg mb-2">Fecha</p>
            <input
              type="date"
              name="fecha"
              value={filtros.fecha}
              onChange={handleChange}
              className="border p-3 rounded w-full text-lg"
            />
          </div>

          <div>
            <p className="font-bold text-lg mb-2">Finca</p>
            <select
              name="finca"
              value={filtros.finca}
              onChange={handleChange}
              className="w-full border p-4 rounded text-lg"
            >
              <option value="" disabled hidden>Selecciona una finca</option>
              <option value="La Esmeralda">La Esmeralda</option>
              <option value="Las Palmas">Las Palmas</option>
              <option value="La Carolina">La Carolina</option>
            </select>
          </div>

          <div>
            <p className="font-bold text-lg mb-2">Lote</p>
            <select
              name="lote"
              value={filtros.lote}
              onChange={handleChange}
              className="w-full border p-4 rounded text-lg"
            >
              <option value="" disabled hidden>Selecciona un lote</option>
              <option value="Lote 1">Lote 1</option>
              <option value="Lote 2">Lote 2</option>
              <option value="Lote 3">Lote 3</option>
            </select>
          </div>

          <div>
            <p className="font-bold text-lg mb-2">Ingresar anotaciones</p>
            <textarea
              name="anotaciones"
              value={filtros.anotaciones}
              onChange={handleChange}
              rows={5}
              className="w-full border p-4 rounded text-lg"
              placeholder="Escribe tus observaciones o detalles aquí..."
            />
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleTomarFoto}
              className="bg-green-600 text-white px-8 py-3 rounded hover:bg-green-700 text-lg flex items-center gap-2"
            >
              <IconCamera className="w-5 h-5" />
              Tomar foto
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Cuaderno_campom;
