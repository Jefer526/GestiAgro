// src/pages/Landing.jsx
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  IconUsers,
  IconTractor,
  IconCloudRain,
  IconChartBar,
  IconClipboardList,
  IconBox,
  IconTool,
  IconDeviceFloppy,
  IconSettings,
  IconPhone,
  IconMail,
  IconMapPin,
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandWhatsapp,
} from "@tabler/icons-react";
import faviconBlanco from "../../assets/favicon-blanco.png";

const Landing = () => {
  const navigate = useNavigate();

  // refs para scroll suave
  const queEsRef = useRef(null);
  const modulosRef = useRef(null);
  const serviciosRef = useRef(null);
  const contactoRef = useRef(null);

  const [enviando, setEnviando] = useState(false);
  const [form, setForm] = useState({ nombre: "", email: "", mensaje: "" });

  const scrollTo = (ref) => ref?.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const onChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    setEnviando(true);
    setTimeout(() => {
      setEnviando(false);
      alert("¡Gracias! Tu mensaje fue enviado. Te responderemos pronto.");
      setForm({ nombre: "", email: "", mensaje: "" });
    }, 1200);
  };

  const ModuleCard = ({ icon, title, desc }) => (
    <div className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1">
      <div className="mb-4 inline-flex rounded-xl bg-green-50 p-3 group-hover:bg-green-100 transition-colors">
        {icon}
      </div>
      <h4 className="text-lg font-semibold text-gray-800">{title}</h4>
      <p className="mt-2 text-sm text-gray-600">{desc}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* NAVBAR */}
      <header className="sticky top-0 z-40 backdrop-blur bg-white/80 border-b">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={faviconBlanco} alt="GestiAgro" className="w-9 h-9 rounded" />
            <span className="font-bold text-lg text-green-700">GestiAgro</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <button onClick={() => scrollTo(queEsRef)} className="hover:text-green-700">¿Qué es?</button>
            <button onClick={() => scrollTo(modulosRef)} className="hover:text-green-700">Módulos</button>
            <button onClick={() => scrollTo(serviciosRef)} className="hover:text-green-700">Servicios</button>
            <button onClick={() => scrollTo(contactoRef)} className="hover:text-green-700">Contacto</button>
          </nav>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/demo")}
              className="rounded-xl bg-green-600 px-4 py-2 text-white font-medium hover:bg-green-700 active:scale-[.98] transition"
            >
              Prueba DEMO gratis
            </button>
            <button
              onClick={() => navigate("/login")}
              className="rounded-xl border border-green-600 px-4 py-2 text-green-700 font-medium hover:bg-green-50 active:scale-[.98] transition"
            >
              Iniciar sesión
            </button>
          </div>
        </div>
      </header>

      {/* HERO / FLAYER */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1500937386664-56f2d62fb2e1?q=80&w=1600&auto=format&fit=crop')] bg-cover bg-center opacity-25"></div>
        <div className="relative mx-auto max-w-7xl px-4 py-20 md:py-28">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-5">
              <img src={faviconBlanco} alt="logo" className="w-10 h-10 rounded" />
              <span className="uppercase tracking-wide text-green-700 font-semibold">Software de gestión agrícola</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
              Optimiza tus campos de forma <span className="text-green-700">simple</span> y <span className="text-green-700">100% digital</span>
            </h1>
            <p className="mt-5 text-lg text-gray-700">
              GestiAgro centraliza labores, clima, inventarios, maquinaria y personal para administrar tus fincas desde cualquier dispositivo.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => navigate("/demo")}
                className="rounded-xl bg-green-600 px-6 py-3 text-white font-semibold hover:bg-green-700 transition"
              >
                Probar DEMO gratis
              </button>
        
              <button
                onClick={() => scrollTo(queEsRef)}
                className="rounded-xl border border-gray-300 px-6 py-3 font-semibold hover:border-green-600 hover:text-green-700 transition"
              >
                Ver más
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ¿QUÉ ES? */}
      <section ref={queEsRef} className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">¿Qué es GestiAgro?</h2>
            <p className="mt-4 text-gray-700">
              Es una plataforma pensada para el sector agrícola que te permite planear, ejecutar y medir las operaciones
              de tus fincas en tiempo real. Reduce errores, mejora la trazabilidad y toma decisiones con datos.
            </p>
            <ul className="mt-6 space-y-2 text-gray-700">
              <li>• Registro y control de labores por lote</li>
              <li>• Variables climáticas y alertas</li>
              <li>• Inventario de insumos y bodega</li>
              <li>• Maquinaria, mantenimientos y hoja de vida</li>
              <li>• Personal y roles por perfil</li>
              <li>• Reportes y tableros</li>
            </ul>
          </div>
          <div className="rounded-2xl border bg-white p-6 shadow">
            <div className="grid grid-cols-2 gap-6">
              <div className="rounded-xl bg-green-50 p-5">
                <IconClipboardList className="w-10 h-10 text-green-700" />
                <p className="mt-3 font-semibold">Labores</p>
                <p className="text-sm text-gray-600">Planificación semanal y cierre de actividades.</p>
              </div>
              <div className="rounded-xl bg-green-50 p-5">
                <IconCloudRain className="w-10 h-10 text-green-700" />
                <p className="mt-3 font-semibold">Clima</p>
                <p className="text-sm text-gray-600">Histórico y registro local.</p>
              </div>
              <div className="rounded-xl bg-green-50 p-5">
                <IconBox className="w-10 h-10 text-green-700" />
                <p className="mt-3 font-semibold">Insumos</p>
                <p className="text-sm text-gray-600">Kardex, entradas/salidas, mínimos.</p>
              </div>
              <div className="rounded-xl bg-green-50 p-5">
                <IconChartBar className="w-10 h-10 text-green-700" />
                <p className="mt-3 font-semibold">Reportes</p>
                <p className="text-sm text-gray-600">Indicadores y exportaciones.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MÓDULOS */}
      <section ref={modulosRef} className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <h3 className="text-3xl font-bold text-gray-900">Módulos</h3>
          <p className="mt-2 text-gray-700">Todo lo que necesitas para gestionar tu operación agrícola.</p>

          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <ModuleCard
              icon={<IconClipboardList className="w-7 h-7 text-green-700" />}
              title="Gestión de labores"
              desc="Programación semanal, responsables, estados y evidencias."
            />
            <ModuleCard
              icon={<IconCloudRain className="w-7 h-7 text-green-700" />}
              title="Variables climáticas"
              desc="Registro de precipitación, humedad, temperatura y alertas."
            />
            <ModuleCard
              icon={<IconBox className="w-7 h-7 text-green-700" />}
              title="Bodega de insumos"
              desc="Movimientos, mínimos, vencimientos y costos."
            />
            <ModuleCard
              icon={<IconTractor className="w-7 h-7 text-green-700" />}
              title="Maquinaria y equipos"
              desc="Hoja de vida, mantenimientos y estados."
            />
            <ModuleCard
              icon={<IconUsers className="w-7 h-7 text-green-700" />}
              title="Personal"
              desc="Perfiles, permisos y asignación de labores."
            />
            <ModuleCard
              icon={<IconChartBar className="w-7 h-7 text-green-700" />}
              title="Informes"
              desc="KPIs, avances, productividad y exportación."
            />
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <button
              onClick={() => navigate("/demo")}
              className="rounded-xl bg-green-600 px-6 py-3 text-white font-semibold hover:bg-green-700 transition"
            >
              Explorar DEMO
            </button>
            <button
              onClick={() => scrollTo(serviciosRef)}
              className="rounded-xl border border-gray-300 px-6 py-3 font-semibold hover:border-green-600 hover:text-green-700 transition"
            >
              Ver servicios
            </button>
          </div>
        </div>
      </section>

      {/* SERVICIOS */}
      <section ref={serviciosRef} className="mx-auto max-w-7xl px-4 py-16">
        <h3 className="text-3xl font-bold text-gray-900">Servicios</h3>
        <p className="mt-2 text-gray-700">Acompañamiento para garantizar la adopción del sistema.</p>

        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <div className="rounded-2xl border bg-white p-6 shadow-sm hover:shadow-xl transition">
            <IconSettings className="w-8 h-8 text-green-700" />
            <h4 className="mt-3 font-semibold">Implementación</h4>
            <p className="text-sm text-gray-600 mt-1">Parametrización inicial, usuarios, fincas y lotes.</p>
          </div>
          <div className="rounded-2xl border bg-white p-6 shadow-sm hover:shadow-xl transition">
            <IconTool className="w-8 h-8 text-green-700" />
            <h4 className="mt-3 font-semibold">Soporte</h4>
            <p className="text-sm text-gray-600 mt-1">Canal de ayuda y atención prioritaria.</p>
          </div>
          <div className="rounded-2xl border bg-white p-6 shadow-sm hover:shadow-xl transition">
            <IconDeviceFloppy className="w-8 h-8 text-green-700" />
            <h4 className="mt-3 font-semibold">Copias de seguridad</h4>
            <p className="text-sm text-gray-600 mt-1">Respaldo automático y recuperación.</p>
          </div>
        </div>
      </section>

      {/* CONTACTO */}
      <section ref={contactoRef} className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <h3 className="text-3xl font-bold text-gray-900">Contáctenos</h3>
              <p className="mt-2 text-gray-700">¿Tienes dudas? Escríbenos y agenda una demo guiada.</p>

              <div className="mt-6 space-y-3 text-gray-700">
                <p className="flex items-center gap-2"><IconPhone className="w-5 h-5 text-green-700" /> +57 300 000 0000</p>
                <p className="flex items-center gap-2"><IconMail className="w-5 h-5 text-green-700" /> soporte@gestiagro.com</p>
                <p className="flex items-center gap-2"><IconMapPin className="w-5 h-5 text-green-700" /> Medellín, Colombia</p>
              </div>

              <div className="mt-6 flex items-center gap-4">
                <a href="#" className="p-2 rounded-lg border hover:bg-gray-100"><IconBrandFacebook className="w-6 h-6 text-green-700" /></a>
                <a href="#" className="p-2 rounded-lg border hover:bg-gray-100"><IconBrandInstagram className="w-6 h-6 text-green-700" /></a>
                <a href="#" className="p-2 rounded-lg border hover:bg-gray-100"><IconBrandLinkedin className="w-6 h-6 text-green-700" /></a>
                <a href="#" className="p-2 rounded-lg border hover:bg-gray-100"><IconBrandWhatsapp className="w-6 h-6 text-green-700" /></a>
              </div>
            </div>

            <form onSubmit={onSubmit} className="rounded-2xl border bg-white p-6 shadow">
              <div className="grid gap-4">
                <div>
                  <label className="text-sm font-medium">Nombre</label>
                  <input
                    name="nombre"
                    value={form.nombre}
                    onChange={onChange}
                    className="mt-1 w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-green-600"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={onChange}
                    className="mt-1 w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-green-600"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Mensaje</label>
                  <textarea
                    name="mensaje"
                    rows={5}
                    value={form.mensaje}
                    onChange={onChange}
                    className="mt-1 w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-green-600"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={enviando}
                  className="rounded-xl bg-green-600 px-6 py-3 text-white font-semibold hover:bg-green-700 disabled:opacity-60 transition"
                >
                  {enviando ? "Enviando..." : "Enviar mensaje"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t">
        <div className="mx-auto max-w-7xl px-4 py-10">
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
            <div className="flex items-center gap-3">
              <img src={faviconBlanco} alt="GestiAgro" className="w-9 h-9 rounded" />
              <div>
                <p className="font-bold text-green-700">GestiAgro</p>
                <p className="text-sm text-gray-600">Software de Gestión Agrícola</p>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              <p>Seguridad de la información</p>
              <p>Centro de ayuda</p>
              <p>Términos y condiciones</p>
            </div>
            <div className="text-sm text-gray-600">
              <p>© {new Date().getFullYear()} GestiAgro</p>
              <p>Desarrollado por tu equipo</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;

