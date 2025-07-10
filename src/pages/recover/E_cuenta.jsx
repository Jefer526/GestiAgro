import React from "react";
import { useNavigate } from "react-router-dom";

const E_cuenta = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/confirmar-correo"); // 👈 ruta nueva
  };

  return (
    <div className="min-h-screen bg-green-600 flex flex-col items-center justify-center p-4 relative">
      {/* Botón cerrar */}
      <button
        className="absolute top-4 left-4 text-white text-3xl font-bold"
        onClick={() => navigate("/")}
      >
        ×
      </button>

      {/* Logo */}
      <div className="absolute top-4 right-4 text-white font-semibold text-sm">
        Your Logo
      </div>

      {/* Título */}
      <div className="text-center">
        <h1 className="text-white text-3xl md:text-4xl font-bold">
          Encuentra tu cuenta de
        </h1>
        <h2 className="text-white text-3xl md:text-4xl font-bold mt-2">
          (proyecto name)
        </h2>
      </div>

      {/* Instrucción */}
      <p className="text-white mt-8 mb-4 text-center max-w-md">
        Ingresa tu email asociado con tu cuenta para cambiar tu contraseña.
      </p>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col items-center">
        <label
          htmlFor="email"
          className="text-white text-left w-full mb-2 font-medium"
        >
          Correo electrónico
        </label>
        <input
          type="email"
          id="email"
          placeholder="Correo@gmail.com"
          className="w-full p-3 rounded-md placeholder-gray-400 focus:outline-none"
          required
        />

        <button
          type="submit"
          className="bg-white text-black font-medium px-10 py-3 mt-10 rounded-full hover:bg-gray-100 transition"
        >
          Siguiente
        </button>
      </form>
    </div>
  );
};

export default E_cuenta;
