import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  IconArrowLeft,
  IconCheck,
} from "@tabler/icons-react";
import faviconBlanco from "../../assets/favicon-blanco.png";

const Registrar_maquina = () => {
  const navigate = useNavigate();
  const [alertaVisible, setAlertaVisible] = useState(false); // 👈 estado alerta

  const handleSubmit = (e) => {
    e.preventDefault();
    setAlertaVisible(true); // Mostrar alerta
    setTimeout(() => {
      setAlertaVisible(false);
      navigate("/maquinariaequipos");
    }, 2000); // Espera 2s antes de redirigir
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="bg-green-600 w-28 h-full flex flex-col items-center py-6 justify-between relative">
        <div className="flex-1 flex flex-col items-center space-y-8 overflow-y-auto pr-1 scrollbar-hide-only">
          <img src={faviconBlanco} alt="Logo" className="w-11 h-11" />
          <button onClick={() => navigate("/homeagro")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconHome className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/Laboresagro")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconClipboardList className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/Informesagro")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconChartBar className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/Bodegaagro")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconBox className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/variablesclimaticas")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconCloudRain className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/maquinariaequipos")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconTractor className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/manejopersonal")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconUsersGroup className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/crearfinca")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconPlant className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/crearlote")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconFrame className="text-white w-11 h-11" />
          </button>
        </div>
        <div className="sticky bottom-6 bg-green-600">
          <button onClick={() => navigate("/ajustes")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconSettings className="text-white w-11 h-11" />
          </button>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 px-10 py-6 relative bg-gray-50">
        {/* 🔔 Alerta flotante */}
        {alertaVisible && (
          <div className="fixed top-3 left-1/2 -translate-x-1/2 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 text-base font-semibold">
            <IconCheck className="w-5 h-5" /> Máquina registrada exitosamente
          </div>
        )}

        {/* Botón volver */}
        <button
          onClick={() => navigate("/maquinariaequipos")}
          className="flex items-center text-green-600 hover:text-green-800 mb-6"
        >
          <IconArrowLeft className="w-6 h-6 mr-1" />
          <span className="text-base font-medium">Volver</span>
        </button>

        {/* Formulario */}
        <div className="max-w-2xl mx-auto bg-white border border-green-300 rounded-xl p-10 shadow-md">
          <h1 className="text-3xl font-bold text-green-600 mb-10 text-center">Registrar Nueva Máquina</h1>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block mb-2 font-semibold text-lg">Máquina</label>
              <input type="text" className="w-full border border-gray-300 rounded px-4 py-2 text-lg" placeholder="Ej: Tractor" required />
            </div>
            <div>
              <label className="block mb-2 font-semibold text-lg">Referencia</label>
              <input type="text" className="w-full border border-gray-300 rounded px-4 py-2 text-lg" placeholder="Ej: JD 5055" required />
            </div>
            <div>
              <label className="block mb-2 font-semibold text-lg">Ubicación</label>
              <select className="w-full border border-gray-300 rounded px-4 py-2 text-lg" required>
                <option>La Esmeralda</option>
                <option>Las Palmas</option>
                <option>La Carolina</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 font-semibold text-lg">Estado</label>
              <select className="w-full border border-gray-300 rounded px-4 py-2 text-lg" required>
                <option>Óptimo</option>
                <option>Mantenimiento</option>
                <option>Averiado</option>
              </select>
            </div>
            <div className="flex justify-center mt-8">
              <button type="submit" className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 text-lg font-semibold">
                Registrar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registrar_maquina;

