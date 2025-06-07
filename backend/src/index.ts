import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("API rodando no localhost!");
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
  console.log(`JWT_SECRET = ${process.env.JWT_SECRET}`);
  console.log(`Database URL = ${process.env.DATABASE_URL}`);
});
