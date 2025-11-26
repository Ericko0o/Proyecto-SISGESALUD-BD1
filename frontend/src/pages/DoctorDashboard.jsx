import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import {
  CalendarDays,
  UserCheck,
  History,
  Clock,
  BookOpen,
  Pill,
  FlaskConical,
  FileText,
  Search,
} from "lucide-react";

// ============================================================
// MOCKS (después los reemplazamos con tu backend SQL + Express)
// ============================================================
const mockAppointments = [
  { time: "10:00", patient: "Carlos Santana", type: "Consulta General", mode: "presencial", status: "confirmed" },
  { time: "11:00", patient: "Elena Rodriguez", type: "Dermatología", mode: "online", status: "confirmed" },
  { time: "12:00", patient: "Jorge Mendoza", type: "Consulta General", mode: "presencial", status: "pending" },
];

const patientQueue = [
  { id: "PAT001", name: "Carlos Santana", time: "10:00", reason: "Consulta General" },
  { id: "PAT002", name: "Elena Rodriguez", time: "11:00", reason: "Seguimiento Dermatológico" },
];

const allPatients = [
  { id: "PAT001", dni: "78945612", name: "Carlos Santana", lastVisit: "2024-07-10" },
  { id: "PAT002", dni: "84561239", name: "Elena Rodriguez", lastVisit: "2024-07-08" },
  { id: "PAT003", dni: "12345678", name: "Jorge Mendoza", lastVisit: "2024-06-25" },
];


// ============================================================
// NAV DOCTOR (Glass + icons)
// ============================================================
function DoctorNav() {
  return (
    <div className="backdrop-blur-md bg-white/70 border-b border-gray-200 shadow-sm px-6 py-4 flex gap-8">
      <Link to="/doctor" className="flex items-center gap-2 font-medium text-gray-700 hover:text-blue-600">
        <CalendarDays size={20}/> Panel
      </Link>
      <Link to="/doctor/agenda" className="flex items-center gap-2 font-medium text-gray-700 hover:text-blue-600">
        <Clock size={20}/> Agenda
      </Link>
      <Link to="/doctor/atender" className="flex items-center gap-2 font-medium text-gray-700 hover:text-blue-600">
        <UserCheck size={20}/> Atender
      </Link>
      <Link to="/doctor/pacientes" className="flex items-center gap-2 font-medium text-gray-700 hover:text-blue-600">
        <History size={20}/> Pacientes
      </Link>
    </div>
  );
}


// ============================================================
// 1. PANEL PRINCIPAL DEL DOCTOR
// ============================================================
function DoctorHome() {
  const summary = { todayAppointments: 8, pendingResults: 3, newPatients: 2 };

  const nextPatient = {
    name: "Ana García",
    time: "10:30",
    reason: "Seguimiento Cardiología",
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-gray-900">
        Panel del Doctor
      </h1>

      {/* Tarjetas */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div className="p-6 rounded-2xl shadow-lg bg-blue-50 border border-blue-200">
          <p className="text-gray-600">Citas Hoy</p>
          <p className="text-4xl font-bold text-blue-700">
            {summary.todayAppointments}
          </p>
        </div>

        <div className="p-6 rounded-2xl shadow-lg bg-yellow-50 border border-yellow-200">
          <p className="text-gray-600">Resultados Pendientes</p>
          <p className="text-4xl font-bold text-yellow-700">
            {summary.pendingResults}
          </p>
        </div>

        <div className="p-6 rounded-2xl shadow-lg bg-green-50 border border-green-200">
          <p className="text-gray-600">Nuevos Pacientes</p>
          <p className="text-4xl font-bold text-green-700">
            {summary.newPatients}
          </p>
        </div>
      </div>

      {/* Próximo paciente */}
      <div className="p-6 rounded-2xl bg-white border shadow-lg">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Próximo Paciente
        </h2>
        <p className="text-lg font-bold">{nextPatient.name}</p>
        <p className="text-gray-600">{nextPatient.reason}</p>
        <p className="mt-2 font-semibold text-blue-600">
          A las {nextPatient.time}
        </p>
      </div>
    </div>
  );
}


// ============================================================
// 2. AGENDA MODERNA
// ============================================================
function AgendaView() {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Agenda del día</h1>

      <div className="space-y-4">
        {mockAppointments.map((apt, i) => (
          <div
            key={i}
            className="p-5 bg-white rounded-2xl border shadow hover:shadow-lg transition"
          >
            <h3 className="font-semibold text-lg">{apt.time}</h3>
            <p className="text-gray-700">{apt.patient} — {apt.type}</p>
            <p className="text-sm text-gray-500">
              {apt.mode === "online" ? "Teleconsulta" : "Presencial"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}


// ============================================================
// 3. CONSULTA — Estilizado
// ============================================================
function ConsultationView() {
  const [patient, setPatient] = useState(null);
  const [diagnosis, setDiagnosis] = useState("");

  function handleSelect(id) {
    const found = patientQueue.find(p => p.id === id);
    if (found) setPatient(found);
  }

  function handleSave() {
    alert("Diagnóstico guardado ✔");

    // Post real a tu backend SQL
    // fetch("/api/diagnosticos", { ... })

    setDiagnosis("");
  }

  if (!patient) {
    return (
      <div className="p-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Seleccionar paciente</h1>

        {patientQueue.map(p => (
          <button
            key={p.id}
            onClick={() => handleSelect(p.id)}
            className="w-full p-4 bg-white border rounded-2xl shadow mb-4 text-left hover:shadow-lg transition"
          >
            <div className="flex justify-between">
              <div>
                <b>{p.name}</b> — {p.reason}
              </div>
              <span className="text-gray-500">{p.time}</span>
            </div>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        Consulta Activa: {patient.name}
      </h1>

      <textarea
        className="w-full p-4 border rounded-2xl shadow bg-white focus:ring-2 focus:ring-blue-400 outline-none"
        rows={8}
        placeholder="Escriba el diagnóstico..."
        value={diagnosis}
        onChange={(e) => setDiagnosis(e.target.value)}
      />

      <div className="mt-4 flex gap-4">
        <button
          onClick={handleSave}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow"
        >
          Guardar Diagnóstico
        </button>

        <button
          onClick={() => setPatient(null)}
          className="px-6 py-3 bg-gray-300 hover:bg-gray-400 rounded-xl"
        >
          Volver
        </button>
      </div>
    </div>
  );
}


// ============================================================
// 4. PACIENTES LIST (moderno)
// ============================================================
function PatientsView() {
  const [search, setSearch] = useState("");

  const filtered = allPatients.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.dni.includes(search)
  );

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Pacientes</h1>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-3 text-gray-400" />
        <input
          className="pl-10 p-3 border rounded-xl w-full shadow bg-white focus:ring-2 focus:ring-blue-400 outline-none"
          placeholder="Buscar por nombre o DNI..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filtered.map(p => (
        <div
          key={p.id}
          className="p-5 bg-white rounded-2xl border shadow mb-4 hover:shadow-lg transition"
        >
          <b className="text-lg">{p.name}</b> — DNI {p.dni}
          <p className="text-sm text-gray-500 mt-1">
            Última visita: {p.lastVisit}
          </p>
        </div>
      ))}

      {filtered.length === 0 && (
        <p className="text-gray-500 text-center pt-10">
          No se encontraron pacientes
        </p>
      )}
    </div>
  );
}


// ============================================================
// DASHBOARD PRINCIPAL
// ============================================================
export default function DoctorDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <DoctorNav />

      <Routes>
        <Route path="/" element={<DoctorHome />} />
        <Route path="/agenda" element={<AgendaView />} />
        <Route path="/atender" element={<ConsultationView />} />
        <Route path="/pacientes" element={<PatientsView />} />
      </Routes>
    </div>
  );
}
