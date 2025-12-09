import {
  HeartPulse,
  Syringe,
  Pill,
  ShieldAlert,
  FileText,
  Calendar,
  Stethoscope,
  FlaskConical,
  CheckCircle,
} from "lucide-react";

const medicalHistory = {
  patientInfo: { name: "Carlos Santana", age: 45, bloodType: "A+" },
  allergies: ["Penicilina"],
  chronicConditions: ["Hipertensión Arterial"],
  importantMedications: ["Losartán 50mg"],
  recentEvents: [
    { type: "Cita Médica", date: "2024-08-15", description: "Próxima consulta de Cardiología con Dr. Alan Grant", icon: Calendar },
    {
      type: "Diagnóstico",
      date: "2024-07-10",
      description: "Diagnóstico de Hipertensión Arterial",
      icon: FileText,
      details:
        "El paciente presenta lecturas de presión arterial consistentemente elevadas. Se recomienda iniciar tratamiento con Losartán 50mg/día y seguimiento en 1 mes.",
      doctor: "Dr. Alan Grant",
    },
    {
      type: "Receta",
      date: "2024-07-10",
      description: "Receta emitida para Losartán 50mg",
      icon: Pill,
      details: "1 pastilla cada 24 horas. Tratamiento permanente.",
      doctor: "Dr. Alan Grant",
      status: "Recibido por paciente",
    },
    { type: "Examen Solicitado", date: "2024-07-10", description: "Solicitud de Perfil Lipídico", icon: FlaskConical, doctor: "Dr. Alan Grant" },
    { type: "Resultado de Laboratorio", date: "2024-07-12", description: "Resultados de Perfil Lipídico", icon: Syringe, details: "Colesterol total: 210 mg/dL (Elevado). Se adjunta PDF.", lab: "Laboratorio Interno SISGESALUD" },
  ],
};

const iconMap = {
  "Cita Médica": Calendar,
  Diagnóstico: FileText,
  Receta: Pill,
  "Examen Solicitado": FlaskConical,
  "Resultado de Laboratorio": Syringe,
};

function StatusBadge({ status }) {
  if (!status) return null;
  if (status === "Recibido por paciente") {
    return (
      <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 border border-green-200 rounded px-2 py-0.5 text-xs mt-2">
        <CheckCircle className="h-3 w-3" /> {status}
      </span>
    );
  }
  return <span className="inline-block border rounded px-2 py-0.5 text-xs mt-2">{status}</span>;
}

export default function MedicalHistory() {
  return (
    <div>
      <p className="text-muted-foreground mb-6 text-center">
        Este es un resumen consolidado de tu información médica más relevante.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Izquierda */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-lg border bg-background/70">
            <div className="p-4 border-b">
              <h3 className="text-lg font-semibold">Resumen del Paciente</h3>
            </div>
            <div className="p-4 grid grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Nombre</p>
                <p className="font-semibold">{medicalHistory.patientInfo.name}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Edad</p>
                <p className="font-semibold">{medicalHistory.patientInfo.age} años</p>
              </div>
              <div>
                <p className="text-muted-foreground">Tipo de Sangre</p>
                <p className="font-semibold flex items-center gap-2">
                  <HeartPulse className="h-4 w-4 text-red-500" /> {medicalHistory.patientInfo.bloodType}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border bg-background/70">
            <div className="p-4 border-b">
              <h3 className="text-lg font-semibold">Cronología de Eventos Recientes</h3>
            </div>
            <div className="p-5 relative pl-4">
              <div className="absolute left-4 top-0 h-full w-px bg-border -translate-x-1/2" />
              {medicalHistory.recentEvents.map((e, i) => {
                const Icon = iconMap[e.type] || Stethoscope;
                return (
                  <div key={i} className="relative flex items-start gap-4 mb-8">
                    <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-secondary grid place-items-center -translate-x-1/2 border-4 border-background">
                      <Icon className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="pl-8 flex-1">
                      <p className="font-semibold">{e.type}</p>
                      <p className="text-sm text-muted-foreground">{e.description}</p>
                      {e.details && <p className="text-sm mt-1 p-2 bg-background/50 rounded-md border">{e.details}</p>}
                      {e.type === "Receta" && <StatusBadge status={e.status} />}
                      <time className="block text-xs text-muted-foreground/80 mt-1">
                        {new Date(e.date).toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" })}
                      </time>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Derecha */}
        <div className="space-y-6">
          <div className="rounded-lg border bg-background/70">
            <div className="p-4 flex items-center gap-3 border-b">
              <ShieldAlert className="h-5 w-5 text-red-500" />
              <h4 className="text-lg font-semibold">Alergias Conocidas</h4>
            </div>
            <div className="p-4 flex flex-wrap gap-2">
              {medicalHistory.allergies.map((a) => (
                <span key={a} className="text-base px-3 py-1 rounded bg-red-100 text-red-800 border border-red-200">
                  {a}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-lg border bg-background/70">
            <div className="p-4 flex items-center gap-3 border-b">
              <HeartPulse className="h-5 w-5 text-blue-500" />
              <h4 className="text-lg font-semibold">Condiciones Crónicas</h4>
            </div>
            <div className="p-4 flex flex-wrap gap-2">
              {medicalHistory.chronicConditions.map((c) => (
                <span key={c} className="text-base px-3 py-1 rounded bg-blue-100 text-blue-800 border border-blue-200">
                  {c}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-lg border bg-background/70">
            <div className="p-4 flex items-center gap-3 border-b">
              <Pill className="h-5 w-5 text-green-500" />
              <h4 className="text-lg font-semibold">Medicamentos Clave</h4>
            </div>
            <div className="p-4 space-y-2">
              {medicalHistory.importantMedications.map((m) => (
                <p key={m} className="text-sm font-medium">{m}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
