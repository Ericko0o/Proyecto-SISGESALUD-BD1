import { useState, useMemo } from "react";
import { Pill, Calendar, Clock, Download, Check, X, AlertTriangle, PackageCheck } from "lucide-react";

const initialPrescriptions = [
  { id: "RX001", medication: "Losartán 50mg", doctor: "Dr. Alan Grant", date: "2024-07-10", dosage: "1 pastilla cada 24 horas", duration: "Permanente", status: "dispensed" },
  { id: "RX002", medication: "Crema Hidrocortisona 1%", doctor: "Dra. Ellie Sattler", date: "2024-06-15", dosage: "Aplicar en el área afectada 2 veces al día", duration: "14 días", status: "received" },
  { id: "RX003", medication: "Amoxicilina 500mg", doctor: "Dr. John Hammond", date: "2024-05-01", dosage: "1 cápsula cada 8 horas", duration: "7 días", status: "expired" },
];

const STATUS = {
  active: { label: "Activa (Pendiente de dispensar)", Icon: AlertTriangle, badge: "bg-yellow-500/80" },
  dispensed: { label: "Dispensada (Pendiente de recepción)", Icon: PackageCheck, badge: "bg-blue-500/80" },
  received: { label: "Recibido", Icon: Check, badge: "bg-green-500/80" },
  expired: { label: "Expirada", Icon: X, badge: "bg-muted-foreground/80" },
};

function PrescriptionCard({ p, onConfirm }) {
  const cfg = STATUS[p.status] || { label: p.status, Icon: Check, badge: "bg-slate-400" };

  return (
    <div className="rounded-lg border bg-background/70 p-4 space-y-3">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-lg font-semibold flex items-center gap-2">
            <Pill className="h-5 w-5 text-primary" />
            {p.medication}
          </p>
          <p className="text-sm text-muted-foreground mt-1">Recetado por {p.doctor}</p>
        </div>
        <span className={`inline-flex items-center gap-2 text-white text-xs px-2 py-1 rounded-md ${cfg.badge}`}>
          <cfg.Icon className="h-3 w-3" />
          {cfg.label}
        </span>
      </div>

      <p className="text-sm font-semibold bg-primary/10 text-primary p-2 rounded-md">{p.dosage}</p>

      <div className="text-sm text-muted-foreground space-y-2">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          <span>
            Fecha de emisión:{" "}
            {new Date(p.date).toLocaleDateString("es-ES", { month: "long", day: "numeric", year: "numeric" })}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          <span>Duración: {p.duration}</span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {p.status === "dispensed" && (
          <button
            onClick={() => onConfirm(p.id)}
            className="rounded-md bg-green-600 hover:bg-green-700 text-white px-3 py-2 text-sm"
          >
            <Check className="h-4 w-4 inline mr-2" />
            Confirmar Recepción del Medicamento
          </button>
        )}
        <button className="rounded-md border px-3 py-2 text-sm hover:bg-white/10">
          <Download className="h-4 w-4 inline mr-2" />
          Descargar Receta PDF
        </button>
      </div>
    </div>
  );
}

export default function Prescriptions() {
  const [list, setList] = useState(initialPrescriptions);
  const active = useMemo(() => list.filter(p => ["active", "dispensed"].includes(p.status)), [list]);
  const history = useMemo(() => list.filter(p => ["expired", "received"].includes(p.status)), [list]);

  const confirmReception = (id) => setList(prev => prev.map(p => (p.id === id ? { ...p, status: "received" } : p)));

  return (
    <div>
      <p className="text-muted-foreground mb-6">Consulta y gestiona tus recetas.</p>

      <h3 className="text-lg font-semibold mb-3">Recetas Activas</h3>
      <div className="grid gap-6 md:grid-cols-2">
        {active.length ? active.map(p => <PrescriptionCard key={p.id} p={p} onConfirm={confirmReception} />)
          : <p className="col-span-full text-center text-muted-foreground py-10">No tienes recetas activas.</p>}
      </div>

      <h3 className="text-lg font-semibold mt-8 mb-3">Historial</h3>
      <div className="grid gap-6 md:grid-cols-2">
        {history.length ? history.map(p => <PrescriptionCard key={p.id} p={p} onConfirm={() => {}} />)
          : <p className="col-span-full text-center text-muted-foreground py-10">No tienes recetas en tu historial.</p>}
      </div>
    </div>
  );
}
