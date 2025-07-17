import React from "react";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    console.log("Registro completado");
    navigate("/");
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-green-600">
      {/* Fondo dividido */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-green-600 z-0" />
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-white z-0" />

      <img
        src="./favicon-blanco.png"
        alt="Logo de GestiAgro"
        className="absolute top-4 left-4 w-10 h-10 object-contain"
      />

      {/* Contenido encima del fondo */}
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-xl p-10 z-10 relative">
        {/* Encabezado */}
        <div className="flex justify-between items-center mb-4">
          <div className="mb-5">
            <h2 className="text-lg font-medium">
              Bienvenido a <span className="text-green-500 font-semibold">GESTIAGRO</span>
            </h2>
            <h1 className="text-4xl font-bold">Registro</h1>
          </div>
          <div className="text-gray-500 text-right">
            <p>¿Ya tienes cuenta?</p>
            <Link
              to="/"
              className="text-green-600 hover:underline text-base block text-center"
            >
              Inicia Sesión
            </Link>
          </div>
        </div>

        {/* Formulario */}
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium text-gray-800">Nombre</label>
            <input
              type="text"
              placeholder="Ingrese su nombre"
              className="w-full border text-lg border-gray-300 rounded-md px-4 py-3 sm:py-3 outline-none focus:ring-2 focus:ring-green-400 transition-all"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-800">Teléfono</label>
            <input
              type="tel"
              placeholder="Ingrese su número de teléfono"
              className="w-full border text-lg border-gray-300 rounded-md px-4 py-3 sm:py-3 outline-none focus:ring-2 focus:ring-green-400 transition-all"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-800">Correo electrónico</label>
            <input
              type="email"
              placeholder="Ingrese su correo electrónico"
              className="w-full border text-lg border-gray-300 rounded-md px-4 py-3 sm:py-3 outline-none focus:ring-2 focus:ring-green-400 transition-all"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-800">Contraseña</label>
            <input
              type="password"
              placeholder="Ingrese su contraseña"
              className="w-full border text-lg border-gray-300 rounded-md px-4 py-3 sm:py-3 outline-none focus:ring-2 focus:ring-green-400 transition-all mb-4"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold hover:bg-green-700 shadow-md transition-all"
          >
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
