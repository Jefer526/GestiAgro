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
  IconSearch
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import faviconBlanco from "../../assets/favicon-blanco.png";


const Equipos_mayor = () => {
  const navigate = useNavigate();

  const maquinas = [
    {
      id: 1,
      maquina: "Tractor",
      referencia: "JD 5055",
      ubicacion: "La Esmeralda",
      estado: "Óptimo",
    },
    {
      id: 2,
      maquina: "Guadaña",
      referencia: "Stihl MS 450",
      ubicacion: "Las Palmas",
      estado: "Mantenimiento",
    },
    {
      id: 3,
      maquina: "Podadora",
      referencia: "Stihl BR 130",
      ubicacion: "La Carolina",
      estado: "Averiado",
    },
  ];

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
          <button onClick={() => navigate("/informes_mayordomo")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconChartBar className="text-white w-11 h-11" />
          </button>
          <div className="relative w-full flex justify-center">
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-11 bg-white rounded-full z-10" />
              <button className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
              <IconTractor className="text-white w-11 h-11" />
              </button>
            </div>
          </div>
        <div className="mb-6">
          <button className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconSettings className="text-white w-11 h-11" />
          </button>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 p-10 overflow-auto">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-3xl font-bold text-green-600 mb-3">Maquinaria y Equipos</h1>
            <select className="border border-gray-300 rounded px-4 py-2 text-lg">
              <option>La Esmeralda</option>
              <option>Las Palmas</option>
              <option>La Carolina</option>
            </select>
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Buscar"
              className="border border-gray-300 rounded px-4 py-2 pl-10 text-lg"
            />
            <IconSearch className="absolute left-3 top-2.5 w-5 h-5 text-gray-500" />
          </div>
        </div>

        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="min-w-full text-base bg-white">
            <thead className="bg-green-600 text-white font-bold text-center">
              <tr>
                <th className="p-4 border">ID MÁQUINA</th>
                <th className="p-4 border">MÁQUINA</th>
                <th className="p-4 border">REFERENCIA</th>
                <th className="p-4 border">UBICACIÓN</th>
                <th className="p-4 border">ESTADO</th>
                <th className="p-4 border">HOJA DE VIDA</th>
                <th className="p-4 border">HISTORIAL DE TRABAJO</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {maquinas.map((m) => (
                <tr key={m.id} className="hover:bg-gray-100">
                  <td className="p-4 border">{m.id}</td>
                  <td className="p-4 border">{m.maquina}</td>
                  <td className="p-4 border">{m.referencia}</td>
                  <td className="p-4 border">{m.ubicacion}</td>
                  <td className="p-4 border">{m.estado}</td>
                  <td className="p-4 border">
                    <button 
                      onClick={() =>
                      navigate("/hoja_vidam", { state: { maquina: m } })
                      }
                      className="bg-blue-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded">
                      Ver
                    </button>
                  </td>
                  <td className="p-4 border">
                    <button
                      onClick={() => navigate("/historial_trabajom")}
                      className="bg-blue-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded"
                    >
                      Ver
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center gap-8 mt-8">
          <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 text-lg font-semibold">
            Exportar
          </button>
          <button
            onClick={() => navigate("/actualizar_estado_maquina")}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 text-lg font-semibold"
          >
            Actualizar estado
          </button>
        </div>
      </div>
    </div>
  );
};

export default Equipos_mayor;