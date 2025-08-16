import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  IconChevronLeft,
  IconPlant2,
  IconBook,
  IconCheck
} from "@tabler/icons-react";
import faviconBlanco from "../../assets/favicon-blanco.png";

const Registrar_novedad_hoja = () => {
  const navigate = useNavigate();
  const nombreUsuario = "Juan Pérez";
  const letraInicial = (nombreUsuario?.trim()?.[0] || "U").toUpperCase();

  const [mostrarTarjeta, setMostrarTarjeta] = useState(false);
  const tarjetaRef = useRef(null);

  const [alertaVisible, setAlertaVisible] = useState(false);

  const [formData, setFormData] = useState({
    codigoequipo: "",
    maquina: "",
    referencia: "",
    ubicacion: "",
    estado: "",
    fecha: "",
    tipo: "",
    descripcion: "",
    realizadoPor: "",
  });

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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos registrados:", formData);
    setAlertaVisible(true);
    setTimeout(() => {
      setAlertaVisible(false);
      navigate("/hoja_vidam");
    }, 2000);
  };

  return (
    <div className="relative">
      {/* ALERTA */}
      {alertaVisible && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 text-base font-semibold z-[10000] transition-all duration-300">
          <IconCheck className="w-5 h-5" />
          Registrado exitosamente
        </div>
      )}

      {/* SIDEBAR */}
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
            {location.pathname === "/registrar_novedad_hoja" && (
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

      {/* CONTENIDO */}
      <main className="ml-28 min-h-[100dvh] bg-gray-50 px-10 py-8 relative">
        <button
          onClick={() => navigate("/hoja_vidam")}
          className="flex items-center text-green-600 font-medium mb-4"
        >
          <IconChevronLeft className="w-5 h-5 mr-2" />
          Volver
        </button>

        <div className="bg-white border border-green-300 rounded-xl shadow-md p-8 w-[800px] mx-auto">
          <h1 className="text-2xl font-bold text-green-600 mb-6">Registro novedad</h1>

          <form onSubmit={handleSubmit} className="space-y-4 text-base">
            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="block font-semibold mb-1">Código Equipo:</label>
                <input name="codigoequipo" value={formData.codigoequipo} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-1.5" />
              </div>
              <div>
                <label className="block font-semibold mb-1">Referencia:</label>
                <input name="referencia" value={formData.referencia} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-1.5" />
              </div>
              <div>
                <label className="block font-semibold mb-1">Máquina:</label>
                <input name="maquina" value={formData.maquina} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-1.5" />
              </div>
              <div>
                <label className="block font-semibold mb-1">Ubicación:</label>
                <select name="ubicacion" value={formData.ubicacion} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-1.5">
                  <option value="">Selecciona</option>
                  <option>Bodega</option>
                  <option>La Esmeralda</option>
                  <option>La Carolina</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold mb-1">Estado:</label>
                <select name="estado" value={formData.estado} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-1.5">
                  <option value="">Selecciona</option>
                  <option>Óptimo</option>
                  <option>En operación</option>
                  <option>Mantenimiento</option>
                  <option>Averiado</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold mb-1">Fecha:</label>
                <input type="date" name="fecha" value={formData.fecha} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-1.5" />
              </div>
              <div className="col-span-2">
                <label className="block font-semibold mb-1">Tipo de novedad:</label>
                <select name="tipo" value={formData.tipo} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-1.5">
                  <option value="">Selecciona una opción</option>
                  <option>Mantenimiento</option>
                  <option>Reparación</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block font-semibold mb-1">Descripción:</label>
              <textarea name="descripcion" value={formData.descripcion} onChange={handleChange} rows="3" className="w-full border border-gray-300 rounded px-3 py-2" />
            </div>
            <div>
              <label className="block font-semibold mb-1">Realizado por:</label>
              <input name="realizadoPor" value={formData.realizadoPor} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-1.5" />
            </div>
            <div className="flex justify-center mt-4">
              <button type="submit" className="bg-green-600 text-white px-8 py-2 rounded-lg hover:bg-green-700 font-semibold">
                Guardar
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Registrar_novedad_hoja;


