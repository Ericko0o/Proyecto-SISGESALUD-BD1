// src/pages/admin/DashboardHome.jsx
import { Users, Hospital } from "lucide-react";

const summary = {
  totalUsers: 134,
  totalDoctors: 85,
  totalHospitals: 23,
};

const rolesData = [
  { type: "Pacientes", total: 1250 },
  { type: "Doctores", total: 85 },
  { type: "Farmacias", total: 40 },
  { type: "Laboratorios", total: 25 },
];

export default function AdminDashboardHome() {
  return (
    <div className="space-y-6">
      {/* Cards resumen */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-background/50 backdrop-blur-sm border border-white/10 rounded-xl shadow p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Usuarios Totales</span>
            <Users className="w-4 h-4 text-muted-foreground" />
          </div>
          <p className="text-3xl font-bold mt-2">{summary.totalUsers}</p>
        </div>

        <div className="bg-background/50 backdrop-blur-sm border border-white/10 rounded-xl shadow p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Doctores Activos</span>
            <Users className="w-4 h-4 text-muted-foreground" />
          </div>
          <p className="text-3xl font-bold mt-2">{summary.totalDoctors}</p>
        </div>

        <div className="bg-background/50 backdrop-blur-sm border border-white/10 rounded-xl shadow p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Hospitales Afiliados</span>
            <Hospital className="w-4 h-4 text-muted-foreground" />
          </div>
          <p className="text-3xl font-bold mt-2">{summary.totalHospitals}</p>
        </div>
      </div>

      {/* “Gráfico” simple horizontal (sin librerías) */}
      <div className="bg-background/60 border border-white/10 rounded-xl shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Distribución de Roles de Usuario</h3>
        <div className="space-y-3">
          {rolesData.map((row) => {
            const pct = Math.max(6, Math.min(100, (row.total / 1250) * 100));
            return (
              <div key={row.type}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-muted-foreground">{row.type}</span>
                  <span className="text-muted-foreground">{row.total}</span>
                </div>
                <div className="h-3 bg-white/10 rounded-md overflow-hidden">
                  <div
                    className="h-full bg-primary/70"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
