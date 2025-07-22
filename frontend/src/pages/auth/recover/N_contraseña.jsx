import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import faviconBlanco from "../../../assets/favicon-blanco.png";

const N_contraseña = () => {
  const [password, setPassword] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  const navigate = useNavigate();

  const handleConfirm = () => {
    if (password === confirmar && password.trim() !== "") {
      console.log("Contraseña actualizada:", password);
      navigate("/"); // Redirige al login
    } else {
      setMostrarAlerta(true);
      setTimeout(() => setMostrarAlerta(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-green-600 flex flex-col items-center justify-center p-4 relative">
      {/* Alerta de error */}
      {mostrarAlerta && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-white text-red-700 border border-red-400 px-6 py-4 rounded shadow font-medium">
            ⚠️ Las contraseñas no coinciden o están vacías.
          </div>
        </div>
      )}

      {/* Botón cerrar */}
      <button
        className="absolute top-4 right-4 text-white text-5xl font-bold"
        onClick={() => navigate("/")}
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
      <h1 className="text-white text-lg md:text-5xl mb-8 text-center">
        Ingresa tu nueva contraseña
      </h1>

      {/* Formulario */}
      <div className="w-full max-w-md">
        <label className="text-white text-lg block mb-1">Ingresa tu contraseña</label>
        <input
          type="password"
          className="w-full px-4 py-2 text-lg border rounded-md mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label className="text-white text-lg block mb-1">Confirma contraseña</label>
        <input
          type="password"
          className="w-full text-lg px-4 py-2 border rounded-md mb-6"
          value={confirmar}
          onChange={(e) => setConfirmar(e.target.value)}
        />

        <button
          onClick={handleConfirm}
          className="bg-white text-black px-8 py-2 rounded-full w-full font-semibold hover:bg-gray-100 transition"
        >
          Confirmar
        </button>
      </div>
    </div>
  );
};

export default N_contraseña;
