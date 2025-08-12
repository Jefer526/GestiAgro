import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  IconHome, IconClipboardList, IconChartBar, IconCloudRain,
  IconTractor, IconSettings, IconBox, IconUsersGroup,
  IconPlant, IconFrame, IconArrowLeft, IconCheck, IconTool, IconLogout, IconSearch,
} from "@tabler/icons-react";
import faviconBlanco from "../../assets/favicon-blanco.png";

const empleadosIniciales = [
  { id: "01", nombre: "Juan Pérez", cargo: "Gerente", estado: "Activo", finca: "La Esmeralda", telefono: "3124567890" },
  { id: "02", nombre: "Pedro Ramírez", cargo: "Ing Agrónomo", estado: "Activo", finca: "La Carolina", telefono: "3201112233" },
  { id: "03", nombre: "Ana González", cargo: "Mayordomo", estado: "Inactivo", finca: "Las Palmas", telefono: "3119876543" },
  { id: "04", nombre: "María Rojas", cargo: "Operario de campo", estado: "Activo", finca: "La Carolina", telefono: "3188888888" },
];

const FINCAS = ["La Esmeralda", "La Carolina", "Las Palmas"];
const ESTADOS = ["Activo", "Inactivo", "Vacaciones", "Suspendido"];

const Editar_empleado = () => {
  const navigate = useNavigate();

  const [empleados, setEmpleados] = useState(empleadosIniciales);
  const [seleccionadoId, setSeleccionadoId] = useState(empleados[0]?.id || "");
  const [form, setForm] = useState(() => {
    const e = empleados[0] || {};
    return { id: e.id || "", nombre: e.nombre || "", cargo: e.cargo || "", estado: e.estado || ESTADOS[0], finca: e.finca || FINCAS[0], telefono: e.telefono || "" };
  });

  const [q, setQ] = useState("");
  const [openSug, setOpenSug] = useState(false);
  const sugRef = useRef(null);
  useEffect(() => {
    const h = (e) => { if (sugRef.current && !sugRef.current.contains(e.target)) setOpenSug(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const resultados = empleados.filter((e) => {
    const s = `${e.id} ${e.nombre} ${e.cargo} ${e.estado} ${e.finca} ${e.telefono}`.toLowerCase();
    return s.includes(q.trim().toLowerCase());
  });

  const nombreUsuario = "Juan Pérez";
  const letraInicial = (nombreUsuario?.trim()?.[0] || "U").toUpperCase();
  const [mostrarTarjetaPerfil, setMostrarTarjetaPerfil] = useState(false);
  const tarjetaPerfilRef = useRef(null);
  useEffect(() => {
    const clickFuera = (e) => {
      if (tarjetaPerfilRef.current && !tarjetaPerfilRef.current.contains(e.target) && !e.target.closest("#btnPerfil")) {
        setMostrarTarjetaPerfil(false);
      }
    };
    document.addEventListener("mousedown", clickFuera);
    return () => document.removeEventListener("mousedown", clickFuera);
  }, []);

  const cargarEmpleado = (id) => {
    const e = empleados.find((x) => x.id === id);
    if (!e) return;
    setSeleccionadoId(id);
    setForm({ id: e.id, nombre: e.nombre, cargo: e.cargo, estado: e.estado, finca: e.finca, telefono: e.telefono });
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const [alertaVisible, setAlertaVisible] = useState(false);
  const guardarCambios = (e) => {
    e.preventDefault();
    setEmpleados((prev) => prev.map((emp) => (emp.id === form.id ? { ...emp, ...form } : emp)));
    setAlertaVisible(true);
    setTimeout(() => {
      setAlertaVisible(false);
      navigate("/manejopersonal");
    }, 2000);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="bg-green-600 w-28 h-screen flex flex-col items-center py-6 justify-between relative">
        <div className="sticky top-0 mb-6 bg-green-600 z-10">
          <img src={faviconBlanco} alt="Logo" className="w-11 h-11 mx-auto" />
        </div>

        <div className="flex-1 flex flex-col items-center space-y-8 pr-1 overflow-y-auto scrollbar-hide-only">
          <div className="relative">
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-11 bg-white rounded-full" />
            <button onClick={() => navigate("/Homeagro")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
              <IconHome className="text-white w-11 h-11" />
            </button>
          </div>
          <button onClick={() => navigate("/Laboresagro")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"><IconClipboardList className="text-white w-11 h-11" /></button>
          <button onClick={() => navigate("/Informesagro")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"><IconChartBar className="text-white w-11 h-11" /></button>
          <button onClick={() => navigate("/Bodegaagro")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"><IconBox className="text-white w-11 h-11" /></button>
          <button onClick={() => navigate("/variablesclimaticas")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"><IconCloudRain className="text-white w-11 h-11" /></button>
          <button onClick={() => navigate("/maquinariaequipos")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"><IconTractor className="text-white w-11 h-11" /></button>
          <button onClick={() => navigate("/manejopersonal")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"><IconUsersGroup className="text-white w-11 h-11" /></button>
          <button onClick={() => navigate("/crearfinca")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"><IconPlant className="text-white w-11 h-11" /></button>
          <button onClick={() => navigate("/crearlote")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"><IconFrame className="text-white w-11 h-11" /></button>
        </div>

        <div className="relative mb-4">
          <button
            id="btnPerfil"
            onClick={() => setMostrarTarjetaPerfil(!mostrarTarjetaPerfil)}
            className="bg-white w-12 h-12 rounded-full flex items-center justify-center text-green-600 font-bold text-xl shadow hover:scale-110 transition"
          >
            {letraInicial}
          </button>

          {mostrarTarjetaPerfil && (
            <div
              ref={tarjetaPerfilRef}
              className="absolute bottom-16 left-14 w-52 bg-white/95 border-2 border-grey-300 rounded-xl shadow-2xl py-3 z-50"
            >
              <button onClick={() => { setMostrarTarjetaPerfil(false); navigate("/ajustesagro"); }} className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                <IconSettings className="w-5 h-5 mr-2 text-green-600" /> Ajustes
              </button>
              <button onClick={() => { setMostrarTarjetaPerfil(false); navigate("/soporteagro"); }} className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                <IconTool className="w-5 h-5 mr-2 text-green-600" /> Soporte
              </button>
              <button onClick={() => { setMostrarTarjetaPerfil(false); navigate("/login"); }} className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-600">
                <IconLogout className="w-5 h-5 mr-2 text-red-600" /> Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Contenido */}
      <div className="flex-1 p-10 overflow-auto relative bg-gray-50">
        {alertaVisible && (
          <div className="fixed top-3 left-1/2 -translate-x-1/2 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 text-base font-semibold">
            <IconCheck className="w-5 h-5" /> Cambios guardados exitosamente
          </div>
        )}

        <div className="mb-4">
          <button onClick={() => navigate("/manejopersonal")} className="flex items-center text-green-700 font-semibold mb-6 hover:underline">
            <IconArrowLeft className="w-5 h-5 mr-2" /> Volver
          </button>
        </div>

        {/* Recuadro con título */}
        <div className="bg-white border-2 border-green-200 rounded-lg max-w-4xl mx-auto px-8 py-8 shadow-lg">
          <h1 className="text-3xl font-bold text-green-600 mb-8">Editar datos de empleado</h1>

          {/* Buscador */}
          <div className="mb-6" ref={sugRef}>
            <label className="block font-bold text-gray-700 mb-2">Buscar empleado</label>
            <div className="relative">
              <IconSearch className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Nombre, ID, cargo, finca o teléfono…"
                className="w-full border rounded pl-9 pr-3 py-2"
                value={q}
                onChange={(e) => { setQ(e.target.value); setOpenSug(true); }}
                onFocus={() => setOpenSug(true)}
              />
              {openSug && q.trim() !== "" && (
                <div className="absolute z-40 mt-1 w-full bg-white border rounded shadow max-h-60 overflow-auto">
                  {resultados.length === 0 && (
                    <div className="px-3 py-2 text-sm text-gray-500">Sin resultados</div>
                  )}
                  {resultados.map((e) => (
                    <button
                      key={e.id}
                      type="button"
                      className="w-full text-left px-3 py-2 hover:bg-gray-100"
                      onClick={() => { cargarEmpleado(e.id); setQ(`${e.nombre} (${e.id})`); setOpenSug(false); }}
                    >
                      <span className="font-medium">{e.nombre}</span> · <span className="text-sm text-gray-600">ID {e.id} — {e.cargo} — {e.finca}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Formulario */}
          <form onSubmit={guardarCambios} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block font-bold text-gray-700 mb-2">ID</label>
              <input type="text" className="w-full border rounded px-4 py-3 bg-gray-50" value={form.id} readOnly />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-2">Nombre completo</label>
              <input name="nombre" type="text" className="w-full border rounded px-4 py-3" value={form.nombre} onChange={onChange} required />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-2">Cargo</label>
              <input name="cargo" type="text" className="w-full border rounded px-4 py-3" value={form.cargo} onChange={onChange} required />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-2">Estado</label>
              <select name="estado" className="w-full border rounded px-4 py-3" value={form.estado} onChange={onChange} required>
                {ESTADOS.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-2">Finca</label>
              <select name="finca" className="w-full border rounded px-4 py-3" value={form.finca} onChange={onChange} required>
                {FINCAS.map((f) => <option key={f}>{f}</option>)}
              </select>
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-2">Teléfono</label>
              <input name="telefono" type="text" className="w-full border rounded px-4 py-3" value={form.telefono} onChange={onChange} required />
            </div>

            <div className="md:col-span-2 flex justify-center mt-2">
              <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 text-lg font-semibold">
                Guardar cambios
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Editar_empleado;






