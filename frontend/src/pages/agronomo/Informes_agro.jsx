import React, { useState } from "react";
import {
  IconHome,
  IconClipboardList,
  IconChartBar,
  IconCloudRain,
  IconTractor,
  IconSettings,
  IconBox,
  IconUsersGroup,
  IconPlant,
  IconFrame,
  IconFileDownload,
} from "@tabler/icons-react";
import faviconBlanco from "../../assets/favicon-blanco.png";
import { useNavigate } from "react-router-dom";

const Informes_agro = () => {
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
      <div className="bg-green-600 w-28 h-screen flex flex-col items-center py-6 justify-between relative">
        <div className="flex-1 flex flex-col items-center space-y-8 overflow-y-auto scrollbar-hide pr-1">
          <img src={faviconBlanco} alt="Logo" className="w-11 h-11" />

          <button
            className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
            onClick={() => navigate("/homeagro")}>
            <IconHome className="text-white w-11 h-11" />
          </button>

          <button
            className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
            onClick={() => navigate("/laboresagro")}>
            <IconClipboardList className="text-white w-11 h-11" />
          </button>

          <div className="relative">
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-11 bg-white rounded-full" />

            <button className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
             onClick={() => navigate("/Informesagro")}>
              <IconChartBar className="text-white w-11 h-11" />
            </button>
          </div>

           <button
             className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
             onClick={() => navigate("/Bodegaagro")}>
             <IconBox className="text-white w-11 h-11" />
           </button>

          <button className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
            onClick={() => navigate("/variablesclimaticas")}>
            <IconCloudRain className="text-white w-11 h-11" />
          </button>

          <button className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
          onClick={() => navigate("/maquinariaequipos")}>
            <IconTractor className="text-white w-11 h-11" />
          </button>

          <button className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
          onClick={() => navigate("/manejopersonal")}>
            <IconUsersGroup className="text-white w-11 h-11" />
          </button>

          <button className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
           onClick={() => navigate("/crearfinca")}>
            <IconPlant className="text-white w-11 h-11" />
          </button>

          <button className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
           onClick={() => navigate("/crearlote")}>
            <IconFrame className="text-white w-11 h-11" />
          </button>
          
        </div>
        <div className="sticky bottom-6 bg-green-600">
          <button
            onClick={() => navigate("/ajustes")}
            className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
          >
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

          <div>
            <p className="font-bold text-lg mb-2">Finca</p>
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
          </div>

          <div>
            <p className="font-bold text-lg mb-2">Lote</p>
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
          </div>

          <div>
            <p className="font-bold text-lg mb-2">Tipo de reporte</p>
            <select
              name="tipo"
              value={filtros.tipo}
              onChange={handleChange}
              className="w-full border p-4 rounded text-lg"
            >
              <option value="" disabled hidden>Selecciona un tipo</option>
              <option value="Fertilización">Fertilización</option>
              <option value="Siembra">Siembra</option>
            </select>
          </div>

          <div>
            <p className="font-bold text-lg mb-2">Labor</p>
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
          </div>

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


export default Informes_agro;

