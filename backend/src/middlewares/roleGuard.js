// backend/src/middlewares/roleGuard.js
// usage: roleGuard([1,2]) -> permite roles con id_rol 1 o 2
export default function roleGuard(allowedRoles = []) {
  return (req, res, next) => {
    const userRole = req.user?.id_rol;
    if (!userRole) return res.status(401).json({ error: "No autorizado" });
    if (!allowedRoles.includes(userRole)) return res.status(403).json({ error: "Acceso denegado" });
    next();
  };
}
