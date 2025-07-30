import {
  IconHome,
  IconClipboardList,
  IconHistory,
  IconChartBar,
  IconBox,
  IconCloudRain,
  IconTractor,
  IconSettings,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import faviconBlanco from "../../assets/favicon-blanco.png";

const Home_mayo = () => {
  const navigate = useNavigate();

  const opciones = [
    {
      icon: <IconClipboardList className="w-24 h-24 text-green-700" />,
      label: "Registro Labores",
      ruta: "/registrolabores",
    },
    {
      icon: <IconHistory className="w-24 h-24 text-green-700" />,
      label: "Historial labores",
      ruta: "/historial_labores",
    },
    {
      icon: <IconBox className="w-24 h-24 text-green-700" />,
      label: "Bodega",
      ruta: "/bodega_insumos",
    },
    {
      icon: <IconCloudRain className="w-24 h-24 text-green-700" />,
      label: "Variables climáticas",
      ruta: "#",
    },
    {
      icon: <IconChartBar className="w-24 h-24 text-green-700" />,
      label: "Informes",
      ruta: "#",
    },
    {
      icon: <IconTractor className="w-24 h-24 text-green-700" />,
      label: "Maquinaria",
      ruta: "#",
    },
  ];

  return (
    <div className="flex">
      {/* Sidebar sin scroll */}
      <div className="bg-green-600 w-28 h-screen flex flex-col items-center py-6 justify-between relative">
        <div className="flex flex-col items-center space-y-8">
          <img src={faviconBlanco} alt="Logo" className="w-11 h-11" />

          {/* Indicador para el icono activo HOME */}
          <div className="relative">
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-11 bg-white rounded-full" />
            <button onClick={() => navigate("/homemayordomo")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
              <IconHome className="text-white w-11 h-11" />
            </button>
          </div>

          {/* Otros íconos sin scroll */}
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

      {/* Contenido principal */}
      <div className="flex-1 p-10">
        <h1 className="text-3xl font-bold text-green-700 mb-6">Panel principal</h1>

        <div className="bg-gray-200 p-6 rounded-lg w-fit mb-10 font-semibold text-green-700 shadow text-3xl">
          ¡Bienvenido!
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 place-items-center">
          {opciones.map((op, i) => (
            <button
              key={i}
              onClick={() => navigate(op.ruta)}
              className="flex flex-col items-center justify-center w-64 h-64 border border-black p-6 rounded-xl hover:bg-gray-100 shadow-lg transition-all"
            >
              {op.icon}
              <span className="mt-4 font-medium text-lg text-center">{op.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home_mayo;
