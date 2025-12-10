// src/pages/admin/forms/TurnoForm.jsx
import { useState } from "react";

export default function TurnoForm({ initial = null, onSubmit, onCancel }) {
  const [day, setDay] = useState(initial?.day || "Lunes");
  const [start, setStart] = useState(initial?.start || "08:00");
  const [end, setEnd] = useState(initial?.end || "16:00");

  const submit = () => {
    if (!start || !end) return alert("Debe ingresar horas válidas");

    onSubmit({
      id: initial?.id || crypto.randomUUID(),
      day,
      start,
      end,
    });
  };

  return (
    <div className="space-y-3">
      <div>
        <label className="text-sm block mb-1">Día</label>
        <select
          className="w-full bg-background/40 border border-white/20 rounded px-3 py-2"
          value={day}
          onChange={(e) => setDay(e.target.value)}
        >
          {["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"].map((d) => (
            <option key={d}>{d}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-sm block mb-1">Hora Inicio</label>
        <input
          type="time"
          className="w-full bg-background/40 border border-white/20 rounded px-3 py-2"
          value={start}
          onChange={(e) => setStart(e.target.value)}
        />
      </div>

      <div>
        <label className="text-sm block mb-1">Hora Fin</label>
        <input
          type="time"
          className="w-full bg-background/40 border border-white/20 rounded px-3 py-2"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
        />
      </div>

      <div className="flex justify-end gap-2">
        <button className="px-3 py-2 bg-white/10 rounded" onClick={onCancel}>
          Cancelar
        </button>
        <button className="px-3 py-2 bg-primary text-white rounded" onClick={submit}>
          Guardar
        </button>
      </div>
    </div>
  );
}
