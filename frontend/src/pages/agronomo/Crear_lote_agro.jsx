import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IconChevronLeft, IconCheck, IconAlertTriangle } from "@tabler/icons-react";
import LayoutAgronomo from "../../layouts/LayoutAgronomo";
import api from "../../services/apiClient";

const Crear_lote_agro = () => {
  const navigate = useNavigate();
  const { fincaId } = useParams(); // id de la finca desde la URL

  const [finca, setFinca] = useState(null);
  const [formData, setFormData] = useState({
    finca: fincaId, 
    lote: "",
    cultivo: "",
    area_bruta: "",
    area_neta: "",
    estado: "Activo",
  });

  const [arboles, setArboles] = useState([{ variedad: "", cantidad: "" }]);
  const [alertaVisible, setAlertaVisible] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Obtener la finca desde API
  useEffect(() => {
    const fetchFinca = async () => {
      try {
        const res = await api.get(`/api/fincas/${fincaId}/`);
        setFinca(res.data);
      } catch (err) {
        console.error("❌ Error al cargar finca:", err);
      }
    };
    fetchFinca();
  }, [fincaId]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleArbolChange = (index, e) => {
    const newArboles = [...arboles];
    newArboles[index][e.target.name] = e.target.value;
    setArboles(newArboles);
  };

  const addArbol = () => setArboles([...arboles, { variedad: "", cantidad: "" }]);
  const removeArbol = (index) => {
    const newArboles = [...arboles];
    newArboles.splice(index, 1);
    setArboles(newArboles);
  };

  const handleGuardar = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    try {
      const payload = { ...formData, arboles };
      const res = await api.post("/api/lotes/", payload);
      console.log("✅ Nuevo lote con árboles:", res.data);

      setAlertaVisible(true);
      setTimeout(() => {
        setAlertaVisible(false);
        navigate(`/editarfinca/${fincaId}`);
      }, 2500);
    } catch (err) {
      console.error("❌ Error al guardar lote:", err.response?.data || err);
      if (err.response?.data?.lote) {
        setErrorMsg(err.response.data.lote[0]);
      } else {
        setErrorMsg("El número de lote ya existe.");
      }
    }
  };

  return (
    <LayoutAgronomo>
      {/* Mensaje de confirmación */}
      {alertaVisible && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 
                        bg-green-600 text-white px-6 py-3 rounded-lg 
                        shadow-lg flex items-center gap-2 text-base font-semibold">
          <IconCheck className="w-5 h-5" /> ¡Lote registrado exitosamente!
        </div>
      )}

      {/* Mensaje de error */}
      {errorMsg && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 
                        bg-red-600 text-white px-6 py-3 rounded-lg 
                        shadow-lg flex items-center gap-2 text-base font-semibold">
          <IconAlertTriangle className="w-5 h-5" /> {errorMsg}
        </div>
      )}

      {/* Botón volver */}

      <button
        onClick={() => navigate(`/editarfinca/${fincaId}`)}
        className="flex items-center text-green-700 font-semibold mb-4 text-lg hover:underline"
      >
        <IconChevronLeft className="w-5 h-5 mr-1" /> Volver
      </button>

      {/* Formulario */}
      <form
        onSubmit={handleGuardar}
        className="max-w-4xl mx-auto bg-white border border-gray-200 
                   rounded-xl p-8 shadow-md grid grid-cols-1 md:grid-cols-2 gap-6 text-black"
      >
        <h2 className="col-span-2 text-3xl font-bold text-green-700">
          Registrar nuevo lote
        </h2>

        {/* Finca fija */}
        <div className="md:col-span-2">
          <label className="block mb-1 font-semibold text-black">Finca</label>
          <input
            type="text"
            value={finca ? finca.nombre : "Cargando..."}
            disabled
            className="w-full border p-3 rounded bg-gray-100 text-base"
          />
        </div>

        {/* Número de lote */}
        <div>
          <label className="block mb-1 font-semibold text-black">Número de lote</label>
          <input
            name="lote"
            value={formData.lote}
            onChange={handleChange}
            placeholder="Ej: 1"
            className="w-full border p-3 rounded text-base"
            required
          />
        </div>

        {/* Cultivo */}
        <div>
          <label className="block mb-1 font-semibold text-black">Cultivo</label>
          <input
            name="cultivo"
            value={formData.cultivo}
            onChange={handleChange}
            placeholder="Ej: Aguacate"
            className="w-full border p-3 rounded text-base"
            required
          />
        </div>

        {/* Área bruta */}
        <div>
          <label className="block mb-1 font-semibold text-black">Área bruta (ha)</label>
          <input
            type="number"
            step="0.01"
            name="area_bruta"
            value={formData.area_bruta}
            onChange={handleChange}
            placeholder="Ej: 3.0"
            className="w-full border p-3 rounded text-base"
            required
          />
        </div>

        {/* Área neta */}
        <div>
          <label className="block mb-1 font-semibold text-black">Área neta (ha)</label>
          <input
            type="number"
            step="0.01"
            name="area_neta"
            value={formData.area_neta}
            onChange={handleChange}
            placeholder="Ej: 2.5"
            className="w-full border p-3 rounded text-base"
            required
          />
        </div>

        {/* Estado */}
        <div>
          <label className="block mb-1 font-semibold text-black">Estado</label>
          <select
            name="estado"
            value={formData.estado}
            onChange={handleChange}
            className="w-full border p-3 rounded text-base"
          >
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
          </select>
        </div>

        {/* Árboles dinámicos */}
        <div className="col-span-2">
          <label className="block mb-1 font-semibold text-black">Árboles por variedad</label>
          {arboles.map((arbol, index) => (
            <div key={index} className="flex gap-4 mb-2">
              <input
                type="text"
                name="variedad"
                value={arbol.variedad}
                onChange={(e) => handleArbolChange(index, e)}
                placeholder="Ej: Hass"
                className="w-1/2 border p-2 rounded"
                required
              />
              <input
                type="number"
                name="cantidad"
                value={arbol.cantidad}
                onChange={(e) => handleArbolChange(index, e)}
                placeholder="Ej: 500"
                className="w-1/3 border p-2 rounded"
                required
                min="0"
              />
              <button
                type="button"
                onClick={() => removeArbol(index)}
                className="bg-red-500 text-white px-3 rounded"
              >
                X
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addArbol}
            className="mt-2 bg-green-500 text-white px-4 py-1 rounded"
          >
            + Añadir variedad
          </button>
        </div>

        {/* Botones acción */}
        <div className="col-span-2 flex justify-center space-x-6 mt-4">
          <button
            type="submit"
            className="bg-green-600 text-white px-8 py-2 rounded hover:bg-green-700"
          >
            Guardar lote
          </button>
          <button
            type="button"
            onClick={() => navigate(`/editarfinca/${fincaId}`)}
            className="bg-gray-300 text-black px-8 py-2 rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
        </div>
      </form>
    </LayoutAgronomo>
  );
};

export default Crear_lote_agro;
