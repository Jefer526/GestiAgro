import React from "react";
import rocketImage from "../assets/rocket.png";

const Login = () => {
  return (
    <div className="w-screen h-screen relative flex flex-col m-0 p-0">
      
      {/* Parte superior: verde oscuro */}
      <div className="h-1/2 w-full bg-green-800 flex items-center">
        <div className="flex w-full h-full px-20">
          <div className="w-1/2 flex items-center">
            <div className="max-w-xl">
              <h2 className="text-white font-bold text-2xl mb-3">Software para la gestión agricola</h2>
              <h1 className="text-white font-bold text-5xl mb-2">GESTIAGRO</h1>
              <p className="text-white text-2xl mb-5">Pruebalo gratis</p>
              <p className="text-white text-base">
                Cultiva eficiencia, cosecha datos. Gestión agrícola inteligente al alcance de tu finca.
              </p>
            </div>
            <img src={rocketImage} alt="Ilustración" className="w-52 h-52 object-contain ml-12" />
          </div>
        </div>
      </div>

      {/* Parte inferior: blanca */}
      <div className="h-1/2 w-full bg-white" />

      {/* Formulario más ancho hacia la derecha */}
      <div className="absolute top-1/2 right-[18%] transform -translate-y-1/2 w-[560px] h-[720px] bg-white p-14 rounded-3xl shadow-2xl flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-center text-base text-gray-600 mb-6">
            <span>
              Bienvenido a <span className="text-green-800 font-semibold">Gestiagro</span>
            </span>
            <a href="#" className="text-green-670 hover:underline">Prueba nuestro demo! Registrate</a>
          </div>

          <h2 className="text-5xl font-bold mb-10">Iniciar sesión</h2>

          <label className="block text-sm text-gray-700 mb-2">Introduzca su nombre de usuario o correo electrónico</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md px-5 py-4 mb-6 outline-none focus:ring-2 focus:ring-green-300"
            placeholder="Correo o usuario"
          />

          <label className="block text-sm text-gray-700 mb-2">Introduzca su contraseña</label>
          <input
            type="password"
            className="w-full border border-gray-300 rounded-md px-5 py-4 mb-4 outline-none focus:ring-2 focus:ring-green-300"
            placeholder="Contraseña"
          />

          <div className="text-right mb-6">
            <a href="#" className="text-sm text-green-800 hover:underline">Olvidé mi contraseña</a>
          </div>
        </div>

        <button className="w-full bg-green-700 text-white py-4 rounded-md text-lg font-semibold hover:bg-green-800 shadow-md transition-all">
          Iniciar sesión
        </button>
      </div>
    </div>
  );
};

export default Login;
