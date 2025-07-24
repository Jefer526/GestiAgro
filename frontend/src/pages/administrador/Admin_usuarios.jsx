import React, { useState, useEffect } from "react";
import {
  IconUsers,
  IconCloudUpload,
  IconTool,
  IconHome,
  IconSettings,
  IconFilter,
  IconPencil,
  IconTrash,
  IconDotsVertical,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import faviconBlanco from "../../assets/favicon-blanco.png";

const Admin_usuarios = () => {
  const [search, setSearch] = useState("");
  const [menuAbiertoId, setMenuAbiertoId] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  const usuarios = [
    {
      id: 1,
      nombre: "Jefferson Pérez",
      telefono: "123456789",
      rol: "Administrador",
      email: "jefferson@example.com",
      contraseña: "********",
    },
    {
      id: 2,
      nombre: "María García",
      telefono: "987654321",
      rol: "Gerente",
      email: "maria@example.com",
      contraseña: "********",
    },
    {
      id: 3,
      nombre: "Carlos Ruiz",
      telefono: "555666777",
      rol: "Mayordomo",
      email: "carlos@example.com",
      contraseña: "********",
    },
  ];

  const handleMenuOpen = (id, event) => {
    event.stopPropagation();
    const rect = event.currentTarget.getBoundingClientRect();
    setTimeout(() => {
      setMenuAbiertoId(id);
      setMenuPosition({ x: rect.right + 8, y: rect.top });
    }, 0);
  };

  const handleClickOutside = (e) => {
    if (
      !e.target.closest("#floating-menu") &&
      !e.target.closest(".menu-trigger")
    ) {
      setMenuAbiertoId(null);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const filtrados = usuarios.filter((u) =>
    u.nombre.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    u.telefono.includes(search)
  );

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="bg-green-600 w-28 h-screen flex flex-col items-center py-6 justify-between">
        <div className="flex flex-col items-center space-y-8">
          <img src={faviconBlanco} alt="Logo" className="w-11 h-11" />
          <button
            className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition relative"
            onClick={() => navigate("/homeadm")}
          >
            <IconHome className="text-white w-11 h-11" />
          </button>
          <div className="relative">
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-11 bg-white rounded-full" />
            <button className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
              <IconUsers className="text-white w-11 h-11" />
            </button>
          </div>
          <button
            className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
            onClick={() => navigate("/copias")}
          >
            <IconCloudUpload className="text-white w-11 h-11" />
          </button>
          <button
            className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
            onClick={() => navigate("/soporte")}
          >
            <IconTool className="text-white w-11 h-11" />
          </button>
        </div>
        <button
          onClick={() => navigate("/ajustes")}
          className="mb-6 hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
        >
          <IconSettings className="text-white w-11 h-11" />
        </button>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 p-8 overflow-auto relative">
        <h1 className="text-4xl font-bold text-green-600 mb-6">
          Gestionar usuarios
        </h1>

        <div className="mb-4 flex items-center gap-2">
          <button
            className="p-2 rounded-md bg-green-600 hover:bg-green-700 transition text-white"
            onClick={() => console.log("Filtro activado")}
          >
            <IconFilter className="w-5 h-5" />
          </button>
          <input
            type="text"
            placeholder="Buscar por nombre, email o teléfono"
            className="border border-gray-300 rounded-md px-4 py-2 w-full max-w-sm outline-none focus:ring-2 focus:ring-green-400 transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="min-w-full bg-white text-base text-left">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="px-6 py-3 border-r border-white">ID</th>
                <th className="px-6 py-3 border-r border-white">Nombre</th>
                <th className="px-6 py-3 border-r border-white">Teléfono</th>
                <th className="px-6 py-3 border-r border-white">Rol</th>
                <th className="px-6 py-3 border-r border-white">Email</th>
                <th className="px-6 py-3 border-r border-white">Contraseña</th>
                <th className="px-6 py-3">Opciones</th>
              </tr>
            </thead>
            <tbody>
              {filtrados.length > 0 ? (
                filtrados.map((u) => (
                  <tr key={u.id} className="border-t hover:bg-gray-50">
                    <td className="px-6 py-4 border-r">{u.id}</td>
                    <td className="px-6 py-4 border-r">{u.nombre}</td>
                    <td className="px-6 py-4 border-r">{u.telefono}</td>
                    <td className="px-6 py-4 border-r">{u.rol}</td>
                    <td className="px-6 py-4 border-r">{u.email}</td>
                    <td className="px-6 py-4 border-r">{u.contraseña}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={(e) => handleMenuOpen(u.id, e)}
                        className="menu-trigger p-1 rounded hover:bg-gray-200"
                      >
                        <IconDotsVertical className="w-5 h-5 text-gray-600" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center p-4 text-gray-500">
                    No se encontraron resultados
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Menú flotante */}
        {menuAbiertoId !== null && (
          <div
            id="floating-menu"
            className="fixed bg-white border border-gray-200 rounded shadow-lg w-40 z-50"
            style={{ top: menuPosition.y, left: menuPosition.x }}
          >
            <button
              onClick={() => navigate(`/editar-roluser/${menuAbiertoId}`)}
              className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-100"
            >
              <IconPencil className="w-4 h-4 text-blue-600" />
              Editar Rol y Permisos
            </button>
        
            <button className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50">
              <IconTrash className="w-4 h-4" />
              Eliminar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin_usuarios;


