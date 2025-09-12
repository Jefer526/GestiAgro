import React, { useState, useEffect } from "react";
import { IconChevronLeft, IconCheck, IconPlus, IconTrash } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import LayoutAgronomo from "../../layouts/LayoutAgronomo";
import { fincasApi, lotesApi, produccionApi } from "../../services/apiClient";

const Registrar_produccion = () => {
  const navigate = useNavigate();
  const [alertaVisible, setAlertaVisible] = useState(false);

  const [fincas, setFincas] = useState([]);
  const [lotes, setLotes] = useState([]);

  const [formData, setFormData] = useState({
    fecha: "",
    finca: "",
    lote: "",
    cantidad: "",
    unidad: "Kg",
  });

  const [producciones, setProducciones] = useState([]);

  /* Cargar fincas al inicio */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resFincas = await fincasApi.list();
        setFincas(resFincas.data);
      } catch (err) {
        console.error("❌ Error cargando fincas:", err);
      }
    };
    fetchData();
  }, []);

  /* Cargar lotes según finca seleccionada */
  useEffect(() => {
    const fetchLotes = async () => {
      if (formData.finca) {
        try {
          const res = await lotesApi.listByFinca(formData.finca);
          setLotes(res.data);
        } catch (err) {
          console.error("❌ Error cargando lotes:", err);
        }
      } else {
        setLotes([]);
      }
    };
    fetchLotes();
  }, [formData.finca]);

  /* Handlers */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const añadirProduccion = () => {
    const { fecha, finca, lote, cantidad } = formData;
    if (!fecha || !finca || !lote || !cantidad) {
      return alert("Completa todos los campos obligatorios");
    }

    const fincaObj = fincas.find((f) => f.id === Number(finca));
    const loteObj = lotes.find((l) => l.id === Number(lote));

    setProducciones([
      ...producciones,
      {
        ...formData,
        fincaNombre: fincaObj?.nombre || "",
        loteNombre: loteObj ? loteObj.lote : "",
        cultivoNombre: loteObj ? loteObj.cultivo : "",
      },
    ]);

    setFormData({
      fecha: "",
      finca: "",
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
      await Promise.all(
        producciones.map((p) =>
          produccionApi.create({
            fecha: p.fecha,
            finca: p.finca,
            lote: p.lote,
            cantidad: p.cantidad,
            unidad: p.unidad,
          })
        )
      );

      setAlertaVisible(true);
      setTimeout(() => {
        setAlertaVisible(false);
        navigate("/produccionagro");
      }, 2000);
    } catch (err) {
      console.error("❌ Error guardando producción:", err);
      alert("Error al guardar");
    }
  };

  const formatFecha = (fecha) => {
    if (!fecha) return "";
    const [y, m, d] = fecha.split("-");
    return `${d}-${m}-${y}`;
  };

  return (
    <LayoutAgronomo>
      {alertaVisible && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 text-base font-semibold">
          <IconCheck className="w-5 h-5" /> Producción guardada exitosamente
        </div>
      )}

      <button
        onClick={() => navigate("/Produccionagro")}
        className="flex items-center text-green-700 font-semibold mb-6 text-lg hover:underline"
      >
        <IconChevronLeft className="w-5 h-5 mr-1" /> Volver
      </button>

      <div className="bg-white border border-gray-200 rounded-xl shadow-md p-8 w-[1100px] mx-auto">
        <h1 className="text-3xl font-bold text-green-700 mb-6">Registrar producción agrícola</h1>

        {/* Formulario */}
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

          {/* Finca y Lote */}
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="block font-semibold mb-1">Finca:</label>
              <select
                name="finca"
                value={formData.finca}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-1.5"
              >
                <option value="">Selecciona finca</option>
                {fincas.map((f) => (
                  <option key={f.id} value={f.id}>{f.nombre}</option>
                ))}
              </select>
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
                  <option key={l.id} value={l.id}>{l.lote}</option>
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
    </LayoutAgronomo>
  );
};

export default Registrar_produccion;
