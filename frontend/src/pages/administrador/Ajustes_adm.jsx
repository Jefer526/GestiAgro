// src/pages/admin/Ajustes_adm.jsx
import React, { useState, useRef, useEffect } from "react";
import {
  IconHome,
  IconUsers,
  IconCloudUpload,
  IconTool,
  IconSettings,
  IconLogout,
  IconLock,
  IconEye,
  IconEyeOff,
  IconX,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import faviconBlanco from "../../assets/favicon-blanco.png";
// 👇 mismo cliente y endpoints usados en las otras pantallas
import api, { accountsApi, ENDPOINTS } from "../../services/apiClient";

const Ajustes_adm = () => {
  const navigate = useNavigate();

  const [notificaciones, setNotificaciones] = useState(true);
  const [modoOscuro, setModoOscuro] = useState(false);

  // Perfil (mock)
  const nombreUsuario = "Juan Pérez";
  const correoUsuario = "juan.perez@ejemplo.com";
  const rolUsuario = "Administrador";
  const letraInicial = (nombreUsuario?.trim()?.[0] || "U").toUpperCase();

  // Tarjeta perfil (sidebar)
  const [mostrarTarjeta, setMostrarTarjeta] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const tarjetaRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (tarjetaRef.current && !tarjetaRef.current.contains(e.target)) {
        setMostrarTarjeta(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // ====== LOGOUT real (backend + limpieza + redirect) ======
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
        console.warn("Fallo en logout del backend, se cierra sesión localmente igual:", e);
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
      window.location.replace("/"); // o "/login" si prefieres
    }
  };

  // Modal Cambiar contraseña
  const [openPwd, setOpenPwd] = useState(false);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [pwdActual, setPwdActual] = useState("");
  const [pwdNueva, setPwdNueva] = useState("");
  const [pwdConfirm, setPwdConfirm] = useState("");
  const [msg, setMsg] = useState("");

  const resetPwdForm = () => {
    setPwdActual("");
    setPwdNueva("");
    setPwdConfirm("");
    setMsg("");
    setShow1(false);
    setShow2(false);
    setShow3(false);
  };

  const handleCambiarPwd = () => {
    // Validaciones sencillas en frontend
    if (!pwdActual || !pwdNueva || !pwdConfirm) {
      setMsg("Completa todos los campos.");
      return;
    }
    if (pwdNueva.length < 8) {
      setMsg("La nueva contraseña debe tener al menos 8 caracteres.");
      return;
    }
    if (pwdNueva !== pwdConfirm) {
      setMsg("La confirmación no coincide con la nueva contraseña.");
      return;
    }
    // Simulación de éxito
    setMsg("¡Contraseña cambiada correctamente! (simulado)");
    setTimeout(() => {
      setOpenPwd(false);
      resetPwdForm();
    }, 1200);
  };

  return (
    <div className="min-h-[100dvh] bg-gray-50">
      {/* Sidebar fijo: ocupa todo el alto */}
      <aside className="fixed left-0 top-0 w-28 h-[100dvh] bg-green-600 flex flex-col items-center py-6 justify-between">
        <div className="flex flex-col items-center space-y-8">
          <img src={faviconBlanco} alt="Logo" className="w-11 h-11" />
          <button
            onClick={() => navigate("/homeadm")}
            className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
          >
            <IconHome className="text-white w-11 h-11" />
          </button>
          <button
            onClick={() => navigate("/admuser")}
            className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
          >
            <IconUsers className="text-white w-11 h-11" />
          </button>
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

        {/* Botón perfil — EXACTO al de las otras pantallas */}
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
                onClick={() => {
                  setMostrarTarjeta(false);
                  // ya estás en ajustes; si quieres evitar reload, solo cerramos tarjeta
                  // navigate("/ajustesadm");
                }}
                className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              >
                <IconSettings className="w-5 h-5 mr-2 text-green-600" />
                Ajustes
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

      {/* Contenido principal */}
      <main className="ml-28 min-h-[100dvh] p-8">
        <h1 className="text-3xl font-bold text-green-600 mb-6">
          Perfil de la cuenta
        </h1>

        <div className="bg-white border border-gray-300 rounded-xl p-6 shadow-md w-full max-w-xl space-y-6">
          {/* Datos de perfil */}
          <div className="flex items-center space-x-4">
            <div className="bg-green-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold">
              {letraInicial}
            </div>
            <div>
              <h2 className="text-xl font-semibold">{nombreUsuario}</h2>
              <p className="text-gray-500">{rolUsuario}</p>
              <p className="text-gray-500 text-sm">{correoUsuario}</p>
            </div>
          </div>

          {/* Botón para abrir modal de contraseña */}
          <div className="pt-2">
            <button
              onClick={() => setOpenPwd(true)}
              className="inline-flex items-center gap-2 bg-green-600 text-white px-5 py-3 rounded-xl font-semibold hover:opacity-90"
            >
              <IconLock className="w-5 h-5" />
              Cambiar contraseña
            </button>
          </div>

          {/* Notificaciones */}
          <div className="flex items-center justify-between">
            <label className="text-gray-700">Notificaciones</label>
            <input
              type="checkbox"
              checked={notificaciones}
              onChange={() => setNotificaciones(!notificaciones)}
              className="h-5 w-5 text-green-600"
            />
          </div>

          {/* Tema oscuro */}
          <div className="flex items-center justify-between">
            <label className="text-gray-700">Tema oscuro</label>
            <input
              type="checkbox"
              checked={modoOscuro}
              onChange={() => setModoOscuro(!modoOscuro)}
              className="h-5 w-5 text-green-600"
            />
          </div>
        </div>
      </main>

      {/* Modal / Tarjeta Cambiar Contraseña */}
      {openPwd && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 px-4"
          aria-modal="true"
          role="dialog"
        >
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl text-green-600 font-bold">Cambia tu contraseña</h2>
              <button
                onClick={() => {
                  setOpenPwd(false);
                  resetPwdForm();
                }}
                className="p-2 rounded-lg hover:bg-gray-100"
                aria-label="Cerrar"
              >
                <IconX className="w-5 h-5" />
              </button>
            </div>

            {/* Campo: Contraseña actual */}
            <label className="block text-gray-600 mb-1">Contraseña actual</label>
            <div className="relative mb-4">
              <input
                type={show1 ? "text" : "password"}
                value={pwdActual}
                onChange={(e) => setPwdActual(e.target.value)}
                className="w-full border-b border-gray-300 focus:border-gray-600 outline-none py-2 pr-10"
                placeholder="Contraseña actual"
              />
              <button
                type="button"
                onClick={() => setShow1(!show1)}
                className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-gray-700"
                aria-label="Mostrar u ocultar contraseña actual"
              >
                {show1 ? <IconEyeOff className="w-5 h-5" /> : <IconEye className="w-5 h-5" />}
              </button>
            </div>

            {/* Campo: Nueva contraseña */}
            <label className="block text-gray-600 mb-1">Nueva contraseña</label>
            <div className="relative mb-4">
              <input
                type={show2 ? "text" : "password"}
                value={pwdNueva}
                onChange={(e) => setPwdNueva(e.target.value)}
                className="w-full border-b border-gray-300 focus:border-gray-600 outline-none py-2 pr-10"
                placeholder="Nueva contraseña"
              />
              <button
                type="button"
                onClick={() => setShow2(!show2)}
                className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-gray-700"
                aria-label="Mostrar u ocultar nueva contraseña"
              >
                {show2 ? <IconEyeOff className="w-5 h-5" /> : <IconEye className="w-5 h-5" />}
              </button>
            </div>

            {/* Campo: Confirmar nueva contraseña */}
            <label className="block text-gray-600 mb-1">Confirmar nueva contraseña</label>
            <div className="relative mb-6">
              <input
                type={show3 ? "text" : "password"}
                value={pwdConfirm}
                onChange={(e) => setPwdConfirm(e.target.value)}
                className="w-full border-b border-gray-300 focus:border-gray-600 outline-none py-2 pr-10"
                placeholder="Confirmar nueva contraseña"
              />
              <button
                type="button"
                onClick={() => setShow3(!show3)}
                className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-gray-700"
                aria-label="Mostrar u ocultar confirmación"
              >
                {show3 ? <IconEyeOff className="w-5 h-5" /> : <IconEye className="w-5 h-5" />}
              </button>
            </div>

            {/* Mensaje / Errores */}
            {msg && <div className="mb-4 text-sm text-gray-700">{msg}</div>}

            <button
              onClick={handleCambiarPwd}
              className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:opacity-90"
            >
              Cambiar contraseña
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Ajustes_adm;
