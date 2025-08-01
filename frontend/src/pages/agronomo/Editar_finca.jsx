// src/pages/agronomo/Editar_finca.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  IconHome, IconClipboardList, IconChartBar, IconCloudRain, IconTractor,
  IconSettings, IconBox, IconUsersGroup, IconPlant, IconFrame, IconChevronLeft
} from "@tabler/icons-react";
import faviconBlanco from "../../assets/favicon-blanco.png";

const Editar_finca = () => {
  const navigate = useNavigate();
  const [finca, setFinca] = useState({
    nombre: "",
    ubicacion: "",
    coordenadas: "",
    area: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFinca({ ...finca, [name]: value });
  };

  const handleGuardar = () => {
    console.log("Finca editada:", finca);
    navigate("/crearfinca");
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="bg-green-600 w-28 h-screen flex flex-col items-center py-6 justify-between relative">
        <div className="flex-1 flex flex-col items-center space-y-8 overflow-y-auto scrollbar-hide pr-1">
          <img src={faviconBlanco} alt="Logo" className="w-11 h-11" />
          <button onClick={() => navigate("/homeagro")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"><IconHome className="text-white w-11 h-11" /></button>
          <button onClick={() => navigate("/laboresagro")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"><IconClipboardList className="text-white w-11 h-11" /></button>
          <button onClick={() => navigate("/informesagro")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"><IconChartBar className="text-white w-11 h-11" /></button>
          <button onClick={() => navigate("/bodegaagro")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"><IconBox className="text-white w-11 h-11" /></button>
          <button onClick={() => navigate("/variablesclimaticas")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"><IconCloudRain className="text-white w-11 h-11" /></button>
          <button onClick={() => navigate("/maquinariaequipos")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"><IconTractor className="text-white w-11 h-11" /></button>
          <button onClick={() => navigate("/manejopersonal")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"><IconUsersGroup className="text-white w-11 h-11" /></button>
          <button onClick={() => navigate("/crearfinca")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"><IconPlant className="text-white w-11 h-11" /></button>
          <button onClick={() => navigate("/crearlote")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"><IconFrame className="text-white w-11 h-11" /></button>
        </div>
        <div className="sticky bottom-6">
          <button onClick={() => navigate("/ajustes")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"><IconSettings className="text-white w-11 h-11" /></button>
        </div>
      </div>

      {/* Contenido */}
      <div className="flex-1 p-10 overflow-y-auto">
        <button
          onClick={() => navigate("/crearfinca")}
          className="flex items-center text-green-600 font-semibold mb-6 text-lg hover:underline"
        >
          <IconChevronLeft className="w-5 h-5 mr-1" /> Volver
        </button>

        <div className="bg-white shadow-md border border-green-300 p-8 rounded-xl w-full max-w-3xl mx-auto space-y-6 min-h-[34rem] flex flex-col justify-between">
          <h2 className="text-2xl font-bold text-green-700">Editar finca</h2>

          <div>
            <label className="block mb-1 font-semibold text-black">Nombre finca</label>
            <input
              type="text"
              name="nombre"
              placeholder="Nombre de la finca"
              value={finca.nombre}
              onChange={handleChange}
              className="w-full border p-3 rounded text-base"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-black">Ubicación finca</label>
            <input
              type="text"
              name="ubicacion"
              placeholder="Ubicación"
              value={finca.ubicacion}
              onChange={handleChange}
              className="w-full border p-3 rounded text-base"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-black">Coordenadas</label>
            <input
              type="text"
              name="coordenadas"
              placeholder="Ej: 2.40,-75.25"
              value={finca.coordenadas}
              onChange={handleChange}
              className="w-full border p-3 rounded text-base"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-black">Área finca</label>
            <input
              type="text"
              name="area"
              placeholder="Ej: 12 ha"
              value={finca.area}
              onChange={handleChange}
              className="w-full border p-3 rounded text-base"
            />
          </div>

          <div className="flex justify-center space-x-6 mt-6">
            <button
              onClick={handleGuardar}
              className="bg-green-600 text-white px-8 py-2 rounded hover:bg-green-700"
            >
              Guardar cambios
            </button>
            <button
              onClick={() => navigate("/crearfinca")}
              className="bg-gray-300 text-black px-8 py-2 rounded hover:bg-gray-400"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editar_finca;


