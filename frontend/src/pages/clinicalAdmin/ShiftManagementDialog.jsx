import { useState } from "react";
import { PlusCircle, Edit, Trash2 } from "lucide-react";
import ShiftForm from "./ShiftForm.jsx";

const initial = [
  { id: "SHIFT01", area: "Cardiología", day: "Lunes", startTime: "08:00", endTime: "14:00" },
  { id: "SHIFT02", area: "Consulta Externa", day: "Miércoles", startTime: "09:00", endTime: "13:00" },
];

export default function ShiftManagementDialog({ doctor, close }) {
  const [shifts, setShifts] = useState(initial);
  const [openForm, setOpenForm] = useState(false);
  const [editing, setEditing] = useState(null);

  const submit = (data, id) => {
    if (id) setShifts((arr) => arr.map((t) => (t.id === id ? { ...t, ...data } : t)));
    else setShifts((arr) => [...arr, { id: `SHIFT${(Math.random() * 1000).toFixed(0).padStart(3, "0")}`, ...data }]);
    setOpenForm(false);
  };

  const del = (t) => {
    if (confirm(`¿Eliminar turno del ${t.day} ${t.startTime}-${t.endTime}?`))
      setShifts((arr) => arr.filter((x) => x.id !== t.id));
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[900px] max-h-[90vh] rounded-xl shadow-xl p-6 overflow-y-auto">
        <h3 className="text-xl font-bold">Gestionar Horarios de "{doctor.name}"</h3>
        <p className="text-sm text-gray-600">Asigne, edite o elimine los turnos de trabajo.</p>

        <div className="flex justify-end mt-4">
          <button
            className="px-3 py-2 rounded-md bg-primary text-white hover:bg-primary/90 inline-flex items-center gap-2"
            onClick={() => {
              setEditing(null);
              setOpenForm(true);
            }}
          >
            <PlusCircle className="w-4 h-4" />
            Asignar Turno
          </button>
        </div>

        <div className="mt-4 border rounded-lg overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b text-sm text-gray-600 bg-gray-50">
                <th className="py-2 px-3">Día</th>
                <th className="py-2 px-3">Área</th>
                <th className="py-2 px-3">Hora Inicio</th>
                <th className="py-2 px-3">Hora Fin</th>
                <th className="py-2 px-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {shifts.map((t) => (
                <tr key={t.id} className="border-b last:border-0">
                  <td className="py-3 px-3">
                    <span className="inline-flex px-2 py-1 text-xs border rounded-md">{t.day}</span>
                  </td>
                  <td className="px-3">{t.area}</td>
                  <td className="px-3">{t.startTime}</td>
                  <td className="px-3">{t.endTime}</td>
                  <td className="px-3 text-right">
                    <button className="px-2 py-1 rounded-md hover:bg-black/5" onClick={() => { setEditing(t); setOpenForm(true); }}>
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="px-2 py-1 rounded-md text-red-600 hover:bg-red-100" onClick={() => del(t)}>
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {shifts.length === 0 && (
                <tr>
                  <td colSpan="5" className="py-10 text-center text-gray-500">Este doctor aún no tiene turnos asignados.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end mt-4">
          <button className="px-4 py-2 rounded-md border" onClick={close}>Cerrar</button>
        </div>
      </div>

      {openForm && <ShiftForm shift={editing} onSubmit={submit} close={() => setOpenForm(false)} />}
    </div>
  );
}
