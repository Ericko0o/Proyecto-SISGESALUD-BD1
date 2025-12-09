import { Link } from "react-router-dom";
import {
  AlertCircle,
  Bell,
  Calendar,
  CheckCircle2,
  Clock,
  FileText,
  FlaskConical,
  MoveRight,
} from "lucide-react";

const nextAppointment = {
  doctor: "Dr. Alan Grant",
  specialty: "Cardiología",
  date: "2024-08-15T10:00:00",
  location: "Consultorio 301, Piso 3",
};

const recentActivity = [
  {
    id: 1,
    type: "diagnosis",
    title: "Nuevo diagnóstico disponible",
    description: "El Dr. Ian Malcolm ha añadido un nuevo diagnóstico.",
    date: "Hace 2 horas",
    icon: FileText,
    iconColor: "text-blue-500",
  },
  {
    id: 2,
    type: "lab_result",
    title: "Resultado de laboratorio listo",
    description: "Tu análisis de sangre ya está disponible para consulta.",
    date: "Ayer",
    icon: FlaskConical,
    iconColor: "text-green-500",
  },
  {
    id: 3,
    type: "appointment_confirmation",
    title: "Cita confirmada",
    description: "Tu cita con la Dra. Ellie Sattler ha sido confirmada.",
    date: "Hace 3 días",
    icon: CheckCircle2,
    iconColor: "text-indigo-500",
  },
];

const formattedDate = new Date(nextAppointment.date).toLocaleDateString("es-ES", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});
const formattedTime = new Date(nextAppointment.date).toLocaleTimeString("es-ES", {
  hour: "2-digit",
  minute: "2-digit",
});

export default function PatientDashboard() {
  return (
    <div className="container mx-auto h-full">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">Hola, Paciente</h1>
        <p className="text-muted-foreground text-lg">Bienvenido a tu panel.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
        <div className="lg:col-span-2">
          <div className="h-full bg-card/50 backdrop-blur-sm border border-white/10 shadow-lg rounded-lg">
            <div className="p-5 border-b border-white/10">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Bell className="w-5 h-5" />
                <h3 className="text-lg font-semibold text-foreground">Actividad Reciente</h3>
              </div>
            </div>
            <div className="p-5">
              <ul className="space-y-4">
                {recentActivity.map((activity) => (
                  <li key={activity.id} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-background/80 border border-white/10 flex items-center justify-center flex-shrink-0">
                      <activity.icon className={`w-5 h-5 ${activity.iconColor}`} />
                    </div>
                    <div className="flex-grow">
                      <p className="font-semibold text-foreground">{activity.title}</p>
                      <p className="text-sm text-muted-foreground">{activity.description}</p>
                    </div>
                    <p className="text-xs text-muted-foreground whitespace-nowrap">{activity.date}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-card/50 backdrop-blur-sm border border-white/10 shadow-lg rounded-lg">
            <div className="p-5 border-b border-white/10">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="w-5 h-5" />
                <h3 className="text-lg font-semibold text-foreground">Próxima Cita</h3>
              </div>
            </div>
            <div className="p-5 space-y-2">
              <p className="text-lg font-bold text-primary">{nextAppointment.specialty}</p>
              <p className="text-sm text-muted-foreground">con {nextAppointment.doctor}</p>
              <div className="flex items-center gap-2 pt-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="font-semibold text-foreground">
                  {formattedDate} a las {formattedTime}
                </span>
              </div>
            </div>
            <div className="p-5 pt-0">
              <Link
                to="/patient/citas"
                className="inline-flex items-center justify-center w-full rounded-md bg-primary px-4 py-2 text-white hover:opacity-90"
              >
                Ver Detalles de la Cita <MoveRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="bg-destructive/10 border border-destructive/30 shadow-lg rounded-lg">
            <div className="p-5 flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-destructive" />
              <p className="text-destructive">
                No olvides traer tus análisis anteriores a tu próxima cita de cardiología.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Atajo para entrar al layout con sidebar activo en “Inicio” */}
      <div className="mt-8">
        <Link
          to="/patient/inicio"
          className="text-sm text-primary underline underline-offset-4"
        >
          Abrir modo navegación (Sidebar)
        </Link>
      </div>
    </div>
  );
}
