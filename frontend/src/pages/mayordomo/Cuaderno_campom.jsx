// src/pages/mayordomo/Cuaderno_campom.jsx
import React, { useState } from "react";
import { IconCamera } from "@tabler/icons-react";
import LayoutMayordomo from "../../layouts/LayoutMayordomo";

const Cuaderno_campom = () => {
  const [filtros, setFiltros] = useState({
    fecha: "",
    finca: "",
    lote: "",
    anotaciones: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFiltros({ ...filtros, [name]: value });
  };

  const handleTomarFoto = () => {
    alert("Función para tomar foto en desarrollo 📸");
  };

  return (
    <LayoutMayordomo>
      <div className="bg-white border border-green-300 shadow-md p-10 rounded-xl w-full max-w-3xl space-y-6 text-black mx-auto">
        <h1 className="text-3xl font-bold text-green-700">Cuaderno de Campo</h1>

        {/* Fecha */}
        <div>
          <p className="font-bold text-lg mb-2">Fecha</p>
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
          <p className="font-bold text-lg mb-2">Finca</p>
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
          <p className="font-bold text-lg mb-2">Lote</p>
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
          <p className="font-bold text-lg mb-2">Ingresar anotaciones</p>
          <textarea
            name="anotaciones"
            value={filtros.anotaciones}
            onChange={handleChange}
            rows={5}
            className="w-full border p-4 rounded text-lg"
            placeholder="Escribe tus observaciones o detalles aquí..."
          />
        </div>

        {/* Botón tomar foto */}
        <div className="flex justify-center">
          <button
            onClick={handleTomarFoto}
            className="bg-green-600 text-white px-8 py-3 rounded hover:bg-green-700 text-lg flex items-center gap-2"
          >
            <IconCamera className="w-5 h-5" />
            Tomar foto
          </button>
        </div>
      </div>
    </LayoutMayordomo>
  );
};

export default Cuaderno_campom;

