// src/pages/mayordomo/Soporte_mayordomo.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LayoutMayordomo from "../../layouts/LayoutMayordomo";
import { soporteApi } from "../../services/apiClient";
import TablaSoporte from "../../components/TablaSoporte";
import { IconMessageChatbot } from "@tabler/icons-react"; // 👈 importar icono

const Soporte_mayordomo = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState(null); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    soporteApi
      .listTickets()
      .then((res) => setTickets(res.data))
      .catch((err) => {
        console.error("Error cargando tickets:", err);
        setTickets([]); 
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <LayoutMayordomo>
      <h1 className="text-3xl font-bold text-green-700 mb-4">Soporte</h1>

      {/* 🔘 Botón debajo del título */}
      <div className="flex justify-start mb-6">
        <button
          onClick={() => navigate("/registrarticketm")}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold text-lg px-6 py-3 rounded-lg shadow"
        >
          <IconMessageChatbot className="w-6 h-6" />
          Solicitar soporte
        </button>
      </div>

      <TablaSoporte
        tickets={tickets}
        loading={loading}
        onDetalle={(ticket) =>
          navigate("/detallesticketm", { state: { ticket } })
        }
        hiddenColumns={["solicitado_por_rol"]}
      />
    </LayoutMayordomo>
  );
};

export default Soporte_mayordomo;

