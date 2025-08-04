import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import faviconBlanco from '../../assets/favicon-blanco.png';

const Register = () => {
  const navigate = useNavigate();
  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    const datos = {
      nombre_completo: nombre,
      telefono: telefono,
      email: email,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/api/registro/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datos),
      });

      if (response.ok) {
        setMostrarAlerta(true);
        setTimeout(() => {
          setMostrarAlerta(false);
          navigate("/");
        }, 2000);
      } else {
        const error = await response.json();
        alert("Error al registrar: " + (error.detail || "verifica los datos"));
      }
    } catch (error) {
      console.error("Error de red:", error);
      alert("Error de red al registrar");
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-green-600">
      {/* Alerta flotante */}
      {mostrarAlerta && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-white text-green-700 border border-green-400 px-6 py-4 rounded shadow-md font-medium">
            ✅ Registro exitoso
          </div>
        </div>
      )}

      {/* Fondo dividido */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-green-600 z-0" />
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-white z-0" />

      <img
        src={faviconBlanco}
        alt="Logo de GestiAgro"
        className="absolute top-4 left-4 w-10 h-10 object-contain"
      />

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-xl px-12 py-16 z-10 relative">
        <div className="flex justify-between items-start mb-10">
          <div>
            <h2 className="text-lg font-medium">
              Bienvenido a <span className="text-green-500 font-semibold">GESTIAGRO</span>
            </h2>
            <h1 className="text-3xl font-bold mt-1">Prueba nuestra DEMO</h1>
          </div>
          <div className="text-right text-sm text-gray-500">
            <p className="mb-1">¿Ya tienes cuenta?</p>
            <Link to="/" className="text-green-600 hover:underline font-medium">
              Inicia sesión
            </Link>
          </div>
        </div>

        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <label className="block mb-2 font-medium text-gray-800 text-base">Nombre</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Ingrese su nombre"
              className="w-full border text-lg border-gray-300 rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-green-400 transition-all"
              required
            />
          </div>
          <div>
            <label className="block mb-2 font-medium text-gray-800 text-base">Teléfono</label>
            <input
              type="tel"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              placeholder="Ingrese su número de teléfono"
              className="w-full border text-lg border-gray-300 rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-green-400 transition-all"
              required
            />
          </div>
          <div>
            <label className="block mb-2 font-medium text-gray-800 text-base">Correo electrónico</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ingrese su correo electrónico"
              className="w-full border text-lg border-gray-300 rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-green-400 transition-all"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-green-700 shadow-md transition-all"
          >
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
