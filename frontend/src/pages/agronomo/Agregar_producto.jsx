// src/pages/agronomo/Agregar_producto.jsx
import React, { useState } from "react";
import { IconChevronLeft, IconCheck } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import LayoutAgronomo from "../../layouts/LayoutAgronomo";
import { productosApi } from "../../services/apiClient";

const Agregar_producto = () => {
  const navigate = useNavigate();

  /* ----------------------------------
     📌 ESTADOS
  ---------------------------------- */
  const [producto, setProducto] = useState({
    categoria: "",
    nombre: "",
    ingrediente: "",
    cantidad: "",
    unidad: "Kg",
  });

  const [alertaVisible, setAlertaVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  /* ----------------------------------
     📌 HANDLERS
  ---------------------------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  const handleGuardar = async () => {
    if (!producto.nombre || !producto.categoria) {
      alert("Debes completar al menos la categoría y el nombre del producto");
      return;
    }

    try {
      setLoading(true);
      // 📤 Enviar al backend
      await productosApi.create({
        categoria: producto.categoria,
        nombre: producto.nombre,
        ingrediente: producto.ingrediente,
        unidad: producto.unidad,
      });

      // ✅ Mostrar confirmación
      setAlertaVisible(true);
      setTimeout(() => {
        setAlertaVisible(false);
        navigate("/bodegaagro");
      }, 2000);
    } catch (err) {
      console.error("❌ Error al crear producto:", err);
      alert("Hubo un error al guardar el producto");
    } finally {
      setLoading(false);
    }
  };

  /* ----------------------------------
     📌 RENDER
  ---------------------------------- */
  return (
    <LayoutAgronomo>
      {/* Alerta */}
      {alertaVisible && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 text-base font-semibold">
          <IconCheck className="w-5 h-5" /> Producto guardado exitosamente
        </div>
      )}

      {/* Botón volver */}
      <button
        onClick={() => navigate("/bodegaagro")}
        className="flex items-center text-green-700 font-semibold mb-4 text-lg hover:underline"
      >
        <IconChevronLeft className="w-5 h-5 mr-1" /> Volver
      </button>

      {/* Formulario */}
      <div className="bg-white shadow-md border border-gray-200 p-8 rounded-xl w-full max-w-2xl mx-auto space-y-6">
        <h2 className="text-3xl font-bold text-green-700">Agregar producto</h2>

        {/* Categoría */}
        <div>
          <label className="block mb-1 font-semibold text-black">Categoría</label>
          <select
            name="categoria"
            value={producto.categoria}
            onChange={handleChange}
            className="w-full border p-3 rounded text-base"
          >
            <option value="">Selecciona una categoría</option>
            <option value="Combustible">Combustible</option>
            <option value="Fertilizante">Fertilizante</option>
            <option value="Insecticida">Insecticida</option>
            <option value="Fungicida">Fungicida</option>
            <option value="Biologico">Biológico</option>
            <option value="Otros">Otros</option>
          </select>
        </div>

        {/* Nombre */}
        <div>
          <label className="block mb-1 font-semibold text-black">Nombre del producto</label>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre del producto"
            value={producto.nombre}
            onChange={handleChange}
            className="w-full border p-3 rounded text-base"
          />
        </div>

        {/* Ingrediente */}
        <div>
          <label className="block mb-1 font-semibold text-black">Ingrediente activo</label>
          <input
            type="text"
            name="ingrediente"
            placeholder="Ingrediente activo"
            value={producto.ingrediente}
            onChange={handleChange}
            className="w-full border p-3 rounded text-base"
          />
        </div>

        {/* Unidad */}
        <div>
          <label className="block mb-1 font-semibold text-black">Unidad de medida</label>
          <select
            name="unidad"
            value={producto.unidad}
            onChange={handleChange}
            className="w-full border p-3 rounded text-base"
          >
            <option value="Kg">Kg</option>
            <option value="Lt">Lt</option>
          </select>
        </div>

        {/* Botones acción */}
        <div className="flex justify-center space-x-6">
          <button
            onClick={handleGuardar}
            disabled={loading}
            className="bg-green-600 text-white px-8 py-2 rounded hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? "Guardando..." : "Guardar"}
          </button>
          <button
            onClick={() => navigate("/bodegaagro")}
            className="bg-gray-300 text-black px-8 py-2 rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
        </div>
      </div>
    </LayoutAgronomo>
  );
};

export default Agregar_producto;
