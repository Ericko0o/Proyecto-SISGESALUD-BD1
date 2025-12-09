import { useState } from "react";

export default function ExternalResultForm({ onClose, onSubmit }) {
  const [form, setForm] = useState({
    examName: "",
    examDate: new Date().toISOString().split("T")[0],
    labName: "",
    file: null,
  });
  const [errors, setErrors] = useState({});

  const change = (e) => {
    const { name, value, files } = e.target;
    setForm((s) => ({ ...s, [name]: files ? files[0] : value }));
  };

  const validate = () => {
    const err = {};
    if (!form.examName || form.examName.length < 3) err.examName = "Ingrese un nombre válido (≥3).";
    if (!form.examDate || isNaN(Date.parse(form.examDate))) err.examDate = "Fecha inválida.";
    if (!form.labName || form.labName.length < 3) err.labName = "Ingrese un laboratorio válido (≥3).";
    if (!form.file) err.file = "Adjunte el PDF del resultado.";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const submit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit?.(form);
  };

  return (
    <div className="fixed inset-0 bg-black/50 grid place-items-center p-4 z-50">
      <div className="w-full max-w-lg rounded-lg border bg-background p-5">
        <h4 className="text-lg font-semibold mb-1">Subir Resultado Externo</h4>
        <p className="text-sm text-muted-foreground mb-4">
          Complete la información y adjunte el archivo PDF de su resultado.
        </p>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="text-sm">Nombre del Examen</label>
            <input
              className="w-full mt-1 px-3 py-2 rounded-md border bg-transparent"
              name="examName"
              placeholder="Ej: Resonancia Magnética de Rodilla"
              value={form.examName}
              onChange={change}
            />
            {errors.examName && <p className="text-xs text-red-500 mt-1">{errors.examName}</p>}
          </div>

          <div>
            <label className="text-sm">Fecha de Realización</label>
            <input
              className="w-full mt-1 px-3 py-2 rounded-md border bg-transparent"
              type="date"
              name="examDate"
              value={form.examDate}
              onChange={change}
            />
            {errors.examDate && <p className="text-xs text-red-500 mt-1">{errors.examDate}</p>}
          </div>

          <div>
            <label className="text-sm">Nombre del Laboratorio Externo</label>
            <input
              className="w-full mt-1 px-3 py-2 rounded-md border bg-transparent"
              name="labName"
              placeholder="Ej: Laboratorios Unidos S.A.C."
              value={form.labName}
              onChange={change}
            />
            {errors.labName && <p className="text-xs text-red-500 mt-1">{errors.labName}</p>}
          </div>

          <div>
            <label className="text-sm">Archivo del Resultado (PDF)</label>
            <input
              className="w-full mt-1"
              type="file"
              name="file"
              accept=".pdf"
              onChange={change}
            />
            {errors.file && <p className="text-xs text-red-500 mt-1">{errors.file}</p>}
          </div>

          <div className="flex justify-end gap-2">
            <button type="button" className="px-3 py-2 rounded-md border" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="px-3 py-2 rounded-md bg-primary text-white hover:opacity-90">
              Subir y Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
