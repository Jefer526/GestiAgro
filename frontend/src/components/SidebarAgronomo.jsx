// src/components/SidebarAgronomo.jsx
import React, { useState, useRef, useLayoutEffect, useEffect } from "react";
import {
  IconHome,
  IconCheckupList,
  IconChartBar,
  IconBox,
  IconCloudRain,
  IconTractor,
  IconUsersGroup,
  IconPlant,
  IconSettings,
  IconTool,
  IconLogout,
  IconPlant2,
  IconBook,
  IconBug,
  IconHistory,
  IconSwitchHorizontal,
} from "@tabler/icons-react";
import { useNavigate, useLocation } from "react-router-dom";
import faviconBlanco from "../assets/favicon-blanco.png";
import api, { accountsApi, ENDPOINTS } from "../services/apiClient";

const SidebarAgronomo = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 🔹 Estado para inicial dinámica
  const [letraInicial, setLetraInicial] = useState("U");
  const [rolUsuario, setRolUsuario] = useState(null);

  useEffect(() => {
    try {
      const userData = JSON.parse(localStorage.getItem("user"));
      if (userData?.nombre) {
        const inicial = userData.nombre.trim()[0].toUpperCase();
        setLetraInicial(inicial);
      }
      if (userData?.rol) setRolUsuario(userData.rol);
    } catch {
      setLetraInicial("U");
    }
  }, []);

  const [mostrarTarjeta, setMostrarTarjeta] = useState(false);
  const tarjetaRef = useRef(null);
  const botonRef = useRef(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const scrollRef = useRef(null);

  // 🔹 Detectar clic fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        tarjetaRef.current &&
        !tarjetaRef.current.contains(e.target) &&
        botonRef.current &&
        !botonRef.current.contains(e.target)
      ) {
        setMostrarTarjeta(false);
      }
    };

    if (mostrarTarjeta) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mostrarTarjeta]);

  // 🔹 Restaurar scroll guardado
  useLayoutEffect(() => {
    const saved = sessionStorage.getItem("sidebarScrollAgro");
    if (saved && scrollRef.current) {
      scrollRef.current.scrollTop = parseInt(saved, 10);
    }
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
        localStorage.removeItem("rememberedEmail");
      } catch {}
      try {
        if (api?.defaults?.headers?.common) {
          delete api.defaults.headers.common.Authorization;
        }
      } catch {}
      setMostrarTarjeta(false);
      setIsLoggingOut(false);
      window.location.replace("/login");
    }
  };

  // Saber qué ruta está activa
  const isActive = (paths) => {
    if (Array.isArray(paths)) {
      return paths.some((p) => location.pathname.startsWith(p));
    }
    return location.pathname.startsWith(paths);
  };

  return (
    <aside className="fixed left-0 top-0 w-28 h-[100dvh] bg-green-600 flex flex-col justify-between z-[200]">
      {/* Logo */}
      <div className="pt-6 flex justify-center">
        <img src={faviconBlanco} alt="Logo" className="w-11 h-11" />
      </div>

      {/* Zona de iconos */}
      <div
        ref={scrollRef}
        className="flex-1 flex flex-col items-center space-y-8 mt-6 overflow-y-auto scrollbar-hide-only"
      >
        {[
          { icon: <IconHome />, routes: ["/homeagro"] },
          { icon: <IconCheckupList />, routes: ["/Laboresagro", "/historiallabores"] },
          { icon: <IconHistory />, routes: ["/Historialagro"] },
          { icon: <IconBook />, routes: ["/Historialcampo", "/detallecampo", "/cuadernocampo"] },
          { icon: <IconPlant2 />, routes: ["/produccionagro"] },
          { icon: <IconBug />, routes: ["/manejofitosanitario"] },
          { icon: <IconBox />, routes: ["/Bodegaagro", "/agregarproducto", "/detallesagrop", "/bodegaagro", "/registrarmovimiento"] },
          { icon: <IconCloudRain />, routes: ["/variablesclimaticas", "/Registrarclima"] },
          { icon: <IconTractor />, routes: ["/maquinariaequipos", "/registrarmaquina", "/registrarnovedad", "/hojadevida", "/historialtrabajo", "/detallemantenimiento", "/registrarlabormaquinaria"] },
          { icon: <IconUsersGroup />, routes: ["/manejopersonal", "/registrarempleado", "/editarempleado" , "/gestionmayordomo"] },
          { icon: <IconPlant />, routes: ["/gestionfincas", "/crearfinca", "/editarfinca", "/Detallelote" ] },
        ].map(({ icon, routes }, i) => (
          <div key={i} className="relative">
            {isActive(routes) && (
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-11 bg-white rounded-full" />
            )}
            <button
              onClick={() => {
                if (scrollRef.current) {
                  sessionStorage.setItem(
                    "sidebarScrollAgro",
                    scrollRef.current.scrollTop.toString()
                  );
                }
                navigate(routes[0]);
              }}
              className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
            >
              {React.cloneElement(icon, { className: "text-white w-11 h-11" })}
            </button>
          </div>
        ))}
      </div>

      {/* Perfil */}
      <div className="relative mb-6 flex justify-center">
        <button
          ref={botonRef}
          onClick={() => setMostrarTarjeta(!mostrarTarjeta)}
          className="bg-white w-12 h-12 rounded-full flex items-center justify-center text-green-600 font-bold text-xl shadow hover:scale-110 transition"
        >
          {letraInicial}
        </button>
        {mostrarTarjeta && (
          <div
            ref={tarjetaRef}
            className="absolute bottom-16 left-14 w-56 bg-white/95 border border-gray-200 rounded-xl shadow-2xl py-3 z-[9999] backdrop-blur text-base"
          >
            <button
              onClick={() => {
                setMostrarTarjeta(false);
                navigate("/ajustesagro");
              }}
              className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              <IconSettings className="w-5 h-5 mr-2 text-green-600" /> Ajustes
            </button>

            {/* 👇 Condicional según rol */}
            {rolUsuario === "admin" ? (
              <button
                onClick={() => {
                  setMostrarTarjeta(false);
                  navigate("/seleccion-rol");
                }}
                className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                <IconSwitchHorizontal className="w-5 h-5 mr-2 text-green-600" /> Cambiar rol
              </button>
            ) : (
              <button
                onClick={() => {
                  setMostrarTarjeta(false);
                  navigate("/soporteagro");
                }}
                className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                <IconTool className="w-5 h-5 mr-2 text-green-600" /> Soporte
              </button>
            )}

            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className={`flex items-center w-full text-left px-4 py-2 hover:bg-gray-100 ${
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
  );
};

export default SidebarAgronomo;
