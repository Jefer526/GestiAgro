// src/pages/mayordomo/Soporte_mayordomo.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LayoutMayordomo from "../../layouts/LayoutMayordomo";
import { soporteApi } from "../../services/apiClient";
import TablaSoporte from "../../components/TablaSoporte";

const Soporte_mayordomo = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    soporteApi
      .listTickets()
      .then((res) => setTickets(res.data))
      .catch((err) => console.error("Error cargando tickets:", err));
  }, []);

  return (
    <LayoutMayordomo>
      <h1 className="text-4xl font-bold text-green-600 mb-4">Soporte</h1>

      <button
        onClick={() => navigate("/registrarticketm")}
        className="bg-green-600 text-white px-10 py-5 text-2xl rounded-xl shadow-lg hover:bg-green-700 transition font-bold mb-8"
      >
        Solicitar soporte
      </button>

      <TablaSoporte
        tickets={tickets}
        onDetalle={(ticket) =>
          navigate("/detallesticketm", { state: { ticket } })
        }
        hiddenColumns={["solicitado_por_rol"]} // 👈 Ocultar Rol para Mayordomo
      />
    </LayoutMayordomo>
  );
};

export default Soporte_mayordomo;
