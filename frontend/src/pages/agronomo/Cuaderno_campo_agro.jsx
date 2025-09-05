import React, { useState, useRef, useEffect } from "react";
import { IconCamera, IconCheck, IconChevronLeft } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import LayoutAgronomo from "../../layouts/LayoutAgronomo";
import { cuadernoCampoApi, fincasApi, lotesApi } from "../../services/apiClient";

const Cuaderno_campo_agro = () => {
  const navigate = useNavigate();

  const [filtros, setFiltros] = useState({
    fecha: "",
    finca: "",
    lote: "",
    anotaciones: "",
  });

  const [fotoPreview, setFotoPreview] = useState(null); // para mostrar vista previa
  const [fotoArchivo, setFotoArchivo] = useState(null); // archivo real
  const fileInputRef = useRef(null);

  const [alertaVisible, setAlertaVisible] = useState(false);
  const [fincas, setFincas] = useState([]);
  const [lotes, setLotes] = useState([]);

  // Cargar fincas al montar
  useEffect(() => {
    const fetchFincas = async () => {
      try {
        const res = await fincasApi.list();
        setFincas(res.data);
      } catch (err) {
        console.error("Error cargando fincas:", err);
      }
    };
    fetchFincas();
  }, []);

  // Cargar lotes cuando cambia la finca seleccionada
  useEffect(() => {
    if (filtros.finca) {
      const fetchLotes = async () => {
        try {
          const res = await lotesApi.listByFinca(filtros.finca);
          setLotes(res.data);
        } catch (err) {
          console.error("Error cargando lotes:", err);
        }
      };
      fetchLotes();
    } else {
      setLotes([]);
    }
  }, [filtros.finca]);

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
      setFotoArchivo(archivo); // archivo real para enviar
      const url = URL.createObjectURL(archivo);
      setFotoPreview(url); // preview
    }
  };

  const handleGuardar = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("fecha", filtros.fecha);
      formData.append("finca", filtros.finca);
      formData.append("lote", filtros.lote);
      formData.append("anotaciones", filtros.anotaciones);
      if (fotoArchivo) formData.append("foto", fotoArchivo);

      await cuadernoCampoApi.create(formData);

      setAlertaVisible(true);
      setTimeout(() => {
        setAlertaVisible(false);
        navigate("/historialcampo");
      }, 1500);
    } catch (err) {
      console.error("Error guardando registro:", err);
      alert("Hubo un error al guardar el registro.");
    }
  };

  return (
    <LayoutAgronomo>
      {/* Alerta */}
      {alertaVisible && (
        <div className="fixed top-3 left-1/2 -translate-x-1/2 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 text-base font-semibold">
          <IconCheck className="w-5 h-5" /> Registro guardado exitosamente
        </div>
      )}

      {/* Botón volver */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-green-700 font-semibold mb-4 text-lg hover:underline"
      >
        <IconChevronLeft className="w-5 h-5 mr-2" /> Volver
      </button>

      {/* Formulario */}
      <div className="flex justify-center p-8 overflow-auto -mt-16">
        <form
          onSubmit={handleGuardar}
          className="bg-white border border-gray-200 shadow-md p-10 rounded-xl w-full max-w-3xl space-y-6 text-black"
        >
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

          {/* Finca */}
          <div>
            <label className="font-bold text-lg mb-2 block">Finca</label>
            <select
              name="finca"
              value={filtros.finca}
              onChange={handleChange}
              className="w-full border p-4 rounded text-lg"
              required
            >
              <option value="" disabled hidden>
                Selecciona una finca
              </option>
              {fincas.map((finca) => (
                <option key={finca.id} value={finca.id}>
                  {finca.nombre}
                </option>
              ))}
            </select>
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
              disabled={!filtros.finca}
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

          {/* Botón Guardar centrado */}
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
    </LayoutAgronomo>
  );
};

export default Cuaderno_campo_agro;
