import { FilePlus2, Download, Stethoscope } from "lucide-react";

const diagnostics = [
  {
    id: "DIAG001",
    title: "Hipertensión Arterial",
    doctor: "Dr. Alan Grant",
    specialty: "Cardiología",
    date: "2024-07-10",
    details:
      "El paciente presenta lecturas de presión arterial consistentemente elevadas. Se recomienda iniciar tratamiento con Losartán 50mg/día y seguimiento en 1 mes.",
  },
  {
    id: "DIAG002",
    title: "Dermatitis Atópica",
    doctor: "Dra. Ellie Sattler",
    specialty: "Dermatología",
    date: "2024-06-15",
    details:
      "Se observan lesiones eczematosas en pliegues de codos y rodillas. Se prescribe crema con hidrocortisona y se recomienda evitar alérgenos conocidos.",
  },
];

export default function Diagnostics() {
  return (
    <div>
      <p className="text-muted-foreground mb-6">
        Aquí puedes ver el historial de diagnósticos emitidos por tus doctores.
      </p>

      <div className="relative pl-6 before:absolute before:left-[38px] before:top-0 before:h-full before:w-px before:bg-border before:-translate-x-1/2">
        {diagnostics.map((diag) => (
          <div key={diag.id} className="relative mb-8">
            <div className="absolute left-0 top-1 w-10 h-10 rounded-full bg-primary/10 border-4 border-background flex items-center justify-center -translate-x-1/2">
              <FilePlus2 className="w-5 h-5 text-primary" />
            </div>
            <div className="pl-12">
              <p className="text-sm text-muted-foreground">
                {new Date(diag.date).toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" })}
              </p>

              <div className="mt-2 rounded-lg border bg-background/70 hover:border-primary/50 transition-colors">
                <div className="p-4 border-b">
                  <div className="flex items-center gap-2">
                    <h4 className="text-lg font-semibold">{diag.title}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1 flex items-center gap-2">
                    <Stethoscope className="w-4 h-4" />
                    Emitido por {diag.doctor} ({diag.specialty})
                  </p>
                </div>
                <div className="p-4">
                  <p className="text-sm">{diag.details}</p>
                  <button className="mt-4 inline-flex items-center rounded-md border px-3 py-2 text-sm hover:bg-white/10">
                    <Download className="mr-2 h-4 w-4" />
                    Ver detalles de la cita
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
