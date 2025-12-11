import { pool } from "../config/db.sql.js";

// --- Obtener contadores del dashboard ---
export const countPendingExams = async () => {
  const result = await pool.query(
    "SELECT COUNT(*) FROM examenes WHERE estado = 'pending';"
  );
  return result.rows[0].count;
};

export const countProcessedToday = async () => {
  const result = await pool.query(
    "SELECT COUNT(*) FROM resultados WHERE DATE(fecha_resultado) = CURRENT_DATE;"
  );
  return result.rows[0].count;
};

// --- Urgentes ---
export const getUrgentExams = async () => {
  const result = await pool.query(
    "SELECT id_examen, tipo_examen, doctor FROM examenes WHERE urgente = true AND estado = 'pending';"
  );
  return result.rows;
};

// --- Exámenes pendientes ---
export const getPendingExams = async () => {
  const result = await pool.query(
    `SELECT 
      id_examen,
      tipo_examen,
      paciente,
      doctor,
      estado
    FROM examenes
    WHERE estado = 'pending';`
  );
  return result.rows;
};

// --- Asignar examen al técnico ---
export const assignExamToTechnician = async (examId, technicianId) => {
  await pool.query(
    `UPDATE examenes
     SET estado='in-progress', id_tecnico=$1
     WHERE id_examen=$2`,
    [technicianId, examId]
  );
};

// --- Obtener exámenes asignados ---
export const getAssignedExams = async (technicianId) => {
  const result = await pool.query(
    `
    SELECT * FROM examenes
    WHERE id_tecnico=$1 AND estado='in-progress'
    `,
    [technicianId]
  );

  return result.rows;
};

// --- Cargar resultado e insertar en tabla ---
export const insertExamResult = async ({ examId, description, fileUrl }) => {
  await pool.query(
    `
    INSERT INTO resultados (id_examen, fecha_resultado, descripcion, url_archivo)
    VALUES ($1, NOW(), $2, $3)
    `,
    [examId, description, fileUrl]
  );

  // actualizar examen a completado
  await pool.query(
    `UPDATE examenes SET estado='completed' WHERE id_examen=$1`,
    [examId]
  );
};

// --- Búsqueda ---
export const searchExams = async (query) => {
  const result = await pool.query(
    `
    SELECT * FROM examenes
    WHERE LOWER(paciente) LIKE LOWER($1)
       OR LOWER(tipo_examen) LIKE LOWER($1)
       OR LOWER(doctor) LIKE LOWER($1)
       OR LOWER(id_tecnico) LIKE LOWER($1)
    `,
    [`%${query}%`]
  );
  return result.rows;
};
