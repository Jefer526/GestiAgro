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
        alt="Logo de GestiAgro"
        className="absolute top-4 left-4 w-10 h-10 object-contain"
      />
     {/* Título */}
      <div className="text-center">
        <h1 className="text-white text-3xl md:text-5xl">
          Te enviamos un código
        </h1>
      </div><br></br>

      {/* Mensaje explicativo */}
       <p className="text-white mt-8 mb-9 text-center text-xl max-w-md">
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
      /><br></br>
  
     {/* Botones centrados con diseño tipo "Siguiente" */}
      <div className="flex justify-center space-x-4">
        <button
          onClick={handleConfirm}
          className="bg-white text-black px-8 py-2 rounded-full font-semibold shadow hover:bg-gray-100"
        >
          Confirmar
        </button>

        <button
          onClick={() => navigate("/recuperar-cuenta")}
          className="bg-white text-black px-8 py-2 rounded-full font-semibold shadow hover:bg-gray-100"
        >
          Volver
        </button>
      </div>

    </div>
  );
};

export default C_codigo;
