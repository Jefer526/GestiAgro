import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import faviconBlanco from "../../../assets/favicon-blanco.png";

const C_codigo = () => {
  const [codigo, setCodigo] = useState("");
  const navigate = useNavigate();

  const handleConfirm = () => {
    console.log("Código confirmado:", codigo);
    navigate("/nueva-contraseña");
  };

  return (
    <div className="min-h-screen bg-green-600 flex flex-col justify-center items-center p-6 relative">
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
      <h1 className="text-white text-3xl md:text-5xl font-bold text-center mb-8">
        Te enviamos un código
      </h1>

      {/* Mensaje explicativo */}
      <p className="text-white text-center max-w-xl mb-8 text-xl">
        Revisa tu email para obtener tu código de confirmación. Si necesitas solicitar un nuevo código, vuelve y selecciona un método de confirmación de nuevo.
      </p>

      {/* Etiqueta e input */}
      <label className="text-white mb-2 text-lg font-medium text-left w-full max-w-xs">
        Ingresa tu código
      </label>
      <input
        type="text"
        className="w-full max-w-xs px-4 py-2 text-lg border rounded-md mb-4"
        placeholder="Código"
        value={codigo}
        onChange={(e) => setCodigo(e.target.value)}
      />

      {/* Botones */}
      <div className="flex flex-col space-y-4 w-full max-w-xs">
        <button
          onClick={handleConfirm}
          className="bg-white text-black font-semibold py-2 rounded-full hover:bg-gray-100"
        >
          Confirmar
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
