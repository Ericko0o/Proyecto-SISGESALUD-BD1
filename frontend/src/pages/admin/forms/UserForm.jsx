import { useState, useEffect } from "react";
import { adminAPI } from "../../../services/api";

export default function UserForm({ initialData = {}, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    nombre: initialData.nombre || "",
    dni: initialData.dni || "",
    email: initialData.email || "",
    password: "",
    id_rol: initialData.id_rol || "",
  });
  
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const rolesData = await adminAPI.getRoles();
      setRoles(rolesData);
    } catch (error) {
      console.error('Error al cargar roles:', error);
      // Roles por defecto en caso de error
      setRoles([
        { id_rol: 1, nombre: 'Paciente' },
        { id_rol: 2, nombre: 'Doctor' },
        { id_rol: 3, nombre: 'Administrador' },
        { id_rol: 4, nombre: 'Farmacia' },
        { id_rol: 5, nombre: 'Laboratorio' },
      ]);
    }
  };

  const update = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    if (!form.nombre || !form.email || !form.id_rol) {
      return alert("Nombre, email y rol son obligatorios");
    }
    
    if (!initialData.id_usuario && !form.password) {
      return alert("La contraseña es obligatoria para nuevos usuarios");
    }

    setLoading(true);
    try {
      await onSubmit(form);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm">Nombre completo</label>
        <input
          name="nombre"
          value={form.nombre}
          onChange={update}
          className="w-full px-3 py-2 rounded-md bg-background border border-white/10"
          placeholder="Ej: Juan Pérez"
          required
        />
      </div>

      <div>
        <label className="text-sm">DNI (opcional)</label>
        <input
          name="dni"
          value={form.dni}
          onChange={update}
          className="w-full px-3 py-2 rounded-md bg-background border border-white/10"
          placeholder="Ej: 12345678"
        />
      </div>

      <div>
        <label className="text-sm">Correo electrónico</label>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={update}
          className="w-full px-3 py-2 rounded-md bg-background border border-white/10"
          placeholder="usuario@ejemplo.com"
          required
        />
      </div>

      {!initialData.id_usuario && (
        <div>
          <label className="text-sm">Contraseña</label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={update}
            className="w-full px-3 py-2 rounded-md bg-background border border-white/10"
            placeholder="••••••••"
            required={!initialData.id_usuario}
          />
        </div>
      )}

      <div>
        <label className="text-sm">Rol</label>
        <select
          name="id_rol"
          value={form.id_rol}
          onChange={update}
          className="w-full px-3 py-2 rounded-md bg-background border border-white/10"
          required
        >
          <option value="">Seleccionar rol</option>
          {roles.map((role) => (
            <option key={role.id_rol} value={role.id_rol}>
              {role.nombre}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-end gap-2">
        <button 
          onClick={onCancel} 
          className="px-4 py-2 border rounded-md"
          disabled={loading}
        >
          Cancelar
        </button>
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-primary text-white rounded-md"
          disabled={loading}
        >
          {loading ? 'Guardando...' : 'Guardar'}
        </button>
      </div>
    </div>
  );
}