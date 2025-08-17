// src/pages/agronomo/Ajustes_agro.jsx
import React, { useState } from "react";
import {
  IconLock,
  IconEye,
  IconEyeOff,
  IconX,
} from "@tabler/icons-react";
import LayoutAgronomo from "../../layouts/LayoutAgronomo";

const Ajustes_agro = () => {
  /* ----------------------------------
     📌 DATOS USUARIO (mock)
  ---------------------------------- */
  const [nombreUsuario] = useState("Juan Pérez");
  const [rolUsuario] = useState("Ing. Agrónomo");
  const [correoUsuario] = useState("juan.perez@gestiagro.com");
  const letraInicial = (nombreUsuario?.trim()?.[0] || "U").toUpperCase();

  /* ----------------------------------
     📌 PREFERENCIAS
  ---------------------------------- */
  const [notificaciones, setNotificaciones] = useState(true);
  const [modoOscuro, setModoOscuro] = useState(false);

  /* ----------------------------------
     📌 MODAL CAMBIAR CONTRASEÑA
  ---------------------------------- */
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
    setMsg("¡Contraseña cambiada correctamente! (simulado)");
    setTimeout(() => {
      setOpenPwd(false);
      resetPwdForm();
    }, 1200);
  };

  /* ----------------------------------
     📌 RENDER
  ---------------------------------- */
  return (
    <LayoutAgronomo>
      <h1 className="text-3xl font-bold text-green-600 mb-6">Perfil de la cuenta</h1>

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

        {/* Botón abrir modal */}
        <div className="pt-2">
          <button
            onClick={() => setOpenPwd(true)}
            className="inline-flex items-center gap-2 bg-green-600 text-white px-5 py-3 rounded-xl font-semibold hover:opacity-90"
          >
            <IconLock className="w-5 h-5" /> Cambiar contraseña
          </button>
        </div>

        {/* Preferencias */}
        <div className="flex items-center justify-between">
          <label className="text-gray-700">Notificaciones</label>
          <input
            type="checkbox"
            checked={notificaciones}
            onChange={() => setNotificaciones(!notificaciones)}
            className="h-5 w-5 accent-green-600"
          />
        </div>

        <div className="flex items-center justify-between">
          <label className="text-gray-700">Tema oscuro</label>
          <input
            type="checkbox"
            checked={modoOscuro}
            onChange={() => setModoOscuro(!modoOscuro)}
            className="h-5 w-5 accent-green-600"
          />
        </div>
      </div>

      {/* ---------------------- MODAL CAMBIAR CONTRASEÑA ---------------------- */}
      {openPwd && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl text-green-600 font-bold">Cambia tu contraseña</h2>
              <button
                onClick={() => {
                  setOpenPwd(false);
                  resetPwdForm();
                }}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                <IconX className="w-5 h-5" />
              </button>
            </div>

            {/* Inputs */}
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
              >
                {show1 ? <IconEyeOff className="w-5 h-5" /> : <IconEye className="w-5 h-5" />}
              </button>
            </div>

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
              >
                {show2 ? <IconEyeOff className="w-5 h-5" /> : <IconEye className="w-5 h-5" />}
              </button>
            </div>

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
              >
                {show3 ? <IconEyeOff className="w-5 h-5" /> : <IconEye className="w-5 h-5" />}
              </button>
            </div>

            {/* Mensaje */}
            {msg && <div className="mb-4 text-sm text-gray-700">{msg}</div>}

            {/* Botón */}
            <button
              onClick={handleCambiarPwd}
              className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:opacity-90"
            >
              Cambiar contraseña
            </button>
          </div>
        </div>
      )}
    </LayoutAgronomo>
  );
};

export default Ajustes_agro;
