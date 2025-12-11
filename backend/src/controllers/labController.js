import {
  countPendingExams,
  countProcessedToday,
  getUrgentExams,
  getPendingExams,
  assignExamToTechnician,
  getAssignedExams,
  insertExamResult,
  searchExams
} from "../models/examModel.sql.js";

import PatientHistory from "../models/patientHistoryModel.mongo.js";


// --- Dashboard (contadores + urgentes) ---
export const getLabDashboard = async (req, res) => {
  try {
    const pending = await countPendingExams();
    const processed = await countProcessedToday();
    const urgent = await getUrgentExams();

    res.json({
      pendingExams: Number(pending),
      processedToday: Number(processed),
      urgentExams: urgent
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// --- Exámenes pendientes ---
export const listPendingExams = async (req, res) => {
  try {
    const data = await getPendingExams();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// --- Asignar examen ---
export const assignExam = async (req, res) => {
  try {
    const { examId, technicianId } = req.body;
    await assignExamToTechnician(examId, technicianId);

    res.json({ message: "Examen asignado correctamente" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// --- Mis exámenes asignados ---
export const getMyExams = async (req, res) => {
  try {
    const techId = req.params.technicianId;
    const data = await getAssignedExams(techId);

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// --- Subir resultado ---
export const uploadResult = async (req, res) => {
  try {
    const { examId, description } = req.body;
    const fileUrl = req.fileUrl;  // asumiendo que tu middleware guarda la URL

    await insertExamResult({ examId, description, fileUrl });

    res.json({ message: "Resultado subido" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// --- Búsqueda ---
export const searchLabExams = async (req, res) => {
  try {
    const q = req.query.q || "";
    const data = await searchExams(q);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// --- Historial (Mongo) ---
export const getPatientHistory = async (req, res) => {
  try {
    const dni = req.params.dni;
    const history = await PatientHistory.findOne({ patientDni: dni });
    res.json(history || { entries: [] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
