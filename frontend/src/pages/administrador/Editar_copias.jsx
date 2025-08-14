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

  const [mostrarTarjeta, setMostrarTarjeta] = useState(false);
  const tarjetaRef = useRef(null);

  // Cerrar tarjeta si se hace clic fuera
  useEffect(() => {
    const handler = (e) => {
      if (tarjetaRef.current && !tarjetaRef.current.contains(e.target)) {
        setMostrarTarjeta(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // ---------- PASSWORD SIMULADA ----------
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

  // ---------- PERMISOS ----------
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
      prev.includes(pantalla)
        ? prev.filter((p) => p !== pantalla)
        : [...prev, pantalla]
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
      : {
          ...mockUsuario,
          permisos: [],
        };

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

  const letraInicial = (usuario.nombre?.trim()?.[0] || "U").toUpperCase();

  if (cargando) return <div className="p-6">Cargando...</div>;

  return (
    <div className="min-h-[100dvh] bg-gray-50">
      {/* SIDEBAR */}
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
        {/* Botón de perfil */}
        <div className="mb-6">
          <button
            onClick={() => setMostrarTarjeta(!mostrarTarjeta)}
            className="bg-white w-12 h-12 rounded-full flex items-center justify-center text-green-600 font-bold text-xl shadow hover:scale-110 transition"
          >
            {letraInicial}
          </button>
        </div>
      </aside>

      {/* TARJETA FLOTANTE FUERA DEL ASIDE */}
      {mostrarTarjeta && (
        <div
          ref={tarjetaRef}
          className="fixed bottom-24 left-28 w-52 bg-white/95 border border-gray-200 rounded-xl shadow-2xl py-3 z-[9999]"
        >
          <button
            onClick={() => {
              setMostrarTarjeta(false);
              navigate("/ajustesadm");
            }}
            className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100"
          >
            <IconSettings className="w-5 h-5 mr-2 text-green-600" />
            Ajustes
          </button>
          <button
            onClick={() => {
              setMostrarTarjeta(false);
              navigate("/");
            }}
            className="flex items-center w-full px-4 py-2 text-sm hover:bg-red-50 text-red-600"
          >
            <IconLogout className="w-5 h-5 mr-2 text-red-600" />
            Cerrar sesión
          </button>
        </div>
      )}

      {/* MAIN */}
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

        {/* FORMULARIO */}
        {/* ... resto del contenido igual que antes ... */}
      </main>
    </div>
  );
};

export default Editar_roluser;
