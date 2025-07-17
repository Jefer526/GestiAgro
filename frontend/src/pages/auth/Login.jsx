import React from "react";
import fondoImagen from "../../assets/fondo.jpg";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="w-screen min-h-screen flex flex-col lg:flex-row m-0 p-0 overflow-hidden relative font-sans">
      {/* Degradado vertical entre ambas mitades dfsd */}
      <div
        className="hidden lg:block absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, transparent, rgba(0,0,0,0.6), transparent)' }}
      ></div>

      {/* Zona izquierda: imagen con mensaje breve */}
      <div
        className="w-full lg:w-1/2 h-1/2 lg:h-auto bg-cover bg-center flex flex-col justify-center px-6 sm:px-10 md:px-16 lg:px-20 py-12 relative z-0"
        style={{ backgroundImage: `url(${fondoImagen})` }}
      >
        <div className="max-w-xl bg-black bg-opacity-50 p-6 rounded-2xl backdrop-blur-md shadow-lg">
          <h2 className="text-white font-semibold text-xl sm:text-2xl mb-2">GESTIAGRO - Gestión Agrícola</h2>
          <h1 className="text-white font-bold text-4xl sm:text-5xl md:text-6xl leading-tight mb-4">
            Inteligencia para el campo
          </h1>
          <p className="text-white text-base sm:text-xl">
            Soluciones digitales para una agricultura más eficiente.
          </p>
        </div>
      </div>

      {/* Zona derecha: formulario moderno */}
      <div className="w-full lg:w-1/2 h-1/2 lg:h-auto bg-gradient-to-b from-green-900 to-green-600 flex items-center justify-center py-10 px-4 sm:px-8">
        <div className="w-full max-w-[560px] bg-white p-8 sm:p-12 md:p-16 rounded-3xl shadow-2xl z-20 transition-all duration-300">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-base text-gray-600 mb-6 gap-2">
            <span>
              Bienvenido a <span className="text-green-600 font-semibold">GESTIAGRO</span>
            </span>
            <a href="/crear-cuenta" className="text-green-600 hover:underline text-base">¿Sin cuenta? Registrate</a>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-10">Iniciar sesión</h2>

          <div className="mb-6">
            <label className="block text-base text-gray-800 mb-2">Nombre de usuario o correo electrónico</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-5 py-3 sm:py-4 outline-none focus:ring-2 focus:ring-green-400 transition-all"
              placeholder="Correo o usuario"
            />
          </div>

          <div className="mb-4">
            <label className="block text-base text-gray-800 mb-2">Contraseña</label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded-lg px-5 py-3 sm:py-4 outline-none focus:ring-2 focus:ring-green-400 transition-all"
              placeholder="Contraseña"
            />
          </div>

          <Link
            to="/recuperar-cuenta"
            className="text-green-600 hover:underline text-base block text-right mb-[1cm]"
          >
            Olvidé mi contraseña
          </Link>


          <button className="w-full bg-green-600 text-white py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold hover:bg-green-700 shadow-md transition-all">
            Iniciar sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
