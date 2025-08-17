// src/pages/agronomo/Editar_lote.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconChevronLeft, IconCheck } from "@tabler/icons-react";
import LayoutAgronomo from "../../layouts/LayoutAgronomo";

const Editar_lote = () => {
  const navigate = useNavigate();
  const [alertaVisible, setAlertaVisible] = useState(false);

  // Estado del formulario
  const [formData, setFormData] = useState({
    finca: "",
    lote: "",
    coordenadas: "",
    area: "",
    cultivo: "",
  });

  // Usuario (para Layout)
  const nombreUsuario = "Juan Pérez"; // Cambiar por usuario real
  const letraInicial = (nombreUsuario?.trim()?.[0] || "U").toUpperCase();

  // Manejar cambios en inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Guardar cambios
  const handleGuardar = () => {
    setAlertaVisible(true);
    setTimeout(() => {
      setAlertaVisible(false);
      navigate("/crearlote");
    }, 1800);
  };

  return (
    <LayoutAgronomo active="/crearlote" letraInicial={letraInicial}>
      <div className="p-10 overflow-y-auto relative">
        {/* Alerta de éxito */}
        {alertaVisible && (
          <div className="fixed top-3 left-1/2 -translate-x-1/2 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 text-base font-semibold">
            <IconCheck className="w-5 h-5" /> Lote actualizado exitosamente
          </div>
        )}

        {/* Botón volver */}
        <button
          onClick={() => navigate("/crearlote")}
          className="flex items-center text-green-600 font-semibold mb-6 text-lg hover:underline"
        >
          <IconChevronLeft className="w-5 h-5 mr-1" /> Volver
        </button>

        {/* Formulario */}
        <div className="bg-white shadow-md border border-green-300 p-8 rounded-xl w-full max-w-3xl mx-auto space-y-6 min-h-[36rem] flex flex-col justify-between">
          <h2 className="text-2xl font-bold text-green-700">Editar lote</h2>

          <div>
            <label className="block mb-1 font-semibold text-black">Finca</label>
            <input
              name="finca"
              value={formData.finca}
              onChange={handleChange}
              placeholder="Nombre finca"
              className="w-full border p-3 rounded text-base"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-black">
              Número de lote
            </label>
            <input
              name="lote"
              value={formData.lote}
              onChange={handleChange}
              placeholder="Número"
              className="w-full border p-3 rounded text-base"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-black">
              Coordenadas
            </label>
            <input
              name="coordenadas"
              value={formData.coordenadas}
              onChange={handleChange}
              placeholder="Lat,Lng"
              className="w-full border p-3 rounded text-base"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-black">Área lote</label>
            <input
              name="area"
              value={formData.area}
              onChange={handleChange}
              placeholder="Área"
              className="w-full border p-3 rounded text-base"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-black">Cultivo</label>
            <input
              name="cultivo"
              value={formData.cultivo}
              onChange={handleChange}
              placeholder="Tipo cultivo"
              className="w-full border p-3 rounded text-base"
            />
          </div>

          {/* Botones */}
          <div className="flex justify-center space-x-6 mt-6">
            <button
              onClick={handleGuardar}
              className="bg-green-600 text-white px-8 py-2 rounded hover:bg-green-700"
            >
              Guardar cambios
            </button>
            <button
              onClick={() => navigate("/crearlote")}
              className="bg-gray-300 text-black px-8 py-2 rounded hover:bg-gray-400"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </LayoutAgronomo>
  );
};

export default Editar_lote;
