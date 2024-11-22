const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/config");

// Generar un token JWT
exports.generateToken = (user) => {
  const payload = {
    id: user._id,
    role: user.role,
  };

  // Crear el token con un tiempo de expiración
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
};

// Verificar un token JWT
exports.verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET); // Devuelve el payload si es válido
  } catch (error) {
    throw new Error("Token inválido o expirado");
  }
};
