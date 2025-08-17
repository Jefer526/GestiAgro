// src/pages/agronomo/Agregar_producto.jsx
import React, { useState } from "react";
import {
  IconChevronLeft,
  IconCheck,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import LayoutAgronomo from "../../layouts/LayoutAgronomo";

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

  /* ----------------------------------
     📌 HANDLERS
  ---------------------------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  const handleGuardar = () => {
    console.log("Producto guardado:", producto);
    setAlertaVisible(true);
    setTimeout(() => {
      setAlertaVisible(false);
      navigate("/bodegaagro");
    }, 2000);
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
        className="flex items-center text-green-600 font-semibold mb-6 text-lg hover:underline"
      >
        <IconChevronLeft className="w-5 h-5 mr-1" /> Volver
      </button>

      {/* Formulario */}
      <div className="bg-white shadow-md border border-green-300 p-8 rounded-xl w-full max-w-2xl mx-auto space-y-6">
        <h2 className="text-2xl font-bold text-green-700">Agregar producto</h2>

        <div>
          <label className="block mb-1 font-semibold text-black">Categoría</label>
          <input
            type="text"
            name="categoria"
            placeholder="Categoría"
            value={producto.categoria}
            onChange={handleChange}
            className="w-full border p-3 rounded text-base"
          />
        </div>

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

        <div>
          <label className="block mb-1 font-semibold text-black">Cantidad</label>
          <input
            type="number"
            name="cantidad"
            placeholder="Cantidad"
            value={producto.cantidad}
            onChange={handleChange}
            className="w-full border p-3 rounded text-base"
          />
        </div>

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
            <option value="g">g</option>
          </select>
        </div>

        {/* Botones acción */}
        <div className="flex justify-center space-x-6">
          <button
            onClick={handleGuardar}
            className="bg-green-600 text-white px-8 py-2 rounded hover:bg-green-700"
          >
            Guardar
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
