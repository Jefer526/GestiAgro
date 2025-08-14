// src/pages/administrador/Editar_roluser.jsx
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
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
  IconMail,
  IconWand,
  IconFilter,
  IconX,
  IconChevronDown,
  IconLogout,
} from "@tabler/icons-react";
import api, { accountsApi, ENDPOINTS } from "../../services/apiClient";
import faviconBlanco from "../../assets/favicon-blanco.png";

const Editar_roluser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { state } = useLocation();

  const [alertaVisible, setAlertaVisible] = useState(false);
  const [cargando, setCargando] = useState(true);

  const mockUsuario = {
    id: id || "42",
    nombre: "Juan Pérez",
    telefono: "+57 300 123 4567",
    email: "juan.perez@empresa.com",
    rol: "Mayordomo",
    permisos: ["Dashboard", "Producción", "Reportes"],
  };

  const [usuario, setUsuario] = useState({
    id: "",
    nombre: "",
    telefono: "",
    email: "",
    rol: "",
    permisos: [],
  });

  // -------- Perfil (avatar + tarjeta) --------
  const tarjetaRef = useRef(null);
  const [mostrarTarjeta, setMostrarTarjeta] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  useEffect(() => {
    const handler = (e) => {
      if (tarjetaRef.current && !tarjetaRef.current.contains(e.target)) {
        setMostrarTarjeta(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);
  const letraInicial = (usuario?.nombre?.trim()?.[0] || "U").toUpperCase();

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
        console.warn("Fallo en logout del backend, cierre local forzado:", e);
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

  // ---------- PASSWORD ----------
  const [enviandoCorreo, setEnviandoCorreo] = useState(false);
  const [avisoPwd, setAvisoPwd] = useState("");
  const generarContrasenaFuerte = (len = 12) => {
    const may = "ABCDEFGHJKLMNPQRSTUVWXYZ";
    const min = "abcdefghijkmnopqrstuvwxyz";
    const num = "23456789";
    const sym = "!@#$%^&*()-_=+?.";
    const all = may + min + num + sym;
    const pick = (s) => s[Math.floor(Math.random() * s.length)];
    let pwd = pick(may) + pick(min) + pick(num) + pick(sym);
    for (let i = pwd.length; i < len; i++) pwd += pick(all);
    return pwd.split("").sort(() => Math.random() - 0.5).join("");
  };
  const manejarGenerarYEnviar = () => {
    generarContrasenaFuerte(12);
    setEnviandoCorreo(true);
    setAvisoPwd("");
    setTimeout(() => {
      setEnviandoCorreo(false);
      setAvisoPwd(
        "Contraseña temporal generada y enviada al correo del usuario (simulado)."
      );
    }, 1200);
  };

  // ---------- Permisos ----------
  const pantallasDisponibles = [
    "Dashboard",
    "Usuarios",
    "Copias de seguridad",
    "Soporte",
    "Producción",
    "Inventario",
    "Clima",
    "Lotes",
    "Tareas",
    "Reportes",
    "Ajustes",
  ];
  const [openPermisos, setOpenPermisos] = useState(false);
  const [permSearch, setPermSearch] = useState("");
  const [tempSeleccion, setTempSeleccion] = useState([]);
  const permisosBtnRef = useRef(null);
  const permisosCardRef = useRef(null);
  const [permPos, setPermPos] = useState({ top: 0, left: 0 });
  const filtrarPantallas = pantallasDisponibles.filter((p) =>
    p.toLowerCase().includes(permSearch.toLowerCase())
  );

  const positionPermCard = () => {
    const btn = permisosBtnRef.current?.getBoundingClientRect();
    const card = permisosCardRef.current;
    if (!btn || !card) return;
    const cardW = card.offsetWidth || 360;
    const cardH = card.offsetHeight || 340;
    const viewportW = window.innerWidth;
    const viewportH = window.innerHeight;
    const espacioAbajo = viewportH - btn.bottom;

    let top =
      espacioAbajo > cardH
        ? btn.bottom + window.scrollY + 8
        : btn.top + window.scrollY - cardH - 8;

    const minTop = window.scrollY + 8;
    const maxTop = window.scrollY + viewportH - cardH - 8;
    if (top < minTop) top = minTop;
    if (top > maxTop) top = maxTop;

    let left = btn.left + window.scrollX;
    const maxLeft = window.scrollX + viewportW - cardW - 8;
    const minLeft = window.scrollX + 8;
    if (left > maxLeft) left = maxLeft;
    if (left < minLeft) left = minLeft;

    setPermPos({ top, left });
  };

  const abrirPermisos = () => {
    setTempSeleccion(usuario.permisos || []);
    setOpenPermisos(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        positionPermCard();
      });
    });
  };
  const cerrarPermisos = () => setOpenPermisos(false);
  const toggleTemp = (pantalla) => {
    setTempSeleccion((prev) =>
      prev.includes(pantalla) ? prev.filter((p) => p !== pantalla) : [...prev, pantalla]
    );
  };
  const seleccionarTodo = () => setTempSeleccion([...pantallasDisponibles]);
  const limpiarSeleccion = () => setTempSeleccion([]);
  const aplicarPermisos = () => {
    setUsuario((prev) => ({ ...prev, permisos: [...tempSeleccion] }));
    setOpenPermisos(false);
  };

  useEffect(() => {
    if (!openPermisos) return;
    const handler = () => positionPermCard();
    window.addEventListener("resize", handler);
    window.addEventListener("scroll", handler, { passive: true });
    return () => {
      window.removeEventListener("resize", handler);
      window.removeEventListener("scroll", handler);
    };
  }, [openPermisos]);

  // Prefill
  useEffect(() => {
    const u = state?.usuario
      ? {
          id: state.usuario.id_usuario || id || mockUsuario.id,
          nombre: state.usuario.nombre_completo || mockUsuario.nombre,
          telefono: state.usuario.telefono || mockUsuario.telefono,
          email: state.usuario.email || mockUsuario.email,
          rol: state.usuario.rol?.id_rol || state.usuario.rol || mockUsuario.rol,
          permisos: state.usuario.permisos || [],
        }
      : { ...mockUsuario, permisos: [] };
    setUsuario(u);
    setCargando(false);
  }, [id, state]);

  const handleSave = () => {
    setAlertaVisible(true);
    setTimeout(() => {
      setAlertaVisible(false);
      navigate("/admuser");
    }, 1200);
  };

  if (cargando) return <div className="p-6">Cargando...</div>;

  return (
    <div className="min-h-[100dvh] bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-28 h-[100dvh] bg-green-600 flex flex-col items-center py-6 justify-between fixed left-0 top-0">
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

        {/* Perfil */}
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
      </aside>

      {/* Contenido */}
      <main className="ml-28 flex-1 p-6">
        {alertaVisible && (
          <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[10000] bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 text-base font-semibold">
            <IconCheck className="w-5 h-5" /> Cambios guardados exitosamente
          </div>
        )}

        <button
          onClick={() => navigate("/admuser")}
          className="text-green-600 hover:text-green-800 flex items-center gap-1 font-semibold mb-6"
        >
          <IconArrowLeft className="w-5 h-5" /> Volver
        </button>

        {/* Formulario */}
        <div className="bg-white shadow-xl border-2 border-green-500 rounded-xl p-8 max-w-5xl mx-auto">
          {/* Datos básicos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Nombre */}
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Nombre</label>
              <input
                type="text"
                value={usuario.nombre}
                onChange={(e) => setUsuario({ ...usuario, nombre: e.target.value })}
                className="w-full p-3 rounded-md border border-gray-300 focus:ring-1 focus:ring-green-500 outline-none"
              />
            </div>
            {/* Teléfono */}
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Teléfono</label>
              <input
                type="tel"
                value={usuario.telefono}
                onChange={(e) => setUsuario({ ...usuario, telefono: e.target.value })}
                className="w-full p-3 rounded-md border border-gray-300 focus:ring-1 focus:ring-green-500 outline-none"
              />
            </div>
            {/* Email */}
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Correo</label>
              <input
                type="email"
                value={usuario.email}
                onChange={(e) => setUsuario({ ...usuario, email: e.target.value })}
                className="w-full p-3 rounded-md border border-gray-300 focus:ring-1 focus:ring-green-500 outline-none"
              />
            </div>

            {/* Contraseña temporal */}
            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Contraseña temporal
              </label>
              <button
                type="button"
                onClick={manejarGenerarYEnviar}
                disabled={enviandoCorreo}
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-semibold shadow"
              >
                <IconWand className="w-5 h-5" />
                Generar y enviar
              </button>
              {enviandoCorreo && (
                <span className="ml-2 text-sm text-gray-600">
                  <IconMail className="inline w-4 h-4" /> Enviando…
                </span>
              )}
              {avisoPwd && (
                <p className="text-sm text-green-700 mt-2">{avisoPwd}</p>
              )}
            </div>
          </div>

          {/* Rol */}
          <div className="mb-6">
            <label className="block text-lg font-bold text-gray-800 mb-2">Rol</label>
            <select
              value={usuario.rol}
              onChange={(e) => setUsuario({ ...usuario, rol: e.target.value })}
              className="w-full p-3 rounded-md border border-gray-300 focus:ring-1 focus:ring-green-500 outline-none"
            >
              <option value="">Sin asignar</option>
              <option value="Administrador">Administrador</option>
              <option value="Gerente">Gerente</option>
              <option value="Mayordomo">Mayordomo</option>
            </select>
          </div>

          {/* Permisos */}
          <div className="mb-6">
            <label className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-1">
              <IconShieldCheck className="w-5 h-5 text-green-600" /> Permisos asignados
            </label>
            <button
              ref={permisosBtnRef}
              type="button"
              onClick={abrirPermisos}
              className="w-full p-3 rounded-md border border-gray-300 focus:ring-1 focus:ring-green-500 outline-none flex items-center justify-between"
            >
              <span className="text-gray-700">
                {usuario.permisos.length > 0
                  ? `${usuario.permisos.length} seleccionado(s)`
                  : "Seleccionar permisos"}
              </span>
              <IconChevronDown className="w-5 h-5 text-gray-500" />
            </button>

            {openPermisos && (
              <div
                ref={permisosCardRef}
                className="fixed z-[9999] w-[360px] rounded-xl border shadow-xl bg-white p-3"
                style={{ top: permPos.top, left: permPos.left }}
              >
                {/* Búsqueda */}
                <div className="relative mb-2">
                  <IconFilter className="w-4 h-4 absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    value={permSearch}
                    onChange={(e) => setPermSearch(e.target.value)}
                    placeholder="Buscar pantalla…"
                    className="w-full pl-7 pr-2 py-2 rounded-md border border-gray-300 focus:ring-1 focus:ring-green-500 outline-none text-base"
                  />
                </div>

                {/* Lista */}
                <div className="max-h-[60vh] overflow-auto pr-1">
                  {filtrarPantallas.length === 0
                    ? "Sin resultados"
                    : filtrarPantallas.map((p) => (
                        <label key={p} className="flex items-center gap-2 px-1 py-1">
                          <input
                            type="checkbox"
                            className="accent-green-600"
                            checked={tempSeleccion.includes(p)}
                            onChange={() => toggleTemp(p)}
                          />
                          {p}
                        </label>
                      ))}
                </div>

                {/* Acciones */}
                <div className="flex justify-between mt-3">
                  <button
                    onClick={seleccionarTodo}
                    className="text-sm px-2 py-1 rounded hover:bg-gray-100"
                  >
                    Seleccionar todo
                  </button>
                  <button
                    onClick={limpiarSeleccion}
                    className="text-sm px-2 py-1 rounded hover:bg-gray-100"
                  >
                    Limpiar
                  </button>
                </div>

                <div className="mt-3 flex justify-end gap-2">
                  <button
                    onClick={cerrarPermisos}
                    className="px-3 py-1 rounded-lg border hover:bg-gray-50"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={aplicarPermisos}
                    className="px-3 py-1 rounded-lg bg-green-600 text-white hover:bg-green-700"
                  >
                    Aplicar
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleSave}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 shadow-lg"
            >
              <IconDeviceFloppy className="w-5 h-5" /> Guardar cambios
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Editar_roluser;
