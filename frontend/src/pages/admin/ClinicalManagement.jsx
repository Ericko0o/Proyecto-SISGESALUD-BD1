// src/pages/admin/ClinicalManagement.jsx
import { useState } from "react";
import SpecialtyForm from "./forms/SpecialtyForm.jsx";
import TurnoManagementDialog from "./dialogs/TurnoManagementDialog.jsx";

// ------------------------------ MOCK DATA ------------------------------
const USERS = [
  { id: "DR001", name: "Dr. Alan Grant", email: "doctor@example.com", role: "doctor", hospital: "Hospital Central de Lima",
    turnos: [
      { id: "T1", day: "Lunes", start: "08:00", end: "14:00" },
      { id: "T2", day: "Miércoles", start: "12:00", end: "18:00" },
    ]
  },
  { id: "PAT001", name: "Carlos Santana", email: "paciente@example.com", role: "patient", hospital: "—" },
];

const APPTS = [
  { id: "CITA01", patient: "Carlos Santana", doctor: "Dr. Alan Grant", date: "2024-08-15 10:00", status: "Programada" },
  { id: "CITA02", patient: "Elena Rodriguez", doctor: "Dra. Ellie Sattler", date: "2024-08-15 11:00", status: "Programada" },
];

const INITIAL_SPECS = [
  { id: "ESP01", name: "Cardiología", description: "Atención al corazón y sistema circulatorio." },
  { id: "ESP02", name: "Dermatología", description: "Atención a la piel." },
  { id: "ESP03", name: "Neurología", description: "Atención al sistema nervioso." },
];

// ----------------------------------------------------------------------

export default function ClinicalManagement() {
  const [tab, setTab] = useState("doctors");
  const [specialties, setSpecialties] = useState(INITIAL_SPECS);

  // ---- MODAL: SPECIALTY ----
  const [editingSpec, setEditingSpec] = useState(null);

  const saveSpecialty = (spec) => {
    setSpecialties(prev =>
      editingSpec
        ? prev.map((s) => (s.id === editingSpec.id ? spec : s))
        : [...prev, spec]
    );
    setEditingSpec(null);
  };

  // ---- MODAL: TURNOS ----
  const [doctorForTurnos, setDoctorForTurnos] = useState(null);

  const saveTurnos = (newTurnos) => {
    USERS.forEach((u) => {
      if (u.id === doctorForTurnos.id) {
        u.turnos = newTurnos;
      }
    });
    setDoctorForTurnos(null);
  };

  // ----------------------------------------------------------------------

  return (
    <div className="bg-background/70 border border-white/10 rounded-xl shadow p-6">
      <h3 className="text-xl font-semibold">Gestión Clínica Centralizada</h3>
      <p className="text-muted-foreground text-sm mb-4">
        Administre doctores, pacientes, citas y especialidades desde un único lugar.
      </p>

      {/* Tabs */}
      <div className="flex gap-2 mb-4">
        {[
          ["doctors", "Doctores"],
          ["patients", "Pacientes"],
          ["appointments", "Citas"],
          ["specialties", "Especialidades"],
        ].map(([value, label]) => (
          <button
            key={value}
            onClick={() => setTab(value)}
            className={`px-3 py-2 rounded-md border ${
              tab === value ? "bg-primary/20 border-primary text-primary" : "border-white/10 hover:bg-white/5"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* ------------------------------ DOCTORS ------------------------------ */}
      {tab === "doctors" && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-t border-b border-white/10 bg-background/60">
                <th className="py-3 px-4">Nombre</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Hospital Asignado</th>
                <th className="py-3 px-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {USERS.filter((u) => u.role === "doctor").map((u) => (
                <tr key={u.id} className="border-b border-white/10">
                  <td className="py-3 px-4">{u.name}</td>
                  <td className="py-3 px-4">{u.email}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 rounded text-xs border border-white/10">{u.hospital}</span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      className="px-2 py-1 text-sm rounded hover:bg-white/5"
                      onClick={() => setDoctorForTurnos(u)}
                    >
                      Turnos
                    </button>
                    <button className="px-2 py-1 text-sm rounded hover:bg-white/5">Editar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ------------------------------ PATIENTS ------------------------------ */}
      {tab === "patients" && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-t border-b border-white/10 bg-background/60">
                <th className="py-3 px-4">Nombre</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {USERS.filter((u) => u.role === "patient").map((u) => (
                <tr key={u.id} className="border-b border-white/10">
                  <td className="py-3 px-4">{u.name}</td>
                  <td className="py-3 px-4">{u.email}</td>
                  <td className="py-3 px-4 text-right">
                    <button className="px-2 py-1 text-sm rounded hover:bg-white/5">Editar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ------------------------------ APPOINTMENTS ------------------------------ */}
      {tab === "appointments" && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-t border-b border-white/10 bg-background/60">
                <th className="py-3 px-4">Paciente</th>
                <th className="py-3 px-4">Doctor</th>
                <th className="py-3 px-4">Fecha y Hora</th>
                <th className="py-3 px-4">Estado</th>
                <th className="py-3 px-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {APPTS.map((c) => (
                <tr key={c.id} className="border-b border-white/10">
                  <td className="py-3 px-4">{c.patient}</td>
                  <td className="py-3 px-4">{c.doctor}</td>
                  <td className="py-3 px-4">{c.date}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 rounded text-xs bg-green-500/20 text-green-300">{c.status}</span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button className="px-2 py-1 text-sm rounded hover:bg-white/5">Reprogramar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ------------------------------ SPECIALTIES ------------------------------ */}
      {tab === "specialties" && (
        <>
          <div className="text-right mb-3">
            <button
              className="px-3 py-2 rounded-md bg-primary/90 hover:bg-primary text-white"
              onClick={() => setEditingSpec({})}
            >
              Agregar Especialidad
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-t border-b border-white/10 bg-background/60">
                  <th className="py-3 px-4">Nombre</th>
                  <th className="py-3 px-4">Descripción</th>
                  <th className="py-3 px-4 text-right">Acciones</th>
                </tr>
              </thead>

              <tbody>
                {specialties.map((s) => (
                  <tr key={s.id} className="border-b border-white/10">
                    <td className="py-3 px-4">{s.name}</td>
                    <td className="py-3 px-4">{s.description}</td>
                    <td className="py-3 px-4 text-right">
                      <button
                        className="px-2 py-1 text-sm rounded hover:bg-white/5"
                        onClick={() => setEditingSpec(s)}
                      >
                        Editar
                      </button>

                      <button
                        className="px-2 py-1 text-sm rounded text-red-400 hover:bg-red-400/10"
                        onClick={() => setSpecialties((arr) => arr.filter((x) => x.id !== s.id))}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}

                {specialties.length === 0 && (
                  <tr>
                    <td colSpan={3} className="py-8 text-center text-muted-foreground">
                      No hay especialidades.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* -------- MODAL: SPECIALTY FORM -------- */}
      {editingSpec !== null && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-6">
          <div className="bg-background p-6 rounded-xl border border-white/10 w-[420px]">
            <h3 className="font-semibold text-lg mb-3">
              {editingSpec?.id ? "Editar Especialidad" : "Nueva Especialidad"}
            </h3>

            <SpecialtyForm
              initial={editingSpec}
              onSubmit={saveSpecialty}
              onCancel={() => setEditingSpec(null)}
            />
          </div>
        </div>
      )}

      {/* -------- MODAL: TURNOS -------- */}
      {doctorForTurnos && (
        <TurnoManagementDialog
          doctor={doctorForTurnos}
          turnos={doctorForTurnos.turnos || []}
          onSave={saveTurnos}
          onClose={() => setDoctorForTurnos(null)}
        />
      )}
    </div>
  );
}
