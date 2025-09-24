import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { pool, connectPostgres } from "./config/db.sql.js"; // 👈 import con nombre
import connectMongo from "./config/db.mongo.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Conectar DBs
connectMongo();        // conexión MongoDB
connectPostgres();     // conexión PostgreSQL

// Rutas de prueba
app.get("/", (req, res) => {
  res.json({ message: "Backend funcionando 🚑" });
});

app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
