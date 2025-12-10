import { CalendarDays, Users, Stethoscope, FlaskConical, Pill, CheckCircle } from "lucide-react";

const summary = {
  todayAppointments: 14,
  activePatients: 256,
  doctorsOnDuty: 8,
};

const activityFeed = [
  { type: "appointment", icon: CalendarDays, color: "text-blue-500", title: "Nueva Cita Agendada", description: "Paciente Carlos Santana con Dr. Alan Grant.", timestamp: "Hace 5 min" },
  { type: "new_patient", icon: Stethoscope, color: "text-green-500", title: "Paciente Registrado", description: "Patricia Acosta (DNI: 98765432) fue agregada.", timestamp: "Hace 25 min" },
  { type: "lab_result", icon: FlaskConical, color: "text-purple-500", title: "Resultado Cargado", description: "Resultados de \"Perfil Lipídico\" para C. Santana.", timestamp: "Hace 1 hora" },
  { type: "prescription_dispensed", icon: Pill, color: "text-pink-500", title: "Receta Dispensada", description: "Farmacia entregó Losartán 50mg a C. Santana.", timestamp: "Hace 3 horas" },
  { type: "prescription_received", icon: CheckCircle, color: "text-teal-500", title: "Paciente Confirmó Recepción", description: "E. Rodriguez confirmó recepción de \"Hidrocortisona\".", timestamp: "Ayer" },
];

const badges = {
  appointment: { label: "Cita", cls: "bg-blue-100 text-blue-800 border-blue-200" },
  new_patient: { label: "Admisión", cls: "bg-green-100 text-green-800 border-green-200" },
  lab_result: { label: "Laboratorio", cls: "bg-purple-100 text-purple-800 border-purple-200" },
  prescription_dispensed: { label: "Farmacia", cls: "bg-pink-100 text-pink-800 border-pink-200" },
  prescription_received: { label: "Paciente", cls: "bg-teal-100 text-teal-800 border-teal-200" },
};

export default function ClinicalAdminDashboardHome() {
  return (
    <div className="space-y-6">
      {/* Cards resumen */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-5 shadow">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Citas para Hoy</p>
            <CalendarDays className="w-4 h-4 text-muted-foreground" />
          </div>
          <p className="text-3xl font-bold mt-2">{summary.todayAppointments}</p>
        </div>
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-5 shadow">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Pacientes Activos</p>
            <Users className="w-4 h-4 text-muted-foreground" />
          </div>
          <p className="text-3xl font-bold mt-2">{summary.activePatients}</p>
        </div>
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-5 shadow">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Doctores de Turno</p>
            <Stethoscope className="w-4 h-4 text-muted-foreground" />
          </div>
          <p className="text-3xl font-bold mt-2">{summary.doctorsOnDuty}</p>
        </div>
      </div>

      {/* Actividad reciente */}
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl shadow">
        <div className="p-6">
          <h3 className="text-xl font-semibold">Actividad Reciente del Hospital</h3>
          <p className="text-sm text-muted-foreground">
            Un vistazo en tiempo real a las operaciones clínicas.
          </p>
        </div>
        <div className="px-6 pb-6 overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b text-sm text-muted-foreground">
                <th className="py-2 w-40">Tipo</th>
                <th className="py-2">Detalle</th>
                <th className="py-2 text-right w-28">Hora</th>
              </tr>
            </thead>
            <tbody>
              {activityFeed.map((a, i) => {
                const b = badges[a.type];
                const Icon = a.icon;
                return (
                  <tr key={i} className="border-b last:border-0">
                    <td className="py-3">
                      <span className={`inline-flex items-center gap-2 px-2.5 py-1 border rounded-md text-xs ${b.cls}`}>
                        <Icon className="w-3.5 h-3.5" />
                        {b.label}
                      </span>
                    </td>
                    <td className="py-3">
                      <p className="font-medium">{a.title}</p>
                      <p className="text-sm text-muted-foreground">{a.description}</p>
                    </td>
                    <td className="py-3 text-right text-xs text-muted-foreground">{a.timestamp}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
