import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { IconChevronLeft } from "@tabler/icons-react";
import LayoutMayordomo from "../../layouts/LayoutMayordomo";
import { cuadernoCampoApi } from "../../services/apiClient";

const Detalle_registrocampom = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const [registro, setRegistro] = useState(null);
  const [alertaVisible, setAlertaVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  // Cargar registro
  useEffect(() => {
    const fetchRegistro = async () => {
      try {
        if (location.state) {
          setRegistro(location.state);
          setAlertaVisible(true);
          setTimeout(() => setAlertaVisible(false), 1500);
        } else if (id) {
          const res = await cuadernoCampoApi.retrieve(id);
          setRegistro(res.data);
          setAlertaVisible(true);
          setTimeout(() => setAlertaVisible(false), 1500);
        }
      } catch (err) {
        console.error("Error cargando registro:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRegistro();
  }, [id, location.state]);

  return (
    <LayoutMayordomo ocultarEncabezado>
      {/* Botón volver */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-green-700 font-semibold mb-4 text-lg hover:underline"
      >
        <IconChevronLeft className="w-5 h-5 mr-2" /> Volver
      </button>

      {/* Encabezado: finca afuera a la derecha */}
      <div className="flex justify-between items-center mb-6">
        <div></div>
        {registro?.finca_nombre && (
          <span className="text-2xl font-bold text-green-700">
            {registro.finca_nombre}
          </span>
        )}
      </div>

      {/* Card de detalle */}
      <div className="flex justify-center p-8 overflow-auto -mt-6">
        {loading ? (
          <p className="text-gray-500">Cargando registro...</p>
        ) : registro ? (
          <div className="bg-white border border-gray-200 shadow-md p-10 rounded-xl w-full max-w-3xl space-y-6 text-black">
            {/* Título dentro de la card */}
            <h1 className="text-3xl font-bold text-green-700">
              Detalle de Registro de Campo
            </h1>

            {/* Fecha */}
            <div>
              <label className="font-bold text-lg block mb-1">Fecha</label>
              <p className="text-lg">{registro.fecha}</p>
            </div>

            {/* Lote */}
            <div>
              <label className="font-bold text-lg block mb-1">Lote</label>
              <p className="text-lg">{registro.lote_nombre}</p>
            </div>

            {/* Anotaciones */}
            <div>
              <label className="font-bold text-lg block mb-1">Anotaciones</label>
              <p className="text-lg text-justify whitespace-pre-line">
                {registro.anotaciones}
              </p>
            </div>

            {/* Foto */}
            {registro.foto && (
              <div>
                <label className="font-bold text-lg block mb-1">Foto</label>
                <div className="mt-2">
                  <img
                    src={registro.foto}
                    alt="Registro de campo"
                    className="max-h-64 rounded-lg border shadow-sm"
                  />
                </div>
              </div>
            )}
          </div>
        ) : (
          <p className="text-red-500">No se encontró el registro.</p>
        )}
      </div>
    </LayoutMayordomo>
  );
};

export default Detalle_registrocampom;
