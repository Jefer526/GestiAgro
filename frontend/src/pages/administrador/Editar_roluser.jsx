// src/pages/administrador/Editar_roluser.jsx
import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  IconArrowLeft,
  IconDeviceFloppy,
  IconCheck,
  IconHome,
  IconUsers,
  IconCloudUpload,
  IconTool,
  IconSettings,
  IconWand,
  IconMail,
  IconLogout,
  IconPlus,
} from "@tabler/icons-react";
import { accountsApi } from "../../services/apiClient";
import faviconBlanco from "../../assets/favicon-blanco.png";

const Editar_roluser = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [alertaVisible, setAlertaVisible] = useState(false);
  const [cargando, setCargando] = useState(true);

  const [usuario, setUsuario] = useState({
    id: "",
    nombre: "",
    telefono: "",
    email: "",
    rol: "",
    tiene_password: true,
  });

  const letraInicial = (usuario?.nombre?.trim()?.[0] || "U").toUpperCase();
  const [mostrarTarjeta, setMostrarTarjeta] = useState(false);
  const tarjetaRef = useRef(null);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const [enviandoCorreo, setEnviandoCorreo] = useState(false);
  const [avisoPwd, setAvisoPwd] = useState("");

  const manejarGenerarYEnviar = async () => {
    try {
      setEnviandoCorreo(true);
      setAvisoPwd("");
      const { data } = await accountsApi.sendTempPassword(usuario.id);
      setUsuario((prev) => ({
        ...prev,
        tiene_password: data.tiene_password,
      }));
      setAvisoPwd("Contraseña temporal generada y enviada al correo.");
      setTimeout(() => setAvisoPwd(""), 4000);
    } catch (error) {
      console.error("Error al generar contraseña:", error);
      alert("Hubo un error al enviar la contraseña temporal.");
    } finally {
      setEnviandoCorreo(false);
    }
  };

  useEffect(() => {
    if (state?.usuario) {
      setUsuario({
        id: state.usuario.id,
        nombre: state.usuario.nombre_completo,
        telefono: state.usuario.telefono,
        email: state.usuario.email,
        rol: state.usuario.rol || "",
        tiene_password: state.usuario.tiene_password ?? true,
      });
    }
    setCargando(false);
  }, [state]);

  const handleSave = async () => {
    try {
      await accountsApi.patchUser(usuario.id, {
        nombre: usuario.nombre,
        telefono: usuario.telefono,
        email: usuario.email,
        rol: usuario.rol, // ← aquí ya es admin/agronomo/mayordomo
      });

      setAlertaVisible(true);
      setTimeout(() => {
        setAlertaVisible(false);
        navigate("/admuser");
      }, 1200);
    } catch (error) {
      console.error("Error al guardar cambios:", error.response?.data || error);
      alert("Hubo un error al guardar los cambios");
    }
  };

  if (cargando) return <div className="p-6">Cargando...</div>;

  return (
    <div className="min-h-[100dvh] bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-28 h-[100dvh] bg-green-600 flex flex-col items-center py-6 justify-between fixed left-0 top-0">
        <div className="flex flex-col items-center space-y-8">
          <img src={faviconBlanco} alt="Logo" className="w-11 h-11" />
          <button
            onClick={() => navigate("/homeadm")}
            className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
          >
            <IconHome className="text-white w-11 h-11" />
          </button>
          <div className="relative">
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-11 bg-white rounded-full" />
            <button className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
              <IconUsers className="text-white w-11 h-11" />
            </button>
          </div>
          <button
            onClick={() => navigate("/copias")}
            className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
          >
            <IconCloudUpload className="text-white w-11 h-11" />
          </button>
          <button
            onClick={() => navigate("/soporte")}
            className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
          >
            <IconTool className="text-white w-11 h-11" />
          </button>
        </div>

        {/* Perfil */}
        <div className="relative mb-6">
          <button
            onClick={() => setMostrarTarjeta(!mostrarTarjeta)}
            className="bg-white w-12 h-12 rounded-full flex items-center justify-center text-green-600 font-bold text-xl shadow hover:scale-110 transition"
          >
            {letraInicial}
          </button>
          {mostrarTarjeta && (
            <div
              ref={tarjetaRef}
              className="absolute bottom-16 left-14 w-52 bg-white/95 border-2 border-gray-300 rounded-xl shadow-2xl py-3 z-50"
            >
              <button
                onClick={() => navigate("/ajustesadm")}
                className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              >
                <IconSettings className="w-5 h-5 mr-2 text-green-600" /> Ajustes
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-600"
              >
                <IconLogout className="w-5 h-5 mr-2 text-red-600" /> Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Contenido */}
      <main className="ml-28 flex-1 p-6">
        {alertaVisible && (
          <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[10000] bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 text-base font-semibold">
            <IconCheck className="w-5 h-5" /> Cambios guardados exitosamente
          </div>
        )}

        <button
          onClick={() => navigate("/admuser")}
          className="text-green-600 hover:text-green-800 flex items-center gap-1 font-semibold mb-6"
        >
          <IconArrowLeft className="w-5 h-5" /> Volver
        </button>

        {/* Formulario */}
        <div className="bg-white shadow-xl border-2 border-green-500 rounded-xl p-8 max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-green-700 mb-8">
            Editar rol de usuario
          </h2>

          {/* Datos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Nombre
              </label>
              <input
                type="text"
                value={usuario.nombre}
                onChange={(e) =>
                  setUsuario({ ...usuario, nombre: e.target.value })
                }
                className="w-full p-3 rounded-md border border-gray-300 focus:ring-1 focus:ring-green-500 outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Teléfono
              </label>
              <input
                type="tel"
                value={usuario.telefono}
                onChange={(e) =>
                  setUsuario({ ...usuario, telefono: e.target.value })
                }
                className="w-full p-3 rounded-md border border-gray-300 focus:ring-1 focus:ring-green-500 outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Correo
              </label>
              <input
                type="email"
                value={usuario.email}
                onChange={(e) =>
                  setUsuario({ ...usuario, email: e.target.value })
                }
                className="w-full p-3 rounded-md border border-gray-300 focus:ring-1 focus:ring-green-500 outline-none"
              />
            </div>
          </div>

          {/* Rol */}
          <div className="mb-6">
            <label className="block text-lg font-bold text-gray-800 mb-2">
              Rol
            </label>
            <select
              value={usuario.rol}
              onChange={(e) => setUsuario({ ...usuario, rol: e.target.value })}
              className="w-full p-3 rounded-md border border-gray-300 focus:ring-1 focus:ring-green-500 outline-none"
            >
              <option value="">Sin asignar</option>
              <option value="admin">Administrador</option>
              <option value="agronomo">Agrónomo</option>
              <option value="mayordomo">Mayordomo</option>
            </select>
            <button
              type="button"
              onClick={() => alert("Aquí se añadirá otro rol")}
              className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow"
            >
              <IconPlus className="w-5 h-5" /> Añadir otro rol
            </button>
          </div>

          <div className="mt-8">
            <button
              type="button"
              onClick={handleSave}
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold shadow"
            >
              <IconDeviceFloppy className="w-5 h-5" /> Guardar cambios
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Editar_roluser;
