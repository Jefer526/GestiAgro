import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  IconArrowLeft,
  IconDeviceFloppy,
  IconCheck,
  IconKey,
} from "@tabler/icons-react";
import { accountsApi } from "../../services/apiClient";
import LayoutAdmin from "../../layouts/LayoutAdmin";

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

  const [enviandoCorreo, setEnviandoCorreo] = useState(false);
  const [avisoPwd, setAvisoPwd] = useState("");

  // ==== Generar y enviar contraseña temporal ====
  const manejarGenerarYEnviar = async () => {
    try {
      setEnviandoCorreo(true);
      setAvisoPwd("");

      await accountsApi.sendTempPassword(usuario.id);

      setUsuario((prev) => ({ ...prev, tiene_password: true }));

      setAvisoPwd("Contraseña temporal generada y enviada al correo.");
      setTimeout(() => setAvisoPwd(""), 4000);
    } catch (error) {
      console.error("Error al generar contraseña:", error);
      setAvisoPwd("Error al enviar la contraseña temporal.");
      setTimeout(() => setAvisoPwd(""), 4000);
    } finally {
      setEnviandoCorreo(false);
    }
  };

  // Normalizar rol (sin tildes)
  const normalizarRol = (rol) => {
    if (!rol) return "";
    return rol
      .toString()
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  };

  useEffect(() => {
    if (state?.usuario) {
      let rolAsignado = "";
      if (typeof state.usuario.rol === "string") {
        rolAsignado = normalizarRol(state.usuario.rol);
      } else if (Array.isArray(state.usuario.rol)) {
        rolAsignado = normalizarRol(state.usuario.rol[0]);
      } else if (state.usuario.rol?.nombre) {
        rolAsignado = normalizarRol(state.usuario.rol.nombre);
      }

      setUsuario({
        id: state.usuario.id,
        nombre: state.usuario.nombre_completo,
        telefono: state.usuario.telefono,
        email: state.usuario.email,
        rol: rolAsignado,
        tiene_password: state.usuario.tiene_password ?? true,
      });
    }
    setCargando(false);
  }, [state]);

  const handleSave = async () => {
    try {
      await accountsApi.updateUser(usuario.id, {
        nombre: usuario.nombre,
        telefono: usuario.telefono,
        email: usuario.email,
        rol: usuario.rol,
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
    <LayoutAdmin letraInicial={usuario?.nombre?.[0] || "U"}>
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
      <div className="bg-white shadow-xl border-2 border-gray-200 rounded-xl p-8 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-green-700 mb-8">
          Editar Rol y Usuario
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

          {/* Botón Generar Contraseña */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Contraseña temporal
            </label>
            <button
              type="button"
              onClick={manejarGenerarYEnviar}
              disabled={usuario.tiene_password || enviandoCorreo}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold shadow text-white ${
                usuario.tiene_password
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              <IconKey className="w-5 h-5" />
              {enviandoCorreo ? "Enviando..." : "Generar y enviar"}
            </button>
            {avisoPwd && (
              <p className="mt-1 text-sm text-green-600 font-medium">{avisoPwd}</p>
            )}
            {usuario.tiene_password ? (
              <p className="mt-1 text-xs text-blue-600">
                Este usuario ya tiene contraseña asignada.
              </p>
            ) : (
              <p className="mt-1 text-xs text-red-600">
                Este usuario no tiene contraseña asignada.
              </p>
            )}
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
        </div>

        {/* Guardar */}
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
    </LayoutAdmin>
  );
};

export default Editar_roluser;
