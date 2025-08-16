// src/pages/mayordomo/Registrar_novedad_hoja.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconChevronLeft, IconCheck } from "@tabler/icons-react";
import LayoutMayordomo from "../../layouts/LayoutMayordomo";

const Registrar_novedad_hoja = () => {
  const navigate = useNavigate();

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
    <LayoutMayordomo>
      {/* ALERTA */}
      {alertaVisible && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 text-base font-semibold z-[10000] transition-all duration-300">
          <IconCheck className="w-5 h-5" />
          Registrado exitosamente
        </div>
      )}

      {/* BOTÓN VOLVER */}
      <button
        onClick={() => navigate("/hoja_vidam")}
        className="flex items-center text-green-600 font-medium mb-4"
      >
        <IconChevronLeft className="w-5 h-5 mr-2" />
        Volver
      </button>

      {/* FORMULARIO */}
      <div className="bg-white border border-green-300 rounded-xl shadow-md p-8 w-[800px] mx-auto">
        <h1 className="text-2xl font-bold text-green-600 mb-6">
          Registro novedad
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4 text-base">
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="block font-semibold mb-1">
                Código Equipo:
              </label>
              <input
                name="codigoequipo"
                value={formData.codigoequipo}
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
                <option value="">Selecciona</option>
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
                <option value="">Selecciona</option>
                <option>Óptimo</option>
                <option>En operación</option>
                <option>Mantenimiento</option>
                <option>Averiado</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold mb-1">Fecha:</label>
              <input
                type="date"
                name="fecha"
                value={formData.fecha}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-1.5"
              />
            </div>
            <div className="col-span-2">
              <label className="block font-semibold mb-1">
                Tipo de novedad:
              </label>
              <select
                name="tipo"
                value={formData.tipo}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-1.5"
              >
                <option value="">Selecciona una opción</option>
                <option>Mantenimiento</option>
                <option>Reparación</option>
              </select>
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
    </LayoutMayordomo>
  );
};

export default Registrar_novedad_hoja;
