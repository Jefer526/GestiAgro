import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { IconChevronLeft } from "@tabler/icons-react";
import LayoutAgronomo from "../../layouts/LayoutAgronomo";
import { cuadernoCampoApi } from "../../services/apiClient";

const API = import.meta.env.VITE_API_URL || "http://localhost:8000"; // base URL

const Detalle_campo_agro = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams(); // capturamos el id de la URL (si existe)

  const [registro, setRegistro] = useState(null);
  const [loading, setLoading] = useState(true);

  // Función para formatear fecha (dd/mm/yyyy)
  const formatFecha = (isoDate) => {
    if (!isoDate) return "";
    const d = new Date(isoDate);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Fallback si no hay data
  const fallback = {
    fecha: "2025-08-15",
    finca_nombre: "La Esmeralda",
    lote_nombre: "Lote 1",
    anotaciones: `Revisión de plagas en cultivo de aguacate. 
Se detectaron algunos focos de insectos, se programará control fitosanitario.`,
    foto: "https://via.placeholder.com/400x250.png?text=Ejemplo+Foto+Campo",
  };

  // Primero intentamos con state
  useEffect(() => {
    if (location.state) {
      setRegistro(location.state);
      setLoading(false);
    } else if (id) {
      // Si no hay state, buscamos en el backend por id
      const fetchRegistro = async () => {
        try {
          const res = await cuadernoCampoApi.get(id);
          setRegistro(res.data);
        } catch (err) {
          console.error("Error cargando registro:", err);
          setRegistro(fallback);
        } finally {
          setLoading(false);
        }
      };
      fetchRegistro();
    } else {
      setRegistro(fallback);
      setLoading(false);
    }
  }, [id, location.state]);

  if (loading) {
    return (
      <LayoutAgronomo active="/historialcampo">
        <p className="text-center text-gray-500 mt-10">Cargando detalle...</p>
      </LayoutAgronomo>
    );
  }

  const data = registro || fallback;

  // Armar URL completa de la foto
  const fotoUrl = data.foto
    ? data.foto.startsWith("http")
      ? data.foto
      : `${API}${data.foto}`
    : fallback.foto;

  return (
    <LayoutAgronomo active="/historialcampo">
      {/* Botón volver */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-green-700 font-semibold mb-4 text-lg hover:underline"
      >
        <IconChevronLeft className="w-5 h-5 mr-2" /> Volver
      </button>

      {/* Card de detalle */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-md p-10 w-[900px] max-w-full mx-auto">
        <h1 className="text-3xl font-bold text-green-700 mb-6">
          Detalle de Registro de Campo
        </h1>

        <div className="space-y-5 text-lg">
          <p>
            <strong>Fecha:</strong> {formatFecha(data.fecha)}
          </p>
          <p>
            <strong>Finca:</strong> {data.finca_nombre || data.finca}
          </p>
          <p>
            <strong>Lote:</strong> {data.lote_nombre || data.lote}
          </p>
          <div>
            <strong>Anotaciones:</strong>
            <p className="mt-2 text-justify whitespace-pre-line">
              {data.anotaciones}
            </p>
          </div>

          {/* Foto */}
          <div>
            <strong>Foto:</strong>
            <div className="mt-3">
              <img
                src={fotoUrl}
                alt="Registro de campo"
                className="max-h-72 rounded-lg border shadow-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </LayoutAgronomo>
  );
};

export default Detalle_campo_agro;
