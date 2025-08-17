// src/pages/agronomo/Editar_empleado.jsx
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  IconArrowLeft,
  IconCheck,
  IconSearch,
} from "@tabler/icons-react";
import LayoutAgronomo from "../../layouts/LayoutAgronomo";

// Datos iniciales de ejemplo
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

  // Estados principales
  const [empleados, setEmpleados] = useState(empleadosIniciales);
  const [seleccionadoId, setSeleccionadoId] = useState(empleados[0]?.id || "");
  const [form, setForm] = useState(() => {
    const e = empleados[0] || {};
    return {
      id: e.id || "",
      nombre: e.nombre || "",
      cargo: e.cargo || "",
      estado: e.estado || ESTADOS[0],
      finca: e.finca || FINCAS[0],
      telefono: e.telefono || "",
    };
  });

  // Buscador
  const [q, setQ] = useState("");
  const [openSug, setOpenSug] = useState(false);
  const sugRef = useRef(null);
  useEffect(() => {
    const h = (e) => {
      if (sugRef.current && !sugRef.current.contains(e.target)) setOpenSug(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const resultados = empleados.filter((e) => {
    const s = `${e.id} ${e.nombre} ${e.cargo} ${e.estado} ${e.finca} ${e.telefono}`.toLowerCase();
    return s.includes(q.trim().toLowerCase());
  });

  // Perfil usuario → se pasa al Layout
  const nombreUsuario = "Juan Pérez";
  const letraInicial = (nombreUsuario?.trim()?.[0] || "U").toUpperCase();

  // Cargar datos de empleado seleccionado
  const cargarEmpleado = (id) => {
    const e = empleados.find((x) => x.id === id);
    if (!e) return;
    setSeleccionadoId(id);
    setForm({ id: e.id, nombre: e.nombre, cargo: e.cargo, estado: e.estado, finca: e.finca, telefono: e.telefono });
  };

  // Manejo de cambios en formulario
  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Guardar cambios
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
    <LayoutAgronomo active="/manejopersonal" letraInicial={letraInicial}>
      <div className="p-10 w-full">
        {/* Alerta de éxito */}
        {alertaVisible && (
          <div className="fixed top-3 left-1/2 -translate-x-1/2 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 text-base font-semibold">
            <IconCheck className="w-5 h-5" /> Cambios guardados exitosamente
          </div>
        )}

        {/* Botón volver */}
        <div className="mb-4">
          <button onClick={() => navigate("/manejopersonal")} className="flex items-center text-green-700 font-semibold mb-6 hover:underline">
            <IconArrowLeft className="w-5 h-5 mr-2" /> Volver
          </button>
        </div>

        {/* Formulario de edición */}
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

          {/* Campos del formulario */}
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

            {/* Botón guardar */}
            <div className="md:col-span-2 flex justify-center mt-2">
              <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 text-lg font-semibold">
                Guardar cambios
              </button>
            </div>
          </form>
        </div>
      </div>
    </LayoutAgronomo>
  );
};

export default Editar_empleado;
