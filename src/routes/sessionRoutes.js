const express = require("express");
const Cart = require("../models/Cart");
const Ticket = require("../models/Ticket");
const Product = require("../models/Product");
const { verifyToken } = require("../middlewares/verifyToken");
const { authorizeRole } = require("../middlewares/authMiddleware");

const router = express.Router();

// Ruta para finalizar la compra
router.post("/:cid/purchase", verifyToken, authorizeRole("user"), async (req, res) => {
  try {
    const cartId = req.params.cid;
    const user = req.user;

    // Buscar el carrito con los productos
    const cart = await Cart.findById(cartId).populate("items.product");
    if (!cart) {
      return res.status(404).json({ message: "Carrito no encontrado" });
    }

    let totalAmount = 0; // Total de la compra
    const unprocessedProducts = []; // Productos que no pudieron procesarse

    // Procesar cada producto del carrito
    for (const item of cart.items) {
      const product = item.product;

      if (product.stock >= item.quantity) {
        product.stock -= item.quantity; // Restar del stock
        totalAmount += product.price * item.quantity; // Sumar al total
        await product.save(); // Guardar producto actualizado
      } else {
        unprocessedProducts.push(product._id); // Guardar productos sin stock suficiente
      }
    }

    // Generar un ticket con los productos procesados
    const ticket = await Ticket.create({
      code: `TICKET-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      purchase_datetime: new Date(),
      amount: totalAmount,
      purchaser: user.email,
    });

    // Actualizar el carrito: dejar sólo los productos no procesados
    cart.items = cart.items.filter((item) => unprocessedProducts.includes(item.product._id));
    await cart.save();

    res.status(200).json({
      message: "Compra finalizada",
      ticket,
      unprocessedProducts,
    });
  } catch (error) {
    res.status(500).json({ message: "Error al procesar la compra", error });
  }
});

module.exports = router;
