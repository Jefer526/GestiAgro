import {
IconHome,
IconClipboardList,
IconHistory,
IconChartBar,
IconBox,
IconCloudRain,
IconTractor,
IconSettings,
IconEye,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import faviconBlanco from "../../assets/favicon-blanco.png";

const Bodega_insu = () => {
const navigate = useNavigate();

const datos = [
    {
    categoria: "Fertilizante",
    producto: "Urea",
    ingrediente: "Nitrogeno 46%",
    cantidad: 300,
    um: "Kg",
    },
    {
    categoria: "Insecticida",
    producto: "Galeon",
    ingrediente: "Tiametoxam",
    cantidad: 5,
    um: "Lt",
    },
    {
    categoria: "Fungicida",
    producto: "Zellus",
    ingrediente: "Benomyll",
    cantidad: 0.2,
    um: "Lt",
    },
];

return (
    <div className="flex">
    {/* Sidebar */}
    <div className="bg-green-600 w-28 h-screen flex flex-col items-center py-6 justify-between relative">
        <div className="flex flex-col items-center space-y-8">
        <img src={faviconBlanco} alt="Logo" className="w-11 h-11" />
        <button onClick={() => navigate("/homemayordomo")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconHome className="text-white w-11 h-11" />
        </button>
        <button onClick={() => navigate("/registrolabores")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconClipboardList className="text-white w-11 h-11" />
        </button>
        <button onClick={() => navigate("/historial_labores")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconHistory className="text-white w-11 h-11" />
        </button>
        <div className="relative w-full flex justify-center">
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-11 bg-white rounded-full z-10" />
            <button className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconBox className="text-white w-11 h-11" />
            </button>
        </div>
        <button onClick={() => navigate("/variables_climaticasm")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconCloudRain className="text-white w-11 h-11" />
        </button>
        <button onClick={() => navigate("/informes_mayordomo")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconChartBar className="text-white w-11 h-11" />
        </button>
        <button onClick={() => navigate("/equipos_mayordomo")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconTractor className="text-white w-11 h-11" />
        </button>
        </div>
        <div className="mb-6">
        <button className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconSettings className="text-white w-11 h-11" />
        </button>
        </div>
    </div>

    {/* Contenido */}
    <div className="flex-1 p-10">
        <h1 className="text-3xl font-bold text-green-700 mb-6">Bodega de insumos</h1>

        <div className="mb-6">
        <label className="block font-semibold mb-2 text-lg">Finca</label>
        <select className="border border-gray-400 rounded-md p-2 w-full max-w-md text-lg">
            <option>La esmeralda</option>
            <option>Las palmas</option>
            <option>La carolina</option>
        </select>
        </div>

        <div className="bg-white border border-gray-300 rounded-xl overflow-auto">
        <table className="w-full text-left text-base">
            <thead className="bg-green-600 text-white">
            <tr>
                <th className="px-4 py-3 border-r border-gray-300">CATEGORÍA</th>
                <th className="px-4 py-3 border-r border-gray-300">PRODUCTO</th>
                <th className="px-4 py-3 border-r border-gray-300">INGREDIENTE ACTIVO</th>
                <th className="px-4 py-3 border-r border-gray-300">CANTIDAD</th>
                <th className="px-4 py-3 border-r border-gray-300">UM</th>
                <th className="px-4 py-3">DETALLE</th>
            </tr>
            </thead>
            <tbody>
            {datos.map((d, i) => (
                <tr key={i} className="border-b border-gray-200">
                <td className="px-4 py-2 border-r border-gray-200">{d.categoria}</td>
                <td className="px-4 py-2 border-r border-gray-200">{d.producto}</td>
                <td className="px-4 py-2 border-r border-gray-200">{d.ingrediente}</td>
                <td className="px-4 py-2 border-r border-gray-200 text-center">{d.cantidad}</td>
                <td className="px-4 py-2 border-r border-gray-200 text-center">{d.um}</td>
                <td className="px-4 py-2 text-center">
                <button
                    onClick={() => navigate("/detalle_producto")}
                    className="bg-blue-100 text-blue-800 px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1"
                    >
                    <IconEye className="w-4 h-4" />
                    Detalle
                </button>

                </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>

        <div className="flex justify-center gap-20 mt-10">
        <button
        onClick={() => navigate("/agregar_productom")}
        className="bg-green-600 text-white px-8 py-2 rounded-md hover:bg-green-700 text-lg font-semibold"
        >
        Agregar producto
        </button>
        <button className="bg-green-600 text-white px-8 py-2 rounded-md hover:bg-green-700 text-lg font-semibold">
            Exportar
        </button>
        </div>
    </div>
    </div>
);
};

export default Bodega_insu;
