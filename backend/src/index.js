import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { pool, connectPostgres } from "./config/db.sql.js"; // conexión PostgreSQL
import connectMongo from "./config/db.mongo.js"; // conexión Mongo
import demoRoutes from "./routes/demoRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import labRoutes from "./routes/labRoutes.js";


dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Conectar DBs
connectMongo();        // conexión MongoDB
connectPostgres();     // conexión PostgreSQL

// Rutas
app.use("/api/demo", demoRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/lab", labRoutes);


app.get("/", (req, res) => {
  res.json({ message: "Backend funcionando 🚑" });
});

// Levantar servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});

