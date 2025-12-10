// backend/src/routes/authRoutes.js
import express from "express";
import { register, login, me } from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", register);   // frontend RegisterPage -> POST /api/auth/register
router.post("/login", login);         // frontend LoginPage    -> POST /api/auth/login
router.get("/me", authMiddleware, me); // obtiene perfil del token

export default router;
