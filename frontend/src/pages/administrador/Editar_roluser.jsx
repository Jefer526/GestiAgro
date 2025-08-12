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
} from "@tabler/icons-react";
import faviconBlanco from "../../assets/favicon-blanco.png";

const Editar_roluser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { state } = useLocation();

  const [alertaVisible, setAlertaVisible] = useState(false);
  const [cargando, setCargando] = useState(true);

  // Mock por defecto (si no llega state.usuario)
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

  // ---------- PASSWORD (solo frontend: simulado) ----------
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
    // Solo simulación en frontend (no se muestra la contraseña)
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
  // --------------------------------------------------------

  // ---------- Permisos (un solo campo con tarjeta) ----------
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

  // Posicionamiento robusto: mide tarjeta real, flip + clamp con zoom/scroll/resize
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
        ? btn.bottom + window.scrollY + 8 // abajo
        : btn.top + window.scrollY - cardH - 8; // arriba

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
  // ----------------------------------------------------------

  // Prefill SOLO FRONTEND: toma state.usuario o usa mock
  useEffect(() => {
    const u = state?.usuario
      ? {
          id: state.usuario.id_usuario || id || mockUsuario.id,
          nombre: state.usuario.nombre_completo || mockUsuario.nombre,
          telefono: state.usuario.telefono || mockUsuario.telefono,
          email: state.usuario.email || mockUsuario.email,
          rol: state.usuario.rol?.id_rol || state.usuario.rol || mockUsuario.rol,
          permisos: state.usuario.permisos || [], // 🔹 vacío si no hay permisos
        }
      : {
          ...mockUsuario,
          permisos: [], // 🔹 aunque usemos mock, permisos vacíos
        };
  
    setUsuario(u);
    setCargando(false);
  }, [id, state]);
  

  // Guardado simulado (solo frontend)
  const handleSave = () => {
    setAlertaVisible(true);
    setTimeout(() => {
      setAlertaVisible(false);
      navigate("/admuser");
    }, 1200);
  };

  if (cargando) return <div className="p-6">Cargando...</div>;

  return (
    // Usamos min-h-[100dvh] para asegurar alto total del viewport con zoom
    <div className="min-h-[100dvh] bg-gray-50">
      {/* Sidebar FIJO a la izquierda con altura del viewport dinámica */}
      <aside className="fixed left-0 top-0 w-28 h-[100dvh] bg-green-600 flex flex-col items-center py-6 justify-between">
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
        <button
          onClick={() => navigate("/ajustesadm")}
          className="mb-6 hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
        >
          <IconSettings className="text-white w-11 h-11" />
        </button>
      </aside>

      {/* Contenido principal desplazado a la derecha del sidebar fijo */}
      <main className="ml-28 min-h-[100dvh] p-6 relative">
        {alertaVisible && (
          <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[10000] bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 text-base font-semibold">
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
          <h1 className="text-3xl font-bold text-green-600 mb-6">
            Editar usuarios y permisos
          </h1>

          {/* Datos básicos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Nombre
              </label>
              <input
                type="text"
                value={usuario.nombre}
                onChange={(e) => setUsuario({ ...usuario, nombre: e.target.value })}
                className="w-full p-3 rounded-md border border-gray-300 focus:ring-1 focus:ring-green-500 outline-none"
                placeholder="Juan Pérez"
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Teléfono
              </label>
              <input
                type="tel"
                value={usuario.telefono}
                onChange={(e) => setUsuario({ ...usuario, telefono: e.target.value })}
                className="w-full p-3 rounded-md border border-gray-300 focus:ring-1 focus:ring-green-500 outline-none"
                placeholder="+57 300 123 4567"
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Correo
              </label>
              <input
                type="email"
                value={usuario.email}
                onChange={(e) => setUsuario({ ...usuario, email: e.target.value })}
                className="w-full p-3 rounded-md border border-gray-300 focus:ring-1 focus:ring-green-500 outline-none"
                placeholder="juan.perez@empresa.com"
              />
            </div>

            {/* Generar/enviar contraseña temporal (simulado) */}
            <div className="flex flex-col">
              <label className="block font-semibold text-gray-700 mb-1">
                Contraseña temporal
              </label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={manejarGenerarYEnviar}
                  disabled={enviandoCorreo}
                  className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-semibold shadow"
                >
                  <IconWand className="w-5 h-5" />
                  Generar y enviar al correo
                </button>
                {enviandoCorreo && (
                  <span className="text-sm text-gray-600 flex items-center gap-1">
                    <IconMail className="w-4 h-4" /> Enviando…
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                La contraseña <strong>no se mostrará</strong> por seguridad. El
                usuario la recibirá por correo.
              </p>
              {avisoPwd && (
                <p className="text-sm text-green-700 mt-2">{avisoPwd}</p>
              )}
            </div>
          </div>

          {/* Rol */}
          <div className="mb-6">
            <label className="block text-lg font-bold text-gray-800 mb-2">
              Rol
            </label>
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

          {/* Permisos: campo único con tarjeta de selección */}
          <div className="mb-6">
            <label className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-1">
              <IconShieldCheck className="w-5 h-5 text-green-600" /> Permisos
              asignados
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

            {/* Chips opcionales */}
            {usuario.permisos.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {usuario.permisos.slice(0, 6).map((p) => (
                  <span
                    key={p}
                    className="px-2 py-1 text-xs rounded-full bg-green-50 text-green-700 border border-green-200"
                  >
                    {p}
                  </span>
                ))}
                {usuario.permisos.length > 6 && (
                  <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600 border">
                    +{usuario.permisos.length - 6}
                  </span>
                )}
              </div>
            )}

            {openPermisos && (
              <div
                ref={permisosCardRef}
                className="fixed z-[9999] w-[360px] rounded-xl border shadow-xl bg-white p-3"
                style={{ top: permPos.top, left: permPos.left }}
              >
                {/* Encabezado con texto más grande */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 font-semibold text-gray-800 text-base">
                    <IconShieldCheck className="w-4 h-4 text-green-600" />
                    Seleccionar permisos
                  </div>
                  <button
                    onClick={cerrarPermisos}
                    className="p-1 rounded hover:bg-gray-100"
                  >
                    <IconX className="w-4 h-4" />
                  </button>
                </div>

                {/* Búsqueda con texto más grande */}
                <div className="relative mb-2">
                  <IconFilter className="w-4 h-4 absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    value={permSearch}
                    onChange={(e) => setPermSearch(e.target.value)}
                    placeholder="Buscar pantalla…"
                    className="w-full pl-7 pr-2 py-2 rounded-md border border-gray-300 focus:ring-1 focus:ring-green-500 outline-none text-base"
                  />
                </div>

                {/* Lista con altura adaptable y texto más grande */}
                <div className="max-h-[60vh] overflow-auto pr-1">
                  {filtrarPantallas.length === 0 ? (
                    <div className="text-sm text-gray-500 px-1 py-2">
                      Sin resultados
                    </div>
                  ) : (
                    filtrarPantallas.map((p) => (
                      <label
                        key={p}
                        className="flex items-center gap-2 px-1 py-1 text-gray-700 text-base"
                      >
                        <input
                          type="checkbox"
                          className="accent-green-600"
                          checked={tempSeleccion.includes(p)}
                          onChange={() => toggleTemp(p)}
                        />
                        {p}
                      </label>
                    ))
                  )}
                </div>

                {/* Botones inferiores con texto más grande */}
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={seleccionarTodo}
                      className="text-sm px-2 py-1 rounded border border-green-600 text-green-700 hover:bg-green-50"
                    >
                      Seleccionar todo
                    </button>
                    <button
                      type="button"
                      onClick={limpiarSeleccion}
                      className="text-sm px-2 py-1 rounded border text-gray-700 hover:bg-gray-50"
                    >
                      Borrar
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={aplicarPermisos}
                    className="text-sm px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700"
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
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 font-semibold shadow-md"
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

