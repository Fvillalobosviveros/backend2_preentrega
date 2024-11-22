const mongoose = require("mongoose");

// Estructura del modelo de carrito
const cartSchema = new mongoose.Schema({
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" }, // Producto referenciado
      quantity: { type: Number, default: 1 }, // Cantidad del producto
    },
  ],
  createdAt: { type: Date, default: Date.now }, // Fecha de creación del carrito
});

module.exports = mongoose.model("Cart", cartSchema);
