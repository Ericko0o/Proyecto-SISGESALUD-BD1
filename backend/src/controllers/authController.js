// backend/src/controllers/authController.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel.sql.js";

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
    
    if (!nombre || !email || !password) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    // Verificar si el email ya existe usando User.findByEmail
    const exists = await User.findByEmail(email);
    if (exists) {
      return res.status(409).json({ error: "Correo ya registrado" });
    }

    // Rol por defecto: Paciente => id_rol = 1
    const id_rol_por_defecto = 1;

    const hashed = await bcrypt.hash(password, SALT_ROUNDS);
    
    // Crear usuario usando User.create
    const user = await User.create({
      nombre,
      dni: dni || null,
      nacimiento: nacimiento || null,
      genero: genero || null,
      email,
      password: hashed,
      id_rol: id_rol_por_defecto,
    });

    const token = jwt.sign(
      { 
        id_usuario: user.id_usuario, 
        id_rol: user.id_rol 
      }, 
      JWT_SECRET, 
      { expiresIn: "8h" }
    );

    res.status(201).json({
      message: "Usuario creado exitosamente",
      token,
      user: { 
        id_usuario: user.id_usuario, 
        nombre: user.nombre, 
        email: user.email, 
        id_rol: user.id_rol 
      },
    });
  } catch (e) {
    console.error("register error:", e);
    res.status(500).json({ error: "Error al registrar usuario" });
  }
};

/**
 * POST /api/auth/login
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: "Email y password son requeridos" });
    }

    // Buscar usuario usando User.findByEmail
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    // Verificar contraseña
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    const token = jwt.sign(
      { 
        id_usuario: user.id_usuario, 
        id_rol: user.id_rol 
      }, 
      JWT_SECRET, 
      { expiresIn: "8h" }
    );

    res.json({
      message: "Login exitoso",
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
    res.status(500).json({ error: "Error en el servidor" });
  }
};

/**
 * GET /api/auth/me  -> devuelve perfil básico del usuario autenticado
 */
export const me = async (req, res) => {
  try {
    const id = req.user?.id_usuario;
    
    if (!id) {
      return res.status(401).json({ error: "Token inválido" });
    }
    
    // Buscar usuario usando User.findById
    const user = await User.findById(id);
    
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    
    // No devolver la contraseña
    const { password, ...userWithoutPassword } = user;
    
    res.json({ 
      user: userWithoutPassword 
    });
  } catch (e) {
    console.error("me error:", e);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

/**
 * Middleware para verificar token JWT
 */
export const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Token no proporcionado" });
    }
    
    const token = authHeader.split(" ")[1];
    
    if (!token) {
      return res.status(401).json({ error: "Token inválido" });
    }
    
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token expirado" });
    }
    
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Token inválido" });
    }
    
    res.status(500).json({ error: "Error al verificar token" });
  }
};