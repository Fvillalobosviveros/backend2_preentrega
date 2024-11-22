const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const sessionRoutes = require("./routes/sessionRoutes");
const { PORT, MONGO_URI } = require("./config/config");

const app = express();

app.use(express.json());
app.use(cookieParser());

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Conexión exitosa a MongoDB"))
  .catch((error) => console.error("Error conectando a MongoDB:", error));

app.use("/api/sessions", sessionRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
