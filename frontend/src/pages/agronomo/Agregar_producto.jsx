import React, { useState } from "react";
import {
  IconHome,
  IconClipboardList,
  IconChartBar,
  IconCloudRain,
  IconTractor,
  IconSettings,
  IconBox,
  IconUsersGroup,
  IconPlant,
  IconFrame,
  IconChevronLeft,
  IconCheck,
} from "@tabler/icons-react";
import faviconBlanco from "../../assets/favicon-blanco.png";
import { useNavigate } from "react-router-dom";

const Agregar_producto = () => {
  const navigate = useNavigate();

  const [producto, setProducto] = useState({
    categoria: "",
    nombre: "",
    ingrediente: "",
    cantidad: "",
    unidad: "Kg",
  });

  const [alertaVisible, setAlertaVisible] = useState(false); // 👈 estado de alerta

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  const handleGuardar = () => {
    console.log("Producto guardado:", producto);
    setAlertaVisible(true); // Mostrar alerta
    setTimeout(() => {
      setAlertaVisible(false);
      navigate("/bodegaagro"); // Redirigir después de 2s
    }, 2000);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="bg-green-600 w-28 h-screen flex flex-col items-center py-6 justify-between relative">
        <div className="flex-1 flex flex-col items-center space-y-8 overflow-y-auto scrollbar-hide pr-1">
          <img src={faviconBlanco} alt="Logo" className="w-11 h-11" />
          <button onClick={() => navigate("/homeagro")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconHome className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/laboresagro")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconClipboardList className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/informesagro")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconChartBar className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/bodegaagro")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconBox className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/variablesclimaticas")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconCloudRain className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/maquinariaequipos")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconTractor className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/manejopersonal")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconUsersGroup className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/crearfinca")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconPlant className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/crearlote")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconFrame className="text-white w-11 h-11" />
          </button>
        </div>
        <div className="sticky bottom-6 bg-green-600">
          <button onClick={() => navigate("/ajustes")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconSettings className="text-white w-11 h-11" />
          </button>
        </div>
      </div>

      {/* Contenido */}
      <div className="flex-1 p-10 overflow-y-auto bg-gray-50 relative">
        {/* Alerta */}
        {alertaVisible && (
          <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 text-base font-semibold">
            <IconCheck className="w-5 h-5" /> Producto guardado exitosamente
          </div>
        )}

        <button onClick={() => navigate("/bodegaagro")} className="flex items-center text-green-600 font-semibold mb-6 text-lg hover:underline">
          <IconChevronLeft className="w-5 h-5 mr-1" /> Volver
        </button>

        <div className="bg-white shadow-md border border-green-300 p-8 rounded-xl w-full max-w-2xl mx-auto space-y-6">
          <h2 className="text-2xl font-bold text-green-700">Agregar producto</h2>

          <div>
            <label className="block mb-1 font-semibold text-black">Categoría</label>
            <input type="text" name="categoria" placeholder="Categoría" value={producto.categoria} onChange={handleChange} className="w-full border p-3 rounded text-base" />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-black">Nombre del producto</label>
            <input type="text" name="nombre" placeholder="Nombre del producto" value={producto.nombre} onChange={handleChange} className="w-full border p-3 rounded text-base" />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-black">Ingrediente activo</label>
            <input type="text" name="ingrediente" placeholder="Ingrediente activo" value={producto.ingrediente} onChange={handleChange} className="w-full border p-3 rounded text-base" />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-black">Cantidad</label>
            <input type="number" name="cantidad" placeholder="Cantidad" value={producto.cantidad} onChange={handleChange} className="w-full border p-3 rounded text-base" />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-black">Unidad de medida</label>
            <select name="unidad" value={producto.unidad} onChange={handleChange} className="w-full border p-3 rounded text-base">
              <option value="Kg">Kg</option>
              <option value="Lt">Lt</option>
              <option value="g">g</option>
            </select>
          </div>

          <div className="flex justify-center space-x-6">
            <button onClick={handleGuardar} className="bg-green-600 text-white px-8 py-2 rounded hover:bg-green-700">
              Guardar
            </button>
            <button onClick={() => navigate("/bodegaagro")} className="bg-gray-300 text-black px-8 py-2 rounded hover:bg-gray-400">
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Agregar_producto;
