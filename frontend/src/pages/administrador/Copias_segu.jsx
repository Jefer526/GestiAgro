import React, { useState, useEffect } from "react";
import {
  IconHome,
  IconUsers,
  IconCloudUpload,
  IconTool,
  IconSettings,
  IconFilter,
  IconEye,
  IconPencil,
  IconTrash,
  IconDotsVertical,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import faviconBlanco from "../../assets/favicon-blanco.png";

const Copias_segu = () => {
  const [search, setSearch] = useState("");
  const [menuAbiertoId, setMenuAbiertoId] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  const copias = [
    { id: 1, fecha: "12 de junio del 2025", hora: "14:21" },
    { id: 2, fecha: "11 de junio del 2025", hora: "14:21" },
    { id: 3, fecha: "10 de junio del 2025", hora: "14:21" },
  ];

  const filtradas = copias.filter((c) =>
    c.fecha.toLowerCase().includes(search.toLowerCase())
  );

  const handleMenuOpen = (id, e) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
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

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="bg-green-600 w-28 h-screen flex flex-col items-center py-6 justify-between">
        <div className="flex flex-col items-center space-y-8">
          <img src={faviconBlanco} alt="Logo" className="w-11 h-11" />
          <button onClick={() => navigate("/homeadm")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconHome className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/admuser")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconUsers className="text-white w-11 h-11" />
          </button>
          <div className="relative">
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-11 bg-white rounded-full" />
            <button className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
              <IconCloudUpload className="text-white w-11 h-11" />
            </button>
          </div>
          <button onClick={() => navigate("/soporte")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
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
        <h1 className="text-4xl font-bold text-green-600 mb-6">Copias de seguridad</h1>

        {/* Filtro y búsqueda afuera de la tabla */}
        <div className="mb-4 flex items-center gap-2">
          <button className="p-2 rounded-md bg-green-600 hover:bg-green-700 transition text-white">
            <IconFilter className="w-5 h-5" />
          </button>
          <input
            type="text"
            placeholder="Buscar por fecha"
            className="border border-gray-300 rounded-md px-4 py-2 w-full max-w-sm outline-none focus:ring-2 focus:ring-green-400 transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="min-w-full text-base bg-white text-left">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">FECHA DE CARGA</th>
                <th className="px-4 py-3">ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {filtradas.length > 0 ? (
                filtradas.map((copia) => (
                  <tr key={copia.id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-3">{copia.id}</td>
                    <td className="px-4 py-3">{`${copia.fecha} a las ${copia.hora}`}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={(e) => handleMenuOpen(copia.id, e)}
                        className="menu-trigger p-1 rounded hover:bg-gray-200"
                      >
                        <IconDotsVertical className="w-5 h-5 text-gray-600" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center p-4 text-gray-500">
                    No hay resultados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end mt-6">
          <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 shadow">
            Restaurar
          </button>
        </div>

        {menuAbiertoId !== null && (
          <div
            id="floating-menu"
            className="fixed bg-white border border-gray-200 rounded shadow-lg w-40 z-50"
            style={{ top: `${menuPosition.y}px`, left: `${menuPosition.x}px` }}
          >
            <button className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-100 justify-start">
              <IconEye className="w-4 h-4 text-blue-600" />
              Ver
            </button>
            <button className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-100 justify-start">
              <IconPencil className="w-4 h-4 text-green-600" />
              Editar
            </button>
            <button className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 justify-start">
              <IconTrash className="w-4 h-4" />
              Eliminar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Copias_segu;

