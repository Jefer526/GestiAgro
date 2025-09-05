import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import faviconBlanco from "../../assets/favicon-blanco.png";

// ( apiClient)
const API_BASE = "http://127.0.0.1:8000/api";

const Register = () => {
  const navigate = useNavigate();
  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [cargando, setCargando] = useState(false);

  // errores por campo y general
  const [errors, setErrors] = useState({ nombre: "", telefono: "", email: "", general: "" });

  const handleRegister = async (e) => {
    e.preventDefault();
    if (cargando) return;

    // limpiar errores
    setErrors({ nombre: "", telefono: "", email: "", general: "" });

    const datos = {
      nombre: nombre.trim(),
      telefono: telefono.trim(),
      email: email.trim().toLowerCase(),
    };

    // validación simple en cliente
    if (!datos.nombre) {
      setErrors((p) => ({ ...p, nombre: "El nombre es obligatorio." }));
      return;
    }
    if (!datos.telefono) {
      setErrors((p) => ({ ...p, telefono: "El teléfono es obligatorio." }));
      return;
    }
    if (!datos.email) {
      setErrors((p) => ({ ...p, email: "El correo es obligatorio." }));
      return;
    }

    setCargando(true);
    try {
      const url = `${API_BASE}/accounts/demo/signup/`;
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
      });

      const raw = await response.text(); // obtener texto crudo
      let data;
      try {
        data = JSON.parse(raw);
      } catch {
        data = raw;
      }

      if (response.ok) {
        // Si backend devuelve link para establecer contraseña → redirige
        if (data?.set_password_url_demo) {
  // Solo mostrar alerta y volver a inicio
          setMostrarAlerta(true);
          setTimeout(() => {
            setMostrarAlerta(false);
            navigate("/");
          }, 2000);
        return;
        }
        // Fallback: alerta y volver al inicio
        setMostrarAlerta(true);
        setTimeout(() => {
          setMostrarAlerta(false);
          navigate("/");
        }, 2000);
        return;
      }

      // Manejo de errores detallado desde DRF
      if (typeof data === "object" && data !== null) {
        const nuevo = { nombre: "", telefono: "", email: "", general: "" };
        if (data.nombre) nuevo.nombre = Array.isArray(data.nombre) ? data.nombre.join(" ") : String(data.nombre);
        if (data.telefono) nuevo.telefono = Array.isArray(data.telefono) ? data.telefono.join(" ") : String(data.telefono);
        if (data.email) nuevo.email = Array.isArray(data.email) ? data.email.join(" ") : String(data.email);
        if (data.detail) nuevo.general = String(data.detail);

        // Si no hay campos específicos, muestra todo como general
        if (!nuevo.nombre && !nuevo.telefono && !nuevo.email && !nuevo.general) {
          nuevo.general = JSON.stringify(data);
        }
        setErrors(nuevo);
      } else {
        setErrors((p) => ({ ...p, general: data || `Error HTTP ${response.status}` }));
      }
    } catch (error) {
      console.error("Error de red:", error);
      setErrors((p) => ({ ...p, general: "Error de red al registrar." }));
    } finally {
      setCargando(false);
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

      {/* Logo */}
      <Link to="/">
        <img
          src={faviconBlanco}
          alt="Logo de GestiAgro"
          className="absolute top-4 left-4 w-10 h-10 object-contain cursor-pointer"
        />
      </Link>

      {/* Formulario */}
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
            <Link to="/login"  className="text-green-600 hover:underline font-medium">
              Inicia sesión
            </Link>
          </div>
        </div>

        {/* Error general */}
        {errors.general && (
          <div className="mb-4 text-red-600 bg-red-50 border border-red-200 px-4 py-2 rounded">
            {errors.general}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <label className="block mb-2 font-medium text-gray-800 text-base">
              Nombre
            </label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Ingrese su nombre"
              className={`w-full border text-lg rounded-md px-4 py-3 outline-none transition-all ${
                errors.nombre ? "border-red-400 focus:ring-2 focus:ring-red-300"
                                : "border-gray-300 focus:ring-2 focus:ring-green-400"
              }`}
              required
            />
            {errors.nombre && <p className="mt-1 text-sm text-red-600">{errors.nombre}</p>}
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-800 text-base">
              Teléfono
            </label>
            <input
              type="tel"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              placeholder="Ingrese su número de teléfono"
              className={`w-full border text-lg rounded-md px-4 py-3 outline-none transition-all ${
                errors.telefono ? "border-red-400 focus:ring-2 focus:ring-red-300"
                                : "border-gray-300 focus:ring-2 focus:ring-green-400"
              }`}
              required
            />
            {errors.telefono && <p className="mt-1 text-sm text-red-600">{errors.telefono}</p>}
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-800 text-base">
              Correo electrónico
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ingrese su correo electrónico"
              className={`w-full border text-lg rounded-md px-4 py-3 outline-none transition-all ${
                errors.email ? "border-red-400 focus:ring-2 focus:ring-red-300"
                              : "border-gray-300 focus:ring-2 focus:ring-green-400"
              }`}
              required
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
          </div>

          <button
            type="submit"
            disabled={cargando}
            className={`w-full text-white py-3 rounded-lg text-lg font-semibold shadow-md transition-all ${
              cargando ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {cargando ? "Registrando..." : "Registrarse"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
