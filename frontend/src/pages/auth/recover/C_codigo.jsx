// src/pages/auth/recovery/C_codigo.jsx
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import faviconBlanco from "../../../assets/favicon-blanco.png";
import { verifyCode } from "../../../services/apiClient"; // 👈 función API

const C_codigo = () => {
  const [codigo, setCodigo] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || ""; // 👈 email viene desde C_correo

  const handleConfirm = async () => {
    if (!codigo) {
      setError("Debes ingresar el código.");
      return;
    }

    setError("");
    setCargando(true);

    try {
      const res = await verifyCode(email, codigo);
      if (res.status === 200) {
        // ✅ Código válido → avanza a nueva contraseña
        navigate("/nueva-contraseña", { state: { email } });
      }
    } catch (err) {
      console.error("Error verificando código:", err);
      setError("Código inválido o expirado.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="min-h-screen bg-green-600 flex flex-col justify-center items-center p-6 relative">
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
      <h1 className="text-white text-3xl md:text-5xl font-bold text-center mb-8">
        Te enviamos un código
      </h1>

      {/* Mensaje explicativo */}
      <p className="text-white text-center max-w-xl mb-8 text-xl">
        Revisa tu email ({email}) para obtener tu código de confirmación.
      </p>

      {/* Campo de código */}
      <label className="text-white mb-2 text-lg font-medium text-left w-full max-w-xs">
        Ingresa tu código
      </label>
      <input
        type="text"
        className="w-full max-w-xs px-4 py-2 text-lg border rounded-md mb-6"
        placeholder="Código"
        value={codigo}
        onChange={(e) => setCodigo(e.target.value)}
      />

      {error && <p className="text-red-200 text-sm mb-6">{error}</p>}

      {/* Botones */}
      <div className="flex flex-col space-y-4 w-full max-w-xs">
        <button
          onClick={handleConfirm}
          disabled={cargando}
          className="bg-white text-black font-semibold py-2 rounded-full hover:bg-gray-100 disabled:opacity-50"
        >
          {cargando ? "Verificando..." : "Confirmar"}
        </button>
        <button
          onClick={() => navigate("/recuperar-cuenta")}
          className="bg-white text-black font-semibold py-2 rounded-full hover:bg-gray-100"
        >
          Volver
        </button>
      </div>
    </div>
  );
};

export default C_codigo;
