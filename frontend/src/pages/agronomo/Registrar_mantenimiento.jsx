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
} from "@tabler/icons-react";
import faviconBlanco from "../../assets/favicon-blanco.png";

const Registrar_mantenimiento = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
  idMaquina: "",
  maquina: "",
  referencia: "",
  ubicacion: "",
  estado: "",
  fecha: "",
  tipo: "",
  descripcion: "",
  realizadoPor: "",
});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos registrados:", formData);
    navigate("/hojadevida");
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="bg-green-600 w-28 flex flex-col items-center py-6 justify-between relative">
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

          <div className="relative">
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-11 bg-white rounded-full" />

            <button onClick={() => navigate("/maquinariaequipos")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
              <IconTractor className="text-white w-11 h-11" />
            </button>
          </div>

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
      <div className="flex-1 px-10 py-8">
        <button onClick={() => navigate("/hojadevida")} className="flex items-center text-green-600 font-medium mb-4">
          <IconArrowLeft className="w-5 h-5 mr-2" />
          Volver
        </button>

        <div className="bg-white border border-green-300 rounded-xl shadow-md p-8 w-[800px] mx-auto">
          <h1 className="text-2xl font-bold text-green-600 mb-6">Registro mantenimiento</h1>

          <form onSubmit={handleSubmit} className="space-y-4 text-base">
            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="block font-semibold mb-1">ID Máquina:</label>
                <input
                  name="idMaquina"
                  value={formData.idMaquina}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-1.5"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Referencia:</label>
                <input
                  name="referencia"
                  value={formData.referencia}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-1.5"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Máquina:</label>
                <input
                  name="maquina"
                  value={formData.maquina}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-1.5"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Ubicación:</label>
                <select
                  name="ubicacion"
                  value={formData.ubicacion}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-1.5"
                >
                  <option>Bodega</option>
                  <option>La Esmeralda</option>
                  <option>La Carolina</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold mb-1">Estado:</label>
                <select
                  name="estado"
                  value={formData.estado}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-1.5"
                >
                  <option>Óptimo</option>
                  <option>En operación</option>
                  <option>Mantenimiento</option>
                  <option>Averiado</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold mb-1">Fecha:</label>
                <input
                  name="fecha"
                  type="date"
                  value={formData.fecha}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-1.5"
                />
              </div>
              <div className="col-span-2">
                <label className="block font-semibold mb-1">Tipo de mantenimiento:</label>
                <input
                  name="tipo"
                  value={formData.tipo}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-1.5"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold mb-1">Descripción:</label>
              <textarea
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                rows="3"
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Realizado por:</label>
              <input
                name="realizadoPor"
                value={formData.realizadoPor}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-1.5"
              />
            </div>

            <div className="flex justify-center mt-4">
              <button
                type="submit"
                className="bg-green-600 text-white px-8 py-2 rounded-lg hover:bg-green-700 font-semibold"
              >
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registrar_mantenimiento;

