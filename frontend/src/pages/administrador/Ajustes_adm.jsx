// src/pages/admin/Ajustes_adm.jsx
import React, { useState, useRef, useEffect } from "react";
import {
  IconHome, IconUsers, IconCloudUpload, IconTool, IconSettings, IconLogout,
  IconLock, IconEye, IconEyeOff, IconX
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import faviconBlanco from "../../assets/favicon-blanco.png";
import api, { accountsApi, ENDPOINTS } from "../../services/apiClient";

const Ajustes_adm = () => {
  const navigate = useNavigate();

  const [notificaciones, setNotificaciones] = useState(true);
  const [modoOscuro, setModoOscuro] = useState(false);

  // Datos usuario real
  const [usuario, setUsuario] = useState(null);
  const letraInicial = (usuario?.nombre?.trim()?.[0] || "U").toUpperCase();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get(ENDPOINTS.me); // Ajusta si tu endpoint es diferente
        setUsuario(res.data);
      } catch (err) {
        console.error("Error al obtener usuario:", err);
      }
    };
    fetchUser();
  }, []);

  // --- Perfil flotante ---
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

  // Logout
  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    try {
      const refresh = localStorage.getItem("refresh");
      if (ENDPOINTS?.logout) {
        await api.post(ENDPOINTS.logout, { refresh });
      }
    } catch (e) {
      console.warn("Fallo logout backend:", e);
    } finally {
      localStorage.clear();
      sessionStorage.clear();
      delete api.defaults.headers.common.Authorization;
      window.location.replace("/");
    }
  };

  // Modal cambio de contraseña
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

const handleCambiarPwd = async () => {
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

  try {
    const response = await api.post(ENDPOINTS.changePassword, {
      old_password: pwdActual,
      new_password: pwdNueva
    });

    console.log("✅ Contraseña cambiada:", response.data);
    setMsg("¡Contraseña cambiada correctamente!");

    setTimeout(() => {
      setOpenPwd(false);
      resetPwdForm();
    }, 1500);

  } catch (error) {
    console.error("❌ Error al cambiar la contraseña:", error);

    if (error.response?.data?.detail) {
      setMsg(error.response.data.detail);
    } else if (error.response?.data) {
      // Si el backend retorna campos individuales con errores
      const errores = Object.values(error.response.data);
      setMsg(errores[0] || "Error desconocido al cambiar la contraseña.");
    } else {
      setMsg("Error desconocido al cambiar la contraseña.");
    }
  }
};

  return (
    <div className="min-h-[100dvh] bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 w-28 h-[100dvh] bg-green-600 flex flex-col items-center py-6 justify-between">
        {/* Botones menú */}
        <div className="flex flex-col items-center space-y-8">
          <img src={faviconBlanco} alt="Logo" className="w-11 h-11" />
          <button onClick={() => navigate("/homeadm")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconHome className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/admuser")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconUsers className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/copias")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconCloudUpload className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/soporte")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
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
            <div ref={tarjetaRef} className="absolute bottom-16 left-14 w-52 bg-white/95 border-2 border-gray-300 rounded-xl shadow-2xl py-3 z-50">
              <button
                onClick={() => setMostrarTarjeta(false)}
                className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              >
                <IconSettings className="w-5 h-5 mr-2 text-green-600" /> Ajustes
              </button>
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className={`flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${isLoggingOut ? "opacity-60 cursor-not-allowed" : "text-red-600"}`}
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
        <h1 className="text-3xl font-bold text-green-600 mb-6">Perfil de la cuenta</h1>

        <div className="bg-white border border-gray-300 rounded-xl p-6 shadow-md w-full max-w-xl space-y-6">
          {/* Datos de perfil */}
          <div className="flex items-center space-x-4">
            <div className="bg-green-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold">
              {letraInicial}
            </div>
            <div>
              <h2 className="text-xl font-semibold">{usuario?.nombre || "Cargando..."}</h2>
              <p className="text-gray-500">{usuario?.rol || ""}</p>
              <p className="text-gray-500 text-sm">{usuario?.email || ""}</p>
            </div>
          </div>

          {/* Botón cambiar contraseña */}
          <div className="pt-2">
            <button
              onClick={() => setOpenPwd(true)}
              className="inline-flex items-center gap-2 bg-green-600 text-white px-5 py-3 rounded-xl font-semibold hover:opacity-90"
            >
              <IconLock className="w-5 h-5" /> Cambiar contraseña
            </button>
          </div>

          {/* Configuración */}
          <div className="flex items-center justify-between">
            <label className="text-gray-700">Notificaciones</label>
            <input type="checkbox" checked={notificaciones} onChange={() => setNotificaciones(!notificaciones)} className="h-5 w-5 text-green-600" />
          </div>

          <div className="flex items-center justify-between">
            <label className="text-gray-700">Tema oscuro</label>
            <input type="checkbox" checked={modoOscuro} onChange={() => setModoOscuro(!modoOscuro)} className="h-5 w-5 text-green-600" />
          </div>
        </div>
      </main>

      {/* Modal cambio contraseña */}
      {openPwd && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 px-4" aria-modal="true" role="dialog">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl text-green-600 font-bold">Cambia tu contraseña</h2>
              <button onClick={() => { setOpenPwd(false); resetPwdForm(); }} className="p-2 rounded-lg hover:bg-gray-100">
                <IconX className="w-5 h-5" />
              </button>
            </div>

            {/* Campos */}
            {[
              { label: "Contraseña actual", value: pwdActual, setValue: setPwdActual, show: show1, setShow: setShow1 },
              { label: "Nueva contraseña", value: pwdNueva, setValue: setPwdNueva, show: show2, setShow: setShow2 },
              { label: "Confirmar nueva contraseña", value: pwdConfirm, setValue: setPwdConfirm, show: show3, setShow: setShow3 }
            ].map(({ label, value, setValue, show, setShow }, idx) => (
              <div key={idx} className="mb-4">
                <label className="block text-gray-600 mb-1">{label}</label>
                <div className="relative">
                  <input
                    type={show ? "text" : "password"}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="w-full border-b border-gray-300 focus:border-gray-600 outline-none py-2 pr-10"
                    placeholder={label}
                  />
                  <button type="button" onClick={() => setShow(!show)} className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-gray-700">
                    {show ? <IconEyeOff className="w-5 h-5" /> : <IconEye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            ))}

            {msg && <div className="mb-4 text-sm text-gray-700">{msg}</div>}

            <button onClick={handleCambiarPwd} className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:opacity-90">
              Cambiar contraseña
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Ajustes_adm;
