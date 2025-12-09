import { Calendar, Clock, UserPlus } from "lucide-react";

export default function DoctorDashboardHome() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold mb-4">Panel del Doctor</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white/10 rounded-xl">
          <p className="text-gray-400">Citas Hoy</p>
          <p className="text-4xl font-bold">8</p>
        </div>

        <div className="p-6 bg-white/10 rounded-xl">
          <p className="text-gray-400">Resultados Pendientes</p>
          <p className="text-4xl font-bold">3</p>
        </div>

        <div className="p-6 bg-white/10 rounded-xl">
          <p className="text-gray-400">Nuevos Pacientes</p>
          <p className="text-4xl font-bold">2</p>
        </div>
      </div>
    </div>
  );
}
