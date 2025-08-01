import React, { useState } from "react";
import {
  IconHome,
  IconUsers,
  IconCloudUpload,
  IconTool,
  IconSettings,
  IconChevronLeft,
  IconDeviceFloppy,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import faviconBlanco from "../../assets/favicon-blanco.png";

const Editar_copias = () => {
  const navigate = useNavigate();
  const [fecha, setFecha] = useState("2025-06-12");
  const [hora, setHora] = useState("14:21");

  const handleGuardar = () => {
    console.log("Guardando copia actualizada:", { fecha, hora });
    navigate("/copias");
  };

  return (
    <div className="flex w-full h-full bg-white">
      {/* Sidebar */}
      <div className="bg-green-600 w-28 h-screen flex flex-col items-center py-6 justify-between">
        <div className="flex flex-col items-center space-y-8">
          <img src={faviconBlanco} alt="Logo" className="w-11 h-11" />
          <button onClick={() => navigate("/homeadm")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconHome className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/admuser")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconUsers className="text-white w-11 h-11" />
          </button>
          <div className="relative">
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-11 bg-white rounded-full" />
            <button className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
              <IconCloudUpload className="text-white w-11 h-11" />
            </button>
          </div>
          <button onClick={() => navigate("/soporte")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconTool className="text-white w-11 h-11" />
          </button>
        </div>
        <button onClick={() => navigate("/ajustes")} className="mb-6 hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
          <IconSettings className="text-white w-11 h-11" />
        </button>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 p-10">
        <button onClick={() => navigate("/copias")} className="flex items-center text-green-600 font-semibold mb-6 text-lg hover:underline">
          <IconChevronLeft className="w-5 h-5 mr-1" /> Volver
        </button>

        <div className="bg-white border border-green-500 shadow-lg rounded-xl p-8 max-w-xl mx-auto">
          <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">Editar copia de seguridad</h1>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Fecha de carga</label>
            <input
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Hora de carga</label>
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
