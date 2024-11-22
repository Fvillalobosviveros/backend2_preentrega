const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { JWT_SECRET } = require("../config/config");

exports.registerUser = async (req, res) => {
  // Registro de usuario.
};

exports.loginUser = async (req, res) => {
  // Login de usuario.
};

exports.getCurrentUser = async (req, res) => {
  // Obtener usuario actual.
};
