// src/pages/Admin_usuarios.jsx
import React, { useState, useRef, useEffect } from "react";
import {
  IconFilter,
  IconPencil,
  IconPower,
  IconDotsVertical,
  IconSortAscending2,
  IconSortDescending2,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { accountsApi } from "../../services/apiClient";
import LayoutAdmin from "../../layouts/LayoutAdmin";

const Admin_usuarios = () => {
  const navigate = useNavigate();
  const filtroRef = useRef(null);

  const [usuarios, setUsuarios] = useState([]);
  const [menuAbiertoId, setMenuAbiertoId] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [filtroActivo, setFiltroActivo] = useState(null);
  const [filtroPosicion, setFiltroPosicion] = useState({ top: 0, left: 0 });
  const [busquedas, setBusquedas] = useState({});
  const [valoresSeleccionados, setValoresSeleccionados] = useState({});
  const [ordenCampo, setOrdenCampo] = useState(null);

  const columnas = ["nombre_completo", "telefono", "rol", "email", "finca", "estado"];

  // Capitalizar con excepciones
  const capitalizar = (texto) => {
    if (!texto) return "";
    const excepciones = {
      agronomo: "Agrónomo",
      mayordomo: "Mayordomo",
      admin: "Admin",
      administrador: "Administrador",
      superusuario: "Superusuario",
      usuario: "Usuario",
    };
    const normalizado = texto.toLowerCase().trim();
    if (excepciones[normalizado]) return excepciones[normalizado];
    return texto
      .split(" ")
      .map((p) => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase())
      .join(" ");
  };

  // Cargar usuarios
  useEffect(() => {
    (async () => {
      try {
        const res = await accountsApi.listUsers();
        const lista = (res.data || []).map((u) => ({
          id_usuario: u.id,
          nombre_completo: u.nombre?.trim() || "(sin nombre)",
          telefono: u.telefono || "",
          rol: capitalizar(
            u.rol ||
              (u.is_superuser
                ? "superusuario"
                : u.is_staff
                ? "administrador"
                : "usuario")
          ),
          email: u.email || "",
          finca: u.finca_asignada?.nombre || "Sin finca",
          is_active: !!u.is_active,
          estado: u.is_active ? "Activo" : "Inactivo",
          _raw: u,
        }));
        setUsuarios(lista);
      } catch (err) {
        console.error("Error al obtener usuarios (accounts):", err);
        alert("No se pudieron cargar los usuarios.");
      }
    })();
  }, []);

  // === FILTROS ===
  const getValoresUnicos = (campo) => {
    const search = (busquedas[campo] || "").toLowerCase();
    return [...new Set(usuarios.map((d) => String(d[campo] || "")))].filter((v) =>
      v.toLowerCase().includes(search)
    );
  };

  const toggleFiltro = (campo, e) => {
    e.stopPropagation();
    const icono = e.currentTarget.getBoundingClientRect();
    setFiltroActivo(filtroActivo === campo ? null : campo);
    setFiltroPosicion({
      top: icono.bottom + window.scrollY + 4,
      left: icono.left + window.scrollX,
    });
  };

  const toggleValor = (campo, valor) => {
    const seleccionados = new Set(valoresSeleccionados[campo] || []);
    seleccionados.has(valor)
      ? seleccionados.delete(valor)
      : seleccionados.add(valor);
    setValoresSeleccionados({
      ...valoresSeleccionados,
      [campo]: [...seleccionados],
    });
  };

  const limpiarFiltro = (campo) => {
    const actualizado = { ...valoresSeleccionados };
    delete actualizado[campo];
    setValoresSeleccionados(actualizado);
  };

  const ordenar = (campo, orden) => setOrdenCampo({ campo, orden });

  const handleBusqueda = (campo, texto) =>
    setBusquedas({ ...busquedas, [campo]: texto });

  // Filtrar y ordenar
  const datosFiltrados = usuarios
    .filter((d) =>
      columnas.every((campo) => {
        const seleccionados = valoresSeleccionados[campo] || [];
        if (seleccionados.length === 0) return true;
        return seleccionados.includes(String(d[campo]));
      })
    )
    .sort((a, b) => {
      if (!ordenCampo) return 0;
      const { campo, orden } = ordenCampo;
      const valA = a[campo];
      const valB = b[campo];
      return orden === "asc"
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA));
    });

  // Cerrar filtros al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (filtroRef.current && !filtroRef.current.contains(e.target)) {
        setFiltroActivo(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // === MENÚ OPCIONES ===
  const handleMenuOpen = (id_usuario, event) => {
    event.stopPropagation();
    const rect = event.currentTarget.getBoundingClientRect();
    const espacioDisponibleDerecha = window.innerWidth - rect.right;
    const menuWidth = 180;
    const left =
      espacioDisponibleDerecha > menuWidth
        ? rect.right + 8
        : rect.left - menuWidth - 8;
    setTimeout(() => {
      setMenuAbiertoId(id_usuario);
      setMenuPosition({ x: left, y: rect.top });
    }, 0);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      const menu = document.getElementById("floating-menu");
      if (
        menuAbiertoId !== null &&
        menu &&
        !menu.contains(e.target) &&
        !e.target.closest(".menu-trigger")
      ) {
        setMenuAbiertoId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuAbiertoId]);

  // === TOGGLE ACTIVAR/INACTIVAR ===
  const handleToggleActivo = async (id_usuario) => {
    const u = usuarios.find((x) => x.id_usuario === id_usuario);
    if (!u) return;
    if (u.is_superuser) {
      alert("No puedes desactivar al superusuario principal.");
      return;
    }
    const accion = u.is_active ? "inactivar" : "activar";
    if (!window.confirm(`¿Seguro que deseas ${accion} este usuario?`)) return;
    try {
      const res = await accountsApi.toggleActive(id_usuario);
      const nuevoActivo = !!res.data?.is_active;
      setUsuarios((prev) =>
        prev.map((it) =>
          it.id_usuario === id_usuario
            ? { ...it, is_active: nuevoActivo, estado: nuevoActivo ? "Activo" : "Inactivo" }
            : it
        )
      );
      setMenuAbiertoId(null);
    } catch (err) {
      console.error("Error al cambiar estado:", err);
      alert(err.response?.data?.detail || "No se pudo cambiar el estado.");
    }
  };

  return (
    <LayoutAdmin>
      <h1 className="text-3xl font-bold text-green-700 mb-6">
        Gestionar usuarios
      </h1>

      <div className="overflow-x-auto shadow-md rounded-lg relative">
        <table className="min-w-full text-base bg-white text-center">
          <thead className="bg-green-600 text-white">
            <tr>
              {["NOMBRE COMPLETO", "TELEFONO", "ROL", "EMAIL", "FINCA", "ESTADO"].map(
                (titulo, idx) => (
                  <th key={idx} className="p-4 border">
                    <div className="flex items-center justify-center gap-2">
                      <span>{titulo}</span>
                      <button
                        onClick={(e) =>
                          toggleFiltro(columnas[idx], e)
                        }
                      >
                        <IconFilter className="w-4 h-4" />
                      </button>
                    </div>
                  </th>
                )
              )}
              <th className="p-4 border">OPCIONES</th>
            </tr>
          </thead>

          <tbody>
            {datosFiltrados.map((u) => (
              <tr key={u.id_usuario} className="border-t hover:bg-gray-50">
                <td className="p-4 border">{u.nombre_completo}</td>
                <td className="p-4 border">{u.telefono}</td>
                <td className="p-4 border">{u.rol}</td>
                <td className="p-4 border">{u.email}</td>
                <td className="p-4 border">{u.finca}</td>
                <td className="p-4 border">
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      u.is_active
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {u.estado}
                  </span>
                </td>
                <td className="p-4 border">
                  <button
                    onClick={(e) => handleMenuOpen(u.id_usuario, e)}
                    className="menu-trigger p-1 rounded hover:bg-gray-200"
                  >
                    <IconDotsVertical className="w-5 h-5 text-gray-600" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* === Filtro flotante === */}
        {filtroActivo && (
          <div
            ref={filtroRef}
            className="fixed bg-white text-black shadow-md border rounded z-50 p-3 w-60"
            style={{ top: filtroPosicion.top, left: filtroPosicion.left }}
          >
            <div className="font-semibold mb-2">
              Filtrar por {filtroActivo.toUpperCase()}
            </div>
            <button
              onClick={() => ordenar(filtroActivo, "asc")}
              className="text-green-700 flex items-center gap-1 mb-1"
            >
              <IconSortAscending2 className="w-4 h-4" /> Ordenar A → Z
            </button>
            <button
              onClick={() => ordenar(filtroActivo, "desc")}
              className="text-green-700 flex items-center gap-1 mb-2"
            >
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
              {getValoresUnicos(filtroActivo).map((val) => (
                <label key={val} className="flex items-center gap-2 mb-1">
                  <input
                    type="checkbox"
                    checked={(valoresSeleccionados[filtroActivo] || []).includes(val)}
                    onChange={() => toggleValor(filtroActivo, val)}
                    className="accent-green-600"
                  />
                  {String(val)}
                </label>
              ))}
            </div>

            <div className="flex justify-between mt-3">
              <button
                onClick={() => limpiarFiltro(filtroActivo)}
                className="bg-gray-200 text-gray-700 px-3 py-1 rounded-md text-xs font-medium hover:bg-gray-300"
              >
                Borrar
              </button>
              <button
                onClick={() => setFiltroActivo(null)}
                className="bg-green-600 text-white px-3 py-1 rounded-md text-xs font-medium hover:bg-green-700"
              >
                Aceptar
              </button>
            </div>
          </div>
        )}

        {/* === Menú contextual === */}
        {menuAbiertoId !== null && (
          <div
            id="floating-menu"
            className="fixed bg-white border border-gray-200 rounded shadow-lg w-48 z-[9999]"
            style={{ top: menuPosition.y, left: menuPosition.x }}
          >
            <button
              onClick={() => {
                const usuarioSeleccionado = usuarios.find(
                  (x) => x.id_usuario === menuAbiertoId
                );
                navigate(`/editar-roluser/${menuAbiertoId}`, {
                  state: {
                    usuario: {
                      ...usuarioSeleccionado._raw,
                      nombre_completo: usuarioSeleccionado.nombre_completo,
                      telefono: usuarioSeleccionado.telefono,
                      rol: usuarioSeleccionado.rol,
                      estado: usuarioSeleccionado.estado,
                    },
                  },
                });
              }}
              className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-100"
            >
              <IconPencil className="w-4 h-4 text-blue-600" /> Editar Rol y Usuario
            </button>
            <button
              onClick={() => handleToggleActivo(menuAbiertoId)}
              className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-100"
            >
              <IconPower className="w-4 h-4 text-gray-700" />
              {usuarios.find((x) => x.id_usuario === menuAbiertoId)?.is_active
                ? "Inactivar"
                : "Activar"}
            </button>
          </div>
        )}
      </div>
    </LayoutAdmin>
  );
};

export default Admin_usuarios;
