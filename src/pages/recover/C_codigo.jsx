import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const C_codigo = () => {
  const [codigo, setCodigo] = useState(""); // Estado para almacenar el código ingresado
  const navigate = useNavigate();

  const handleConfirm = () => {
    // Aquí puedes agregar la lógica para verificar el código
    console.log("Código confirmado: ", codigo);
    // Si el código es correcto, puedes redirigir a otra página
    // navigate("/pagina-exito"); 
  };

  return (
    <div className="min-h-screen bg-green-600 flex flex-col justify-center items-center p-6 relative">
      {/* Botón de cierre */}
      <button
        onClick={() => navigate("/")} // Redirige a la página principal
        className="absolute top-4 left-4 text-white text-3xl font-bold"
      >
        ×
      </button>

      {/* Logo */}
      <div className="absolute top-4 right-4 font-semibold text-sm text-white">
        Your Logo
      </div>

      {/* Título */}
      <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">
        Te enviamos un código
      </h1>

      {/* Mensaje explicativo */}
      <p className="text-lg text-center max-w-xl text-white mb-4">
        Revisa tu email para obtener tu código de confirmación. Si necesitas solicitar un nuevo código, vuelve y selecciona un método de confirmación de nuevo.
      </p>

      <p className="text-lg font-bold text-white mb-4">Ingresa tu código</p>

      {/* Campo de ingreso del código */}
      <input
        type="text"
        className="w-full max-w-xs px-4 py-2 border border-gray-300 rounded-md mb-6 outline-none focus:ring-2 focus:ring-green-300"
        placeholder="Código"
        value={codigo}
        onChange={(e) => setCodigo(e.target.value)} // Actualiza el estado con el código ingresado
      />

      {/* Botones */}
      <div className="w-full flex justify-between">
        {/* Botón Confirmar */}
        <button
          onClick={handleConfirm}
          className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 w-1/2 mr-2"
        >
          Confirmar
        </button>

        {/* Botón Volver */}
        <button
          onClick={() => navigate("/recuperar-cuenta")} // Redirige a la página de recuperación de cuenta
          className="bg-gray-200 text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-300 w-1/2 ml-2"
        >
          Volver
        </button>
      </div>
    </div>
  );
};

export default C_codigo;
