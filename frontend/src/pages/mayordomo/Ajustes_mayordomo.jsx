// src/pages/mayordomo/Ajustes_mayordomo.jsx
import React, { useState } from "react";
import {
  IconLock,
  IconCheck,
  IconAlertTriangle,
} from "@tabler/icons-react";
import LayoutMayordomo from "../../layouts/LayoutMayordomo";

const Ajustes_mayordomo = () => {
  // Datos usuario (luego conectar a auth real)
  const nombreUsuario = "Juan Pérez";
  const rolUsuario = "Mayordomo";
  const correoUsuario = "juan.perez@example.com";
  const letraInicial = (nombreUsuario?.trim()?.[0] || "U").toUpperCase();

  // Estados
  const [notificaciones, setNotificaciones] = useState(true);
  const [modoOscuro, setModoOscuro] = useState(false);

  // Estados para cambio de contraseña
  const [mostrarCambioPass, setMostrarCambioPass] = useState(false);
  const [actualPass, setActualPass] = useState("");
  const [nuevaPass, setNuevaPass] = useState("");
  const [confirmarPass, setConfirmarPass] = useState("");

  // Alerta flotante
  const [alerta, setAlerta] = useState({ visible: false, tipo: "", mensaje: "" });

  const mostrarAlerta = (tipo, mensaje) => {
    setAlerta({ visible: true, tipo, mensaje });
    setTimeout(() => {
      setAlerta({ visible: false, tipo: "", mensaje: "" });
    }, 2000);
  };

  const guardarCambioContrasena = () => {
    if (!actualPass.trim() || !nuevaPass.trim() || !confirmarPass.trim()) {
      mostrarAlerta("error", "Por favor, completa todos los campos.");
      return;
    }
    if (nuevaPass !== confirmarPass) {
      mostrarAlerta("error", "La nueva contraseña y la confirmación no coinciden.");
      return;
    }
    // Aquí iría la lógica para enviar al backend
    mostrarAlerta("exito", "Contraseña cambiada con éxito");
    setActualPass("");
    setNuevaPass("");
    setConfirmarPass("");
    setMostrarCambioPass(false);
  };

  return (
    <LayoutMayordomo>
      {/* Alerta flotante */}
      {alerta.visible && (
        <div
          className={`fixed top-3 left-1/2 -translate-x-1/2 z-[99999] px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 text-base font-semibold transition-all duration-300 ${
            alerta.tipo === "exito" ? "bg-green-600 text-white" : "bg-red-600 text-white"
          }`}
        >
          {alerta.tipo === "exito" ? (
            <IconCheck className="w-5 h-5" />
          ) : (
            <IconAlertTriangle className="w-5 h-5" />
          )}
          {alerta.mensaje}
        </div>
      )}

      {/* Contenido */}
      <h1 className="text-3xl font-bold text-green-600 mb-6">Perfil de la cuenta</h1>

      <div className="bg-white border border-gray-300 rounded-xl p-6 shadow-md w-full max-w-xl space-y-6">
        {/* Datos perfil */}
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

        {/* Botón para abrir modal de cambio de contraseña */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
          <button
            onClick={() => setMostrarCambioPass(true)}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center"
          >
            <IconLock className="w-5 h-5 mr-1" /> Cambiar contraseña
          </button>
        </div>

        {/* Notificaciones */}
        <div className="flex items-center justify-between">
          <label className="text-gray-700">Notificaciones</label>
          <input
            type="checkbox"
            checked={notificaciones}
            onChange={() => setNotificaciones((v) => !v)}
            className="h-5 w-5 text-green-600"
          />
        </div>

        {/* Tema oscuro */}
        <div className="flex items-center justify-between">
          <label className="text-gray-700">Tema oscuro</label>
          <input
            type="checkbox"
            checked={modoOscuro}
            onChange={() => setModoOscuro((v) => !v)}
            className="h-5 w-5 text-green-600"
          />
        </div>
      </div>

      {/* Modal cambio de contraseña */}
      {mostrarCambioPass && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[20000]">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-lg">
            <h2 className="text-xl font-semibold text-green-600 mb-4">Cambiar contraseña</h2>
            <input
              type="password"
              placeholder="Contraseña actual"
              value={actualPass}
              onChange={(e) => setActualPass(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-2 mb-3"
            />
            <input
              type="password"
              placeholder="Nueva contraseña"
              value={nuevaPass}
              onChange={(e) => setNuevaPass(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-2 mb-3"
            />
            <input
              type="password"
              placeholder="Confirmar nueva contraseña"
              value={confirmarPass}
              onChange={(e) => setConfirmarPass(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-2 mb-4"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setMostrarCambioPass(false)}
                className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
              >
                Cancelar
              </button>
              <button
                onClick={guardarCambioContrasena}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </LayoutMayordomo>
  );
};

export default Ajustes_mayordomo;

