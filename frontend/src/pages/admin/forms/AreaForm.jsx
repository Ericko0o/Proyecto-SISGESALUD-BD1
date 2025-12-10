// src/pages/admin/forms/AreaForm.jsx
import { useState } from "react";

export default function AreaForm({ initial = null, onSubmit, onCancel }) {
  const [name, setName] = useState(initial?.name || "");
  const [description, setDescription] = useState(initial?.description || "");

  const submit = () => {
    if (!name.trim()) return alert("Debe ingresar un nombre");
    onSubmit({
      id: initial?.id || crypto.randomUUID(),
      name,
      description,
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm block mb-1">Nombre del Área</label>
        <input
          className="w-full bg-background/40 border border-white/20 rounded px-3 py-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ej: Emergencias"
        />
      </div>

      <div>
        <label className="text-sm block mb-1">Descripción</label>
        <textarea
          className="w-full bg-background/40 border border-white/20 rounded px-3 py-2"
          rows={2}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descripción del área…"
        />
      </div>

      <div className="flex justify-end gap-2">
        <button className="px-3 py-2 rounded bg-white/10" onClick={onCancel}>
          Cancelar
        </button>
        <button className="px-3 py-2 rounded bg-primary text-white" onClick={submit}>
          Guardar
        </button>
      </div>
    </div>
  );
}
