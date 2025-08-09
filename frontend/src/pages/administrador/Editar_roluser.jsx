// src/pages/administrador/Editar_roluser.jsx
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  IconArrowLeft,
  IconShieldCheck,
  IconDeviceFloppy,
  IconCheck,
  IconHome,
  IconUsers,
  IconCloudUpload,
  IconTool,
  IconSettings,
} from "@tabler/icons-react";
import faviconBlanco from "../../assets/favicon-blanco.png";

const Editar_roluser = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [usuario, setUsuario] = useState({
    id,
    nombre: "",
    telefono: "",
    email: "",
    contraseña: "",
    rol: "Administrador",
    permisos: [],
  });

  const [alertaVisible, setAlertaVisible] = useState(false);

  const todosLosPermisos = [
    "Ver reportes",
    "Editar usuarios",
    "Eliminar usuarios",
    "Crear copias de seguridad",
    "Gestionar soporte",
  ];

  const handlePermisoChange = (permiso) => {
    const tienePermiso = usuario.permisos.includes(permiso);
    setUsuario({
      ...usuario,
      permisos: tienePermiso
        ? usuario.permisos.filter((p) => p !== permiso)
        : [...usuario.permisos, permiso],
    });
  };

  const handleSave = () => {
    console.log("Usuario actualizado:", usuario);
    setAlertaVisible(true);
    setTimeout(() => {
      setAlertaVisible(false);
      navigate("/admuser");
    }, 2000);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="bg-green-600 w-28 h-screen flex flex-col items-center py-6 justify-between">
        <div className="flex flex-col items-center space-y-8">
          <img src={faviconBlanco} alt="Logo" className="w-11 h-11" />
          <button onClick={() => navigate("/homeadm")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconHome className="text-white w-11 h-11" />
          </button>
          <div className="relative">
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-11 bg-white rounded-full" />
            <button className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
              <IconUsers className="text-white w-11 h-11" />
            </button>
          </div>
          <button onClick={() => navigate("/copias")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconCloudUpload className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/soporte")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconTool className="text-white w-11 h-11" />
          </button>
        </div>
        <button onClick={() => navigate("/ajustesadm")} className="mb-6 hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
          <IconSettings className="text-white w-11 h-11" />
        </button>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 bg-gray-50 min-h-screen p-6 relative">
        {alertaVisible && (
          <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 text-base font-semibold">
            <IconCheck className="w-5 h-5" /> Cambios guardados exitosamente
          </div>
        )}

        <button
          onClick={() => navigate("/admuser")}
          className="absolute top-6 left-6 text-green-600 hover:text-green-800 flex items-center gap-1 font-semibold"
        >
          <IconArrowLeft className="w-5 h-5" /> Volver
        </button>

        <div className="bg-white shadow-xl border-2 border-green-500 rounded-xl p-8 w-full max-w-5xl mx-auto mt-16">
          <h1 className="text-3xl font-bold text-green-600 mb-6">Editar usuarios y permisos</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Nombre</label>
              <input
                type="text"
                value={usuario.nombre}
                onChange={(e) => setUsuario({ ...usuario, nombre: e.target.value })}
                className="w-full p-3 rounded-md border border-gray-300 focus:ring-1 focus:ring-green-500 outline-none"
                placeholder="Ingrese nombre"
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Teléfono</label>
              <input
                type="tel"
                value={usuario.telefono}
                onChange={(e) => setUsuario({ ...usuario, telefono: e.target.value })}
                className="w-full p-3 rounded-md border border-gray-300 focus:ring-1 focus:ring-green-500 outline-none"
                placeholder="Ingrese teléfono"
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Correo</label>
              <input
                type="email"
                value={usuario.email}
                onChange={(e) => setUsuario({ ...usuario, email: e.target.value })}
                className="w-full p-3 rounded-md border border-gray-300 focus:ring-1 focus:ring-green-500 outline-none"
                placeholder="Ingrese correo"
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Contraseña</label>
              <input
                type="password"
                value={usuario.contraseña}
                onChange={(e) => setUsuario({ ...usuario, contraseña: e.target.value })}
                className="w-full p-3 rounded-md border border-gray-300 focus:ring-1 focus:ring-green-500 outline-none"
                placeholder="Ingrese contraseña"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-lg font-bold text-gray-800 mb-2">Rol</label>
            <select
              value={usuario.rol}
              onChange={(e) => setUsuario({ ...usuario, rol: e.target.value })}
              className="w-full p-3 rounded-md border border-gray-300 focus:ring-1 focus:ring-green-500 outline-none"
            >
              <option>Administrador</option>
              <option>Gerente</option>
              <option>Mayordomo</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-1">
              <IconShieldCheck className="w-5 h-5 text-green-600" /> Permisos asignados
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {todosLosPermisos.map((permiso, index) => (
                <label key={index} className="flex items-center gap-2 text-gray-700">
                  <input
                    type="checkbox"
                    checked={usuario.permisos.includes(permiso)}
                    onChange={() => handlePermisoChange(permiso)}
                    className="accent-green-600"
                  />
                  {permiso}
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleSave}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 font-semibold shadow-md"
            >
              <IconDeviceFloppy className="w-5 h-5" /> Guardar cambios
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editar_roluser;




