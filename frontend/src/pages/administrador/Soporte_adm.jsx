import React, { useState, useRef, useEffect } from "react";
import {
  IconHome,
  IconUsers,
  IconCloudUpload,
  IconTool,
  IconSettings,
  IconLogout,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import faviconBlanco from "../../assets/favicon-blanco.png";

const Soporte_adm = () => {
  const navigate = useNavigate();
  const tarjetaRef = useRef(null);
  const [mostrarTarjeta, setMostrarTarjeta] = useState(false);
  const letraInicial = "J";

  useEffect(() => {
    const clickFueraTarjeta = (e) => {
      if (tarjetaRef.current && !tarjetaRef.current.contains(e.target)) {
        setMostrarTarjeta(false);
      }
    };
    document.addEventListener("mousedown", clickFueraTarjeta);
    return () => document.removeEventListener("mousedown", clickFueraTarjeta);
  }, []);

  const solicitudes = [
    {
      id: 1,
      nombre: "Екатерина Лукшецкая",
      rol: "Ing. Agrónomo",
      tiempo: "Hace 1 día",
      mensaje:
        "Lorem ipsum dolor sit amet consectetur adipiscing, elit mauris curabitur nam nisi maecenas vulputate, metus nibh ultrices nisl consequat. Ridiculus tortor taciti eleifend facilisi commodo vulputate nullam metus purus porta quisque fames, mi risus phasellus leo consequat tincidunt nec mattis donec curae eu faucibus, torquent ac accumsan tempor sociis feugiat pharetra sed tempus integer gravida. Diam mollis interdum vestibulum placerat dignissim sem litora sociis, conubia pulvinar ac platea ut faucibus ornare magna egestas, cubilia tortor senectus tincidunt cursus dis turpis.",
      avatar: "https://randomuser.me/api/portraits/women/40.jpg",
      estado: ["Aceptar", "Hecho"],
    },
    {
      id: 2,
      nombre: "Armen Sargsyan",
      rol: "Mayordomo",
      tiempo: "Hace 2 días",
      mensaje:
        "Pellentesque leo tincidunt penatibus tempus suspendisse accumsan ullamcorper netus risus cras sociis a fames, non eros cubilia neque mattis natoque nec montes sagittis at maecenas habitasse. Feugiat aptent felis habitant cursus tempor leo iaculis, dictum torquent aenean et nulla tempus fermentum, magnis sollicitudin ac urna molestie morbi. Potenti sociosqu ridiculus vehicula montes nostra enim eu curabitur semper, lectus pulvinar sagittis nisi porttitor massa quis feugiat.",
      avatar: "https://randomuser.me/api/portraits/women/76.jpg",
      estado: ["En proceso", "Hecho"],
    },
  ];

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="bg-green-600 w-28 h-screen flex flex-col items-center py-6 justify-between relative">
        <div className="flex flex-col items-center space-y-8">
          <img src={faviconBlanco} alt="Logo" className="w-11 h-11" />
          <button onClick={() => navigate("/homeadm")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconHome className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/admuser")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconUsers className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/copias")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconCloudUpload className="text-white w-11 h-11" />
          </button>
          <div className="relative">
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-11 bg-white rounded-full" />
            <button className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
              <IconTool className="text-white w-11 h-11" />
            </button>
          </div>
        </div>
        <div className="relative mb-6">
          <button
            onClick={() => setMostrarTarjeta(!mostrarTarjeta)}
            className="bg-white w-12 h-12 rounded-full flex items-center justify-center text-green-600 font-bold text-xl shadow hover:scale-110 transition"
          >
            {letraInicial}
          </button>
          {mostrarTarjeta && (
            <div
              ref={tarjetaRef}
              className="absolute bottom-16 left-14 w-52 bg-white/95 border-2 border-gray-300 rounded-xl shadow-2xl py-3 z-50"
            >
              <button onClick={() => navigate("/ajustesadm")} className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                <IconSettings className="w-5 h-5 mr-2 text-green-600" /> Ajustes
              </button>
              <button onClick={() => navigate("/")} className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-600">
                <IconLogout className="w-5 h-5 mr-2 text-red-600" /> Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 p-8">
        <h1 className="text-4xl font-bold text-green-600 mb-6">Soporte</h1>

        <div className="space-y-6">
          {solicitudes.map((s) => (
            <div key={s.id} className="w-[700px] border rounded-xl p-4 shadow-sm flex flex-col gap-3">
              <div className="flex items-center gap-4">
                {s.avatar ? (
                  <img src={s.avatar} alt={s.nombre} className="w-12 h-12 rounded-full object-cover" />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center font-semibold text-xl text-white">
                    {s.nombre[0]}
                  </div>
                )}
                <div>
                  <p className="font-semibold text-gray-900">{s.nombre}</p>
                  <p className="text-sm text-gray-500">{s.rol}</p>
                  <p className="text-sm text-gray-400">{s.tiempo}</p>
                </div>
              </div>
              <p className="text-gray-700 whitespace-pre-wrap break-words">{s.mensaje}</p>
              <div className="flex gap-2 mt-2">
                {s.estado.map((estado, i) => (
                  <button
                    key={i}
                    className={`px-4 py-1 rounded-full text-sm font-medium ${
                      estado === "Hecho"
                        ? "bg-green-100 text-green-700"
                        : estado === "Aceptar"
                        ? "bg-green-600 text-white hover:bg-green-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {estado}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Soporte_adm;

