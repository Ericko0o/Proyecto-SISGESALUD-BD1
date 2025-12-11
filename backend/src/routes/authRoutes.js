import express from "express";
import { register, login, me, verifyToken } from "../controllers/authController.js";

const router = express.Router();

// Rutas públicas
router.post("/register", register);
router.post("/login", login);

// Ruta protegida (requiere token)
router.get("/me", verifyToken, me);

export default router;