// src/pages/agronomo/Soporte_agro.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LayoutAgronomo from "../../layouts/LayoutAgronomo";
import { soporteApi } from "../../services/apiClient";
import TablaSoporte from "../../components/TablaSoporte";

const Soporte_agro = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    soporteApi
      .listTickets()
      .then((res) => setTickets(res.data))
      .catch((err) => console.error("Error cargando tickets:", err));
  }, []);

  return (
    <LayoutAgronomo>
      <h1 className="text-4xl font-bold text-green-600 mb-4">Soporte</h1>

      <button
        onClick={() => navigate("/Registrarticketag")}
        className="bg-green-600 text-white px-10 py-5 text-2xl rounded-xl shadow-lg hover:bg-green-700 transition font-bold mb-8"
      >
        Solicitar soporte
      </button>

      <TablaSoporte
        tickets={tickets}
        onDetalle={(ticket) =>
          navigate("/detallesticketa", { state: { ticket } })
        }
        hiddenColumns={["solicitado_por_rol"]} // 👈 Ocultar columna Rol
      />
    </LayoutAgronomo>
  );
};

export default Soporte_agro;
