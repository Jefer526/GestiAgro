import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  IconArrowLeft,
  IconShieldCheck,
  IconDeviceFloppy,
  IconCheck,
} from "@tabler/icons-react";

const Editar_roluser = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [usuario, setUsuario] = useState(null);
  const [alertaVisible, setAlertaVisible] = useState(false);

  useEffect(() => {
    const usuarioSimulado = {
      id,
      nombre: "Jefferson Pérez",
      telefono: "123456789",
      email: "jefferson@example.com",
      contraseña: "123456",
      rol: "Administrador",
      permisos: ["Ver reportes", "Editar usuarios"],
    };
    setUsuario(usuarioSimulado);
  }, [id]);

  const todosLosPermisos = [
    "Ver reportes",
    "Editar usuarios",
    "Eliminar usuarios",
    "Crear copias de seguridad",
    "Gestionar soporte",
  ];

  const handlePermisoChange = (permiso) => {
    if (usuario.permisos.includes(permiso)) {
      setUsuario({
        ...usuario,
        permisos: usuario.permisos.filter((p) => p !== permiso),
      });
    } else {
      setUsuario({ ...usuario, permisos: [...usuario.permisos, permiso] });
    }
  };

  const handleSave = () => {
    console.log("Usuario actualizado:", usuario);
    setAlertaVisible(true);
    setTimeout(() => {
      setAlertaVisible(false);
      navigate("/admuser");
    }, 2000);
  };

  if (!usuario) return <div className="p-6">Cargando usuario...</div>;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col p-6">
      {alertaVisible && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 text-base font-semibold">
          <IconCheck className="w-5 h-5" /> Cambios guardados exitosamente
        </div>
      )}

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-green-600">
          Editar Usuarios y Permisos
        </h1>
        <button
          onClick={() => navigate("/admuser")}
          className="text-green-600 hover:text-green-800 flex items-center gap-1 font-semibold"
        >
          Volver <IconArrowLeft className="w-5 h-5" />
        </button>
      </div>

      <div className="bg-white shadow-xl border-2 border-green-500 rounded-xl p-8 w-full max-w-5xl mx-auto">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Usuario:</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Nombre</label>
            <input
              type="text"
              value={usuario.nombre}
              onChange={(e) => setUsuario({ ...usuario, nombre: e.target.value })}
              className="w-full p-3 rounded-md border border-gray-300 focus:ring-1 focus:ring-green-500 outline-none"
            />
          </div>
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Teléfono</label>
            <input
              type="tel"
              value={usuario.telefono}
              onChange={(e) => setUsuario({ ...usuario, telefono: e.target.value })}
              className="w-full p-3 rounded-md border border-gray-300 focus:ring-1 focus:ring-green-500 outline-none"
            />
          </div>
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Correo</label>
            <input
              type="email"
              value={usuario.email}
              onChange={(e) => setUsuario({ ...usuario, email: e.target.value })}
              className="w-full p-3 rounded-md border border-gray-300 focus:ring-1 focus:ring-green-500 outline-none"
            />
          </div>
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Contraseña</label>
            <input
              type="password"
              value={usuario.contraseña}
              onChange={(e) => setUsuario({ ...usuario, contraseña: e.target.value })}
              className="w-full p-3 rounded-md border border-gray-300 focus:ring-1 focus:ring-green-500 outline-none"
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
          <label className="block text-lg font-bold text-gray-800 mb-2 flex items-center gap-1">
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
  );
};

export default Editar_roluser;

