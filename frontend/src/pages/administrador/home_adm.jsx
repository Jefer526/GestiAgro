// src/pages/Home_adm.jsx
import { IconUsers, IconCloudUpload, IconTool } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

const Home_adm = () => {
  const navigate = useNavigate();

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="bg-green-500 w-16 md:w-20 h-screen flex flex-col items-center py-4 space-y-6">
        <img src="/logo.png" alt="Logo" className="w-10 h-10" />
        <button><IconUsers className="text-white w-6 h-6" /></button>
        <button><IconCloudUpload className="text-white w-6 h-6" /></button>
        <button><IconTool className="text-white w-6 h-6" /></button>
        <button><IconTool className="text-white w-6 h-6" /></button>
        <button><IconTool className="text-white w-6 h-6" /></button>
      </div>

      {/* Contenido principal dsfs */}
      <div className="flex-1 p-10">
        <h1 className="text-2xl font-bold text-green-700 mb-4">Panel principal</h1>
        <div className="bg-gray-250 p-4 rounded-lg w-fit mb-6 font-semibold text-green-700">
          Bienvenido!
        </div>

        {/* Botones de acciones */}
        <div className="flex space-x-8">
          <button
            className="flex flex-col items-center border border-black p-6 rounded hover:bg-gray-100"
            onClick={() => navigate("/usuarios")}
          >
            <IconUsers className="w-10 h-10" />
            <span className="mt-2 font-medium text-sm">Gestionar usuarios</span>
          </button>

          <button
            className="flex flex-col items-center border border-black p-6 rounded hover:bg-gray-100"
            onClick={() => navigate("/copias")}
          >
            <IconCloudUpload className="w-10 h-10" />
            <span className="mt-2 font-medium text-sm">Copias de seguridad</span>
          </button>

          <button
            className="flex flex-col items-center border border-black p-6 rounded hover:bg-gray-100"
            onClick={() => navigate("/soporte")}
          >
            <IconTool className="w-10 h-10" />
            <span className="mt-2 font-medium text-sm">Soporte</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home_adm;
