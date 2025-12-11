// src/pages/admin/DashboardHome.jsx
import { Users, Hospital, UserCheck, Calendar, Activity } from "lucide-react";
import { useEffect, useState } from "react";
import { adminAPI } from "../../services/api";

export default function AdminDashboardHome() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalDoctors: 0,
    totalHospitals: 0,
    totalPatients: 0,
    totalAppointments: 0,
  });
  const [rolesData, setRolesData] = useState([]);
  const [activityData, setActivityData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [summary, usersByRole, activityReport] = await Promise.all([
        adminAPI.getStatsSummary(),
        adminAPI.getUsersByRole(),
        adminAPI.getActivityReport({
          startDate: '2024-01-01',
          endDate: '2024-12-31'
        })
      ]);
      
      setStats(summary);
      setRolesData(usersByRole);
      setActivityData(activityReport);
    } catch (error) {
      console.error('Error al cargar datos del dashboard:', error);
      // Datos por defecto en caso de error
      setStats({
        totalUsers: 134,
        totalDoctors: 85,
        totalHospitals: 23,
        totalPatients: 1250,
        totalAppointments: 4520,
      });
      setRolesData([
        { role: 'Pacientes', total: 1250 },
        { role: 'Doctores', total: 85 },
        { role: 'Farmacias', total: 40 },
        { role: 'Laboratorios', total: 25 },
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="bg-background/50 border border-white/10 rounded-xl shadow p-4 animate-pulse">
              <div className="h-4 bg-white/10 rounded mb-2 w-1/2"></div>
              <div className="h-8 bg-white/10 rounded w-1/3"></div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-background/60 border border-white/10 rounded-xl shadow p-6 animate-pulse">
            <div className="h-6 bg-white/10 rounded w-1/4 mb-4"></div>
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i}>
                  <div className="flex justify-between mb-1">
                    <div className="h-4 bg-white/10 rounded w-1/4"></div>
                    <div className="h-4 bg-white/10 rounded w-1/6"></div>
                  </div>
                  <div className="h-3 bg-white/10 rounded"></div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-background/60 border border-white/10 rounded-xl shadow p-6 animate-pulse">
            <div className="h-6 bg-white/10 rounded w-1/4 mb-4"></div>
            <div className="h-48 bg-white/10 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Cards resumen */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-background/50 backdrop-blur-sm border border-white/10 rounded-xl shadow p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Usuarios Totales</span>
            <Users className="w-4 h-4 text-muted-foreground" />
          </div>
          <p className="text-2xl font-bold mt-2">{stats.totalUsers}</p>
        </div>

        <div className="bg-background/50 backdrop-blur-sm border border-white/10 rounded-xl shadow p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Doctores</span>
            <UserCheck className="w-4 h-4 text-muted-foreground" />
          </div>
          <p className="text-2xl font-bold mt-2">{stats.totalDoctors}</p>
        </div>

        <div className="bg-background/50 backdrop-blur-sm border border-white/10 rounded-xl shadow p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Hospitales</span>
            <Hospital className="w-4 h-4 text-muted-foreground" />
          </div>
          <p className="text-2xl font-bold mt-2">{stats.totalHospitals}</p>
        </div>

        <div className="bg-background/50 backdrop-blur-sm border border-white/10 rounded-xl shadow p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Pacientes</span>
            <Users className="w-4 h-4 text-muted-foreground" />
          </div>
          <p className="text-2xl font-bold mt-2">{stats.totalPatients}</p>
        </div>

        <div className="bg-background/50 backdrop-blur-sm border border-white/10 rounded-xl shadow p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Citas</span>
            <Calendar className="w-4 h-4 text-muted-foreground" />
          </div>
          <p className="text-2xl font-bold mt-2">{stats.totalAppointments}</p>
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de distribución de roles */}
        <div className="bg-background/60 border border-white/10 rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Users className="w-5 h-5" /> Distribución de Roles
          </h3>
          <div className="space-y-3">
            {rolesData.map((row) => {
              const maxTotal = Math.max(...rolesData.map(r => r.total));
              const pct = maxTotal > 0 ? Math.max(6, Math.min(100, (row.total / maxTotal) * 100)) : 0;
              return (
                <div key={row.role}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-muted-foreground">{row.role}</span>
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

        {/* Gráfico de actividad */}
        <div className="bg-background/60 border border-white/10 rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5" /> Actividad Mensual
          </h3>
          <div className="grid grid-cols-6 gap-4 items-end h-48 mt-4">
            {activityData.slice(0, 6).map((d, index) => {
              const month = new Date(d.month).toLocaleDateString('es-ES', { month: 'short' });
              const maxAppointments = Math.max(...activityData.map(a => a.appointments));
              const height = maxAppointments > 0 ? (d.appointments / maxAppointments) * 100 : 0;
              
              return (
                <div key={index} className="flex flex-col items-center gap-2">
                  <div className="flex flex-col items-center justify-end h-40">
                    <div
                      className="w-6 bg-primary/80 rounded-t"
                      style={{ height: `${height}%` }}
                      title={`Citas: ${d.appointments}`}
                    />
                    <div className="text-xs text-muted-foreground mt-1">{d.appointments}</div>
                  </div>
                  <span className="text-xs text-muted-foreground">{month}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}