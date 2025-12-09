import { ClipboardList } from "lucide-react";

const summary = {
  pendingPrescriptions: 12,
  dispensedToday: 45,
};

const recentDispensations = [
  { id: "RX-001", patient: "Juan Pérez", time: "Hace 5 min" },
  { id: "RX-002", patient: "Ana García", time: "Hace 15 min" },
  { id: "RX-003", patient: "Luis Martinez", time: "Hace 30 min" },
];

export default function PharmacyDashboardHome() {
  return (
    <div className="container mx-auto h-full">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          Hola, Farmacia
        </h1>
        <p className="text-muted-foreground text-lg">
          Bienvenido a tu panel de Farmacia.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white shadow rounded-lg p-6">
              <p className="text-sm text-muted-foreground">Recetas Pendientes</p>
              <p className="text-4xl font-bold">{summary.pendingPrescriptions}</p>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <p className="text-sm text-muted-foreground">Dispensadas Hoy</p>
              <p className="text-4xl font-bold">{summary.dispensedToday}</p>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Dispensaciones Recientes</h3>

            <table className="w-full text-left">
              <thead>
                <tr className="border-b">
                  <th className="py-2 text-sm text-gray-500">Receta ID</th>
                  <th className="py-2 text-sm text-gray-500">Paciente</th>
                  <th className="py-2 text-sm text-gray-500">Hora</th>
                </tr>
              </thead>
              <tbody>
                {recentDispensations.map((item) => (
                  <tr key={item.id} className="border-b last:border-0">
                    <td className="py-3 font-mono">{item.id}</td>
                    <td className="py-3">{item.patient}</td>
                    <td className="py-3">{item.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-semibold flex items-center gap-2 mb-2 text-muted-foreground">
              <ClipboardList className="w-5 h-5" />
              Acciones Rápidas
            </h3>
            <p className="text-sm text-muted-foreground">
              Navega a los módulos principales para gestionar y consultar el historial de recetas dispensadas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
