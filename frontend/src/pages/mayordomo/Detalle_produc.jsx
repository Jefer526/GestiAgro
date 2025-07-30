import {
IconHome,
IconClipboardList,
IconHistory,
IconChartBar,
IconBox,
IconCloudRain,
IconTractor,
IconSettings,
IconChevronLeft,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import faviconBlanco from "../../assets/favicon-blanco.png";

const Detalle_produc = () => {
const navigate = useNavigate();

const movimientos = [
    { fecha: "2025-06-15", lote: 1, cantidad: 50, um: "Kg", tipo: "Entrada" },
    { fecha: "2025-06-16", lote: 2, cantidad: 20, um: "Kg", tipo: "Salida" },
    { fecha: "2025-06-17", lote: 3, cantidad: 45, um: "Kg", tipo: "Entrada" },
];

return (
    <div className="flex absolute top-0 left-0 w-full h-full bg-white z-50">
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
        <button className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconCloudRain className="text-white w-11 h-11" />
        </button>
        <button className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconChartBar className="text-white w-11 h-11" />
        </button>
        <button className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
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
        <button
        onClick={() => navigate("/bodega_insumos")}
        className="flex items-center text-green-600 font-semibold mb-6 text-lg hover:underline"
        >
        <IconChevronLeft className="w-5 h-5 mr-1" /> Volver
        </button>

        <h1 className="text-3xl font-bold text-green-700 mb-6">Detalle del producto</h1>

        <div className="border border-gray-400 rounded-lg p-6 text-lg grid grid-cols-2 gap-y-2 max-w-3xl mb-10">
        <div><span className="font-bold">Producto:</span> Urea</div>
        <div><span className="font-bold">Ingrediente activo:</span> Nitrogeno 46%</div>
        <div><span className="font-bold">Finca:</span> La esmeralda</div>
        <div><span className="font-bold">Categoría:</span> Fertilizante</div>
        <div><span className="font-bold">Cantidad:</span> 300</div>
        <div><span className="font-bold">Um:</span> Kg</div>
        </div>

        <h2 className="text-2xl font-bold text-green-700 mb-4">Movimiento del producto</h2>
        <div className="bg-white border border-gray-300 rounded-xl overflow-auto">
        <table className="w-full text-left text-base">
            <thead className="bg-green-600 text-white">
            <tr>
                <th className="px-4 py-3 border-r border-gray-300">FECHA</th>
                <th className="px-4 py-3 border-r border-gray-300">LOTE</th>
                <th className="px-4 py-3 border-r border-gray-300">CANTIDAD</th>
                <th className="px-4 py-3 border-r border-gray-300">UM</th>
                <th className="px-4 py-3">TIPO DE MOVIMIENTO</th>
            </tr>
            </thead>
            <tbody>
            {movimientos.map((m, i) => (
                <tr key={i} className="border-b border-gray-200">
                <td className="px-4 py-2 border-r border-gray-200">{m.fecha}</td>
                <td className="px-4 py-2 border-r border-gray-200 text-center">{m.lote}</td>
                <td className="px-4 py-2 border-r border-gray-200 text-center">{m.cantidad}</td>
                <td className="px-4 py-2 border-r border-gray-200 text-center">{m.um}</td>
                <td className="px-4 py-2 text-left">{m.tipo}</td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>

        <div className="flex justify-end mt-6">
        <button className="bg-green-600 text-white px-8 py-2 rounded-md hover:bg-green-700 text-lg font-semibold">
            Exportar historial
        </button>
        </div>
    </div>
    </div>
);
};

export default Detalle_produc;
