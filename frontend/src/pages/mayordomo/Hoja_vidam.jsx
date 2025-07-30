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
  IconChevronLeft // ← Agregado aquí
} from "@tabler/icons-react";
import faviconBlanco from "../../assets/favicon-blanco.png";

const Hoja_vidam = () => {
  const navigate = useNavigate();

  const maquina = {
    id: 1,
    maquina: "Tractor",
    referencia: "JD 5055",
    ubicacion: "La Esmeralda",
    estado: "Óptimo",
  };

  const historial = [
    {
      fecha: "2025-05-20",
      prev: true,
      correcc: false,
      descripcion: "Mantenimiento 1500 horas",
      realizado: "John Deere",
    },
    {
      fecha: "2025-05-21",
      prev: false,
      correcc: true,
      descripcion: "Reparación Radiador",
      realizado: "Alex Condza",
    },
    {
      fecha: "2025-05-22",
      prev: false,
      correcc: false,
      descripcion: "Cambio Refrigerante",
      realizado: "Alex Condza",
    },
    {
      fecha: "2025-05-23",
      prev: false,
      correcc: false,
      descripcion: "Cambio de llantas",
      realizado: "Montalantas",
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
      <div className="flex-1 px-10 py-8 overflow-auto">
        <h2 className="text-3xl font-bold text-green-600 mb-6">Hoja de vida</h2>

        {/* Botón volver afuera del cuadro */}
        <button
          onClick={() => navigate("/equipos_mayordomo")}
          className="flex items-center text-green-600 hover:text-green-800 mb-6"
        >
          <IconChevronLeft className="w-6 h-6 mr-1" />
          <span className="text-base font-medium">Volver</span>
        </button>

        {/* Información general */}
        <div className="bg-white border border-gray-300 p-6 rounded-xl mb-6 max-w-4xl">
          <h2 className="text-2xl font-bold mb-4 text-green-600">Información general</h2>
          <div className="grid grid-cols-2 gap-x-12 gap-y-2 text-lg">
            <div><strong>ID Máquina:</strong> {maquina.id}</div>
            <div><strong>Ubicación:</strong> {maquina.ubicacion}</div>
            <div><strong>Máquina:</strong> {maquina.maquina}</div>
            <div><strong>Estado:</strong> {maquina.estado}</div>
            <div><strong>Referencia:</strong> {maquina.referencia}</div>
          </div>
        </div>

        {/* Historial */}
        <h2 className="text-2xl font-bold text-green-600 mb-4">Historial de mantenimiento</h2>
        <div className="overflow-x-auto">
          <table className="w-full bg-white text-center border border-gray-300 text-base">
            <thead className="bg-green-600 text-white font-bold text-base">
              <tr>
                <th className="p-3 border">FECHA</th>
                <th className="p-3 border">MANTENIMIENTO PREV</th>
                <th className="p-3 border">MANTENIMIENTO CORREC</th>
                <th className="p-3 border">DESCRIPCIÓN</th>
                <th className="p-3 border">REALIZADO POR</th>
              </tr>
            </thead>
            <tbody>
              {historial.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="p-3 border">{item.fecha}</td>
                  <td className="p-3 border">{item.prev ? "✓" : ""}</td>
                  <td className="p-3 border">{item.correcc ? "✓" : ""}</td>
                  <td className="p-3 border">{item.descripcion}</td>
                  <td className="p-3 border">{item.realizado}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Botones */}
        <div className="flex justify-center gap-10 mt-10">
          <button onClick={() => navigate("/equipos_mayordomo")}
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold text-lg px-6 py-3 rounded-lg">
            Registrar mantenimiento
          </button>
          <button className="bg-green-600 hover:bg-green-700 text-white font-semibold text-lg px-6 py-3 rounded-lg">
            Descargar PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hoja_vidam;
