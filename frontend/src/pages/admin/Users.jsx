// src/pages/admin/Users.jsx
import { useState } from "react";
import { PlusCircle, Search } from "lucide-react";
import UserForm from "./forms/UserForm.jsx";

const INITIAL = [
  { id: "DR001", name: "Dr. Alan Grant", email: "doctor@example.com", role: "Doctor", status: "Activo" },
  { id: "PAT001", name: "Carlos Santana", email: "paciente@example.com", role: "Paciente", status: "Activo" },
  { id: "FARM01", name: "Farma-Juan", email: "farmacia@example.com", role: "Farmacia", status: "Activo" },
  { id: "LAB01", name: "Lab-Analista Demo", email: "laboratorio@example.com", role: "Laboratorio", status: "Activo" },
  { id: "ADM01", name: "Super Admin", email: "admin@example.com", role: "Administrador del Sistema", status: "Activo" },
  { id: "CADM01", name: "Admin Clínico", email: "clinical-admin@example.com", role: "Administrador Clínico", status: "Activo" },
];

export default function Users() {
  const [rows, setRows] = useState(INITIAL);
  const [q, setQ] = useState("");
  
  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const filtered = rows.filter(
    (u) =>
      u.name.toLowerCase().includes(q.toLowerCase()) ||
      u.email.toLowerCase().includes(q.toLowerCase()) ||
      u.role.toLowerCase().includes(q.toLowerCase())
  );

  const openAdd = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const openEdit = (user) => {
    setEditing(user);
    setModalOpen(true);
  };

  const saveUser = (data) => {
    if (editing) {
      // editar
      setRows((r) =>
        r.map((u) => (u.id === editing.id ? { ...u, ...data } : u))
      );
    } else {
      // nuevo
      setRows((r) => [
        ...r,
        { id: crypto.randomUUID(), status: "Activo", ...data },
      ]);
    }
    setModalOpen(false);
  };

  return (
    <>
      {/* CONTENIDO */}
      <div className="bg-background/70 border border-white/10 rounded-xl shadow">
        <div className="p-6 md:flex md:items-center md:justify-between">
          <div>
            <h3 className="text-xl font-semibold">Gestión de Usuarios</h3>
            <div className="mt-4 flex gap-2">
              <input
                className="w-72 px-3 py-2 rounded-md bg-background border border-white/10 outline-none"
                placeholder="Buscar por nombre o correo..."
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
              <button className="px-3 py-2 rounded-md border border-white/10 hover:bg-white/5 flex items-center gap-2">
                <Search className="w-4 h-4" /> Buscar
              </button>
            </div>
          </div>

          <button
            className="mt-4 md:mt-0 px-3 py-2 rounded-md bg-primary/90 hover:bg-primary text-white flex items-center gap-2"
            onClick={openAdd}
          >
            <PlusCircle className="w-4 h-4" /> Agregar Usuario
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-t border-b border-white/10 bg-background/60">
                <th className="py-3 px-4">Nombre</th>
                <th className="py-3 px-4">Correo</th>
                <th className="py-3 px-4">Rol</th>
                <th className="py-3 px-4">Estado</th>
                <th className="py-3 px-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) => (
                <tr key={u.id} className="border-b border-white/10">
                  <td className="py-3 px-4">{u.name}</td>
                  <td className="py-3 px-4">{u.email}</td>
                  <td className="py-3 px-4">{u.role}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 rounded text-xs bg-green-500/20 text-green-300">
                      {u.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      className="px-2 py-1 text-sm rounded hover:bg-white/5"
                      onClick={() => openEdit(u)}
                    >
                      Editar
                    </button>
                    <button className="px-2 py-1 text-sm rounded hover:bg-white/5">
                      Cambiar Rol
                    </button>
                    <button
                      className="px-2 py-1 text-sm rounded text-red-400 hover:bg-red-400/10"
                      onClick={() =>
                        setRows((r) =>
                          r.map((x) =>
                            x.id === u.id ? { ...x, status: "Inactivo" } : x
                          )
                        )
                      }
                    >
                      Desactivar
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td className="py-8 px-4 text-center text-muted-foreground" colSpan={5}>
                    Sin resultados…
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center p-4">
          <div className="bg-background p-6 rounded-xl border border-white/10 w-full max-w-md shadow-xl">
            <h2 className="text-lg font-semibold mb-4">
              {editing ? "Editar Usuario" : "Nuevo Usuario"}
            </h2>

            <UserForm
              initialData={editing || {}}
              onSubmit={saveUser}
              onCancel={() => setModalOpen(false)}
            />
          </div>
        </div>
      )}
    </>
  );
}
