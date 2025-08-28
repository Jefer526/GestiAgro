// src/pages/mayordomo/Cuaderno_campom.jsx
import React, { useState, useRef, useEffect } from "react";
import { IconCamera, IconCheck, IconChevronLeft } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import LayoutMayordomo from "../../layouts/LayoutMayordomo";
import { cuadernoCampoApi, lotesApi, getMe } from "../../services/apiClient";

const Registro_campom = () => {
  const navigate = useNavigate();

  const [filtros, setFiltros] = useState({
    fecha: "",
    lote: "",
    anotaciones: "",
  });

  const [fincaAsignada, setFincaAsignada] = useState(null);
  const [lotes, setLotes] = useState([]);

  const [fotoPreview, setFotoPreview] = useState(null);
  const [fotoArchivo, setFotoArchivo] = useState(null);
  const fileInputRef = useRef(null);

  const [alertaVisible, setAlertaVisible] = useState(false);

  // 📌 Obtener la finca asignada al mayordomo
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getMe();
        if (res.data.finca_asignada) {
          setFincaAsignada(res.data.finca_asignada);
        }
      } catch (err) {
        console.error("❌ Error obteniendo usuario:", err);
      }
    };
    fetchUser();
  }, []);

  // 📌 Cargar lotes de la finca asignada
  useEffect(() => {
    const fetchLotes = async () => {
      if (!fincaAsignada) return;
      try {
        const res = await lotesApi.listByFinca(fincaAsignada.id);
        setLotes(res.data);
      } catch (err) {
        console.error("❌ Error cargando lotes:", err);
      }
    };
    fetchLotes();
  }, [fincaAsignada]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFiltros({ ...filtros, [name]: value });
  };

  const handleTomarFoto = () => {
    fileInputRef.current.click();
  };

  const handleFotoSeleccionada = (e) => {
    const archivo = e.target.files[0];
    if (archivo) {
      setFotoArchivo(archivo);
      const url = URL.createObjectURL(archivo);
      setFotoPreview(url);
    }
  };

  const handleGuardar = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("fecha", filtros.fecha);
      formData.append("finca", fincaAsignada.id);
      formData.append("lote", filtros.lote);
      formData.append("anotaciones", filtros.anotaciones);
      if (fotoArchivo) formData.append("foto", fotoArchivo);

      await cuadernoCampoApi.create(formData);

      setAlertaVisible(true);
      setTimeout(() => {
        setAlertaVisible(false);
        navigate("/cuadernocampom"); // 👈 historial del mayordomo
      }, 1500);
    } catch (err) {
      console.error("❌ Error guardando registro:", err);
      alert("Hubo un error al guardar el registro.");
    }
  };

  return (
    <LayoutMayordomo ocultarEncabezado>
      {/* ✅ Alerta */}
      {alertaVisible && (
        <div className="fixed top-3 left-1/2 -translate-x-1/2 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 text-base font-semibold">
          <IconCheck className="w-5 h-5" /> Registro guardado exitosamente
        </div>
      )}

      {/* ✅ Botón volver */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-green-700 font-semibold mb-4 text-lg hover:underline"
      >
        <IconChevronLeft className="w-5 h-5 mr-2" /> Volver
      </button>

      {/* ✅ Encabezado: finca afuera, título dentro de la card */}
      <div className="flex justify-between items-center mb-6">
        <div></div>
        {fincaAsignada && (
          <span className="text-2xl font-bold text-green-700">
            {fincaAsignada.nombre}
          </span>
        )}
      </div>

      {/* ✅ Formulario */}
      <div className="flex justify-center p-8 overflow-auto -mt-6">
        <form
          onSubmit={handleGuardar}
          className="bg-white border border-gray-200 shadow-md p-10 rounded-xl w-full max-w-3xl space-y-6 text-black"
        >
          {/* Título dentro de la tarjeta */}
          <h1 className="text-3xl font-bold text-green-700">
            Cuaderno de Campo
          </h1>

          {/* Fecha */}
          <div>
            <label className="font-bold text-lg mb-2 block">Fecha</label>
            <input
              type="date"
              name="fecha"
              value={filtros.fecha}
              onChange={handleChange}
              className="border p-3 rounded w-full text-lg"
              required
            />
          </div>

          {/* Finca (fija, no editable) */}
          <div>
            <label className="font-bold text-lg mb-2 block">Finca</label>
            <div className="w-full border p-4 rounded text-lg bg-gray-100">
              {fincaAsignada?.nombre || "Cargando..."}
            </div>
          </div>

          {/* Lote */}
          <div>
            <label className="font-bold text-lg mb-2 block">Lote</label>
            <select
              name="lote"
              value={filtros.lote}
              onChange={handleChange}
              className="w-full border p-4 rounded text-lg"
              required
              disabled={!fincaAsignada}
            >
              <option value="" disabled hidden>
                Selecciona un lote
              </option>
              {lotes.map((lote) => (
                <option key={lote.id} value={lote.id}>
                  {lote.lote}
                </option>
              ))}
            </select>
          </div>

          {/* Anotaciones */}
          <div>
            <label className="font-bold text-lg mb-2 block">Anotaciones</label>
            <textarea
              name="anotaciones"
              value={filtros.anotaciones}
              onChange={handleChange}
              rows="4"
              placeholder="Escribe aquí las anotaciones..."
              className="w-full border p-4 rounded text-lg"
              required
            ></textarea>
          </div>

          {/* Tomar foto */}
          <div className="flex flex-col gap-4">
            <button
              type="button"
              onClick={handleTomarFoto}
              className="bg-green-600 text-white px-8 py-3 rounded hover:bg-green-700 text-lg flex items-center gap-2 self-start"
            >
              <IconCamera className="w-5 h-5" /> Seleccionar foto
            </button>

            <input
              type="file"
              accept="image/*"
              capture="environment"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFotoSeleccionada}
            />

            {fotoPreview && (
              <div className="mt-2">
                <p className="text-sm font-medium">Vista previa:</p>
                <img
                  src={fotoPreview}
                  alt="Foto tomada"
                  className="mt-2 max-h-48 rounded border"
                />
              </div>
            )}
          </div>

          {/* ✅ Botón Guardar centrado */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-green-600 text-white px-8 py-3 rounded-lg shadow-md hover:bg-green-700 text-lg font-semibold"
            >
              Guardar Registro
            </button>
          </div>
        </form>
      </div>
    </LayoutMayordomo>
  );
};

export default Registro_campom;
