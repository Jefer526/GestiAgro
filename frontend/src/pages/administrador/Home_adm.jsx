import {
  IconUsers,
  IconCloudUpload,
  IconTool,
  IconHome,
  IconSettings,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

const Home_adm = () => {
  const navigate = useNavigate();

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="bg-green-500 w-28 h-screen flex flex-col items-center py-6 justify-between">
        <div className="flex flex-col items-center space-y-8">
          <img src="/logo.png" alt="Logo" className="w-12 h-12" />

          {/* Botones con efecto hover */}
          <button className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconHome className="text-white w-10 h-10" />
          </button>
          <button className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconUsers className="text-white w-10 h-10" />
          </button>
          <button className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconCloudUpload className="text-white w-10 h-10" />
          </button>
          <button className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconTool className="text-white w-10 h-10" />
          </button>
        </div>

        <button className="mb-6 hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
          <IconSettings className="text-white w-10 h-10" />
        </button>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 p-10">
        <h1 className="text-3xl font-bold text-green-700 mb-6">Panel principal</h1>

        <div className="bg-gray-200 p-6 rounded-lg w-fit mb-10 font-semibold text-green-700 shadow">
          ¡Bienvenido!
        </div>

        {/* Botones grandes con íconos */}
        <div className="flex justify-center space-x-12">
          <button
            className="flex flex-col items-center border border-black p-8 rounded-xl hover:bg-gray-100 shadow-lg transition-all"
            onClick={() => navigate("/usuarios")}
          >
            <IconUsers className="w-24 h-24 text-green-700" />
            <span className="mt-4 font-medium text-lg">Gestionar usuarios</span>
          </button>

          <button
            className="flex flex-col items-center border border-black p-8 rounded-xl hover:bg-gray-100 shadow-lg transition-all"
            onClick={() => navigate("/copias")}
          >
            <IconCloudUpload className="w-24 h-24 text-green-700" />
            <span className="mt-4 font-medium text-lg">Copias de seguridad</span>
          </button>

          <button
            className="flex flex-col items-center border border-black p-8 rounded-xl hover:bg-gray-100 shadow-lg transition-all"
            onClick={() => navigate("/soporte")}
          >
            <IconTool className="w-24 h-24 text-green-700" />
            <span className="mt-4 font-medium text-lg">Soporte</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home_adm;



