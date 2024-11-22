const express = require("express");
const { registerUser, loginUser, getCurrentUser } = require("../controllers/authHandler");
const { verifyToken } = require("../middlewares/verifyToken");

const router = express.Router();

router.post("/register", registerUser); // Registrar usuario
router.post("/login", loginUser);      // Iniciar sesión
router.get("/current", verifyToken, getCurrentUser); // Obtener usuario actual

module.exports = router;
