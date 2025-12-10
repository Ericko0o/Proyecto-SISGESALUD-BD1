import { useState } from "react";
import { Clock } from "lucide-react";
import ShiftManagementDialog from "./ShiftManagementDialog.jsx";

const doctors = [
  { id: "DR001", name: "Dr. Alan Grant", specialty: "Cardiología" },
  { id: "DR002", name: "Dra. Ellie Sattler", specialty: "Dermatología" },
  { id: "DR003", name: "Dr. Ian Malcolm", specialty: "Neurología" },
];

export default function ClinicalAdminShifts() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const manage = (doc) => {
    setSelected(doc);
    setOpen(true);
  };

  return (
    <>
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl shadow">
        <div className="p-6">
          <h2 className="text-2xl font-semibold">Gestión de Turnos de Doctores</h2>
          <p className="text-sm text-muted-foreground">Defina y administre los horarios de trabajo para cada doctor.</p>
        </div>

        <div className="px-6 pb-6 overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b text-sm text-muted-foreground">
                <th className="py-2">Doctor</th>
                <th className="py-2">Especialidad</th>
                <th className="py-2 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((d) => (
                <tr key={d.id} className="border-b last:border-0">
                  <td className="py-3 font-medium">{d.name}</td>
                  <td>{d.specialty}</td>
                  <td className="text-right">
                    <button className="px-3 py-2 rounded-md border hover:bg-white/10" onClick={() => manage(d)}>
                      <Clock className="inline w-4 h-4 mr-2" />
                      Gestionar Horarios
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {open && <ShiftManagementDialog doctor={selected} close={() => setOpen(false)} />}
    </>
  );
}
