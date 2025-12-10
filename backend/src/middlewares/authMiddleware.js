// backend/src/middlewares/authMiddleware.js
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

export default function authMiddleware(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: "No token provided" });
  const parts = auth.split(" ");
  if (parts.length !== 2) return res.status(401).json({ error: "Token error" });
  const scheme = parts[0];
  const token = parts[1];
  if (!/^Bearer$/i.test(scheme)) return res.status(401).json({ error: "Token malformado" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    // decoded: { id_usuario, id_rol, iat, exp }
    req.user = { id_usuario: decoded.id_usuario, id_rol: decoded.id_rol };
    next();
  } catch (e) {
    return res.status(401).json({ error: "Token inválido" });
  }
}
