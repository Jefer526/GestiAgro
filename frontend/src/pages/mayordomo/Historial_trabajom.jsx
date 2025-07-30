import React from "react";
import { useNavigate } from "react-router-dom";
import {
  IconHome,
  IconClipboardList,
  IconHistory,
  IconChartBar,
  IconBox,
  IconCloudRain,
  IconTractor,
  IconSettings,
  IconChevronLeft,
} from "@tabler/icons-react";
import faviconBlanco from "../../assets/favicon-blanco.png";

const Historial_trabajom = () => {
  const navigate = useNavigate();

  const maquina = {
    id: 1,
    nombre: "Tractor",
    referencia: "JD 5055",
    ubicacion: "La Esmeralda",
    estado: "Óptimo",
  };

  const historial = [
    {
      fecha: "2025-06-15",
      labor: "Siembra",
      horasTrabajadas: "6 horas",
      horasMaquina: "4 horas",
      observaciones: "Se limpió lote 2, clima nublado",
    },
    {
      fecha: "2025-06-15",
      labor: "Desyerba guadaña",
      horasTrabajadas: "8 horas",
      horasMaquina: "3 horas",
      observaciones: "Cuchilla se atascó temporalmente. Se solucionó",
    },
    {
      fecha: "2025-06-15",
      labor: "Recolección",
      horasTrabajadas: "4 horas",
      horasMaquina: "1 hora",
      observaciones: "Trabajo en área común. Máquina en estado óptimo",
    },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="bg-green-600 w-28 h-screen flex flex-col items-center py-6 justify-between">
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
      <div className="flex-1 p-10">
        <button
          onClick={() => navigate("/equipos_mayordomo")}
          className="flex items-center text-green-600 font-semibold mb-6 text-lg hover:underline"
        >
          <IconChevronLeft className="w-5 h-5 mr-1" /> Volver
        </button>

        {/* Información general */}
        <div className="bg-white border border-gray-300 p-6 rounded-xl mb-6 max-w-4xl">
          <h2 className="text-xl font-semibold mb-4 text-green-700">Información general</h2>
          <div className="grid grid-cols-2 gap-x-12 gap-y-2 text-lg">
            <div><strong>ID Máquina:</strong> {maquina.id}</div>
            <div><strong>Ubicación:</strong> {maquina.ubicacion}</div>
            <div><strong>Máquina:</strong> {maquina.nombre}</div>
            <div><strong>Estado:</strong> {maquina.estado}</div>
            <div><strong>Referencia:</strong> {maquina.referencia}</div>
          </div>
        </div>

        {/* Tabla de historial */}
        <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-sm md:text-base text-left">
            <thead className="bg-green-600 text-white font-semibold">
                <tr>
                <th className="p-4 border border-gray-300">FECHA</th>
                <th className="p-4 border border-gray-300">LABOR</th>
                <th className="p-4 border border-gray-300">HORAS TRABAJADAS</th>
                <th className="p-4 border border-gray-300">HORAS MÁQUINA</th>
                <th className="p-4 border border-gray-300">OBSERVACIONES</th>
                </tr>
            </thead>
            <tbody className="text-gray-700">
                {historial.map((item, idx) => (
                <tr key={idx} className="border-t border-gray-300">
                    <td className="p-4 border border-gray-300">{item.fecha}</td>
                    <td className="p-4 border border-gray-300">{item.labor}</td>
                    <td className="p-4 border border-gray-300">{item.horasTrabajadas}</td>
                    <td className="p-4 border border-gray-300">{item.horasMaquina}</td>
                    <td className="p-4 border border-gray-300">{item.observaciones}</td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>

        {/* Botón exportar */}
        <div className="flex justify-end mt-4">
          <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 font-semibold">
            Descargar PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default Historial_trabajom;
