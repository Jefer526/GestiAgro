// src/pages/agronomo/Registrar_maquina.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IconChevronLeft, IconCheck } from "@tabler/icons-react";
import LayoutAgronomo from "../../layouts/LayoutAgronomo";
import api, { equiposApi } from "../../services/apiClient"; // 👈 importar bien

const Registrar_maquina = () => {
  const navigate = useNavigate();
  const [alertaVisible, setAlertaVisible] = useState(false);
  const [cargando, setCargando] = useState(false);

  // Estado de fincas
  const [fincas, setFincas] = useState([]);

  // Estados del formulario
  const [form, setForm] = useState({
    codigo_equipo: "",
    maquina: "",
    referencia: "",
    ubicacion: "",
    estado: "Óptimo",
  });

  // Cargar fincas al montar
  useEffect(() => {
    const fetchFincas = async () => {
      try {
        const res = await api.get("/api/fincas/");
        setFincas(res.data);
      } catch (err) {
        console.error("Error cargando fincas:", err);
      }
    };
    fetchFincas();
  }, []);

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

// En tu Registrar_maquina.jsx

const handleSubmit = async (e) => {
  e.preventDefault();
  setCargando(true);

  // 👀 Ver qué se está enviando
  const payload = {
    ...form,
    ubicacion: form.ubicacion ? parseInt(form.ubicacion, 10) : null, // 👈 int o null
  };
  console.log("Enviando datos al backend:", payload);

  try {
    await equiposApi.create(payload); // 👈 llama API
    setAlertaVisible(true);
    setTimeout(() => {
      setAlertaVisible(false);
      navigate("/maquinariaequipos");
    }, 1500);
  } catch (err) {
    console.error("Error registrando máquina:", err.response?.data || err);
    alert("Hubo un error al registrar la máquina");
  } finally {
    setCargando(false);
  }
};

  const nombreUsuario = "Juan Pérez";
  const letraInicial = (nombreUsuario?.trim()?.[0] || "U").toUpperCase();

  return (
    <LayoutAgronomo active="/maquinariaequipos" letraInicial={letraInicial}>
      {alertaVisible && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 z-[11000] font-semibold text-base">
          <IconCheck className="w-5 h-5" /> Máquina registrada exitosamente
        </div>
      )}

      <button
        onClick={() => navigate("/maquinariaequipos")}
        className="flex items-center text-green-700 font-semibold mb-4 text-lg hover:underline"
      >
        <IconChevronLeft className="w-5 h-5 mr-1" /> Volver
      </button>

      <form
        onSubmit={handleSubmit}
        className="bg-white border border-gray-200 shadow-md p-8 rounded-xl w-full max-w-2xl space-y-6 text-black mx-auto"
      >
        <h2 className="text-3xl font-bold text-green-700">
          Registrar nueva máquina
        </h2>

        {/* Código Equipo */}
        <div>
          <label className="block mb-1 font-semibold text-black">Código equipo</label>
          <input
            type="text"
            name="codigo_equipo"
            value={form.codigo_equipo}
            onChange={handleChange}
            className="w-full border p-3 rounded text-base"
            placeholder="Ej: TR-001"
            required
          />
        </div>

        {/* Máquina */}
        <div>
          <label className="block mb-1 font-semibold text-black">Máquina</label>
          <input
            type="text"
            name="maquina"
            value={form.maquina}
            onChange={handleChange}
            className="w-full border p-3 rounded text-base"
            placeholder="Ej: Tractor"
            required
          />
        </div>

        {/* Referencia */}
        <div>
          <label className="block mb-1 font-semibold text-black">Referencia</label>
          <input
            type="text"
            name="referencia"
            value={form.referencia}
            onChange={handleChange}
            className="w-full border p-3 rounded text-base"
            placeholder="Ej: JD 5055"
            required
          />
        </div>

        {/* Ubicación */}
        <div>
          <label className="block mb-1 font-semibold text-black">Ubicación</label>
          <select
            name="ubicacion"
            value={form.ubicacion}
            onChange={handleChange}
            className="w-full border p-3 rounded text-base"
            required
          >
            <option value="">-- Selecciona --</option>
            {fincas.map((finca) => (
              <option key={finca.id} value={finca.id}>
                {finca.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* Estado */}
        <div>
          <label className="block mb-1 font-semibold text-black">Estado</label>
          <select
            name="estado"
            value={form.estado}
            onChange={handleChange}
            className="w-full border p-3 rounded text-base"
            required
          >
            <option>Óptimo</option>
            <option>Mantenimiento</option>
            <option>Averiado</option>
          </select>
        </div>

        {/* Botones */}
        <div className="flex justify-center space-x-6">
          <button
            type="submit"
            disabled={cargando}
            className="bg-green-600 text-white px-8 py-2 rounded hover:bg-green-700 disabled:opacity-50"
          >
            {cargando ? "Guardando..." : "Registrar"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/maquinariaequipos")}
            className="bg-gray-300 text-black px-8 py-2 rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
        </div>
      </form>
    </LayoutAgronomo>
  );
};

export default Registrar_maquina;
