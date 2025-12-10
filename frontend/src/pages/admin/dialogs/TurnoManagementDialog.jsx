// src/pages/admin/dialogs/TurnoManagementDialog.jsx
import { X } from "lucide-react";
import TurnoForm from "../forms/TurnoForm.jsx";
import { useState } from "react";

export default function TurnoManagementDialog({ doctor, turnos, onSave, onClose }) {
  const [list, setList] = useState(turnos || []);
  const [editing, setEditing] = useState(null);

  const saveTurno = (t) => {
    if (editing) {
      setList(list.map((x) => (x.id === editing.id ? t : x)));
    } else {
      setList([...list, t]);
    }
    setEditing(null);
  };

  const removeTurno = (id) => {
    setList(list.filter((t) => t.id !== id));
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-background border border-white/20 w-[500px] rounded-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-lg">Turnos — {doctor.name}</h2>
          <button onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3">
          {list.map((t) => (
            <div key={t.id} className="border border-white/10 rounded p-3 flex justify-between">
              <div>
                <strong>{t.day}</strong>
                <div className="text-sm text-muted-foreground">{t.start} — {t.end}</div>
              </div>
              <div className="space-x-2">
                <button onClick={() => setEditing(t)} className="text-blue-400">Editar</button>
                <button onClick={() => removeTurno(t.id)} className="text-red-400">Eliminar</button>
              </div>
            </div>
          ))}

          {list.length === 0 && (
            <p className="text-center text-muted-foreground py-4">No hay turnos registrados.</p>
          )}
        </div>

        <div className="mt-4">
          <TurnoForm
            initial={editing}
            onSubmit={saveTurno}
            onCancel={() => setEditing(null)}
          />
        </div>

        <div className="flex justify-end mt-4">
          <button
            className="px-4 py-2 bg-primary text-white rounded"
            onClick={() => onSave(list)}
          >
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  );
}
