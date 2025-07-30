import {
    IconHome,
    IconClipboardList,
    IconHistory,
    IconChartBar,
    IconBox,
    IconCloudRain,
    IconTractor,
    IconSettings,
    } from "@tabler/icons-react";
    import { useNavigate } from "react-router-dom";
    import { useState } from "react";
    import faviconBlanco from "../../assets/favicon-blanco.png";

    const Historial_labor = () => {
    const navigate = useNavigate();
    const [expandido, setExpandido] = useState(null);
    const [filtros, setFiltros] = useState({});

    const datos = [
        {
        fecha: "19/06/25",
        labor: "Siembra",
        finca: "La Esmeralda",
        lote: 1,
        trabajador: "Camilo Restrepo",
        jornal: 1,
        ejecucion: 500,
        um: "Árboles",
        observacion:
            "El trabajador realizó la siembra en condiciones óptimas, cumpliendo con los estándares establecidos y sin contratiempos.",
        },
        {
        fecha: "19/06/25",
        labor: "Siembra",
        finca: "La Esmeralda",
        lote: 1,
        trabajador: "Laura Méndez",
        jornal: 1,
        ejecucion: 300,
        um: "Árboles",
        observacion: "Se completó la siembra sin novedades importantes.",
        },
        {
        fecha: "20/06/25",
        labor: "Guadaña Mecánica",
        finca: "La Esmeralda",
        lote: 2,
        trabajador: "Valentina Mora",
        jornal: 0.5,
        ejecucion: 2,
        um: "HAS",
        observacion: "El área fue guadañada parcialmente debido a condiciones climáticas.",
        },
        {
        fecha: "20/06/25",
        labor: "Riego",
        finca: "La Esmeralda",
        lote: 2,
        trabajador: "Pedro Ramírez",
        jornal: 1,
        ejecucion: 3,
        um: "HAS",
        observacion: "El riego se realizó completamente sin fallas técnicas.",
        },
        {
        fecha: "21/06/25",
        labor: "Fertilización",
        finca: "La Esmeralda",
        lote: 1,
        trabajador: "Sofía Gómez",
        jornal: 1,
        ejecucion: 400,
        um: "Árboles",
        observacion: "Aplicación de fertilizante NPK según recomendación técnica.",
        },
    ];

    const handleFiltro = (campo, valor) => {
        setFiltros({ ...filtros, [campo]: valor });
    };

    const toggleExpandido = (index) => {
        setExpandido(expandido === index ? null : index);
    };

    const datosFiltrados = datos.filter((item) => {
        return Object.entries(filtros).every(([campo, valor]) =>
        valor ? String(item[campo]).toLowerCase().includes(valor.toLowerCase()) : true
        );
    });

    return (
        <div className="flex">
        <div className="bg-green-600 w-28 h-screen flex flex-col items-center py-6 justify-between relative">
            <div className="flex flex-col items-center space-y-8">
            <img src={faviconBlanco} alt="Logo" className="w-11 h-11" />
            <button onClick={() => navigate("/homemayordomo")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
                <IconHome className="text-white w-11 h-11" />
            </button>
            <button onClick={() => navigate("/registrolabores")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
                <IconClipboardList className="text-white w-11 h-11" />
            </button>
            <div className="relative w-full flex justify-center">
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-11 bg-white rounded-full z-10" />
                <button className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
                <IconHistory className="text-white w-11 h-11" />
                </button>
            </div>
            <button onClick={() => navigate("/bodega_insumos")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
                <IconBox className="text-white w-11 h-11" />
            </button>
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

        <div className="flex-1 p-10">
            <h1 className="text-3xl font-bold text-green-700 mb-6">Historial labores finca: La esmeralda</h1>

            <div className="bg-white border border-gray-300 rounded-xl overflow-auto">
            <table className="w-full text-left text-base">
                <thead className="bg-green-600 text-white">
                <tr>
                    <th className="px-4 py-3 border-r">FECHA</th>
                    <th className="px-4 py-3 border-r">LABOR</th>
                    <th className="px-4 py-3 border-r">FINCA</th>
                    <th className="px-4 py-3 border-r">LOTE</th>
                    <th className="px-4 py-3 border-r">TRABAJADOR</th>
                    <th className="px-4 py-3 border-r">JORNAL</th>
                    <th className="px-4 py-3 border-r">EJECUCIÓN</th>
                    <th className="px-4 py-3 border-r">UM</th>
                    <th className="px-4 py-3">OBSERVACIÓN</th>
                </tr>
                <tr className="bg-green-50 text-black">
                    {[
                    "fecha",
                    "labor",
                    "finca",
                    "lote",
                    "trabajador",
                    "jornal",
                    "ejecucion",
                    "um",
                    ].map((campo, i) => (
                    <th key={i} className="px-2 py-1 border-r">
                        <input
                        className="w-full p-1 border rounded text-sm"
                        placeholder={`Filtrar ${campo}`}
                        onChange={(e) => handleFiltro(campo, e.target.value)}
                        />
                    </th>
                    ))}
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {datosFiltrados.map((d, i) => (
                    <tr key={i} className="border-b border-gray-200">
                    <td className="px-4 py-2 border-r">{d.fecha}</td>
                    <td className="px-4 py-2 border-r">{d.labor}</td>
                    <td className="px-4 py-2 border-r">{d.finca}</td>
                    <td className="px-4 py-2 border-r text-center">{d.lote}</td>
                    <td className="px-4 py-2 border-r">{d.trabajador}</td>
                    <td className="px-4 py-2 border-r text-center">{d.jornal}</td>
                    <td className="px-4 py-2 border-r">{d.ejecucion}</td>
                    <td className="px-4 py-2 border-r">{d.um}</td>
                    <td className="px-4 py-2 text-blue-500 font-semibold">
                        <span>{
                        expandido === i ? d.observacion : `${d.observacion.substring(0, 25)}...`
                        }</span>
                        <button
                        onClick={() => toggleExpandido(i)}
                        className="ml-2 underline hover:text-green-800"
                        >
                        {expandido === i ? "Ocultar" : "Ver"}
                        </button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        </div>
        </div>
    );
    };

export default Historial_labor;
  