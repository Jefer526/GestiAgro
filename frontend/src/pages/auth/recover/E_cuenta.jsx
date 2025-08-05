import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import faviconBlanco from "../../../assets/favicon-blanco.png";

const E_cuenta = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/confirmar-correo", { state: { email } }); // Envía el email por state
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
        src={faviconBlanco}
        alt="Logo de GestiAgro"
        className="absolute top-4 left-4 w-10 h-10 object-contain"
      />

      {/* Título */}
      <div className="text-center">
        <h1 className="text-white text-3xl md:text-5xl">Encuentra tu cuenta de</h1>
        <h2 className="text-white text-3xl md:text-5xl font-bold mt-2 mb-15">GestiAgro</h2>
      </div>

      {/* Instrucción */}
      <p className="text-white mt-8 mb-9 text-center text-xl max-w-md">
        Ingresa tu email asociado con tu cuenta para cambiar tu contraseña.
      </p>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col items-center">
        <label
          htmlFor="email"
          className="text-white text-left text-lg w-full mb-2 font-medium"
        >
          Correo electrónico
        </label>
        <input
          type="email"
          id="email"
          placeholder="Correo@gmail.com"
          className="w-full p-4 px-4 py-2 text-lg border rounded-md mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button
          type="submit"
          className="bg-white text-black font-medium px-10 py-3 mt-5 rounded-full hover:bg-gray-100 transition"
        >
          Siguiente
        </button>
      </form>
    </div>
  );
};

export default E_cuenta;
