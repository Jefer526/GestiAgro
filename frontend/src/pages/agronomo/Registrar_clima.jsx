import React, { useState } from "react";
import {
  IconArrowLeft,
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
  IconCheck,
} from "@tabler/icons-react";
import faviconBlanco from "../../assets/favicon-blanco.png";
import { useNavigate } from "react-router-dom";

const Registrar_clima = () => {
  const navigate = useNavigate();
  const [alertaVisible, setAlertaVisible] = useState(false); // Estado de alerta

  const handleSubmit = (e) => {
    e.preventDefault();
    setAlertaVisible(true); // Mostrar alerta
    setTimeout(() => {
      setAlertaVisible(false);
      navigate("/variablesclimaticas"); // Redirigir después de 2s
    }, 2000);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="bg-green-600 w-28 h-full flex flex-col items-center py-6 justify-between">
        <div className="flex-1 flex flex-col items-center space-y-8 overflow-y-auto pr-1 scrollbar-hide-only">
          <img src={faviconBlanco} alt="Logo" className="w-11 h-11" />
          <button onClick={() => navigate("/homeagro")} className="hover:bg-white/10 p-2 rounded-lg">
            <IconHome className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/Laboresagro")} className="hover:bg-white/10 p-2 rounded-lg">
            <IconClipboardList className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/Informesagro")} className="hover:bg-white/10 p-2 rounded-lg">
            <IconChartBar className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/Bodegaagro")} className="hover:bg-white/10 p-2 rounded-lg">
            <IconBox className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/variablesclimaticas")} className="bg-white/10 p-2 rounded-lg">
            <IconCloudRain className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/maquinariaequipos")} className="hover:bg-white/10 p-2 rounded-lg">
            <IconTractor className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/manejopersonal")} className="hover:bg-white/10 p-2 rounded-lg">
            <IconUsersGroup className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/crearfinca")} className="hover:bg-white/10 p-2 rounded-lg">
            <IconPlant className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/crearlote")} className="hover:bg-white/10 p-2 rounded-lg">
            <IconFrame className="text-white w-11 h-11" />
          </button>
        </div>
        <div className="sticky bottom-6">
          <button onClick={() => navigate("/ajustes")} className="hover:bg-white/10 p-2 rounded-lg">
            <IconSettings className="text-white w-11 h-11" />
          </button>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col items-center pt-8 bg-[#f6f6f6] relative">
        {/* Alerta flotante */}
        {alertaVisible && (
          <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 text-base font-semibold">
            <IconCheck className="w-5 h-5" /> Registro exitoso
          </div>
        )}

        {/* Botón Volver */}
        <button
          type="button"
          onClick={() => navigate("/variablesclimaticas")}
          className="flex items-center text-green-600 text-lg mb-6 self-start ml-12 hover:underline"
        >
          <IconArrowLeft className="w-5 h-5 mr-1" /> Volver
        </button>

        {/* Formulario */}
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-green-300 shadow-md p-10 rounded-xl w-full max-w-2xl space-y-6 text-black"
        >
          <h2 className="text-3xl font-bold text-green-700 text-center">Registrar variables climáticas</h2>
          <p className="text-center text-green-700 font-semibold text-lg">Hacienda La Esmeralda</p>

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

export default Registrar_clima;




