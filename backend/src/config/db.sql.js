import pkg from "pg";
import dotenv from "dotenv";

dotenv.config(); // 👈 asegúrate de cargar .env aquí también
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // 👈 usa la URL de Railway
  ssl: { rejectUnauthorized: false },
});

console.log("🔎 PostgreSQL URL:", process.env.DATABASE_URL);

const connectPostgres = async () => {
  try {
    await pool.connect();
    console.log("✅ Conectado a PostgreSQL en Railway");
  } catch (err) {
    console.error("❌ Error en PostgreSQL:", err);
  }
};

export { pool, connectPostgres };
