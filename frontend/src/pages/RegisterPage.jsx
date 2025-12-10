// ============================================================================
// RegisterPage.jsx — Vite + React Router + Tailwind
// SISTEMA REAL DE AUTENTICACIÓN (SQL + Node/Express)
// ============================================================================

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { HeartPulse, UserPlus } from "lucide-react";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombre: "",
    dni: "",
    nacimiento: "",
    genero: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  // URL del backend (ej: http://localhost:4000/api)
  const API = import.meta.env.VITE_API_URL;

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);

    try {
      const res = await fetch(`${API}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Error al registrar");

      // 🔥 Guardar token + usuario
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // 🔥 Redirección según rol
      // id_rol:
      // 1 = Paciente
      // 2 = Doctor
      // 3 = Admin
      if (data.user.id_rol === 1) navigate("/patient/inicio");
      else if (data.user.id_rol === 2) navigate("/doctor/inicio");
      else if (data.user.id_rol === 3) navigate("/admin/inicio");
      else navigate("/app");
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white px-6">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8">
        <div className="flex flex-col items-center gap-2 mb-6">
          <HeartPulse className="w-10 h-10 text-blue-600" />
          <h1 className="text-2xl font-bold">Crear Cuenta — SISGESALUD</h1>
          <p className="text-gray-500 text-sm">Regístrate como paciente.</p>
        </div>

        <form className="space-y-4" onSubmit={onSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nombre Completo
              </label>
              <input
                type="text"
                name="nombre"
                placeholder="Ej: Juan Pérez"
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                value={form.nombre}
                onChange={onChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                DNI (8 dígitos)
              </label>
              <input
                type="text"
                name="dni"
                maxLength={8}
                pattern="\d{8}"
                placeholder="12345678"
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                value={form.dni}
                onChange={onChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Fecha de Nacimiento
              </label>
              <input
                type="date"
                name="nacimiento"
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                value={form.nacimiento}
                onChange={onChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Género
              </label>
              <select
                name="genero"
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                value={form.genero}
                onChange={onChange}
                required
              >
                <option value="" disabled>
                  Selecciona tu género
                </option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
                <option value="Otro">Prefiero no decirlo</option>
              </select>
            </div>
          </div>

          {/* EMAIL + PASSWORD */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Correo
              </label>
              <input
                type="email"
                name="email"
                placeholder="tu.correo@example.com"
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                value={form.email}
                onChange={onChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Contraseña (mín. 6)
              </label>
              <input
                type="password"
                name="password"
                minLength={6}
                placeholder="••••••••"
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                value={form.password}
                onChange={onChange}
                required
              />
            </div>
          </div>

          {/* ERRORES */}
          {err && (
            <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-md px-3 py-2">
              {err}
            </p>
          )}

          {/* BOTÓN */}
          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 text-white py-2.5 font-medium hover:bg-blue-700 transition disabled:opacity-60"
          >
            <UserPlus className="w-4 h-4" />
            {loading ? "Creando cuenta..." : "Crear Cuenta"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          ¿Ya tienes cuenta?{" "}
          <Link to="/login" className="text-blue-600 font-semibold hover:underline">
            Inicia sesión
          </Link>
        </p>
      </div>
    </main>
  );
}
