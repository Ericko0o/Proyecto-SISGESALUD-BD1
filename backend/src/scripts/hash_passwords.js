// backend/scripts/hash_passwords.js
import pkg from "pg";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
dotenv.config();

const { Pool } = pkg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
const SALT_ROUNDS = parseInt(process.env.BCRYPT_ROUNDS || "10");

async function run() {
  try {
    const { rows } = await pool.query("SELECT id_usuario, password FROM usuarios");
    for (const r of rows) {
      const pw = r.password;
      // Heurística simple: si la password parece ya hasheada ($2b$ or $2a$) la saltamos
      if (!pw || pw.startsWith("$2a$") || pw.startsWith("$2b$") || pw.startsWith("$2y$")) {
        console.log("saltando", r.id_usuario);
        continue;
      }
      const hashed = await bcrypt.hash(pw, SALT_ROUNDS);
      await pool.query("UPDATE usuarios SET password=$1 WHERE id_usuario=$2", [hashed, r.id_usuario]);
      console.log("hasheado:", r.id_usuario);
    }
    console.log("Migración completa");
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

run();
