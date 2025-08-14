// src/pages/Login.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import faviconBlanco from "../../assets/favicon-blanco.png";
import { login } from "../../services/apiClient";

const API = import.meta.env.VITE_API_URL || "";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberEmail, setRememberEmail] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [capsOn, setCapsOn] = useState(false);

  // Cargar correo guardado si existe
  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberEmail(true);
    }

    if (localStorage.getItem("access")) {
      navigate("/seleccion-rol", { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setErrorMsg("");

    const emailTrim = email.trim();
    if (!emailTrim || !password.trim()) {
      setErrorMsg("Ingresa tu correo y contraseña.");
      return;
    }
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTrim);
    if (!emailOk) {
      setErrorMsg("Formato de correo no válido.");
      return;
    }

    setLoading(true);
    try {
      await login(emailTrim, password);

      // Guardar o eliminar correo según checkbox
      if (rememberEmail) {
        localStorage.setItem("rememberedEmail", emailTrim);
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      navigate("/seleccion-rol", { replace: true });
    } catch (err) {
      setErrorMsg(err.message || "Error al iniciar sesión.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-green-600">
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

        <form className="space-y-6" onSubmit={handleSubmit} noValidate>
          <div>
            <label className="block mb-2 font-medium text-gray-800 text-base">
              Correo electrónico
            </label>
            <input
              type="email"
              placeholder="tucorreo@dominio.com"
              className="w-full border text-lg border-gray-300 rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-green-400 transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-800 text-base">
              Contraseña
            </label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                placeholder="Contraseña"
                className="w-full border text-lg border-gray-300 rounded-md px-4 py-3 pr-12 outline-none focus:ring-2 focus:ring-green-400 transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyUp={(e) =>
                  setCapsOn(e.getModifierState && e.getModifierState("CapsLock"))
                }
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-green-700 hover:underline"
                onClick={() => setShowPass((s) => !s)}
              >
                {showPass ? "Ocultar" : "Mostrar"}
              </button>
            </div>
            {capsOn && (
              <p className="mt-1 text-xs text-amber-600">
                Bloq Mayús activado.
              </p>
            )}
          </div>

          {/* Recordar correo + Olvidé mi contraseña */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="rememberEmail"
                className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                checked={rememberEmail}
                onChange={(e) => setRememberEmail(e.target.checked)}
              />
              <label
                htmlFor="rememberEmail"
                className="ml-2 text-sm text-gray-700 select-none"
              >
                Recordar correo
              </label>
            </div>

            <Link
              to="/recuperar-cuenta"
              className="text-green-600 hover:underline text-sm"
            >
              Olvidé mi contraseña
            </Link>
          </div>

          {errorMsg && (
            <div className="rounded-md bg-red-50 border border-red-200 px-4 py-3 text-red-700 text-sm">
              {errorMsg}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-green-600 text-white py-3 rounded-lg text-lg font-semibold shadow-md transition-all mt-4 ${
              loading ? "opacity-80 cursor-not-allowed" : "hover:bg-green-700"
            }`}
          >
            {loading ? "Ingresando..." : "Iniciar sesión"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
