import { Link, Routes, Route, NavLink } from "react-router-dom";
import { HeartPulse, Calendar, FileText, Pill, Beaker, BookUser, Home, LogOut } from "lucide-react";
import { useMemo } from "react";

/* =========================
   MÓDULOS (todo en un archivo)
========================= */

// Home del panel
function PatientHome() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Bienvenido/a</h2>
      <p className="text-gray-600 mt-2">
        Accede a tus módulos desde el menú: Citas, Diagnósticos, Recetas, Resultados, Historia Clínica.
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {[
          { to: "citas", label: "Mis Citas", icon: Calendar },
          { to: "diagnosticos", label: "Diagnósticos", icon: FileText },
          { to: "recetas", label: "Recetas", icon: Pill },
          { to: "resultados", label: "Resultados", icon: Beaker },
          { to: "historia", label: "Historia Clínica", icon: BookUser },
        ].map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            className="flex items-center gap-3 p-4 rounded-xl border hover:bg-gray-50"
          >
            <Icon className="w-5 h-5 text-blue-600" />
            <span className="font-semibold">{label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

// Citas
function AppointmentsView() {
  const apps = useMemo(
    () => [
      { id: "APT001", doctor: "Dr. Alan Grant", esp: "Cardiología", date: "2025-02-01 10:00", status: "Programada" },
      { id: "APT002", doctor: "Dra. Ellie Sattler", esp: "Dermatología", date: "2025-02-10 14:30", status: "Programada" },
      { id: "APT003", doctor: "Dr. John Hammond", esp: "Pediatría", date: "2024-12-01 09:00", status: "Completada" },
    ],
    []
  );
  return (
    <div className="p-6">
      <h3 className="text-xl font-bold mb-4">Mis Citas</h3>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {apps.map(a => (
          <div key={a.id} className="p-4 rounded-xl border bg-white">
            <p className="text-sm text-gray-500">{a.esp}</p>
            <p className="font-semibold">con {a.doctor}</p>
            <p className="text-sm mt-2">{new Date(a.date).toLocaleString("es-PE")}</p>
            <span className="inline-block mt-3 text-xs px-2 py-1 rounded bg-blue-600 text-white">
              {a.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Diagnósticos
function DiagnosticsView() {
  const data = [
    { id: "D1", titulo: "Hipertensión Arterial", doctor: "Dr. Alan Grant", esp: "Cardiología", fecha: "2024-07-10" },
    { id: "D2", titulo: "Dermatitis Atópica", doctor: "Dra. Ellie Sattler", esp: "Dermatología", fecha: "2024-06-15" },
  ];
  return (
    <div className="p-6">
      <h3 className="text-xl font-bold mb-4">Diagnósticos</h3>
      <div className="space-y-3">
        {data.map(d => (
          <div key={d.id} className="p-4 rounded-xl border bg-white">
            <p className="font-semibold">{d.titulo}</p>
            <p className="text-sm text-gray-600">
              Emitido por {d.doctor} ({d.esp}) — {new Date(d.fecha).toLocaleDateString("es-PE")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Recetas
function PrescriptionsView() {
  const rx = [
    { id: "RX001", med: "Losartán 50mg", doctor: "Dr. Alan Grant", fecha: "2024-07-10", estado: "Dispensada" },
    { id: "RX002", med: "Hidrocortisona 1% (crema)", doctor: "Dra. Ellie Sattler", fecha: "2024-06-15", estado: "Recibida" },
    { id: "RX003", med: "Amoxicilina 500mg", doctor: "Dr. John Hammond", fecha: "2024-05-01", estado: "Expirada" },
  ];
  return (
    <div className="p-6">
      <h3 className="text-xl font-bold mb-4">Recetas</h3>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {rx.map(r => (
          <div key={r.id} className="p-4 rounded-xl border bg-white">
            <p className="font-semibold">{r.med}</p>
            <p className="text-sm text-gray-600">Recetado por {r.doctor}</p>
            <p className="text-sm mt-1">{new Date(r.fecha).toLocaleDateString("es-PE")}</p>
            <span className="inline-block mt-3 text-xs px-2 py-1 rounded bg-gray-800 text-white">
              {r.estado}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Resultados
function ResultsView() {
  const results = [
    { id: "LAB001", nombre: "Perfil Lipídico", fecha: "2024-07-12", estado: "Disponible", lab: "Lab Interno" },
    { id: "LAB002", nombre: "Hemograma", fecha: "2024-06-20", estado: "Pendiente", lab: "Lab Interno" },
  ];
  return (
    <div className="p-6">
      <h3 className="text-xl font-bold mb-4">Resultados</h3>
      <div className="space-y-3">
        {results.map(r => (
          <div key={r.id} className="p-4 rounded-xl border bg-white flex items-center justify-between">
            <div>
              <p className="font-semibold">{r.nombre}</p>
              <p className="text-sm text-gray-600">
                {new Date(r.fecha).toLocaleDateString("es-PE")} — {r.lab}
              </p>
            </div>
            <span
              className={`text-xs px-2 py-1 rounded ${
                r.estado === "Disponible" ? "bg-green-600 text-white" : "bg-yellow-500 text-white"
              }`}
            >
              {r.estado}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Historia clínica
function MedicalHistoryView() {
  const info = {
    nombre: "Carlos Santana",
    edad: 45,
    sangre: "A+",
    alergias: ["Penicilina"],
    cronicas: ["Hipertensión Arterial"],
    meds: ["Losartán 50mg"],
  };
  return (
    <div className="p-6">
      <h3 className="text-xl font-bold mb-4">Historia Clínica</h3>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl border bg-white">
          <p className="text-sm text-gray-500">Nombre</p>
          <p className="font-semibold">{info.nombre}</p>
        </div>
        <div className="p-4 rounded-xl border bg-white">
          <p className="text-sm text-gray-500">Edad</p>
          <p className="font-semibold">{info.edad} años</p>
        </div>
        <div className="p-4 rounded-xl border bg-white">
          <p className="text-sm text-gray-500">Tipo de sangre</p>
          <p className="font-semibold flex items-center gap-2">
            <HeartPulse className="w-4 h-4 text-red-500" /> {info.sangre}
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mt-6">
        <div className="p-4 rounded-xl border bg-white">
          <p className="text-sm text-gray-500 mb-1">Alergias</p>
          {info.alergias.map(a => (
            <span key={a} className="text-xs inline-block mr-2 mb-2 px-2 py-1 rounded bg-red-100 text-red-700">
              {a}
            </span>
          ))}
        </div>
        <div className="p-4 rounded-xl border bg-white">
          <p className="text-sm text-gray-500 mb-1">Condiciones crónicas</p>
          {info.cronicas.map(c => (
            <span key={c} className="text-xs inline-block mr-2 mb-2 px-2 py-1 rounded bg-blue-100 text-blue-700">
              {c}
            </span>
          ))}
        </div>
        <div className="p-4 rounded-xl border bg-white">
          <p className="text-sm text-gray-500 mb-1">Medicamentos</p>
          {info.meds.map(m => (
            <p key={m} className="text-sm font-medium">{m}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

/* =========================
   LAYOUT + RUTAS ANIDADAS
========================= */

export default function PatientDashboard() {
  const links = [
    { to: "/patient", label: "Inicio", icon: Home },
    { to: "/patient/citas", label: "Mis Citas", icon: Calendar },
    { to: "/patient/diagnosticos", label: "Diagnósticos", icon: FileText },
    { to: "/patient/recetas", label: "Recetas", icon: Pill },
    { to: "/patient/resultados", label: "Resultados", icon: Beaker },
    { to: "/patient/historia", label: "Historia Clínica", icon: BookUser },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-white/80 backdrop-blur-sm">
        <div className="h-16 border-b flex items-center gap-2 px-4">
          <HeartPulse className="w-6 h-6 text-blue-600" />
          <span className="font-bold tracking-wide">SISGESALUD</span>
        </div>

        <nav className="p-3">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/patient"}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg mb-1 ${
                  isActive ? "bg-blue-600 text-white" : "hover:bg-gray-100"
                }`
              }
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm font-medium">{label}</span>
            </NavLink>
          ))}

          <div className="mt-4 pt-4 border-t">
            <Link
              to="/login"
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100"
              title="Cerrar sesión (demo)"
            >
              <LogOut className="w-5 h-5" />
              <span className="text-sm font-medium">Cerrar sesión</span>
            </Link>
          </div>
        </nav>
      </aside>

      {/* Contenido */}
      <main className="flex-1">
        <header className="h-16 border-b bg-white/70 backdrop-blur-sm flex items-center justify-between px-6">
          <span className="font-semibold">Panel del Paciente</span>
          <Link to="/" className="text-blue-600 hover:underline">Volver al inicio</Link>
        </header>

        {/* Rutas internas */}
        <Routes>
          <Route index element={<PatientHome />} />
          <Route path="citas" element={<AppointmentsView />} />
          <Route path="diagnosticos" element={<DiagnosticsView />} />
          <Route path="recetas" element={<PrescriptionsView />} />
          <Route path="resultados" element={<ResultsView />} />
          <Route path="historia" element={<MedicalHistoryView />} />
          <Route path="*" element={<div className="p-6">Módulo no encontrado.</div>} />
        </Routes>
      </main>
    </div>
  );
}
