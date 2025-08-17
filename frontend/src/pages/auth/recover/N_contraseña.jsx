// src/pages/auth/recovery/N_contraseña.jsx
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import faviconBlanco from "../../../assets/favicon-blanco.png";
import { resetPassword } from "../../../services/apiClient";
import { IconEye, IconEyeOff } from "@tabler/icons-react"; // 👁️ íconos

const N_contraseña = () => {
  const [password, setPassword] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [mostrarConfirmar, setMostrarConfirmar] = useState(false);

  const [error, setError] = useState("");
  const [exito, setExito] = useState("");
  const [cargando, setCargando] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

  const handleConfirm = async () => {
    if (password !== confirmar || password.trim() === "") {
      setError("⚠️ Las contraseñas no coinciden o están vacías.");
      setTimeout(() => setError(""), 2500);
      return;
    }

    setError("");
    setExito("");
    setCargando(true);

    try {
      await resetPassword(email, password);

      // ✅ Mostrar mensaje de éxito
      setExito("✅ Contraseña cambiada con éxito.");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      console.error("Error al restablecer contraseña:", err);
      setError("No se pudo restablecer la contraseña. Inténtalo más tarde.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="min-h-screen bg-green-600 flex flex-col items-center justify-center p-4 relative">
      {/* Alerta de error */}
      {error && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-white text-red-700 border border-red-400 px-6 py-4 rounded shadow font-medium">
            {error}
          </div>
        </div>
      )}

      {/* Alerta de éxito */}
      {exito && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-white text-green-700 border border-green-400 px-6 py-4 rounded shadow font-medium">
            {exito}
          </div>
        </div>
      )}

      {/* Botón cerrar */}
      <button
        className="absolute top-4 right-4 text-white text-5xl font-bold"
        onClick={() => navigate("/login")}
      >
        ×
      </button>

      {/* Logo */}
      <img
        src={faviconBlanco}
        alt="Logo"
        className="absolute top-4 left-4 w-10 h-10 object-contain"
      />

      {/* Título */}
      <h1 className="text-white text-2xl md:text-5xl mb-8 text-center font-bold">
        Ingresa tu nueva contraseña
      </h1>

      {/* Formulario */}
      <div className="w-full max-w-md">
        {/* Campo contraseña */}
        <label className="text-white text-lg block mb-1">
          Ingresa tu contraseña
        </label>
        <div className="relative mb-4">
          <input
            type={mostrarPassword ? "text" : "password"}
            className="w-full px-4 py-2 text-lg border rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
            onClick={() => setMostrarPassword(!mostrarPassword)}
          >
            {mostrarPassword ? <IconEyeOff size={20} /> : <IconEye size={20} />}
          </button>
        </div>

        {/* Campo confirmar */}
        <label className="text-white text-lg block mb-1">
          Confirma contraseña
        </label>
        <div className="relative mb-6">
          <input
            type={mostrarConfirmar ? "text" : "password"}
            className="w-full px-4 py-2 text-lg border rounded-md"
            value={confirmar}
            onChange={(e) => setConfirmar(e.target.value)}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
            onClick={() => setMostrarConfirmar(!mostrarConfirmar)}
          >
            {mostrarConfirmar ? <IconEyeOff size={20} /> : <IconEye size={20} />}
          </button>
        </div>

        {/* Botón confirmar */}
        <button
          onClick={handleConfirm}
          disabled={cargando}
          className="bg-white text-black px-8 py-2 rounded-full w-full font-semibold hover:bg-gray-100 transition disabled:opacity-50"
        >
          {cargando ? "Guardando..." : "Confirmar"}
        </button>
      </div>
    </div>
  );
};

export default N_contraseña;
