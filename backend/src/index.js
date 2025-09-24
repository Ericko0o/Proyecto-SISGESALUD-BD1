import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./config/db.sql.js";
import connectMongo from "./config/db.mongo.js";
import userRoutes from "./routes/userRoutes.js";  // 👈 Esto ya trae un router válido

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// ✅ Aquí no debe dar error si userRoutes exporta un router
app.use("/api/users", userRoutes);

connectMongo();

app.get("/", (req, res) => {
  res.json({ message: "Backend funcionando 🚑" });
});

app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
