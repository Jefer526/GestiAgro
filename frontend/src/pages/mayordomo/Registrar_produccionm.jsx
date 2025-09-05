import React, { useState, useEffect } from "react";
import { IconChevronLeft, IconCheck, IconPlus, IconTrash } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import LayoutMayordomo from "../../layouts/LayoutMayordomo";
import { lotesApi, produccionApi, getMe } from "../../services/apiClient";

const Registrar_produccionm = () => {
  const navigate = useNavigate();
  const [alertaVisible, setAlertaVisible] = useState(false);

  const [fincaAsignada, setFincaAsignada] = useState(null); // finca fija del mayordomo
  const [lotes, setLotes] = useState([]);

  const [formData, setFormData] = useState({
    fecha: "",
    finca: "", // se llenará con la finca fija
    lote: "",
    cantidad: "",
    unidad: "Kg",
  });

  const [producciones, setProducciones] = useState([]);

  /* Cargar finca fija al inicio */
  useEffect(() => {
    const fetchFincaAsignada = async () => {
      try {
        const user = await getMe(); // endpoint devuelve info del usuario logueado
        if (user.data.finca_asignada) {
          setFincaAsignada(user.data.finca_asignada); // backend devuelve { id, nombre }
          setFormData((prev) => ({ ...prev, finca: user.data.finca_asignada.id }));
        }
      } catch (err) {
        console.error("❌ Error obteniendo finca asignada:", err);
      }
    };
    fetchFincaAsignada();
  }, []);

  /* Cargar lotes según finca fija */
  useEffect(() => {
    const fetchLotes = async () => {
      if (formData.finca) {
        try {
          const res = await lotesApi.listByFinca(formData.finca);
          setLotes(res.data);
        } catch (err) {
          console.error("❌ Error cargando lotes:", err);
        }
      }
    };
    fetchLotes();
  }, [formData.finca]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const añadirProduccion = () => {
    const { fecha, lote, cantidad, unidad } = formData;
    if (!fecha || !fincaAsignada?.id || !lote || !cantidad) {
      return alert("Completa todos los campos obligatorios");
    }

    const loteObj = lotes.find((l) => l.id === Number(lote));

    setProducciones([
      ...producciones,
      {
        fecha,
        finca: fincaAsignada.id, // id real de la finca
        lote: Number(lote),      // id real del lote
        cantidad,
        unidad,
        fincaNombre: fincaAsignada.nombre,
        loteNombre: loteObj ? loteObj.lote : "",
        cultivoNombre: loteObj ? loteObj.cultivo : "",
      },
    ]);

    // reset form, manteniendo la finca fija
    setFormData({
      fecha: "",
      finca: fincaAsignada.id,
      lote: "",
      cantidad: "",
      unidad: "Kg",
    });
  };

  const eliminarProduccion = (idx) => {
    setProducciones(producciones.filter((_, i) => i !== idx));
  };

  const handleGuardar = async () => {
    if (producciones.length === 0) return alert("No has añadido registros");

    try {
      const results = await Promise.all(
        producciones.map((p) =>
          produccionApi.create({
            fecha: p.fecha,
            finca: p.finca,   // ahora es id
            lote: p.lote,     // ahora es id
            cantidad: p.cantidad,
            unidad: p.unidad,
          })
        )
      );
      console.log("✅ Guardado en backend:", results);

      setAlertaVisible(true);
      setTimeout(() => {
        setAlertaVisible(false);
        navigate("/Produccion_mayor");
      }, 2000);
    } catch (err) {
      console.error("❌ Error guardando producción:", err.response?.data || err);
      alert("Error al guardar");
    }
  };

  const formatFecha = (fecha) => {
    if (!fecha) return "";
    const [y, m, d] = fecha.split("-");
    return `${d}-${m}-${y}`;
  };

  return (
    <LayoutMayordomo ocultarEncabezado>
      {alertaVisible && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 text-base font-semibold">
          <IconCheck className="w-5 h-5" /> Producción guardada exitosamente
        </div>
      )}

      {/* Botón volver */}
      <button
        onClick={() => navigate("/Produccion_mayor")}
        className="flex items-center text-green-700 font-semibold mb-6 text-lg hover:underline"
      >
        <IconChevronLeft className="w-5 h-5 mr-1" /> Volver
      </button>

      {/* Encabezado: finca afuera, título dentro de la card */}
      <div className="flex justify-between items-center mb-6">
        <div></div>
        {fincaAsignada && (
          <span className="text-2xl font-bold text-green-700">{fincaAsignada.nombre}</span>
        )}
      </div>

      {/* Card principal */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-md p-8 w-[1100px] mx-auto">
        {/* Título dentro de la card */}
        <h1 className="text-3xl font-bold text-green-700 mb-6">Registrar producción agrícola</h1>

        <div className="space-y-5 mb-6">
          {/* Fecha */}
          <div>
            <label className="block font-semibold mb-1">Fecha:</label>
            <input
              type="date"
              name="fecha"
              value={formData.fecha}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-1.5"
            />
          </div>

          {/* Finca fija y Lote */}
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="block font-semibold mb-1">Finca:</label>
              <input
                type="text"
                value={fincaAsignada?.nombre || "Cargando..."}
                disabled
                className="w-full border border-gray-300 rounded px-3 py-1.5 bg-gray-100"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Lote:</label>
              <select
                name="lote"
                value={formData.lote}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-1.5"
                disabled={!formData.finca}
              >
                <option value="">Selecciona lote</option>
                {lotes.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.lote}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Cantidad y Unidad */}
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="block font-semibold mb-1">Cantidad:</label>
              <input
                type="number"
                name="cantidad"
                value={formData.cantidad}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-1.5"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Unidad:</label>
              <select
                name="unidad"
                value={formData.unidad}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-1.5"
              >
                <option value="Kg">Kg</option>
                <option value="Ton">Ton</option>
                <option value="Sacos">Sacos</option>
              </select>
            </div>
          </div>
        </div>

        {/* Botón añadir */}
        <div className="flex justify-start mb-6">
          <button
            onClick={añadirProduccion}
            className="flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition"
          >
            <IconPlus className="w-5 h-5" /> Añadir producción
          </button>
        </div>

        {/* Tabla de registros */}
        {producciones.length > 0 && (
          <div className="overflow-x-auto mb-6">
            <table className="w-full border border-gray-400 rounded-xl text-center">
              <thead className="bg-green-600 text-white">
                <tr>
                  <th className="p-2 border border-gray-300">FECHA</th>
                  <th className="p-2 border border-gray-300">FINCA</th>
                  <th className="p-2 border border-gray-300">LOTE</th>
                  <th className="p-2 border border-gray-300">CULTIVO</th>
                  <th className="p-2 border border-gray-300">CANTIDAD</th>
                  <th className="p-2 border border-gray-300">UM</th>
                  <th className="p-2 border border-gray-300">ACCIONES</th>
                </tr>
              </thead>
              <tbody>
                {producciones.map((p, i) => (
                  <tr key={i} className="border border-gray-300">
                    <td className="p-2 border border-gray-300">{formatFecha(p.fecha)}</td>
                    <td className="p-2 border border-gray-300">{p.fincaNombre}</td>
                    <td className="p-2 border border-gray-300">{p.loteNombre}</td>
                    <td className="p-2 border border-gray-300">{p.cultivoNombre}</td>
                    <td className="p-2 border border-gray-300">{p.cantidad}</td>
                    <td className="p-2 border border-gray-300">{p.unidad}</td>
                    <td className="p-2 border border-gray-300">
                      <button onClick={() => eliminarProduccion(i)}>
                        <IconTrash className="w-6 h-6 text-red-500 mx-auto" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Guardar */}
        <div className="flex justify-start">
          <button
            onClick={handleGuardar}
            className="bg-green-600 text-white px-8 py-2 rounded-full hover:bg-green-700 text-lg"
          >
            Guardar producción
          </button>
        </div>
      </div>
    </LayoutMayordomo>
  );
};

export default Registrar_produccionm;
