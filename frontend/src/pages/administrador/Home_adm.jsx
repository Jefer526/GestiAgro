import {
  IconUsers,
  IconCloudUpload,
  IconTool,
  IconHome,
  IconSettings,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import faviconBlanco from "../../assets/favicon-blanco.png"; // ✅ Importa el logo

const Home_adm = () => {
  const navigate = useNavigate();

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="bg-green-600 w-28 h-screen flex flex-col items-center py-6 justify-between">
        <div className="flex flex-col items-center space-y-8">
          <img src={faviconBlanco} alt="Logo" className="w-11 h-11" /> {/* ✅ Logo real */}

          {/* Botón HOME con indicador */}
          <div className="relative">
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-11 bg-white rounded-full" />
            <button className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
              <IconHome className="text-white w-11 h-11" />
            </button>
          </div>

          {/* Otros iconos sin indicador */}
          <button
            onClick={() => navigate("/Admuser")}
            className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
          >
            <IconUsers className="text-white w-11 h-11" />
          </button>
          <button className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconCloudUpload className="text-white w-11 h-11" />
          </button>
          <button
            onClick={() => navigate("/soporte")}
            className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
          >
            <IconTool className="text-white w-11 h-11" />
          </button>
        </div>

        <button className="mb-6 hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
          <IconSettings className="text-white w-11 h-11" />
        </button>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 p-10">
        <h1 className="text-3xl font-bold text-green-700 mb-6">Panel principal</h1>

        <div className="bg-gray-200 p-6 rounded-lg w-fit mb-10 font-semibold text-green-700 shadow text-3xl">
          ¡Bienvenido!
        </div>

        {/* Botones grandes con íconos */}
        <div className="flex justify-center space-x-12">
          {[{
          icon: <IconUsers className="w-24 h-24 text-green-700" />,
          label: "Gestionar usuarios",
          route: "/Admuser",
        }, {
            icon: <IconCloudUpload className="w-24 h-24 text-green-700" />,
            label: "Copias de seguridad",
            route: "/copias",
          }, {
            icon: <IconTool className="w-24 h-24 text-green-700" />,
            label: "Soporte",
            route: "/soporte",
          }].map(({ icon, label, route }, i) => (
            <button
              key={i}
              className="flex flex-col items-center justify-center w-64 h-64 border border-black p-6 rounded-xl hover:bg-gray-100 shadow-lg transition-all"
              onClick={() => navigate(route)}
            >
              {icon}
              <span className="mt-4 font-medium text-lg">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home_adm;
