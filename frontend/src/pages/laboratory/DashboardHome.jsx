import { FlaskConical } from "lucide-react";

export default function LaboratoryDashboardHome() {
  const summary = {
    pendingExams: 8,
    processedToday: 22,
  };

  const urgentExams = [
    { id: "EXM-001", type: "Hemograma Urgente", doctor: "Dr. Grant" },
    { id: "EXM-002", type: "Perfil Bioquímico", doctor: "Dr. Malcolm" },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
      {/* Cards */}
      <div className="lg:col-span-2 space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20 shadow">
            <p className="text-sm text-muted-foreground">Exámenes Pendientes</p>
            <p className="text-3xl font-bold">{summary.pendingExams}</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20 shadow">
            <p className="text-sm text-muted-foreground">Procesados Hoy</p>
            <p className="text-3xl font-bold">{summary.processedToday}</p>
          </div>
        </div>

        {/* Tabla */}
        <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20 shadow">
          <h3 className="text-xl font-semibold mb-4">Cola de Exámenes Urgentes</h3>

          <table className="w-full text-left">
            <thead>
              <tr className="border-b text-gray-300 text-sm">
                <th className="py-2">Tipo de Examen</th>
                <th className="py-2">Doctor Solicitante</th>
              </tr>
            </thead>

            <tbody>
              {urgentExams.map((ex) => (
                <tr key={ex.id} className="border-b last:border-0">
                  <td className="py-3">{ex.type}</td>
                  <td>{ex.doctor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Acciones rápidas */}
      <div>
        <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20 shadow">
          <h3 className="flex items-center gap-2 text-muted-foreground">
            <FlaskConical className="w-5 h-5" />
            Acciones Rápidas
          </h3>
          <p className="text-sm mt-2">
            Navega a los módulos para gestionar los exámenes pendientes o subir resultados.
          </p>
        </div>
      </div>
    </div>
  );
}
