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
    const query = `
      SELECT 
        d.id_doctor AS id,
        CONCAT(d.nombres, ' ', d.apellidos) AS nombre,
        e.nombre AS especialidad
      FROM doctores d
      LEFT JOIN especialidades e
      ON d.id_especialidad = e.id_especialidad
      ORDER BY d.nombres;
    `;

    const result = await pool.query(query);
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
