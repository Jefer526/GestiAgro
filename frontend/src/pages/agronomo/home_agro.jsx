import {
  IconHome,
  IconClipboardList,
  IconChartBar,
  IconBox,
  IconCloudRain,
  IconTractor,
  IconUsersGroup,
  IconPlant,
  IconFrame,
  IconSettings,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import faviconBlanco from "../../assets/favicon-blanco.png";

const Home_agro = () => {
  const navigate = useNavigate();

  const opciones = [
    {
      icon: <IconClipboardList className="w-24 h-24 text-green-700" />,
      label: "Seguimiento de labores",
      ruta: "/Laboresagro",
    },
    {
      icon: <IconChartBar className="w-24 h-24 text-green-700" />,
      label: "Informes",
      ruta: "#",
    },
    {
      icon: <IconBox className="w-24 h-24 text-green-700" />,
      label: "Bodega",
      ruta: "#",
    },
    {
      icon: <IconCloudRain className="w-24 h-24 text-green-700" />,
      label: "Variables climáticas",
      ruta: "#",
    },
    {
      icon: <IconTractor className="w-24 h-24 text-green-700" />,
      label: "Maquinaria y equipos",
      ruta: "#",
    },
    {
      icon: <IconUsersGroup className="w-24 h-24 text-green-700" />,
      label: "Manejo personal",
      ruta: "#",
    },
    {
      icon: <IconPlant className="w-24 h-24 text-green-700" />,
      label: "Gestión finca",
      ruta: "#",
    },
    {
      icon: <IconFrame className="w-24 h-24 text-green-700" />,
      label: "Gestión lote",
      ruta: "#",
    },
  ];

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="bg-green-600 w-28 h-screen flex flex-col items-center py-6 justify-between relative">
        {/* Scrollable icons */}
        <div className="flex-1 flex flex-col items-center space-y-8 overflow-y-auto scrollbar-hide pr-1">
          <img src={faviconBlanco} alt="Logo" className="w-11 h-11" />

          <div className="relative">
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-11 bg-white rounded-full" />
            <button className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
              <IconHome className="text-white w-11 h-11" />
            </button>
          </div>

          <button
            className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
            onClick={() => navigate("/Laboresagro")}
          >
            <IconClipboardList className="text-white w-11 h-11" />
          </button>

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

        {/* Ajustes - fondo */}
        <div className="sticky bottom-6 bg-green-600">
          <button
            onClick={() => navigate("/ajustes")}
            className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
          >
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

        {/* Recuadros funcionales */}
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

export default Home_agro;


