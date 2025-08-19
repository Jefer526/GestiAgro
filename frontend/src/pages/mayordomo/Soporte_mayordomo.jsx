import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LayoutMayordomo from "../../layouts/LayoutMayordomo";
import { soporteApi } from "../../services/apiClient";
import TablaSoporte from "../../components/TablaSoporte";

const Soporte_mayordomo = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState(null); // 👈 null = aún no cargado
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    soporteApi
      .listTickets()
      .then((res) => setTickets(res.data))
      .catch((err) => {
        console.error("Error cargando tickets:", err);
        setTickets([]); // en caso de error dejamos vacío
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <LayoutMayordomo>
      <h1 className="text-3xl font-bold text-green-700 mb-4">Soporte</h1>

      <TablaSoporte
        tickets={tickets}
        loading={loading}
        onDetalle={(ticket) =>
          navigate("/detallesticketm", { state: { ticket } })
        }
        hiddenColumns={["solicitado_por_rol"]}
      />

      <div className="flex justify-end mt-8">
        <button
          onClick={() => navigate("/registrarticketm")}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold text-lg px-6 py-3 rounded-lg shadow"
        >
          Solicitar soporte
        </button>
      </div>
    </LayoutMayordomo>
  );
};

export default Soporte_mayordomo;
