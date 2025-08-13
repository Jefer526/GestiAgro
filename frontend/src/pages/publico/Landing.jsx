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
  IconPlant,
} from "@tabler/icons-react";
import faviconBlanco from "../../assets/favicon-blanco.png";
import heroBg from "../../assets/Fondo_pantalla_principal.png";
import fondoModulo from "../../assets/Fondo_modulo.png";

const Landing = () => {
  const navigate = useNavigate();

  const queEsRef = useRef(null);
  const modulosRef = useRef(null);
  const serviciosRef = useRef(null);
  const contactoRef = useRef(null);

  const [enviando, setEnviando] = useState(false);
  const [form, setForm] = useState({ nombre: "", email: "", mensaje: "" });

  const scrollTo = (ref) =>
    ref?.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const onChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

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
      <h4 className="text-lg font-semibold">{title}</h4>
      <p className="mt-2 text-sm">{desc}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-white text-black text-lg">
      {/* NAVBAR */}
      <header className="sticky top-0 z-40 bg-green-700/80 backdrop-blur border-b border-green-700 font-bold transition-colors duration-300 text-white">
        <div className="mx-auto max-w-7xl px-4 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={faviconBlanco} alt="GestiAgro" className="w-10 h-10 rounded" />
            <span className="font-bold text-lg text-white">GestiAgro</span>
          </div>

          <nav className="hidden md:flex items-center gap-6 font-bold">
            <button onClick={() => scrollTo(queEsRef)} className="hover:text-green-200 text-white">¿Qué es?</button>
            <button onClick={() => scrollTo(modulosRef)} className="hover:text-green-200 text-white">Módulos</button>
            <button onClick={() => scrollTo(serviciosRef)} className="hover:text-green-200 text-white">Servicios</button>
            <button onClick={() => scrollTo(contactoRef)} className="hover:text-green-200 text-white">Contacto</button>
          </nav>

          <div className="flex items-center gap-3 font-bold">
            <button
              onClick={() => navigate("/crear-cuenta")}
              className="rounded-xl bg-white px-4 py-2 text-green-700 font-bold hover:bg-green-100 active:scale-[.98] transition"
            >
              Prueba DEMO gratis
            </button>
            <button
              onClick={() => navigate("/login")}
              className="rounded-xl border border-white px-4 py-2 text-white font-bold hover:bg-green-700 hover:border-green-700 active:scale-[.98] transition"
            >
              Iniciar sesión
            </button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section
        className="relative h-[92vh] flex items-center bg-cover bg-center text-white"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        {/* Capa oscura mejorada */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-green-900/30" />

        <div className="relative z-10 mx-auto max-w-7xl px-4">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6 justify-start">
              <span className="uppercase tracking-widest text-green-300 font-bold text-3xl">
                Software de gestión agrícola
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.05]">
              Optimiza tus campos de forma{" "}
              <span className="text-green-400">simple</span> y{" "}
              <span className="text-green-400">100% digital</span>
            </h1>

            <p className="mt-6 text-xl md:text-2xl text-gray-200">
              GestiAgro centraliza labores, clima, inventarios, maquinaria y personal
              para administrar tus fincas desde cualquier dispositivo.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={() => navigate("/demo")}
                className="rounded-xl bg-green-600 px-7 py-3.5 text-white text-lg font-semibold hover:bg-green-700 shadow-lg transition"
              >
                Probar DEMO gratis
              </button>
              <button
                onClick={() => scrollTo(queEsRef)}
                className="rounded-xl border-2 border-white px-7 py-3.5 text-white text-lg font-semibold hover:border-green-400 hover:text-green-400 transition"
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
          {/* Lado izquierdo: texto */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">¿Qué es GestiAgro?</h2>
            <p className="mt-4">
              Es una plataforma pensada para el sector agrícola que te permite planear, ejecutar y medir las operaciones
              de tus fincas en tiempo real. Reduce errores, mejora la trazabilidad y toma decisiones con datos.
            </p>
            <ul className="mt-6 space-y-2">
              <li>• Registro y control de labores por lote</li>
              <li>• Variables climáticas y alertas</li>
              <li>• Inventario de insumos y bodega</li>
              <li>• Maquinaria, mantenimientos y hoja de vida</li>
              <li>• Personal y roles por perfil</li>
              <li>• Reportes y tableros</li>
            </ul>
          </div>

          {/* Lado derecho: panel "Cómo funciona" */}
          <div className="rounded-2xl border bg-white shadow overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-emerald-500 px-6 py-5 text-white">
              <p className="text-sm/5 opacity-90 font-semibold uppercase tracking-wide">
                Cómo funciona
              </p>
              <p className="text-xl font-bold">Del campo al dato útil</p>
            </div>

            <div className="p-6">
              <ol className="relative border-s border-gray-200 ms-4 space-y-6">
                <li className="ms-4 ps-8">
                  <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-green-100 ring-8 ring-white">
                    <IconClipboardList className="h-4 w-4 text-green-700" />
                  </span>
                  <h4 className="font-semibold mb-1">Registrar</h4>
                  <p className="text-sm text-gray-600">
                    Captura labores, clima, insumos y equipos desde web o móvil, incluso sin conexión.
                  </p>
                </li>

                <li className="ms-4 ps-8">
                  <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-green-100 ring-8 ring-white">
                    <IconTool className="h-4 w-4 text-green-700" />
                  </span>
                  <h4 className="font-semibold mb-1">Gestionar</h4>
                  <p className="text-sm text-gray-600">
                    Asigna responsables, define prioridades y sigue el avance por finca y lote.
                  </p>
                </li>

                <li className="ms-4 ps-8">
                  <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-green-100 ring-8 ring-white">
                    <IconChartBar className="h-4 w-4 text-green-700" />
                  </span>
                  <h4 className="font-semibold mb-1">Analizar</h4>
                  <p className="text-sm text-gray-600">
                    Visualiza indicadores, exporta reportes y toma decisiones con datos confiables.
                  </p>
                </li>
              </ol>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <div className="rounded-xl bg-green-50 px-4 py-3 text-center">
                  <p className="text-2xl font-extrabold text-green-700 leading-none">3x</p>
                  <p className="text-xs text-gray-600 mt-1">Más rápido</p>
                </div>
                <div className="rounded-xl bg-green-50 px-4 py-3 text-center">
                  <p className="text-2xl font-extrabold text-green-700 leading-none">-40%</p>
                  <p className="text-xs text-gray-600 mt-1">Errores</p>
                </div>
                <div className="rounded-xl bg-green-50 px-4 py-3 text-center">
                  <p className="text-2xl font-extrabold text-green-700 leading-none">24/7</p>
                  <p className="text-xs text-gray-600 mt-1">Disponibilidad</p>
                </div>
              </div>

              <div className="mt-6">
                <button
                  onClick={() => scrollTo(modulosRef)}
                  className="w-full rounded-xl bg-green-600 px-5 py-3 text-white font-semibold hover:bg-green-700 transition"
                >
                  Ver características
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MÓDULOS */}
      <section
        ref={modulosRef}
        className="relative bg-cover bg-center"
        style={{ backgroundImage: `url(${fondoModulo})` }}
      >
        {/* Capa clara para contraste del texto */}
        <div className="absolute inset-0 bg-white/40"></div>

        {/* Contenido */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-16">
          <h3 className="text-3xl font-bold">Módulos</h3>
          <p className="mt-2">Todo lo que necesitas para gestionar tu operación agrícola.</p>

          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <ModuleCard
              icon={<IconClipboardList className="w-7 h-7 text-blue-600" />}
              title="Gestión de labores"
              desc="Programación semanal, responsables, estados y evidencias."
            />
            <ModuleCard
              icon={<IconCloudRain className="w-7 h-7 text-cyan-500" />}
              title="Variables climáticas"
              desc="Registro de precipitación, humedad, temperatura y alertas."
            />
            <ModuleCard
              icon={<IconBox className="w-7 h-7 text-amber-500" />}
              title="Bodega de insumos"
              desc="Movimientos, mínimos, vencimientos y costos."
            />
            <ModuleCard
              icon={<IconTractor className="w-7 h-7 text-red-500" />}
              title="Maquinaria y equipos"
              desc="Hoja de vida, mantenimientos y estados."
            />
            <ModuleCard
              icon={<IconUsers className="w-7 h-7 text-purple-500" />}
              title="Usuarios y roles"
              desc="Perfiles, permisos y asignación de labores."
            />
            <ModuleCard
              icon={<IconChartBar className="w-7 h-7 text-emerald-500" />}
              title="Informes"
              desc="KPIs, avances, productividad y exportación."
            />
            <ModuleCard
              icon={<IconTool className="w-7 h-7 text-slate-600" />}
              title="Soporte técnico"
              desc="Solicita ayuda y gestiona tickets."
            />
            <ModuleCard
              icon={<IconPlant className="w-7 h-7 text-green-700" />}
              title="Producción"
              desc="Gestión y registro de producción agrícola."
            />
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <button
              onClick={() => navigate("/crear-cuenta")}
              className="rounded-xl bg-green-600 px-6 py-3 text-white font-semibold hover:bg-green-700 transition"
            >
              Explorar DEMO
            </button>
            <button
              onClick={() => scrollTo(serviciosRef)}
              className="rounded-xl border border-green-600 px-6 py-3 font-bold hover:border-green-600 hover:text-white"
            >
              Ver servicios
            </button>
          </div>
        </div>
      </section>

      {/* SERVICIOS */}
      <section ref={serviciosRef} className="mx-auto max-w-7xl px-4 py-16">
        <h3 className="text-3xl font-bold">Servicios</h3>
        <p className="mt-2">Acompañamiento para garantizar la adopción del sistema.</p>

        <div className="mt-8 grid lg:grid-cols-2 gap-8 items-start">
          {/* Timeline izquierda */}
          <ol className="relative ms-4 space-y-10 border-s border-gray-200">
        <li className="ms-6 flex items-start">
          <span className="absolute -start-3 flex h-10 w-10 items-center justify-center rounded-full bg-green-50 ring-8 ring-white">
            <IconSettings className="w-5 h-5 text-green-700" />
          </span>
          <div className="ms-4">
            <h4 className="text-lg font-semibold">Implementación</h4>
            <p className="text-sm text-gray-900 mt-1">
              Parametrización inicial: usuarios, fincas y lotes. Capacitación y puesta en marcha.
            </p>
          </div>
        </li>

        <li className="ms-6 flex items-start">
          <span className="absolute -start-3 flex h-10 w-10 items-center justify-center rounded-full bg-green-50 ring-8 ring-white">
            <IconTool className="w-5 h-5 text-green-700" />
          </span>
          <div className="ms-4">
            <h4 className="text-lg font-semibold">Soporte continuo</h4>
            <p className="text-sm text-gray-900 mt-1">
              Canal de ayuda, resolución de incidentes y asesoría funcional prioritaria.
            </p>
          </div>
        </li>

        <li className="ms-6 flex items-start">
          <span className="absolute -start-3 flex h-10 w-10 items-center justify-center rounded-full bg-green-50 ring-8 ring-white">
            <IconDeviceFloppy className="w-5 h-5 text-green-700" />
          </span>
          <div className="ms-4">
            <h4 className="text-lg font-semibold">Backups y seguridad</h4>
            <p className="text-sm text-gray-900 mt-1">
              Copias automáticas, recuperación ante desastres y buenas prácticas de acceso.
            </p>
          </div>
        </li>
      </ol>

          {/* Tarjeta propuesta derecha */}
          <div className="rounded-2xl border bg-white p-6 md:p-8 shadow-sm">
            <h4 className="text-xl font-semibold">¿Necesitas algo a la medida?</h4>
            <p className="text-sm text-gray-600 mt-2">
              Integramos con tus sistemas, ajustamos flujos y armamos reportes personalizados.
            </p>
            <button
              onClick={() => scrollTo(contactoRef)}
              className="mt-5 inline-flex items-center justify-center rounded-xl bg-gray-900 px-5 py-2.5 text-white font-semibold hover:bg-black transition"
            >
              Pedir propuesta
            </button>
          </div>
        </div>
      </section>


      {/* CONTACTO */}
      <section ref={contactoRef} className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <h3 className="text-3xl font-bold">Contáctenos</h3>
              <p className="mt-2">¿Tienes dudas? Escríbenos y agenda una demo guiada.</p>

              <div className="mt-6 space-y-3">
                <p className="flex items-center gap-2"><IconPhone className="w-5 h-5 text-green-700" /> +57 300 000 0000</p>
                <p className="flex items-center gap-2"><IconMail className="w-5 h-5 text-green-700" /> soporte@gestiagro.com</p>
                <p className="flex items-center gap-2"><IconMapPin className="w-5 h-5 text-green-700" /> Medellín, Colombia</p>
              </div>

              <div className="mt-6 flex items-center gap-4">
                <a href="#" className="p-2 rounded-lg border hover:bg-gray-100"><IconBrandFacebook className="w-6 h-6 text-blue-600" /></a>
                <a href="#" className="p-2 rounded-lg border hover:bg-gray-100"><IconBrandInstagram className="w-6 h-6 text-pink-600" /></a>
                <a href="#" className="p-2 rounded-lg border hover:bg-gray-100"><IconBrandLinkedin className="w-6 h-6 text-blue-700" /></a>
                <a href="#" className="p-2 rounded-lg border hover:bg-gray-100"><IconBrandWhatsapp className="w-6 h-6 text-green-500" /></a>
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
      <footer className="bg-green-700/80 border-t border-green-700 text-white font-bold text-lg">
        <div className="mx-auto max-w-7xl px-4 py-10">
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
            <div className="flex items-center gap-3">
              <img src={faviconBlanco} alt="GestiAgro" className="w-9 h-9 rounded" />
              <div>
                <p className="font-bold">GestiAgro</p>
                <p className="text-sm">Software de Gestión Agrícola</p>
              </div>
            </div>
            <div className="text-sm">
              <p>Seguridad de la información</p>
              <p>Centro de ayuda</p>
              <p>Términos y condiciones</p>
            </div>
            <div className="text-sm">
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








