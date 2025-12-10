import { useState } from "react";

export default function UserForm({ initialData = {}, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    name: initialData.name || "",
    email: initialData.email || "",
    role: initialData.role || "patient",
  });

  const update = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm">Nombre</label>
        <input
          name="name"
          value={form.name}
          onChange={update}
          className="w-full px-3 py-2 rounded-md bg-background border border-white/10"
        />
      </div>

      <div>
        <label className="text-sm">Correo</label>
        <input
          name="email"
          value={form.email}
          onChange={update}
          className="w-full px-3 py-2 rounded-md bg-background border border-white/10"
        />
      </div>

      <div>
        <label className="text-sm">Rol</label>
        <select
          name="role"
          value={form.role}
          onChange={update}
          className="w-full px-3 py-2 rounded-md bg-background border border-white/10"
        >
          <option value="patient">Paciente</option>
          <option value="doctor">Doctor</option>
          <option value="pharmacy">Farmacia</option>
          <option value="laboratory">Laboratorio</option>
          <option value="clinical-admin">Admin Clínico</option>
          <option value="admin">Administrador del Sistema</option>
        </select>
      </div>

      <div className="flex justify-end gap-2">
        <button onClick={onCancel} className="px-4 py-2 border rounded-md">
          Cancelar
        </button>
        <button
          onClick={() => onSubmit(form)}
          className="px-4 py-2 bg-primary text-white rounded-md"
        >
          Guardar
        </button>
      </div>
    </div>
  );
}
