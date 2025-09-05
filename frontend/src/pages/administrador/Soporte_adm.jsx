import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LayoutAdmin from "../../layouts/LayoutAdmin";
import { soporteApi } from "../../services/apiClient";
import TablaSoporte from "../../components/TablaSoporte";

const Soporte_adm = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState(null); // null = aún no cargado
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    soporteApi
      .listTickets()
      .then((res) => setTickets(res.data))
      .catch((err) => {
        console.error("Error al cargar tickets:", err);
        setTickets([]); // si hay error dejamos vacío
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <LayoutAdmin letraInicial="A">
      <h1 className="text-3xl font-bold text-green-700 mb-6">Soporte</h1>

      <TablaSoporte
        tickets={tickets}
        loading={loading}
        onDetalle={(ticket) =>
          navigate("/detallesticket", { state: { ticket } })
        }
      />
    </LayoutAdmin>
  );
};

export default Soporte_adm;
