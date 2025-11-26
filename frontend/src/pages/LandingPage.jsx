import { Link } from "react-router-dom";
import {
  ArrowRight,
  HeartPulse,
  Stethoscope,
  Users,
  BriefcaseMedical,
  FileText,
  Pill
} from "lucide-react";


// ======================================================
// IMÁGENES — traducidas de placeholder-images.json
// ======================================================
const heroImage = {
  imageUrl:
    "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&w=1080&q=80",
  description: "Equipo médico colaborando",
};

const forYourHealthImage = {
  imageUrl:
    "https://images.unsplash.com/photo-1624727828489-a1e03b79bba8?auto=format&w=1080&q=80",
  description: "Profesionales médicos analizando resultados",
};

// ======================================================
// DEPARTAMENTOS — traducido igual que el original
// ======================================================
const departments = [
  {
    name: "Cardiología",
    icon: <HeartPulse className="w-8 h-8" />,
  },
  {
    name: "Diagnóstico",
    icon: <FileText className="w-8 h-8" />,
  },
  {
    name: "Odontología",
    icon: <Pill className="w-8 h-8" />,
  },
  {
    name: "Cirugía",
    icon: <BriefcaseMedical className="w-8 h-8" />,
  },
];

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-white">

      {/* ======================================================
         NAVBAR
      ====================================================== */}
      <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto flex items-center h-20 px-6">

          <Link to="/" className="flex items-center gap-2 font-bold text-lg">
            <HeartPulse className="w-7 h-7 text-blue-600" />
            <span className="tracking-wide text-gray-900">SISGESALUD</span>
          </Link>

          <nav className="ml-auto flex items-center gap-8 text-sm font-medium text-gray-600">
            <a href="#servicios" className="hover:text-blue-600">Servicios</a>
            <a href="#beneficios" className="hover:text-blue-600">Beneficios</a>
            <a href="#contacto" className="hover:text-blue-600">Contacto</a>
          </nav>

          <div className="flex items-center gap-4 ml-10">
            <Link
              to="/login"
              className="text-blue-600 px-3 py-2 hover:bg-blue-50 rounded-md"
            >
              Iniciar Sesión
            </Link>

            <Link
              to="/register"
              className="bg-blue-600 text-white px-6 py-2 rounded-full shadow-md hover:bg-blue-700 transition"
            >
              Empezar
            </Link>
          </div>
        </div>
      </header>

      {/* ======================================================
         HERO SECTION
      ====================================================== */}
      <main className="flex-1">
        <section className="pt-20 md:pt-28 lg:pt-36">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 items-center gap-12 px-6">

            <div>
              <p className="font-semibold text-blue-600 mb-2">
                BIENVENIDO A SISGESALUD
              </p>

              <h1 className="text-5xl font-bold text-gray-900 sm:text-6xl">
                Cuidando tu Salud en Cada Momento
              </h1>

              <p className="mt-6 text-gray-600 md:text-xl max-w-xl">
                Una plataforma integral que conecta pacientes y doctores para
                una gestión de salud más moderna, humana y eficiente.
              </p>

              <div className="mt-8">
                <Link
                  to="/login"
                  className="bg-blue-600 text-white px-8 py-3 rounded-full inline-flex items-center text-lg shadow-lg hover:bg-blue-700 transition"
                >
                  Agendar Cita <ArrowRight className="ml-2" />
                </Link>
              </div>
            </div>

            <div className="w-full h-[400px] md:h-[500px]">
              <img
                src={heroImage.imageUrl}
                alt={heroImage.description}
                className="rounded-3xl w-full h-full object-cover shadow-xl"
              />
            </div>

          </div>
        </section>

        {/* ======================================================
           MÉTRICAS
        ====================================================== */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-white p-8 rounded-2xl shadow-xl">

              {[
                ["+10k", "Pacientes Satisfechos"],
                ["+500", "Doctores Especialistas"],
                ["+20", "Hospitales Afiliados"],
                ["24/7", "Atención Continua"],
              ].map(([valor, label]) => (
                <div key={label} className="text-center">
                  <h3 className="text-4xl font-bold text-blue-600">{valor}</h3>
                  <p className="text-gray-600 mt-1">{label}</p>
                </div>
              ))}

            </div>
          </div>
        </section>

        {/* ======================================================
           SERVICIOS
        ====================================================== */}
        <section id="servicios" className="py-24">
          <div className="max-w-7xl mx-auto px-6">

            <div className="text-center mb-16">
              <p className="text-blue-600 font-semibold">NUESTROS SERVICIOS</p>
              <h2 className="text-4xl font-bold mt-2 text-gray-900">
                Servicios Médicos para Ti
              </h2>
              <p className="max-w-xl mx-auto text-gray-600 mt-4">
                Especialidades médicas diseñadas para tu bienestar.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {departments.map((dept) => (
                <div
                  key={dept.name}
                  className="p-8 bg-white shadow-lg rounded-2xl text-center hover:-translate-y-2 transition"
                >
                  <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full">
                    {dept.icon}
                  </div>
                  <h3 className="text-xl font-bold">{dept.name}</h3>
                  <p className="text-gray-600 mt-2">
                    Atención especializada y moderna.
                  </p>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ======================================================
           BENEFICIOS
        ====================================================== */}
        <section id="beneficios" className="py-24">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

            <div className="w-full h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={forYourHealthImage.imageUrl}
                alt={forYourHealthImage.description}
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <p className="font-semibold text-blue-600">
                PENSANDO EN TU BIENESTAR
              </p>
              <h2 className="text-4xl font-bold mt-2 text-gray-900">
                La Salud que Mereces, a tu Alcance
              </h2>

              <p className="text-gray-600 mt-6">
                Plataforma intuitiva, segura y rápida para gestionar tu atención.
              </p>

              <ul className="mt-8 space-y-6">
                <li className="flex gap-4">
                  <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Historial Unificado</h4>
                    <p className="text-gray-600 text-sm">
                      Toda tu información médica en un solo lugar.
                    </p>
                  </div>
                </li>

                <li className="flex gap-4">
                  <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Red de Especialistas</h4>
                    <p className="text-gray-600 text-sm">
                      Acceso a doctores confiables.
                    </p>
                  </div>
                </li>

                <li className="flex gap-4">
                  <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                    <Stethoscope className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Atención Personalizada</h4>
                    <p className="text-gray-600 text-sm">
                      Comunicación directa con profesionales.
                    </p>
                  </div>
                </li>
              </ul>

            </div>

          </div>
        </section>
      </main>

      {/* ======================================================
         FOOTER
      ====================================================== */}
      <footer id="contacto" className="py-8 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} SISGESALUD. Todos los derechos reservados.
          </p>

          <div className="flex items-center gap-2">
            <HeartPulse className="w-5 h-5 text-blue-600" />
            <span className="font-semibold text-gray-900">SISGESALUD</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
