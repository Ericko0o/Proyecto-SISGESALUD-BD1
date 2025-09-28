import express from "express";
import { pool } from "../config/db.sql.js";
import mongoose from "mongoose";

const router = express.Router();

// --- Modelo Mongo (Citas) ---
const CitaSchema = new mongoose.Schema({
  paciente: String,
  doctor: String,
  fecha: String,
  motivo: String,
});
const Cita = mongoose.model("Cita", CitaSchema);

// --- Endpoint PostgreSQL ---
router.get("/doctores", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM doctores");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Endpoint MongoDB ---
router.get("/citas", async (req, res) => {
  try {
    const citas = await Cita.find();
    res.json(citas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;   // 👈 IMPORTANTE
