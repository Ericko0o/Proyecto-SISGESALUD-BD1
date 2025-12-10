// src/pages/admin/Reports.jsx
import { useMemo } from "react";
import { User, Stethoscope, Pill, Download } from "lucide-react";

const stats = [
  { title: "Pacientes Activos", value: "1,250", icon: User },
  { title: "Doctores en Plataforma", value: "85", icon: Stethoscope },
  { title: "Recetas Dispensadas (Mes)", value: "4,520", icon: Pill },
];

const chartData = [
  { month: "Enero", appointments: 186, new_patients: 80 },
  { month: "Febrero", appointments: 305, new_patients: 200 },
  { month: "Marzo", appointments: 237, new_patients: 120 },
  { month: "Abril", appointments: 73, new_patients: 190 },
  { month: "Mayo", appointments: 209, new_patients: 130 },
  { month: "Junio", appointments: 214, new_patients: 140 },
];

const reportData = [
  { id: "C001", date: "2024-06-01", patient: "Juan Pérez", doctor: "Dr. Grant", specialty: "Cardiología", status: "Realizada" },
  { id: "C002", date: "2024-06-01", patient: "Ana García", doctor: "Dra. Sattler", specialty: "Dermatología", status: "Realizada" },
  { id: "C003", date: "2024-06-02", patient: "Luis Martinez", doctor: "Dr. Grant", specialty: "Cardiología", status: "Cancelada" },
  { id: "C004", date: "2024-06-03", patient: "Sofía Rodríguez", doctor: "Dr. Malcolm", specialty: "Neurología", status: "Realizada" },
];

export default function Reports() {
  const max = useMemo(() => Math.max(...chartData.map((d) => Math.max(d.appointments, d.new_patients))), []);
  const scale = (v) => (v / max) * 100;

  const handleExport = () => {
    const headers = ["ID", "Fecha", "Paciente", "Doctor", "Especialidad", "Estado"];
    const csv = [headers.join(","), ...reportData.map((r) => Object.values(r).join(","))].join("\n");
    const uri = "data:text/csv;charset=utf-8," + encodeURIComponent(csv);
    const a = document.createElement("a");
    a.href = uri;
    a.download = "reporte_citas.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((s) => (
          <div key={s.title} className="bg-background/70 border border-white/10 rounded-xl shadow p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{s.title}</span>
              <s.icon className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="text-2xl font-bold mt-2">{s.value}</div>
          </div>
        ))}
      </div>

      {/* “Gráfico” simple de barras verticales */}
      <div className="bg-background/70 border border-white/10 rounded-xl shadow p-6">
        <h3 className="text-lg font-semibold">Reporte de Actividad Mensual</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Citas y nuevos pacientes en los últimos 6 meses
        </p>
        <div className="grid grid-cols-6 gap-4 items-end h-56">
          {chartData.map((d) => (
            <div key={d.month} className="flex flex-col items-center gap-2">
              <div className="flex gap-1 items-end h-40">
                <div
                  className="w-6 bg-primary/80 rounded"
                  style={{ height: `${scale(d.appointments)}%` }}
                  title={`Citas: ${d.appointments}`}
                />
                <div
                  className="w-6 bg-accent/80 rounded"
                  style={{ height: `${scale(d.new_patients)}%` }}
                  title={`Nuevos: ${d.new_patients}`}
                />
              </div>
              <span className="text-xs text-muted-foreground">{d.month}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tabla + export */}
      <div className="bg-background/70 border border-white/10 rounded-xl shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Generador de Reportes</h3>
          <button onClick={handleExport} className="px-3 py-2 rounded-md border border-white/10 hover:bg-white/5 flex items-center gap-2">
            <Download className="w-4 h-4" /> Exportar a Excel
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-t border-b border-white/10 bg-background/60">
                <th className="py-3 px-4">Paciente</th>
                <th className="py-3 px-4">Fecha</th>
                <th className="py-3 px-4">Especialidad</th>
                <th className="py-3 px-4">Estado</th>
              </tr>
            </thead>
            <tbody>
              {reportData.map((r) => (
                <tr key={r.id} className="border-b border-white/10">
                  <td className="py-3 px-4">{r.patient}</td>
                  <td className="py-3 px-4">{r.date}</td>
                  <td className="py-3 px-4">{r.specialty}</td>
                  <td className="py-3 px-4">{r.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
