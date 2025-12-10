// ============================================================================
// LoginPage.jsx — Vite + React Router + Tailwind
// Ahora 100% compatible con el backend actualizado (bcrypt + JWT + roles).
// ============================================================================

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { HeartPulse, LogIn } from "lucide-react";

export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const API = import.meta.env.VITE_API_URL; // ej: http://localhost:4000/api

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);

    try {
      const res = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Error de login");

      // Guardar token y usuario
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Redirección según el rol
      switch (data.user.id_rol) {
        case 1: // Paciente
          navigate("/patient/inicio");
          break;
        case 2: // Doctor
          navigate("/doctor/inicio");
          break;
        case 3: // Admin
          navigate("/admin/inicio");
          break;
        case 4: // Farmacia
          navigate("/farmacia/inicio");
          break;
        case 5: // Laboratorio
          navigate("/lab/inicio");
          break;
        default:
          navigate("/app");
      }
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white px-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="flex flex-col items-center gap-2 mb-6">
          <HeartPulse className="w-10 h-10 text-blue-600" />
          <h1 className="text-2xl font-bold">SISGESALUD Cloud</h1>
          <p className="text-gray-500 text-sm">Gestión de Salud Centralizada</p>
        </div>

        <form className="space-y-4" onSubmit={onSubmit}>
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
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              value={form.password}
              onChange={onChange}
              required
            />
          </div>

          {err && (
            <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-md px-3 py-2">
              {err}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 text-white py-2.5 font-medium hover:bg-blue-700 transition disabled:opacity-60"
          >
            <LogIn className="w-4 h-4" />
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          ¿No tienes una cuenta?{" "}
          <Link to="/register" className="text-blue-600 font-semibold hover:underline">
            Crea una aquí
          </Link>
        </p>
      </div>
    </main>
  );
}
