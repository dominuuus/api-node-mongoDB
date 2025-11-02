require("dotenv").config();
const express = require("express");
const connectToDatabase = require("./src/config/database");

const app = express();

connectToDatabase();

app.use(express.json());

app.use("/api/auth", require("./src/routes/authRoutes"));
app.use("/api/pizzas", require("./src/routes/pizzaRoutes"));
app.use("/api/orders", require("./src/routes/orderRoutes"));
app.use("/api/users", require("./src/routes/userRoutes"));
app.use("/api-docs", require("./src/routes/docsRoutes"));


const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Documentação: http://localhost:${PORT}/api-docs`);
});
