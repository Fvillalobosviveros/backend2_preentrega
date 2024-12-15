const mongoose = require("mongoose");

// Modelo de Ticket para compra
const ticketSchema = new mongoose.Schema({
  code: { type: String, unique: true, required: true }, // Código único
  purchase_datetime: { type: Date, default: Date.now }, // Fecha y hora de la compra
  amount: { type: Number, required: true }, // Total de la compra
  purchaser: { type: String, required: true }, // Email del usuario asociado al carrito
});

module.exports = mongoose.model("Ticket", ticketSchema);
