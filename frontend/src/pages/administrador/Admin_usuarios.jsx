// src/pages/Admin_usuarios.jsx
import React, { useState, useRef, useEffect } from "react";
import {
  IconUsers,
  IconCloudUpload,
  IconTool,
  IconHome,
  IconSettings,
  IconFilter,
  IconPencil,
  IconPower,
  IconDotsVertical,
  IconSortAscending2,
  IconSortDescending2,
  IconLogout,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import api, { accountsApi, ENDPOINTS } from "../../services/apiClient";
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
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const letraInicial = "J";

  const columnas = ["nombre_completo", "telefono", "rol", "email", "estado"];

  // Función para capitalizar
  // Función para capitalizar con excepciones
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
  if (excepciones[normalizado]) {
    return excepciones[normalizado];
  }

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
          nombre_completo:
            u.nombre?.trim() || "(sin nombre)",
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
    return [...new Set(usuarios.map((e) => (e[campo] ?? "").toString()))].filter(
      (v) => v.toLowerCase().includes(search)
    );
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

  const datosFiltrados = usuarios
    .filter((item) =>
      columnas.every((campo) => {
        const vals = valoresSeleccionados[campo];
        if (!vals || vals.length === 0) return true;
        return vals.includes((item[campo] ?? "").toString());
      })
    )
    .sort((a, b) => {
      if (!ordenCampo) return 0;
      const { campo, orden } = ordenCampo;
      const av = (a[campo] ?? "").toString();
      const bv = (b[campo] ?? "").toString();
      return orden === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
    });

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

  // ====== LOGOUT ======
  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    try {
      const refresh = localStorage.getItem("refresh");
      try {
        if (ENDPOINTS?.logout) {
          await api.post(ENDPOINTS.logout, { refresh });
        } else if (accountsApi?.logout) {
          await accountsApi.logout({ refresh });
        }
      } catch (e) {
        console.warn("Fallo en logout del backend:", e);
      }
    } finally {
      try {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        sessionStorage.removeItem("access");
        sessionStorage.removeItem("refresh");
      } catch {}
      try {
        if (api?.defaults?.headers?.common) {
          delete api.defaults.headers.common.Authorization;
        }
      } catch {}
      setMostrarTarjeta(false);
      setIsLoggingOut(false);
      window.location.replace("/");
    }
  };

  // Activar / Inactivar usuario
  const handleToggleActivo = async (id_usuario) => {
    const u = usuarios.find((x) => x.id_usuario === id_usuario);
    if (!u) return;
    if (u.is_superuser) {
      alert("No puedes desactivar al superusuario principal.");
      return;
    }
    const accion = u.is_active ? "inactivar" : "activar";
    const ok = window.confirm(`¿Seguro que deseas ${accion} este usuario?`);
    if (!ok) return;
    try {
      const res = await api.patch(
        `${ENDPOINTS.users}${id_usuario}/toggle-active/`,
        {}
      );
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
      alert(err.response?.data?.detail || "No se pudo cambiar el estado del usuario.");
    }
  };



  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="bg-green-600 w-28 h-screen flex flex-col items-center py-6 justify-between relative">
        <div className="flex flex-col items-center space-y-8">
          <img src={faviconBlanco} alt="Logo" className="w-11 h-11" />
          <button
            onClick={() => navigate("/homeadm")}
            className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
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
              <button
                onClick={() => navigate("/ajustesadm")}
                className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              >
                <IconSettings className="w-5 h-5 mr-2 text-green-600" /> Ajustes
              </button>
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className={`flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                  isLoggingOut ? "opacity-60 cursor-not-allowed" : "text-red-600"
                }`}
              >
                <IconLogout className="w-5 h-5 mr-2 text-red-600" />
                {isLoggingOut ? "Cerrando..." : "Cerrar sesión"}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Contenido */}
      <div className="flex-1 p-10 overflow-auto">
        <h1 className="text-4xl font-bold text-green-600 mb-6">
          Gestionar usuarios
        </h1>

        <div className="overflow-x-auto shadow-md rounded-lg relative">
          <table className="min-w-full text-base bg-white text-center">
            <thead className="bg-green-600 text-white">
              <tr>
                {["NOMBRE_COMPLETO", "TELEFONO", "ROL", "EMAIL", "ESTADO"].map(
                  (titulo, idx) => (
                    <th key={idx} className="p-4 border">
                      <div className="flex items-center justify-center gap-2">
                        <span>{titulo}</span>
                        <button
                          onClick={(e) =>
                            toggleFiltro(
                              ["nombre_completo", "telefono", "rol", "email", "estado"][idx],
                              e
                            )
                          }
                          className="z-10"
                          onMouseDown={(e) => e.stopPropagation()}
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
                      className="menu-trigger p-1 rounded hover:bg-gray-200 z-50 relative"
                    >
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
              <div className="font-semibold mb-2">
                Filtrar por {filtroActivo}
              </div>
              <button
                onClick={() => ordenar(filtroActivo, "asc")}
                className="text-green-700 flex items-center gap-1 mb-1 capitalize"
              >
                <IconSortAscending2 className="w-4 h-4" /> Ordenar A → Z
              </button>
              <button
                onClick={() => ordenar(filtroActivo, "desc")}
                className="text-green-700 flex items-center gap-1 mb-2 capitalize"
              >
                <IconSortDescending2 className="w-4 h-4" /> Ordenar Z → A
              </button>
              <input
                type="text"
                placeholder="Buscar..."
                className="w-full border border-gray-300 px-2 py-1 rounded mb-2 text-sm"
                value={busquedas[filtroActivo] || ""}
                onChange={(e) =>
                  setBusquedas({ ...busquedas, [filtroActivo]: e.target.value })
                }
              />
              <div className="flex flex-col max-h-40 overflow-y-auto">
                {getValoresUnicos(filtroActivo).map((val, idx) => (
                  <label
                    key={idx}
                    className="flex items-center gap-2 mb-1 capitalize"
                  >
                    <input
                      type="checkbox"
                      checked={(valoresSeleccionados[filtroActivo] || []).includes(val)}
                      onChange={() => toggleValor(filtroActivo, val)}
                      className="accent-green-600"
                    />
                    {val || "(vacío)"}
                  </label>
                ))}
              </div>
              <button
                onClick={() => limpiarFiltro(filtroActivo)}
                className="text-blue-600 hover:underline text-xs capitalize mt-2"
              >
                Borrar filtro
              </button>
            </div>
          )}

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
                <IconPencil className="w-4 h-4 text-blue-600" /> Editar Rol y
                Permisos
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
      </div>
    </div>
  );
};

export default Admin_usuarios;
