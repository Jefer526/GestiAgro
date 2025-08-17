// src/pages/administrador/Soporte_adm.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LayoutAdmin from "../../layouts/LayoutAdmin";
import { soporteApi } from "../../services/apiClient";
import TablaSoporte from "../../components/TablaSoporte";

const Soporte_adm = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    soporteApi
      .listTickets()
      .then((res) => setTickets(res.data))
      .catch((err) => console.error("Error al cargar tickets:", err));
  }, []);

  return (
    <LayoutAdmin letraInicial="A">
      <h1 className="text-4xl font-bold text-green-600 mb-6">Soporte</h1>
      
      <TablaSoporte
        tickets={tickets}
        onDetalle={(ticket) =>
          navigate("/detallesticket", { state: { ticket } })
        }
        // 👉 aquí no paso hiddenColumns para que se vea el rol
      />
    </LayoutAdmin>
  );
};

export default Soporte_adm;
