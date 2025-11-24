import { Link } from "react-router-dom";
import {
  ArrowRight,
  HeartPulse,
  Stethoscope,
  FlaskConical,
  BookUser,
  Users,
  BriefcaseMedical,
  FileText,
  Pill,
} from "lucide-react"; // Lucide sí puede usarse en Vite sin problemas

// Imagenes temporales (puedes reemplazar por tus URLs)
const heroImage =
  "https://images.unsplash.com/photo-1580281657521-8f03c35c7c73?w=1600&q=80"; 
const forYourHealthImage =
  "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?w=1600&q=80";

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
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-xl border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex h-20 items-center px-6">
          <Link to="/" className="flex items-center gap-2 font-bold text-lg">
            <HeartPulse className="h-7 w-7 text-blue-600" />
            <span className="tracking-wider text-gray-900">SISGESALUD</span>
          </Link>

          <nav className="flex items-center gap-8 ml-auto text-sm font-medium text-gray-600">
            <a href="#servicios" className="hover:text-blue-600">
              Servicios
            </a>
            <a href="#beneficios" className="hover:text-blue-600">
              Beneficios
            </a>
            <a href="#contacto" className="hover:text-blue-600">
              Contacto
            </a>
          </nav>

          <div className="flex items-center gap-4 ml-10">
            <Link
              to="/login"
              className="text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-md"
            >
              Iniciar Sesión
            </Link>

            <Link
              to="/login"
              className="bg-blue-600 text-white rounded-full px-6 py-2 shadow-md hover:bg-blue-700 transition"
            >
              Empezar
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative pt-20 md:pt-32">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 items-center gap-12">
              <div>
                <p className="font-semibold text-blue-600 mb-2">
                  BIENVENIDO A SISGESALUD
                </p>

                <h1 className="text-5xl font-bold text-gray-900 sm:text-6xl">
                  Cuidando tu Salud en Cada Momento
                </h1>

                <p className="text-gray-600 md:text-xl mt-6 max-w-lg">
                  Una plataforma integral que conecta pacientes y doctores para
                  una gestión de salud eficiente y humana.
                </p>

                <div className="mt-8">
                  <Link
                    to="/login"
                    className="bg-blue-600 text-white rounded-full px-8 py-3 text-lg shadow-lg hover:bg-blue-700 transition inline-flex items-center"
                  >
                    Agendar Cita <ArrowRight className="ml-2" />
                  </Link>
                </div>
              </div>

              <div className="relative h-[400px] md:h-[500px] w-full">
                <img
                  src={heroImage}
                  alt="Salud"
                  className="rounded-3xl w-full h-full object-cover shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* MÉTRICAS */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 rounded-2xl bg-white shadow-lg">
              {[
                { num: "+10k", label: "Pacientes Satisfechos" },
                { num: "+500", label: "Doctores Especialistas" },
                { num: "+20", label: "Hospitales Afiliados" },
                { num: "24/7", label: "Atención Continua" },
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <h3 className="text-4xl font-bold text-blue-600">
                    {item.num}
                  </h3>
                  <p className="text-gray-600 mt-1">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SERVICIOS */}
        <section id="servicios" className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <p className="font-semibold text-blue-600">NUESTROS SERVICIOS</p>
              <h2 className="text-4xl font-bold text-gray-900">
                Servicios Médicos para Ti
              </h2>
              <p className="max-w-xl mx-auto text-gray-600 mt-4">
                Especialidades diseñadas para cubrir todas tus necesidades de
                salud.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {departments.map((dept) => (
                <div
                  key={dept.name}
                  className="p-8 rounded-2xl bg-white shadow-md text-center hover:-translate-y-2 transition"
                >
                  <div className="w-20 h-20 rounded-full flex items-center justify-center bg-blue-100 text-blue-600 mx-auto mb-6">
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

        {/* BENEFICIOS */}
        <section id="beneficios" className="py-24">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16">
            <div className="h-[500px] rounded-2xl overflow-hidden shadow-xl">
              <img
                src={forYourHealthImage}
                alt="Beneficios"
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <p className="font-semibold text-blue-600">
                PENSANDO EN TU BIENESTAR
              </p>
              <h2 className="text-4xl font-bold text-gray-900 mt-2">
                La Salud que Mereces, a tu Alcance
              </h2>

              <p className="text-gray-600 mt-6">
                Una plataforma intuitiva, segura y rápida para gestionar tu
                atención y conectar con especialistas.
              </p>

              <ul className="mt-8 space-y-6">
                <li className="flex gap-4">
                  <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                    <BookUser className="w-5 h-5" />
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

      {/* FOOTER */}
      <footer
        id="contacto"
        className="bg-white border-t border-gray-200 py-8"
      >
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} SISGESALUD. Todos los derechos
            reservados.
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
