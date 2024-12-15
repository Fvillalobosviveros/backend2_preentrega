const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { PORT, MONGO_URI } = require("./config/config");
const sessionRoutes = require("./routes/sessionRoutes");

const app = express();

app.use(express.json());
app.use(cookieParser());

// Conexión a la base de datos
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Conexión exitosa a MongoDB"))
  .catch((error) => console.error("Error conectando a MongoDB:", error));

// Rutas
app.use("/api/carts", sessionRoutes); // Agregar rutas de carrito

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
