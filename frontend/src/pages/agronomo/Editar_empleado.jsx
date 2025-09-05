import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IconChevronLeft, IconCheck } from "@tabler/icons-react";
import LayoutAgronomo from "../../layouts/LayoutAgronomo";
import api from "../../services/apiClient";

const ESTADOS = ["Activo", "Inactivo", "Vacaciones", "Suspendido"];

const Editar_empleado = () => {
  const navigate = useNavigate();
  const { id } = useParams(); 

  const [form, setForm] = useState({
    codigo: "",
    nombre: "",
    cargo: "",
    estado: "Activo",
    finca: "",
    telefono: "",
  });
  const [fincas, setFincas] = useState([]);
  const [alertaVisible, setAlertaVisible] = useState(false);

  // Cargar fincas y empleado
  useEffect(() => {
    api.get("/api/fincas/")
      .then((res) => setFincas(res.data))
      .catch((err) => console.error("Error cargando fincas:", err));

    api.get(`/api/trabajadores/${id}/`)
      .then((res) => {
        const emp = res.data;
        setForm({
          codigo: emp.codigo,
          nombre: emp.nombre,
          cargo: emp.cargo,
          estado: emp.estado.charAt(0).toUpperCase() + emp.estado.slice(1), // mostrar capitalizado
          finca: emp.finca || "",
          telefono: emp.telefono,
        });
      })
      .catch((err) => console.error("Error cargando empleado:", err));
  }, [id]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Guardar cambios (PUT)
  const guardarCambios = (e) => {
    e.preventDefault();

    const { codigo, ...data } = form; // no enviamos codigo porque es read_only
    data.estado = data.estado.toLowerCase(); // normalizar estado

    api.put(`/api/trabajadores/${id}/`, data)
      .then(() => {
        setAlertaVisible(true);
        setTimeout(() => {
          setAlertaVisible(false);
          navigate("/manejopersonal");
        }, 2000);
      })
      .catch((err) =>
        console.error("Error guardando cambios:", err.response?.data || err)
      );
  };

  return (
    <LayoutAgronomo active="/manejopersonal">
      {alertaVisible && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 
                        bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg 
                        flex items-center gap-2 text-base font-semibold">
          <IconCheck className="w-5 h-5" /> Cambios guardados exitosamente
        </div>
      )}

      <button
        onClick={() => navigate("/manejopersonal")}
        className="flex items-center text-green-700 font-semibold mb-4 text-lg hover:underline"
      >
        <IconChevronLeft className="w-5 h-5 mr-2" /> Volver
      </button>

      <div className="bg-white border border-gray-200 rounded-xl shadow-md p-8 w-full max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-green-700 mb-6">
          Editar empleado
        </h2>

        <form
          onSubmit={guardarCambios}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 text-base"
        >
          {/* Código empleado */}
          <div>
            <label className="block mb-1 font-semibold text-black">Código empleado</label>
            <input
              type="text"
              className="w-full border p-3 rounded text-base bg-gray-100"
              value={form.codigo}
              readOnly
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-black">Nombre completo</label>
            <input
              name="nombre"
              type="text"
              className="w-full border p-3 rounded text-base"
              value={form.nombre}
              onChange={onChange}
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-black">Cargo</label>
            <input
              name="cargo"
              type="text"
              className="w-full border p-3 rounded text-base"
              value={form.cargo}
              onChange={onChange}
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-black">Estado</label>
            <select
              name="estado"
              className="w-full border p-3 rounded text-base"
              value={form.estado}
              onChange={onChange}
              required
            >
              {ESTADOS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 font-semibold text-black">Finca</label>
            <select
              name="finca"
              className="w-full border p-3 rounded text-base"
              value={form.finca}
              onChange={onChange}
            >
              <option value="">Sin finca</option>
              {fincas.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.nombre}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 font-semibold text-black">Teléfono</label>
            <input
              name="telefono"
              type="text"
              className="w-full border p-3 rounded text-base"
              value={form.telefono}
              onChange={onChange}
              required
            />
          </div>

          <div className="md:col-span-2 flex justify-center space-x-6 pt-4">
            <button
              type="submit"
              className="bg-green-600 text-white px-8 py-2 rounded hover:bg-green-700"
            >
              Guardar
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
      </div>
    </LayoutAgronomo>
  );
};

export default Editar_empleado;
