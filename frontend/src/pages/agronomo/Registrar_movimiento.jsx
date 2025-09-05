import React, { useState, useEffect } from "react";
import { IconChevronLeft, IconCheck, IconPlus, IconTrash } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import LayoutAgronomo from "../../layouts/LayoutAgronomo";
import { productosApi, fincasApi, lotesApi, movimientosApi } from "../../services/apiClient";

const Registrar_movimiento = () => {
  const navigate = useNavigate();
  const [alertaVisible, setAlertaVisible] = useState(false);

  const [productos, setProductos] = useState([]);
  const [fincas, setFincas] = useState([]);
  const [lotes, setLotes] = useState([]);

  const [formData, setFormData] = useState({
    fecha: "",
    tipo: "Salida",
    producto: "",
    finca: "",
    lote: "",
    cantidad: "",
    unidad: "Kg", 
  });

  const [movimientos, setMovimientos] = useState([]);

  /* Cargar productos y fincas al inicio */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodsRes, fincasRes] = await Promise.all([
          productosApi.list(),
          fincasApi.list(),
        ]);
        setProductos(prodsRes.data);
        setFincas(fincasRes.data);
      } catch (err) {
        console.error("❌ Error cargando datos:", err);
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

    // cuando cambia producto, traer su unidad
    if (name === "producto") {
      const productoObj = productos.find((p) => p.id === Number(value));
      setFormData({
        ...formData,
        producto: value,
        unidad: productoObj ? productoObj.unidad : "Kg",
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const añadirMovimiento = () => {
    const { fecha, tipo, producto, finca, lote, cantidad, unidad } = formData;
    if (!fecha || !tipo || !producto || !finca || !cantidad) {
      return alert("Completa todos los campos obligatorios");
    }

    const productoObj = productos.find((p) => p.id === Number(producto));
    const fincaObj = fincas.find((f) => f.id === Number(finca));
    const loteObj = lotes.find((l) => l.id === Number(lote));

    setMovimientos([
      ...movimientos,
      {
        ...formData,
        productoNombre: productoObj?.nombre || "",
        fincaNombre: fincaObj?.nombre || "",
        loteNombre: loteObj ? loteObj.lote : "",
      },
    ]);

    setFormData({
      fecha: "",
      tipo: "Salida",
      producto: "",
      finca: "",
      lote: "",
      cantidad: "",
      unidad: "Kg",
    });
  };

  const eliminarMovimiento = (idx) => {
    setMovimientos(movimientos.filter((_, i) => i !== idx));
  };

  const handleGuardar = async () => {
    if (movimientos.length === 0) return alert("No has añadido movimientos");

    try {
      await Promise.all(movimientos.map((m) => movimientosApi.create(m)));

      setAlertaVisible(true);
      setTimeout(() => {
        setAlertaVisible(false);
        navigate("/Bodegaagro");
      }, 2000);
    } catch (err) {
      console.error("❌ Error guardando movimientos:", err);
      alert("Error al guardar los movimientos");
    }
  };

  /* Formatear fecha YYYY-MM-DD → DD-MM-YYYY */
  const formatFecha = (fecha) => {
    if (!fecha) return "";
    const [y, m, d] = fecha.split("-");
    return `${d}-${m}-${y}`;
  };

  /* ----------------------------------
      RENDER
  ---------------------------------- */
  return (
    <LayoutAgronomo>
      {alertaVisible && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 text-base font-semibold">
          <IconCheck className="w-5 h-5" /> Movimientos guardados exitosamente
        </div>
      )}

      <button
        onClick={() => navigate("/Bodegaagro")}
        className="flex items-center text-green-700 font-semibold mb-6 text-lg hover:underline"
      >
        <IconChevronLeft className="w-5 h-5 mr-1" /> Volver
      </button>

      <div className="bg-white border border-gray-200 rounded-xl shadow-md p-8 w-[1100px] mx-auto">
        <h1 className="text-3xl font-bold text-green-700 mb-6">
          Registrar movimientos del producto
        </h1>

        {/* Formulario */}
        <div className="space-y-5 mb-6">
          {/* Línea 1: Fecha */}
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

          {/* Línea 2: Finca y Lote */}
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
                  <option key={f.id} value={f.id}>
                    {f.nombre}
                  </option>
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
                  <option key={l.id} value={l.id}>
                    {l.lote}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Línea 3: Tipo y Producto */}
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="block font-semibold mb-1">Tipo:</label>
              <select
                name="tipo"
                value={formData.tipo}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-1.5"
              >
                <option value="Entrada">Entrada</option>
                <option value="Salida">Salida</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold mb-1">Producto:</label>
              <select
                name="producto"
                value={formData.producto}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-1.5"
              >
                <option value="">Selecciona producto</option>
                {productos.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.nombre}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Línea 4: Cantidad y Unidad */}
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
                className="w-full border border-gray-300 rounded px-3 py-1.5 bg-gray-100"
                disabled // bloqueado para que siempre siga la unidad del producto
              >
                <option value="Kg">Kg</option>
                <option value="Lt">Lt</option>
              </select>
            </div>
          </div>
        </div>

        {/* Botón añadir */}
        <div className="flex justify-start mb-6">
          <button
            onClick={añadirMovimiento}
            className="flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition"
          >
            <IconPlus className="w-5 h-5" /> Añadir movimiento
          </button>
        </div>

        {/* Tabla de movimientos */}
        {movimientos.length > 0 && (
          <div className="overflow-x-auto mb-6">
            <table className="w-full border border-gray-400 rounded-xl text-center">
              <thead className="bg-green-600 text-white">
                <tr>
                  <th className="p-2 border border-gray-300">FECHA</th>
                  <th className="p-2 border border-gray-300">TIPO</th>
                  <th className="p-2 border border-gray-300">PRODUCTO</th>
                  <th className="p-2 border border-gray-300">FINCA</th>
                  <th className="p-2 border border-gray-300">LOTE</th>
                  <th className="p-2 border border-gray-300">CANTIDAD</th>
                  <th className="p-2 border border-gray-300">UM</th>
                  <th className="p-2 border border-gray-300">ACCIONES</th>
                </tr>
              </thead>
              <tbody>
                {movimientos.map((m, i) => (
                  <tr key={i} className="border border-gray-300">
                    <td className="p-2 border border-gray-300">{formatFecha(m.fecha)}</td>
                    <td className="p-2 border border-gray-300">{m.tipo}</td>
                    <td className="p-2 border border-gray-300">{m.productoNombre}</td>
                    <td className="p-2 border border-gray-300">{m.fincaNombre}</td>
                    <td className="p-2 border border-gray-300">{m.loteNombre}</td>
                    <td className="p-2 border border-gray-300">{m.cantidad}</td>
                    <td className="p-2 border border-gray-300">{m.unidad}</td>
                    <td className="p-2 border border-gray-300">
                      <button onClick={() => eliminarMovimiento(i)}>
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
            Guardar movimientos
          </button>
        </div>
      </div>
    </LayoutAgronomo>
  );
};

export default Registrar_movimiento;
