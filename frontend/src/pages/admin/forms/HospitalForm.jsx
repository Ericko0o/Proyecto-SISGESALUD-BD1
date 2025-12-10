// src/pages/admin/forms/HospitalForm.jsx
import { useState } from "react";

export default function HospitalForm({ initialData = {}, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    name: initialData.name || "",
    address: initialData.address || "",
    phone: initialData.phone || "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <div>
        <label className="text-sm">Nombre del Hospital</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded-md bg-background border border-white/10"
          required
        />
      </div>

      <div>
        <label className="text-sm">Dirección</label>
        <input
          name="address"
          value={form.address}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded-md bg-background border border-white/10"
          required
        />
      </div>

      <div>
        <label className="text-sm">Teléfono</label>
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded-md bg-background border border-white/10"
          required
        />
      </div>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-3 py-2 rounded-md border border-white/10 hover:bg-white/5"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-3 py-2 rounded-md bg-primary text-white hover:bg-primary/80"
        >
          Guardar
        </button>
      </div>
    </form>
  );
}
