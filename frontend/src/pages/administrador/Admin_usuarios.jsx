import React, { useState, useRef, useEffect } from "react";
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
  IconSortAscending2,
  IconSortDescending2,
  IconLogout,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import faviconBlanco from "../../assets/favicon-blanco.png";

const Admin_usuarios = () => {
  const navigate = useNavigate();
  const filtroRef = useRef(null);
  const tarjetaRef = useRef(null);
  const [usuarios, setUsuarios] = useState([]);
  const [menuAbiertoId, setMenuAbiertoId] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [filtroActivo, setFiltroActivo] = useState(null);
  const [filtroPosicion, setFiltroPosicion] = useState({ top: 0, left: 0 });
  const [busquedas, setBusquedas] = useState({});
  const [valoresSeleccionados, setValoresSeleccionados] = useState({});
  const [ordenCampo, setOrdenCampo] = useState(null);
  const [mostrarTarjeta, setMostrarTarjeta] = useState(false);
  const letraInicial = "J";

  const columnas = ["nombre_completo", "telefono", "rol", "email"];

  useEffect(() => {
    axios.get("http://localhost:8000/api/usuarios/listar/")
      .then((res) => setUsuarios(res.data))
      .catch((err) => console.error("Error al obtener usuarios:", err));
  }, []);

  const toggleFiltro = (campo, e) => {
    e.stopPropagation();
    const icono = e.currentTarget.getBoundingClientRect();
    setFiltroActivo(filtroActivo === campo ? null : campo);
    setFiltroPosicion({
      top: icono.bottom + window.scrollY + 4,
      left: icono.left + window.scrollX,
    });
  };

  const getValoresUnicos = (campo) => {
    const search = (busquedas[campo] || "").toLowerCase();
    return [...new Set(usuarios.map(e => e[campo]?.toString()))].filter(v =>
      v.toLowerCase().includes(search)
    );
  };

  const toggleValor = (campo, valor) => {
    const seleccionados = new Set(valoresSeleccionados[campo] || []);
    seleccionados.has(valor) ? seleccionados.delete(valor) : seleccionados.add(valor);
    setValoresSeleccionados({ ...valoresSeleccionados, [campo]: [...seleccionados] });
  };

  const limpiarFiltro = (campo) => {
    const actualizado = { ...valoresSeleccionados };
    delete actualizado[campo];
    setValoresSeleccionados(actualizado);
  };

  const ordenar = (campo, orden) => {
    setOrdenCampo({ campo, orden });
  };

  const handleBusqueda = (campo, texto) => {
    setBusquedas({ ...busquedas, [campo]: texto });
  };

  const datosFiltrados = usuarios
    .filter(item =>
      columnas.every(campo =>
        !valoresSeleccionados[campo] || valoresSeleccionados[campo].length === 0
          ? true
          : valoresSeleccionados[campo].includes(item[campo]?.toString())
      )
    )
    .sort((a, b) => {
      if (!ordenCampo) return 0;
      const { campo, orden } = ordenCampo;
      return orden === "asc"
        ? a[campo]?.toString().localeCompare(b[campo]?.toString())
        : b[campo]?.toString().localeCompare(a[campo]?.toString());
    });

  const handleMenuOpen = (id_usuario, event) => {
    event.stopPropagation();
    const rect = event.currentTarget.getBoundingClientRect();
    const espacioDisponibleDerecha = window.innerWidth - rect.right;
    const menuWidth = 160;
    const left = espacioDisponibleDerecha > menuWidth
      ? rect.right + 8
      : rect.left - menuWidth - 8;

    setTimeout(() => {
      setMenuAbiertoId(id_usuario);
      setMenuPosition({ x: left, y: rect.top });
    }, 0);
  };

  const handleClickOutside = (e) => {
    if (!e.target.closest("#floating-menu") && !e.target.closest(".menu-trigger")) {
      setMenuAbiertoId(null);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    const clickFuera = (e) => {
      if (filtroRef.current && !filtroRef.current.contains(e.target)) {
        setFiltroActivo(null);
      }
    };
    document.addEventListener("mousedown", clickFuera);
    return () => document.removeEventListener("mousedown", clickFuera);
  }, []);

  useEffect(() => {
    const clickFueraTarjeta = (e) => {
      if (tarjetaRef.current && !tarjetaRef.current.contains(e.target)) {
        setMostrarTarjeta(false);
      }
    };
    document.addEventListener("mousedown", clickFueraTarjeta);
    return () => document.removeEventListener("mousedown", clickFueraTarjeta);
  }, []);

  const handleEliminar = async (id_usuario) => {
    const confirmar = window.confirm("¿Estás seguro de que deseas eliminar este usuario?");
    if (!confirmar) return;

    try {
      await axios.delete(`http://localhost:8000/api/usuarios/eliminar/${id_usuario}/`);
      setUsuarios((prev) => prev.filter((u) => u.id_usuario !== id_usuario));
      setMenuAbiertoId(null);
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      alert("No se pudo eliminar el usuario.");
    }
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="bg-green-600 w-28 h-screen flex flex-col items-center py-6 justify-between relative">
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
        <div className="relative mb-6">
          <button
            onClick={() => setMostrarTarjeta(!mostrarTarjeta)}
            className="bg-white w-12 h-12 rounded-full flex items-center justify-center text-green-600 font-bold text-xl shadow hover:scale-110 transition"
          >
            {letraInicial}
          </button>
          {mostrarTarjeta && (
            <div
              ref={tarjetaRef}
              className="absolute bottom-16 left-14 w-52 bg-white/95 border-2 border-gray-300 rounded-xl shadow-2xl py-3 z-50"
            >
              <button onClick={() => navigate("/ajustesadm")} className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                <IconSettings className="w-5 h-5 mr-2 text-green-600" /> Ajustes
              </button>
              <button onClick={() => navigate("/")} className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-600">
                <IconLogout className="w-5 h-5 mr-2 text-red-600" /> Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Contenido */}
      <div className="flex-1 p-10 overflow-auto">
        <h1 className="text-4xl font-bold text-green-600 mb-6">Gestionar usuarios</h1>
        <div className="overflow-x-auto shadow-md rounded-lg relative">
          <table className="min-w-full text-base bg-white text-center">
            <thead className="bg-green-600 text-white">
              <tr>
                {["nombre_completo", "telefono", "rol", "email", "contrasena"].map((col, idx) => (
                  <th key={idx} className="p-4 border">
                    <div className="flex items-center justify-center gap-2">
                      <span>{col.toUpperCase()}</span>
                      {columnas.includes(col) && (
                        <button
                          onClick={(e) => toggleFiltro(col, e)}
                          className="z-10"
                          onMouseDown={(e) => e.stopPropagation()}
                        >
                          <IconFilter className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </th>
                ))}
                <th className="p-4 border">OPCIONES</th>
              </tr>
            </thead>
            <tbody>
              {datosFiltrados.map((u) => (
                <tr key={u.id_usuario} className="border-t hover:bg-gray-50">
                  <td className="p-4 border">{u.nombre_completo}</td>
                  <td className="p-4 border">{u.telefono}</td>
                  <td className="p-4 border">{u.rol || "Sin asignar"}</td>
                  <td className="p-4 border">{u.email}</td>
                  <td className="p-4 border">{u.contrasena ? "********" : ""}</td>
                  <td className="p-4 border">
                    <button onClick={(e) => handleMenuOpen(u.id_usuario, e)} className="menu-trigger p-1 rounded hover:bg-gray-200 z-50 relative">
                      <IconDotsVertical className="w-5 h-5 text-gray-600" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filtroActivo && (
            <div
              ref={filtroRef}
              className="fixed bg-white text-black shadow-md border rounded z-[9999] p-3 w-60 text-left text-sm"
              style={{ top: filtroPosicion.top, left: filtroPosicion.left }}
            >
              <div className="font-semibold mb-2">Filtrar por {filtroActivo}</div>
              <button onClick={() => ordenar(filtroActivo, "asc")} className="text-green-700 flex items-center gap-1 mb-1 capitalize">
                <IconSortAscending2 className="w-4 h-4" /> Ordenar A → Z
              </button>
              <button onClick={() => ordenar(filtroActivo, "desc")} className="text-green-700 flex items-center gap-1 mb-2 capitalize">
                <IconSortDescending2 className="w-4 h-4" /> Ordenar Z → A
              </button>
              <input
                type="text"
                placeholder="Buscar..."
                className="w-full border border-gray-300 px-2 py-1 rounded mb-2 text-sm"
                value={busquedas[filtroActivo] || ""}
                onChange={(e) => handleBusqueda(filtroActivo, e.target.value)}
              />
              <div className="flex flex-col max-h-40 overflow-y-auto">
                {getValoresUnicos(filtroActivo).map((val, idx) => (
                  <label key={idx} className="flex items-center gap-2 mb-1 capitalize">
                    <input
                      type="checkbox"
                      checked={(valoresSeleccionados[filtroActivo] || []).includes(val)}
                      onChange={() => toggleValor(filtroActivo, val)}
                      className="accent-green-600"
                    />
                    {val.charAt(0).toUpperCase() + val.slice(1)}
                  </label>
                ))}
              </div>
              <button onClick={() => limpiarFiltro(filtroActivo)} className="text-blue-600 hover:underline text-xs capitalize mt-2">
                Borrar filtro
              </button>
            </div>
          )}

          {menuAbiertoId !== null && (
            <div id="floating-menu" className="fixed bg-white border border-gray-200 rounded shadow-lg w-40 z-[9999]"
              style={{ top: menuPosition.y, left: menuPosition.x }}>
              <button onClick={() => navigate(`/editar-roluser/${menuAbiertoId}`)}
                className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-100">
                <IconPencil className="w-4 h-4 text-blue-600" /> Editar Rol y Permisos
              </button>
              <button onClick={() => handleEliminar(menuAbiertoId)}
                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                <IconTrash className="w-4 h-4" /> Eliminar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin_usuarios;

