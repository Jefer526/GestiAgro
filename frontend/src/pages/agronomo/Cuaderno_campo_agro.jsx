// src/pages/agronomo/CuadernoCampo_agro.jsx
import React, { useState, useRef } from "react";
import { IconCamera } from "@tabler/icons-react";
import LayoutAgronomo from "../../layouts/LayoutAgronomo";

const Cuaderno_campo_agro = () => {
  // Datos usuario
  const nombreUsuario = "Juan Pérez";
  const letraInicial = (nombreUsuario?.trim()?.[0] || "U").toUpperCase();

  // Estado de filtros
  const [filtros, setFiltros] = useState({ fecha: "", finca: "", lote: "", anotaciones: "" });

  // Estado para foto
  const [foto, setFoto] = useState(null);
  const fileInputRef = useRef(null);

  // Manejo de inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFiltros({ ...filtros, [name]: value });
  };

  // Acción para tomar foto
  const handleTomarFoto = () => fileInputRef.current?.click();

  // Guardar foto seleccionada
  const handleFotoSeleccionada = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFoto(url);
    }
  };

  return (
    <LayoutAgronomo active="/cuadernocampo" letraInicial={letraInicial}>
      <div className="flex justify-center items-center p-8 overflow-auto">
        <div className="bg-white border border-green-300 shadow-md p-10 rounded-xl w-full max-w-3xl space-y-6 text-black">
          <h1 className="text-3xl font-bold text-green-700">Cuaderno de Campo</h1>

          {/* Fecha */}
          <div>
            <label className="font-bold text-lg mb-2 block">Fecha</label>
            <input
              type="date"
              name="fecha"
              value={filtros.fecha}
              onChange={handleChange}
              className="border p-3 rounded w-full text-lg"
            />
          </div>

          {/* Finca */}
          <div>
            <label className="font-bold text-lg mb-2 block">Finca</label>
            <select
              name="finca"
              value={filtros.finca}
              onChange={handleChange}
              className="w-full border p-4 rounded text-lg"
            >
              <option value="" disabled hidden>
                Selecciona una finca
              </option>
              <option value="La Esmeralda">La Esmeralda</option>
              <option value="Las Palmas">Las Palmas</option>
              <option value="La Carolina">La Carolina</option>
            </select>
          </div>

          {/* Lote */}
          <div>
            <label className="font-bold text-lg mb-2 block">Lote</label>
            <select
              name="lote"
              value={filtros.lote}
              onChange={handleChange}
              className="w-full border p-4 rounded text-lg"
            >
              <option value="" disabled hidden>
                Selecciona un lote
              </option>
              <option value="Lote 1">Lote 1</option>
              <option value="Lote 2">Lote 2</option>
              <option value="Lote 3">Lote 3</option>
            </select>
          </div>

          {/* Anotaciones */}
          <div>
            <label className="font-bold text-lg mb-2 block">Anotaciones</label>
            <textarea
              name="anotaciones"
              value={filtros.anotaciones}
              onChange={handleChange}
              rows="4"
              placeholder="Escribe aquí las anotaciones..."
              className="w-full border p-4 rounded text-lg"
            ></textarea>
          </div>

          {/* Tomar foto */}
          <div className="flex flex-col items-center gap-4">
            <button
              onClick={handleTomarFoto}
              className="bg-green-600 text-white px-8 py-3 rounded hover:bg-green-700 text-lg flex items-center gap-2"
            >
              <IconCamera className="w-5 h-5" /> Tomar Foto
            </button>

            <input
              type="file"
              accept="image/*"
              capture="environment"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFotoSeleccionada}
            />

            {foto && (
              <div className="mt-4">
                <p className="text-sm font-medium">Vista previa:</p>
                <img src={foto} alt="Foto tomada" className="mt-2 max-h-48 rounded border" />
              </div>
            )}
          </div>
        </div>
      </div>
    </LayoutAgronomo>
  );
};

export default Cuaderno_campo_agro;
