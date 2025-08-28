// src/pages/mayordomo/Ajustes_mayordomo.jsx
import React, { useState, useEffect } from "react";
import { IconLock, IconEye, IconEyeOff, IconX } from "@tabler/icons-react";
import LayoutMayordomo from "../../layouts/LayoutMayordomo";
import api, { ENDPOINTS } from "../../services/apiClient";

const Ajustes_mayordomo = () => {
  const [usuario, setUsuario] = useState(null);
  const letraInicial = (usuario?.nombre?.trim()?.[0] || "U").toUpperCase();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get(ENDPOINTS.me);
        setUsuario(res.data);
      } catch (err) {
        console.error("Error al obtener usuario:", err);
      }
    };
    fetchUser();
  }, []);

  const rolesMap = {
    admin: "Administrador",
    agronomo: "Agrónomo",
    mayordomo: "Mayordomo",
  };

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
      await api.post(ENDPOINTS.changePassword, {
        old_password: pwdActual,
        new_password: pwdNueva,
      });
      setMsg("¡Contraseña cambiada correctamente!");
      setTimeout(() => {
        setOpenPwd(false);
        resetPwdForm();
      }, 1500);
    } catch (error) {
      console.error("Error al cambiar contraseña:", error);
      if (error.response?.data?.detail) {
        setMsg(error.response.data.detail);
      } else if (error.response?.data) {
        const errores = Object.values(error.response.data);
        setMsg(errores[0] || "Error desconocido al cambiar la contraseña.");
      } else {
        setMsg("Error desconocido al cambiar la contraseña.");
      }
    }
  };

  return (
    <LayoutMayordomo active="ajustes" ocultarEncabezado>
      <main className="p-8">
        {/* Encabezado: título a la izquierda y finca a la derecha */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-green-700">
            Perfil de la cuenta
          </h1>
          {usuario?.finca_asignada && (
            <span className="text-3xl font-bold text-green-700">
              {usuario.finca_asignada.nombre}
            </span>
          )}
        </div>

        {/* Tarjeta perfil */}
        <div className="bg-white border border-gray-300 rounded-xl p-6 shadow-md w-full max-w-xl space-y-6">
          <div className="flex items-center space-x-4">
            <div className="bg-green-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold">
              {letraInicial}
            </div>
            <div>
              <h2 className="text-xl font-semibold">
                {usuario?.nombre || "Cargando..."}
              </h2>
              <p className="text-gray-500">
                {rolesMap[usuario?.rol] || usuario?.rol || ""}
              </p>
              <p className="text-gray-500 text-sm">{usuario?.email || ""}</p>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => setOpenPwd(true)}
              className="inline-flex items-center gap-2 bg-green-600 text-white px-5 py-3 rounded-xl font-semibold hover:opacity-90"
            >
              <IconLock className="w-5 h-5" /> Cambiar contraseña
            </button>
          </div>
        </div>
      </main>

      {/* Modal cambio contraseña */}
      {openPwd && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl text-green-600 font-bold">
                Cambia tu contraseña
              </h2>
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
            {/* Campos contraseña... */}
          </div>
        </div>
      )}
    </LayoutMayordomo>
  );
};

export default Ajustes_mayordomo;
