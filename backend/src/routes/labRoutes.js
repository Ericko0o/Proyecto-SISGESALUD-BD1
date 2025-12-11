import express from "express";
import {
  getLabDashboard,
  listPendingExams,
  assignExam,
  getMyExams,
  uploadResult,
  searchLabExams,
  getPatientHistory
} from "../controllers/labController.js";

const router = express.Router();

// Dashboard
router.get("/dashboard", getLabDashboard);

// Pendientes
router.get("/pending", listPendingExams);

// Asignar examen
router.put("/assign", assignExam);

// Exámenes del técnico
router.get("/assigned/:technicianId", getMyExams);

// Subir resultado
router.post("/upload-result", uploadResult);

// Búsqueda
router.get("/search", searchLabExams);

// Historial (Mongo)
router.get("/history/:dni", getPatientHistory);



export default router;
