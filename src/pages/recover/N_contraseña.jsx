import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const N_contraseña = () => {
  const [password, setPassword] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const navigate = useNavigate();

  const handleConfirm = () => {
    if (password === confirmar && password.trim() !== "") {
      // Aquí iría la lógica para guardar la nueva contraseña
      console.log("Contraseña actualizada:", password);
      navigate("/"); // Vuelve al login
    } else {
      alert("Las contraseñas no coinciden o están vacías.");
    }
  };

  return (
    <div className="min-h-screen bg-green-600 flex flex-col items-center justify-center p-4 relative">
      {/* Botón cerrar */}
      <button
        className="absolute top-4 right-4 text-white text-5xl font-bold"
        onClick={() => navigate("/")}
      >
        ×
      </button>

      {/* Logo */}
      <img
        src="./favicon-blanco.png"
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
          className="w-full px-4 py-2 border rounded-md mb-4"
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
          className="bg-white text-black px-8 py-2 rounded-full w-full font-semibold hover:bg-gray-100"
        >
          Confirmar
        </button>
      </div>
    </div>
  );
};

export default N_contraseña;
