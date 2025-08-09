// src/pages/Login.jsx
import React from "react";
import { Link } from "react-router-dom";
import faviconBlanco from "../../assets/favicon-blanco.png";

const Login = () => {
  return (
    <div className="min-h-screen relative flex items-center justify-center bg-green-600">
      {/* Fondo dividido */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-green-600 z-0" />
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-white z-0" />

      {/* Logo */}
      <img
        src={faviconBlanco}
        alt="Logo de GestiAgro"
        className="absolute top-4 left-4 w-10 h-10 object-contain"
      />

      {/* Formulario */}
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-xl px-12 py-16 z-10 relative">
        <div className="flex justify-between items-start mb-10">
          <div>
            <h2 className="text-lg font-medium">
              Bienvenido a{" "}
              <span className="text-green-500 font-semibold">GESTIAGRO</span>
            </h2>
            <h1 className="text-3xl font-bold mt-1">Iniciar sesión</h1>
          </div>
          <div className="text-right text-sm text-gray-500">
            <p className="mb-1">¿Sin cuenta?</p>
            <Link
              to="/crear-cuenta"
              className="text-green-600 hover:underline font-medium"
            >
              Regístrate
            </Link>
          </div>
        </div>

        <form className="space-y-6">
          <div>
            <label className="block mb-2 font-medium text-gray-800 text-base">
              Nombre de usuario o correo electrónico
            </label>
            <input
              type="text"
              placeholder="Correo o usuario"
              className="w-full border text-lg border-gray-300 rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-green-400 transition-all"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-800 text-base">
              Contraseña
            </label>
            <input
              type="password"
              placeholder="Contraseña"
              className="w-full border text-lg border-gray-300 rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-green-400 transition-all"
              required
            />
          </div>

          <Link
            to="/recuperar-cuenta"
            className="text-green-600 hover:underline text-base block text-right"
          >
            Olvidé mi contraseña
          </Link>

          <Link to="/seleccion-rol">
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-green-700 shadow-md transition-all mt-4"
            >
              Iniciar sesión
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;


