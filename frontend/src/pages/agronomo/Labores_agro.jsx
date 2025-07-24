import React, { useState } from "react";
import {
  IconHome,
  IconClipboardList,
  IconChartBar,
  IconCloudRain,
  IconTractor,
  IconSettings,
  IconBox,
  IconEye,
  IconUsersGroup,
  IconPlant,
  IconFrame,
} from "@tabler/icons-react";
import faviconBlanco from "../../assets/favicon-blanco.png";
import { useNavigate } from "react-router-dom";

const Labores_agro = () => {
  const navigate = useNavigate();

  const labores = [
    {
      semana: 22,
      finca: "La Esmeralda",
      labor: "Siembra",
      lote: "Lote 1",
      estado: "En progreso",
      avance: 50,
      unidad: "220 Árboles",
    },
    {
      semana: 22,
      finca: "Las Palmas",
      labor: "Desyerba guadaña",
      lote: "Lote 2",
      estado: "Completada",
      avance: 100,
      unidad: "3 Has",
    },
    {
      semana: 22,
      finca: "La Carolina",
      labor: "Recolección",
      lote: "Lote 3",
      estado: "Programada",
      avance: 0,
      unidad: "0 Kg",
    },
    {
      semana: 22,
      finca: "El Paraíso",
      labor: "Siembra",
      lote: "Lote 1",
      estado: "En revisión",
      avance: 20,
      unidad: "50 Árboles",
    },
  ];

  const [filtros, setFiltros] = useState({
    semana: "",
    finca: "",
    labor: "",
    lote: "",
    estado: "",
  });

  const handleFiltroChange = (e) => {
    setFiltros({ ...filtros, [e.target.name]: e.target.value });
  };

  const laboresFiltradas = labores.filter((l) => {
    return (
      (filtros.semana === "" || String(l.semana) === filtros.semana) &&
      (filtros.finca === "" || l.finca === filtros.finca) &&
      (filtros.labor === "" || l.labor === filtros.labor) &&
      (filtros.lote === "" || l.lote === filtros.lote) &&
      (filtros.estado === "" || l.estado === filtros.estado)
    );
  });

  const getUnicos = (campo) => {
    return [...new Set(labores.map((l) => l[campo]))];
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="bg-green-600 w-28 h-screen flex flex-col items-center py-6 justify-between relative">
        <div className="flex-1 flex flex-col items-center space-y-8 overflow-y-auto scrollbar-hide pr-1">
          <img src={faviconBlanco} alt="Logo" className="w-11 h-11" />

          <button
            className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
            onClick={() => navigate("/homeagro")}
          >
            <IconHome className="text-white w-11 h-11" />
          </button>

          <div className="relative">
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-11 bg-white rounded-full" />
            <button className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
              <IconClipboardList className="text-white w-11 h-11" />
            </button>
          </div>

          <button className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconChartBar className="text-white w-11 h-11" />
          </button>
          <button className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconBox className="text-white w-11 h-11" />
          </button>
          <button className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconCloudRain className="text-white w-11 h-11" />
          </button>
          <button className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconTractor className="text-white w-11 h-11" />
          </button>
          <button className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconUsersGroup className="text-white w-11 h-11" />
          </button>
          <button className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconPlant className="text-white w-11 h-11" />
          </button>
          <button className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
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

      {/* Main content */}
      <div className="flex-1 p-12">
        <h1 className="text-4xl font-bold text-green-600 mb-6">
          Seguimiento labores
        </h1>

        <div className="bg-white border border-gray-300 rounded-xl shadow-lg overflow-x-auto">
          <table className="w-full text-[15px] text-left">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="px-4 py-2">
                  <select
                    name="semana"
                    value={filtros.semana}
                    onChange={handleFiltroChange}
                    className="bg-green-600 text-white text-sm w-full focus:outline-none"
                  >
                    <option value="">Semana</option>
                    {getUnicos("semana").map((s, i) => (
                      <option key={i} value={s}>{s}</option>
                    ))}
                  </select>
                </th>
                <th className="px-4 py-2">
                  <select
                    name="finca"
                    value={filtros.finca}
                    onChange={handleFiltroChange}
                    className="bg-green-600 text-white text-sm w-full focus:outline-none"
                  >
                    <option value="">Finca</option>
                    {getUnicos("finca").map((f, i) => (
                      <option key={i} value={f}>{f}</option>
                    ))}
                  </select>
                </th>
                <th className="px-4 py-2">
                  <select
                    name="labor"
                    value={filtros.labor}
                    onChange={handleFiltroChange}
                    className="bg-green-600 text-white text-sm w-full focus:outline-none"
                  >
                    <option value="">Labor</option>
                    {getUnicos("labor").map((l, i) => (
                      <option key={i} value={l}>{l}</option>
                    ))}
                  </select>
                </th>
                <th className="px-4 py-2">
                  <select
                    name="lote"
                    value={filtros.lote}
                    onChange={handleFiltroChange}
                    className="bg-green-600 text-white text-sm w-full focus:outline-none"
                  >
                    <option value="">Lote</option>
                    {getUnicos("lote").map((l, i) => (
                      <option key={i} value={l}>{l}</option>
                    ))}
                  </select>
                </th>
                <th className="px-4 py-2">
                  <select
                    name="estado"
                    value={filtros.estado}
                    onChange={handleFiltroChange}
                    className="bg-green-600 text-white text-sm w-full focus:outline-none"
                  >
                    <option value="">Estado</option>
                    {getUnicos("estado").map((e, i) => (
                      <option key={i} value={e}>{e}</option>
                    ))}
                  </select>
                </th>
                <th className="px-4 py-2">Avance</th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {laboresFiltradas.map((l, i) => (
                <tr key={i} className="border-t hover:bg-gray-50 transition">
                  <td className="px-6 py-4">{l.semana}</td>
                  <td className="px-6 py-4">{l.finca}</td>
                  <td className="px-6 py-4">{l.labor}</td>
                  <td className="px-6 py-4">{l.lote}</td>
                  <td className="px-6 py-4">{l.estado}</td>
                  <td className="px-6 py-4 w-[250px]">
                    <div className="flex items-center gap-3">
                      <span className="whitespace-nowrap">{l.unidad}</span>
                      <div className="flex-1 bg-gray-200 h-3 rounded overflow-hidden">
                        <div className="bg-green-600 h-3" style={{ width: `${l.avance}%` }} />
                      </div>
                      <span>{l.avance}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg flex items-center gap-1 text-sm font-medium hover:bg-blue-200 transition">
                      <IconEye className="w-4 h-4" />
                      Detalle
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="text-gray-500 text-xs px-6 py-3 border-t">
            1-{laboresFiltradas.length} de {labores.length} resultados
          </div>
        </div>
      </div>
    </div>
  );
};

export default Labores_agro;


