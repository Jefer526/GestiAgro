import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IconChevronLeft, IconCheck } from "@tabler/icons-react";
import LayoutAgronomo from "../../layouts/LayoutAgronomo";
import api from "../../services/apiClient";

const Registrar_empleado = () => {
  const navigate = useNavigate();
  const [alertaVisible, setAlertaVisible] = useState(false);
  const [fincas, setFincas] = useState([]);
  const [form, setForm] = useState({
    nombre: "",
    cargo: "",
    estado: "activo", // valor en minúscula para coincidir con el modelo
    finca: null,
    telefono: "",
  });

  useEffect(() => {
    api.get("/api/fincas/").then((res) => setFincas(res.data));
  }, []);

  const manejarGuardar = (e) => {
    e.preventDefault();

    const payload = {
      nombre: form.nombre,
      cargo: form.cargo,
      estado: form.estado, // en minúscula
      finca: form.finca,
      telefono: form.telefono,
    };

    api
      .post("/api/trabajadores/", payload)
      .then(() => {
        setAlertaVisible(true);
        setTimeout(() => {
          setAlertaVisible(false);
          navigate("/manejopersonal");
        }, 2000);
      })
      .catch((err) => {
        if (err.response) {
          console.error("Detalles del error:", err.response.data);
        } else {
          console.error("Error registrando empleado:", err);
        }
      });
  };

  return (
    <LayoutAgronomo active="/manejopersonal">
      {/* Alerta */}
      {alertaVisible && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 text-base font-semibold">
          <IconCheck className="w-5 h-5" /> Empleado registrado exitosamente
        </div>
      )}

      {/* Botón volver */}
      <button
        onClick={() => navigate("/manejopersonal")}
        className="flex items-center text-green-700 font-semibold mb-4 text-lg hover:underline"
      >
        <IconChevronLeft className="w-5 h-5 mr-1" /> Volver
      </button>

      {/* Formulario */}
      <form
        onSubmit={manejarGuardar}
        className="bg-white border border-gray-200 rounded-xl shadow-md p-8 w-full max-w-2xl mx-auto space-y-6 text-black"
      >
        <h2 className="text-3xl font-bold text-green-700">
          Registrar empleado
        </h2>

        {/* Código generado automáticamente */}
        <div>
          <label className="block mb-1 font-semibold">Código empleado</label>
          <input
            type="text"
            value="Se generará automáticamente"
            disabled
            className="w-full border p-3 rounded text-base bg-gray-100 text-gray-500"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Nombre completo</label>
          <input
            type="text"
            value={form.nombre}
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
            className="w-full border p-3 rounded text-base"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Cargo</label>
          <input
            type="text"
            value={form.cargo}
            onChange={(e) => setForm({ ...form, cargo: e.target.value })}
            className="w-full border p-3 rounded text-base"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Estado</label>
          <select
            value={form.estado}
            onChange={(e) => setForm({ ...form, estado: e.target.value })}
            className="w-full border p-3 rounded text-base"
            required
          >
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
            <option value="vacaciones">Vacaciones</option>
            <option value="suspendido">Suspendido</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-semibold">Finca</label>
          <select
            value={form.finca || ""}
            onChange={(e) =>
              setForm({
                ...form,
                finca: e.target.value ? parseInt(e.target.value) : null,
              })
            }
            className="w-full border p-3 rounded text-base"
          >
            <option value="">Seleccione finca</option>
            {fincas.map((f) => (
              <option key={f.id} value={f.id}>
                {f.nombre}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-semibold">Teléfono</label>
          <input
            type="text"
            value={form.telefono}
            onChange={(e) => setForm({ ...form, telefono: e.target.value })}
            className="w-full border p-3 rounded text-base"
            required
          />
        </div>

        {/* Botones */}
        <div className="flex justify-center space-x-6">
          <button
            type="submit"
            className="bg-green-600 text-white px-8 py-2 rounded hover:bg-green-700"
          >
            Registrar
          </button>
          <button
            type="button"
            onClick={() => navigate("/manejopersonal")}
            className="bg-gray-300 text-black px-8 py-2 rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
        </div>
      </form>
    </LayoutAgronomo>
  );
};

export default Registrar_empleado;
