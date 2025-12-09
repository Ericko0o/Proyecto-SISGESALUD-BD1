import { useMemo } from "react";
import { Calendar, Clock, CheckCircle, XCircle, PlusCircle, MoreVertical } from "lucide-react";

const appointments = [
  { id: "APT001", doctor: "Dr. Alan Grant", specialty: "Cardiología", date: "2024-08-15T10:00:00", status: "scheduled" },
  { id: "APT002", doctor: "Dra. Ellie Sattler", specialty: "Dermatología", date: "2024-08-20T14:30:00", status: "scheduled" },
  { id: "APT003", doctor: "Dr. Alan Grant", specialty: "Cardiología", date: "2024-07-10T09:00:00", status: "completed" },
  { id: "APT004", doctor: "Dr. John Hammond", specialty: "Pediatría", date: "2024-06-25T11:00:00", status: "cancelled" },
];

const STATUS = {
  scheduled: { label: "Programada", color: "bg-blue-500", Icon: Clock },
  completed: { label: "Completada", color: "bg-green-500", Icon: CheckCircle },
  cancelled: { label: "Cancelada", color: "bg-red-500", Icon: XCircle },
};

function AppointmentCard({ a }) {
  const cfg = STATUS[a.status];
  const fDate = new Date(a.date).toLocaleDateString("es-ES", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
  const fTime = new Date(a.date).toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="rounded-lg border bg-background/50 hover:shadow-md transition p-4">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-lg font-semibold">{a.specialty}</p>
          <p className="text-sm text-muted-foreground">con {a.doctor}</p>
        </div>
        <button className="h-8 w-8 grid place-items-center rounded-md hover:bg-white/10">
          <MoreVertical className="h-4 w-4" />
        </button>
      </div>
      <div className="mt-3 space-y-2 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          <span>{fDate}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          <span>{fTime}</span>
        </div>
      </div>
      <div className="mt-3">
        <span className={`inline-flex items-center gap-2 text-white text-xs px-2 py-1 rounded-md ${cfg.color}`}>
          <cfg.Icon className="h-3 w-3" />
          {cfg.label}
        </span>
      </div>
    </div>
  );
}

export default function Appointments() {
  const upcoming = useMemo(() => appointments.filter(a => a.status === "scheduled"), []);
  const past = useMemo(() => appointments.filter(a => a.status !== "scheduled"), []);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <p className="text-muted-foreground">Aquí puedes ver tus próximas citas y tu historial.</p>
        <button className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-white hover:opacity-90">
          <PlusCircle className="mr-2 h-4 w-4" />
          Agendar Nueva Cita
        </button>
      </div>

      <h3 className="text-lg font-semibold mb-3">Próximas</h3>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {upcoming.length ? upcoming.map(a => <AppointmentCard key={a.id} a={a} />) : (
          <p className="col-span-full text-center text-muted-foreground py-10">No tienes citas programadas.</p>
        )}
      </div>

      <h3 className="text-lg font-semibold mt-8 mb-3">Historial</h3>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {past.length ? past.map(a => <AppointmentCard key={a.id} a={a} />) : (
          <p className="col-span-full text-center text-muted-foreground py-10">No tienes citas en tu historial.</p>
        )}
      </div>
    </div>
  );
}
