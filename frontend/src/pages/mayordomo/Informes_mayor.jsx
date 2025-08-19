// src/pages/mayordomo/Informes_mayor.jsx
import React, { useState } from "react";
import { IconFileDownload } from "@tabler/icons-react";
import LayoutMayordomo from "../../layouts/LayoutMayordomo";

const Informes_mayor = () => {
  const [filtros, setFiltros] = useState({
    fechaInicio: "",
    fechaFin: "",
    finca: "",
    lote: "",
    tipo: "",
    labor: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFiltros({ ...filtros, [name]: value });
  };

  return (
    <LayoutMayordomo>
      <div className="bg-white border border-gray-200 shadow-md p-10 rounded-xl w-full max-w-3xl mx-auto space-y-6 text-black">
        <h1 className="text-3xl font-bold text-green-700">Informes</h1>

        {/* Fecha */}
        <div>
          <p className="font-bold text-lg mb-2">Fecha</p>
          <div className="flex items-center gap-3">
            <input
              type="date"
              name="fechaInicio"
              value={filtros.fechaInicio}
              onChange={handleChange}
              className="border p-3 rounded w-full text-lg"
            />
            <span className="font-semibold text-xl">a</span>
            <input
              type="date"
              name="fechaFin"
              value={filtros.fechaFin}
              onChange={handleChange}
              className="border p-3 rounded w-full text-lg"
            />
          </div>
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

        {/* Tipo */}
        <div>
          <p className="font-bold text-lg mb-2">Tipo de reporte</p>
          <select
            name="tipo"
            value={filtros.tipo}
            onChange={handleChange}
            className="w-full border p-4 rounded text-lg"
          >
            <option value="" disabled hidden>
              Selecciona un tipo
            </option>
            <option value="Fertilización">Fertilización</option>
            <option value="Siembra">Siembra</option>
          </select>
        </div>

        {/* Labor */}
        <div>
          <p className="font-bold text-lg mb-2">Labor</p>
          <select
            name="labor"
            value={filtros.labor}
            onChange={handleChange}
            className="w-full border p-4 rounded text-lg"
          >
            <option value="" disabled hidden>
              Selecciona una labor
            </option>
            <option value="Siembra">Siembra</option>
            <option value="Desyerba guadaña">Desyerba guadaña</option>
            <option value="Recolección">Recolección</option>
          </select>
        </div>

        {/* Botón generar */}
        <div className="flex justify-center">
          <button className="bg-green-600 text-white px-8 py-3 rounded hover:bg-green-700 text-lg">
            Generar
          </button>
        </div>

        {/* Exportar */}
        <div className="flex justify-center space-x-6 text-base">
          <button className="text-green-600 hover:underline flex items-center gap-1">
            <IconFileDownload className="w-5 h-5" />
            Exportar PDF
          </button>
          <button className="text-green-600 hover:underline flex items-center gap-1">
            <IconFileDownload className="w-5 h-5" />
            Exportar Excel
          </button>
        </div>
      </div>
    </LayoutMayordomo>
  );
};

export default Informes_mayor;
