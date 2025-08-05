import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  IconHome, IconClipboardList, IconChartBar, IconCloudRain,
  IconTractor, IconSettings, IconBox, IconUsersGroup,
  IconPlant, IconFrame, IconChevronLeft, IconCheck
} from "@tabler/icons-react";
import faviconBlanco from "../../assets/favicon-blanco.png";

const Registrar_empleado = () => {
  const navigate = useNavigate();
  const [alertaVisible, setAlertaVisible] = useState(false); // ✅ Alerta

  const manejarGuardar = (e) => {
    e.preventDefault();
    setAlertaVisible(true);
    setTimeout(() => {
      setAlertaVisible(false);
      navigate("/manejopersonal");
    }, 2000);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="bg-green-600 w-28 h-screen flex flex-col items-center py-6 justify-between relative">
        <div className="flex-1 flex flex-col items-center space-y-8 overflow-y-auto scrollbar-hide pr-1">
          <img src={faviconBlanco} alt="Logo" className="w-11 h-11" />
          <button onClick={() => navigate("/homeagro")} className="hover:bg-white/10 p-2 rounded-lg"><IconHome className="text-white w-11 h-11" /></button>
          <button onClick={() => navigate("/Laboresagro")} className="hover:bg-white/10 p-2 rounded-lg"><IconClipboardList className="text-white w-11 h-11" /></button>
          <button onClick={() => navigate("/Informesagro")} className="hover:bg-white/10 p-2 rounded-lg"><IconChartBar className="text-white w-11 h-11" /></button>
          <button onClick={() => navigate("/Bodegaagro")} className="hover:bg-white/10 p-2 rounded-lg"><IconBox className="text-white w-11 h-11" /></button>
          <button onClick={() => navigate("/variablesclimaticas")} className="hover:bg-white/10 p-2 rounded-lg"><IconCloudRain className="text-white w-11 h-11" /></button>
          <button onClick={() => navigate("/maquinariaequipos")} className="hover:bg-white/10 p-2 rounded-lg"><IconTractor className="text-white w-11 h-11" /></button>
          <button onClick={() => navigate("/manejopersonal")} className="hover:bg-white/10 p-2 rounded-lg"><IconUsersGroup className="text-white w-11 h-11" /></button>
          <button onClick={() => navigate("/crearfinca")} className="hover:bg-white/10 p-2 rounded-lg"><IconPlant className="text-white w-11 h-11" /></button>
          <button onClick={() => navigate("/crearlote")} className="hover:bg-white/10 p-2 rounded-lg"><IconFrame className="text-white w-11 h-11" /></button>
        </div>
        <div className="sticky bottom-6">
          <button onClick={() => navigate("/ajustes")} className="hover:bg-white/10 p-2 rounded-lg"><IconSettings className="text-white w-11 h-11" /></button>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 p-10 overflow-auto relative bg-gray-50">
        {/* 🔔 Alerta flotante */}
        {alertaVisible && (
          <div className="fixed top-3 left-1/2 -translate-x-1/2 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 text-base font-semibold">
            <IconCheck className="w-5 h-5" /> Empleado registrado exitosamente
          </div>
        )}

        <button onClick={() => navigate("/manejopersonal")} className="flex items-center text-green-700 font-semibold mb-6 hover:underline">
          <IconChevronLeft className="w-5 h-5 mr-1" /> Volver
        </button>

        <div className="bg-white border-2 border-green-200 rounded-lg max-w-4xl mx-auto px-10 py-12 shadow-lg min-h-[700px] flex flex-col">
          <h1 className="text-3xl font-bold text-green-600 mb-8">Registrar empleado</h1>

          <form onSubmit={manejarGuardar} className="grid grid-cols-1 md:grid-cols-2 gap-10 flex-grow">
            <div>
              <label className="block font-bold text-gray-700 mb-2">Nombre completo</label>
              <input type="text" className="w-full border rounded px-4 py-3" placeholder="Juan Pérez" required />
            </div>
            <div>
              <label className="block font-bold text-gray-700 mb-2">Cargo</label>
              <input type="text" className="w-full border rounded px-4 py-3" placeholder="Operario de campo" required />
            </div>
            <div>
              <label className="block font-bold text-gray-700 mb-2">Estado</label>
              <select className="w-full border rounded px-4 py-3" required>
                <option>Activo</option>
                <option>Inactivo</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-gray-700 mb-2">Finca</label>
              <select className="w-full border rounded px-4 py-3" required>
                <option>La Esmeralda</option>
                <option>La Carolina</option>
                <option>Las Palmas</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-gray-700 mb-2">Teléfono</label>
              <input type="text" className="w-full border rounded px-4 py-3" placeholder="3124567890" required />
            </div>
            <div>
              <label className="block font-bold text-gray-700 mb-2">Acceso</label>
              <select className="w-full border rounded px-4 py-3" required>
                <option>Completo</option>
                <option>Limitado</option>
                <option>Sin acceso</option>
              </select>
            </div>

            <div className="md:col-span-2 flex justify-center mt-6">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md text-base font-semibold"
              >
                Guardar empleado
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registrar_empleado;




