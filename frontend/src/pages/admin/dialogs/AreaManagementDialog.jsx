// src/pages/admin/dialogs/AreaManagementDialog.jsx
import { useState } from "react";

export default function AreaManagementDialog({ hospital, onClose, onSave }) {
  const [areas, setAreas] = useState(hospital.areas || []);

  const addArea = () => {
    setAreas([
      ...areas,
      { id: crypto.randomUUID(), name: "Nueva Área", description: "" },
    ]);
  };

  const updateArea = (id, field, value) => {
    setAreas((arr) =>
      arr.map((a) => (a.id === id ? { ...a, [field]: value } : a))
    );
  };

  const deleteArea = (id) => {
    setAreas((arr) => arr.filter((a) => a.id !== id));
  };

  const save = () => {
    onSave(areas);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center p-4">
      <div className="bg-background p-6 rounded-xl border border-white/10 w-full max-w-2xl">
        <h2 className="text-lg font-semibold mb-4">
          Gestión de Áreas – {hospital.name}
        </h2>

        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
          {areas.map((a) => (
            <div
              key={a.id}
              className="border border-white/10 rounded-lg p-3 bg-background/40"
            >
              <input
                className="w-full mb-2 px-2 py-1 rounded bg-background border border-white/10"
                value={a.name}
                onChange={(e) =>
                  updateArea(a.id, "name", e.target.value)
                }
              />

              <textarea
                className="w-full px-2 py-1 rounded bg-background border border-white/10"
                value={a.description}
                onChange={(e) =>
                  updateArea(a.id, "description", e.target.value)
                }
              />

              <button
                className="mt-2 text-red-400 hover:bg-red-400/20 px-2 py-1 rounded"
                onClick={() => deleteArea(a.id)}
              >
                Eliminar Área
              </button>
            </div>
          ))}
        </div>

        <div className="flex justify-between mt-4">
          <button
            className="px-3 py-2 rounded-md border border-white/10 hover:bg-white/5"
            onClick={addArea}
          >
            Agregar Área
          </button>

          <div className="flex gap-2">
            <button
              className="px-3 py-2 rounded-md border border-white/10 hover:bg-white/5"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              className="px-3 py-2 rounded-md bg-primary text-white hover:bg-primary/80"
              onClick={save}
            >
              Guardar Cambios
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
