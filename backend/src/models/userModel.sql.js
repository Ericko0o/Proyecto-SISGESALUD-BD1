import pool from "../config/db.js";

// Buscar usuario por email (login)
export const findUserByEmail = async (email) => {
  const result = await pool.query(
    `SELECT id, email, password, role FROM usuarios WHERE email = $1 LIMIT 1`,
    [email]
  );
  return result.rows[0];
};

// Buscar usuario por ID (para validar token)
export const findUserById = async (id) => {
  const result = await pool.query(
    `SELECT id, email, role FROM usuarios WHERE id = $1 LIMIT 1`,
    [id]
  );
  return result.rows[0];
};
