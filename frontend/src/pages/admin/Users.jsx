// src/pages/admin/Users.jsx
import { useState, useEffect } from "react";
import { PlusCircle, Search } from "lucide-react";
import UserForm from "./forms/UserForm.jsx";
import { adminAPI } from "../../services/api";

export default function Users() {
  const [rows, setRows] = useState([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  // Cargar usuarios al montar el componente
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const users = await adminAPI.getUsers();
      setRows(users);
    } catch (error) {
      console.error('Error al cargar usuarios:', error);
      // Puedes mostrar un mensaje de error al usuario
    } finally {
      setLoading(false);
    }
  };

  const filtered = rows.filter(
    (u) =>
      u.nombre.toLowerCase().includes(q.toLowerCase()) ||
      u.email.toLowerCase().includes(q.toLowerCase()) ||
      u.rol_nombre.toLowerCase().includes(q.toLowerCase())
  );

  const openAdd = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const openEdit = (user) => {
    setEditing(user);
    setModalOpen(true);
  };

  const saveUser = async (userData) => {
    try {
      if (editing) {
        // Editar usuario existente
        await adminAPI.updateUser(editing.id_usuario, userData);
      } else {
        // Crear nuevo usuario
        await adminAPI.createUser(userData);
      }
      
      // Actualizar la lista
      await fetchUsers();
      setModalOpen(false);
    } catch (error) {
      console.error('Error al guardar usuario:', error);
      alert('Error al guardar el usuario');
    }
  };

  const toggleUserStatus = async (userId) => {
    try {
      await adminAPI.toggleUserStatus(userId);
      // Actualizar la lista
      await fetchUsers();
    } catch (error) {
      console.error('Error al cambiar estado:', error);
      alert('Error al cambiar el estado del usuario');
    }
  };

  if (loading && rows.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

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
              <button 
                className="px-3 py-2 rounded-md border border-white/10 hover:bg-white/5 flex items-center gap-2"
                onClick={fetchUsers}
              >
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
                <th className="py-3 px-4">Tipo</th>
                <th className="py-3 px-4">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) => (
                <tr key={u.id_usuario} className="border-b border-white/10">
                  <td className="py-3 px-4">{u.nombre}</td>
                  <td className="py-3 px-4">{u.email}</td>
                  <td className="py-3 px-4">{u.rol_nombre}</td>
                  <td className="py-3 px-4">{u.tipo_usuario || 'Usuario'}</td>
                  <td className="py-3 px-4 space-x-2">
                    <button
                      className="px-2 py-1 text-sm rounded hover:bg-white/5"
                      onClick={() => openEdit(u)}
                    >
                      Editar
                    </button>
                    <button
                      className="px-2 py-1 text-sm rounded text-red-400 hover:bg-red-400/10"
                      onClick={() => toggleUserStatus(u.id_usuario)}
                    >
                      {u.activo === false ? 'Activar' : 'Desactivar'}
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && !loading && (
                <tr>
                  <td className="py-8 px-4 text-center text-muted-foreground" colSpan={5}>
                    {q ? 'No se encontraron usuarios' : 'No hay usuarios registrados'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center p-4 z-50">
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