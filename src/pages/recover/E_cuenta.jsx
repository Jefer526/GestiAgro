import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const E_cuenta = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1 = correo, 2 = nueva contraseña

  // Puedes agregar validaciones si lo deseas
  const handleEmailSubmit = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };

  return (
    <div className="min-h-screen bg-green-600 flex flex-col items-center justify-center p-4 relative">
      {/* Botón de cerrar */}
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
          Recuperación de cuenta
        </h1>
        <h2 className="text-white text-2xl md:text-3xl font-semibold mt-2">
          (proyecto name)
        </h2>
      </div>

      {step === 1 && (
        <>
          <p className="text-white mt-8 mb-4 text-center max-w-md">
            Ingresa tu email asociado con tu cuenta para cambiar tu contraseña.
          </p>

          <form
            className="w-full max-w-md flex flex-col items-center"
            onSubmit={handleEmailSubmit}
          >
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
        </>
      )}

      {step === 2 && (
        <>
          <p className="text-white mt-8 mb-4 text-center max-w-md">
            Ingresa tu nueva contraseña para completar el proceso.
          </p>

          <form className="w-full max-w-md flex flex-col items-center">
            <label
              htmlFor="newPassword"
              className="text-white text-left w-full mb-2 font-medium"
            >
              Nueva contraseña
            </label>
            <input
              type="password"
              id="newPassword"
              placeholder="********"
              className="w-full p-3 rounded-md placeholder-gray-400 focus:outline-none"
              required
            />

            <button
              type="submit"
              className="bg-white text-black font-medium px-10 py-3 mt-10 rounded-full hover:bg-gray-100 transition"
            >
              Cambiar contraseña
            </button>

            <button
              type="button"
              onClick={handleBack}
              className="text-white underline mt-4 text-sm"
            >
              Volver
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default E_cuenta;
