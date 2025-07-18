import React, { useState } from "react";
import {
  IconHome,
  IconUsers,
  IconCloudUpload,
  IconTool,
  IconSettingsFilled,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import faviconBlanco from "../../assets/favicon-blanco.png";

const Ajustes_adm = () => {
  const navigate = useNavigate();

  const [notificaciones, setNotificaciones] = useState(true);
  const [modoOscuro, setModoOscuro] = useState(false);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="bg-green-600 w-28 h-screen flex flex-col items-center py-6 justify-between">
        <div className="flex flex-col items-center space-y-8">
          <img src={faviconBlanco} alt="Logo" className="w-11 h-11" />
          <button
            onClick={() => navigate("/homeadm")}
            className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
          >
            <IconHome className="text-white w-11 h-11" />
          </button>
          <button
            onClick={() => navigate("/admuser")}
            className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
          >
            <IconUsers className="text-white w-11 h-11" />
          </button>
          <button
            onClick={() => navigate("/copias")}
            className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
          >
            <IconCloudUpload className="text-white w-11 h-11" />
          </button>
          <button
            onClick={() => navigate("/soporte")}
            className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
          >
            <IconTool className="text-white w-11 h-11" />
          </button>
        </div>
        <button
          onClick={() => navigate("/ajustes")}
          className="mb-6 hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
        >
          <IconSettingsFilled className="text-white w-11 h-11" />
        </button>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-green-600 mb-6">Configuración</h1>

        <div className="space-y-6 w-[500px]">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de usuario</label>
            <input
              type="text"
              placeholder="Ej. Jefferson Pérez"
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
            <input
              type="email"
              placeholder="correo@ejemplo.com"
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="text-gray-700">Notificaciones</label>
            <input
              type="checkbox"
              checked={notificaciones}
              onChange={() => setNotificaciones(!notificaciones)}
              className="h-5 w-5 text-green-600"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="text-gray-700">Modo oscuro</label>
            <input
              type="checkbox"
              checked={modoOscuro}
              onChange={() => setModoOscuro(!modoOscuro)}
              className="h-5 w-5 text-green-600"
            />
          </div>

          <button className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 shadow">
            Guardar cambios
          </button>
        </div>
      </div>
    </div>
  );
};

export default Ajustes_adm;
