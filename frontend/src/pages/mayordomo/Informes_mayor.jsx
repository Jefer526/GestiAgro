import React, { useState } from "react";
import {
  IconHome,
  IconClipboardList,
  IconHistory,
  IconChartBar,
  IconBox,
  IconCloudRain,
  IconTractor,
  IconSettings,
  IconFileDownload,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import faviconBlanco from "../../assets/favicon-blanco.png";

const Informes_mayor = () => {
  const navigate = useNavigate();

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
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="bg-green-600 w-28 h-full flex flex-col items-center py-6 justify-between">
        <div className="flex flex-col items-center space-y-8">
          <img src={faviconBlanco} alt="Logo" className="w-11 h-11" />
          <button onClick={() => navigate("/homemayordomo")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconHome className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/registrolabores")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconClipboardList className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/historial_labores")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconHistory className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/bodega_insumos")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconBox className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/variables_climaticasm")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconCloudRain className="text-white w-11 h-11" />
          </button>
          <div className="relative w-full flex justify-center">
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-11 bg-white rounded-full z-10" />
            <button className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
              <IconChartBar className="text-white w-11 h-11" />
            </button>
          </div>
          <button onClick={() => navigate("/equipos_mayordomo")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconTractor className="text-white w-11 h-11" />
          </button>
        </div>
        <div className="mb-6">
          <button className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconSettings className="text-white w-11 h-11" />
          </button>
        </div>
      </div>

      {/* Contenido */}
      <div className="flex-1 flex justify-center items-center bg-[#f6f6f6] p-8 overflow-auto">
        <div className="bg-white border border-green-300 shadow-md p-10 rounded-xl w-full max-w-3xl space-y-6 text-black">
          <h1 className="text-3xl font-bold text-green-700">Informes</h1>

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

          <select
            name="finca"
            value={filtros.finca}
            onChange={handleChange}
            className="w-full border p-4 rounded text-lg"
          >
            <option value="" disabled hidden>Selecciona una finca</option>
            <option value="La Esmeralda">La Esmeralda</option>
            <option value="Las Palmas">Las Palmas</option>
            <option value="La Carolina">La Carolina</option>
          </select>

          <select
            name="lote"
            value={filtros.lote}
            onChange={handleChange}
            className="w-full border p-4 rounded text-lg"
          >
            <option value="" disabled hidden>Selecciona un lote</option>
            <option value="Lote 1">Lote 1</option>
            <option value="Lote 2">Lote 2</option>
            <option value="Lote 3">Lote 3</option>
          </select>

          <select
            name="tipo"
            value={filtros.tipo}
            onChange={handleChange}
            className="w-full border p-4 rounded text-lg"
          >
            <option value="" disabled hidden>Selecciona una cosecha</option>
            <option value="Fertilización">Fertilización</option>
            <option value="Siembra">Siembra</option>
          </select>

          <select
            name="labor"
            value={filtros.labor}
            onChange={handleChange}
            className="w-full border p-4 rounded text-lg"
          >
            <option value="" disabled hidden>Selecciona una labor</option>
            <option value="Siembra">Siembra</option>
            <option value="Desyerba guadaña">Desyerba guadaña</option>
            <option value="Recolección">Recolección</option>
          </select>

          <div className="flex justify-center">
            <button className="bg-green-600 text-white px-8 py-3 rounded hover:bg-green-700 text-lg">
              Generar
            </button>
          </div>

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
      </div>
    </div>
  );
};

export default Informes_mayor;
