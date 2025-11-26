// ============================================================================
// LoginPage.jsx  —  Vite + React Router + Tailwind
// Llama al backend SQL (Node/Express) usando VITE_API_URL
// ----------------------------------------------------------------------------
// ⬇️ BACKEND (agrega esto en tu server para que funcione este frontend)
// 1) Ruta: backend/src/routes/authRoutes.js
//    import express from "express";
//    import { login } from "../controllers/authController.js";
//    const router = express.Router();
//    router.post("/login", login);
//    export default router;
//
// 2) Controller: backend/src/controllers/authController.js
//    import { findUserByEmail } from "../models/userModel.sql.js";
//    import jwt from "jsonwebtoken"; // npm i jsonwebtoken
//    export const login = async (req, res) => {
//      const { email, password } = req.body;
//      try {
//        const user = await findUserByEmail(email);
//        if (!user) return res.status(401).json({ error: "Credenciales inválidas" });
//        // ⚠️ En producción usa hash (bcrypt). Ahora es simple por demo:
//        if (user.password !== password) return res.status(401).json({ error: "Credenciales inválidas" });
//        const token = jwt.sign(
//          { id_usuario: user.id_usuario, id_rol: user.id_rol },
//          process.env.JWT_SECRET || "dev-secret",
//          { expiresIn: "8h" }
//        );
//        res.json({
//          token,
//          user: {
//            id_usuario: user.id_usuario,
//            nombre: user.nombre,
//            email: user.email,
//            id_rol: user.id_rol,
//          },
//        });
//      } catch (e) {
//        res.status(500).json({ error: e.message });
//      }
//    };
//
// 3) Modelo: backend/src/models/userModel.sql.js
//    import { pool } from "../config/db.sql.js";
//    export const findUserByEmail = async (email) => {
//      const q = `SELECT id_usuario, nombre, email, password, id_rol
//                 FROM usuarios WHERE email = $1 LIMIT 1`;
//      const { rows } = await pool.query(q, [email]);
//      return rows[0];
//    };
//
// 4) Index del server: backend/src/index.js
//    import authRoutes from "./routes/authRoutes.js";
//    app.use("/api/auth", authRoutes);
//
// ============================================================================

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { HeartPulse, LogIn } from "lucide-react";

export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const API = import.meta.env.VITE_API_URL; // ej. http://localhost:4000/api

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

      // Guarda token y usuario (simple). En producción: httpOnly cookie.
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Redirección simple. Si quieres por rol:
      // if (data.user.id_rol === 2) navigate("/app/doctor"); else navigate("/app");
      navigate("/app");
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
