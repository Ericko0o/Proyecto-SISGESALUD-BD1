// backend/src/controllers/authController.js
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { findUserByEmail, createUser, findUserById } from "../models/userModel.sql.js";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";
const SALT_ROUNDS = parseInt(process.env.BCRYPT_ROUNDS || "10");

/**
 * POST /api/auth/register
 * Solo pacientes pueden registrarse desde frontend.
 */
export const register = async (req, res) => {
  try {
    const { nombre, dni, nacimiento, genero, email, password } = req.body;
    if (!nombre || !email || !password) return res.status(400).json({ error: "Faltan campos obligatorios" });

    const exists = await findUserByEmail(email);
    if (exists) return res.status(409).json({ error: "Correo ya registrado" });

    // Rol por defecto: Paciente => asumimos id_rol = 1 (verifica en tu tabla roles)
    const id_rol_por_defecto = 1;

    const hashed = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await createUser({
      nombre,
      dni: dni || null,
      nacimiento: nacimiento || null,
      genero: genero || null,
      email,
      password: hashed,
      id_rol: id_rol_por_defecto,
    });

    const token = jwt.sign({ id_usuario: user.id_usuario, id_rol: user.id_rol }, JWT_SECRET, { expiresIn: "8h" });

    res.status(201).json({
      message: "Usuario creado",
      token,
      user: { id_usuario: user.id_usuario, nombre: user.nombre, email: user.email, id_rol: user.id_rol },
    });
  } catch (e) {
    console.error("register error:", e);
    res.status(500).json({ error: e.message });
  }
};

/**
 * POST /api/auth/login
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: "Email y password son requeridos" });

    const user = await findUserByEmail(email);
    if (!user) return res.status(401).json({ error: "Credenciales inválidas" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: "Credenciales inválidas" });

    const token = jwt.sign({ id_usuario: user.id_usuario, id_rol: user.id_rol }, JWT_SECRET, { expiresIn: "8h" });

    res.json({
      token,
      user: {
        id_usuario: user.id_usuario,
        nombre: user.nombre,
        email: user.email,
        id_rol: user.id_rol,
      },
    });
  } catch (e) {
    console.error("login error:", e);
    res.status(500).json({ error: e.message });
  }
};

/**
 * GET /api/auth/me  -> devuelve perfil básico del usuario autenticado
 */
export const me = async (req, res) => {
  try {
    const id = req.user?.id_usuario;
    if (!id) return res.status(401).json({ error: "Token inválido" });
    const user = await findUserById(id);
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });
    res.json({ user });
  } catch (e) {
    console.error("me error:", e);
    res.status(500).json({ error: e.message });
  }
};
