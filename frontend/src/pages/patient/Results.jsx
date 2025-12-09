import { useState } from "react";
import { Beaker, Download, Upload } from "lucide-react";
import ExternalResultForm from "./ExternalResultForm.jsx";

const labResults = [
  { id: "LAB001", testName: "Perfil Lipídico", doctor: "Dr. Alan Grant", date: "2024-07-12", status: "available", lab: "Laboratorio Interno SISGESALUD" },
  { id: "LAB002", testName: "Hemograma Completo", doctor: "Dra. Ellie Sattler", date: "2024-06-20", status: "pending", lab: "Laboratorio Interno SISGESALUD" },
  { id: "LAB003", testName: "Biopsia de Piel (Externo)", doctor: "N/A - Subido por paciente", date: "2024-05-15", status: "available", lab: "Clínica Dermatológica Avanzada" },
];

const STATUS = {
  available: { label: "Disponible", cls: "bg-green-100 text-green-800 border border-green-200" },
  pending: { label: "Pendiente", cls: "bg-yellow-100 text-yellow-800 border border-yellow-200" },
};

export default function Results() {
  const [open, setOpen] = useState(false);

  const onSubmit = (data) => {
    console.log("Subiendo externo:", data);
    setOpen(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <p className="text-muted-foreground max-w-2xl">
          Aquí puedes encontrar los resultados de tus exámenes, internos y externos.
        </p>
        <button
          className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-white hover:opacity-90"
          onClick={() => setOpen(true)}
        >
          <Upload className="mr-2 h-4 w-4" />
          Subir Resultado Externo
        </button>
      </div>

      <div className="rounded-lg border bg-background/70 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-left">
            <tr className="border-b">
              <th className="p-3 w-[35%]">Tipo de Examen</th>
              <th className="p-3">Fecha</th>
              <th className="p-3">Laboratorio</th>
              <th className="p-3">Estado</th>
              <th className="p-3 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {labResults.map((r) => {
              const cfg = STATUS[r.status];
              return (
                <tr key={r.id} className="border-b last:border-0">
                  <td className="p-3 font-medium">
                    <span className="inline-flex items-center gap-2">
                      <Beaker className="h-4 w-4 text-primary" />
                      {r.testName}
                    </span>
                  </td>
                  <td className="p-3">
                    {new Date(r.date).toLocaleDateString("es-ES", { day: "2-digit", month: "short", year: "numeric" })}
                  </td>
                  <td className="p-3">{r.lab}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded ${cfg.cls}`}>{cfg.label}</span>
                  </td>
                  <td className="p-3 text-right">
                    <button
                      className="inline-flex items-center gap-2 text-sm px-2 py-1 rounded hover:bg-white/10 disabled:opacity-50"
                      disabled={r.status !== "available"}
                    >
                      <Download className="h-4 w-4" />
                      Descargar
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {open && <ExternalResultForm onClose={() => setOpen(false)} onSubmit={onSubmit} />}
    </div>
  );
}
