const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const bancoDados = require("./bancoDados");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Registrar
app.post("/insert", (request, response) => {
  const { item } = request.body;
  const db = bancoDados.getInstance();
  const result = db.insertNewName(item);
  result
    .then((data) => response.json({ data: data }))
    .catch((err) => console.log(err));
});

// Ler
app.get("/getAll", (request, response) => {
  const db = bancoDados.getInstance();
  const result = db.getAllData();
  result
    .then((data) => response.json({ data: data }))
    .catch((err) => console.log(err));
});

// Atualizar
app.patch("/update", (request, response) => {
  const { id, item } = request.body;
  const db = bancoDados.getInstance();
  const result = db.updateNameById(id, item);
  result
    .then((data) => response.json({ success: data }))
    .catch((err) => console.log(err));
});

// Deletar
app.delete("/delete/:id", (request, response) => {
  const { id } = request.params;
  const db = bancoDados.getInstance();
  const result = db.deleteRowById(id);
  result
    .then((data) => response.json({ success: data }))
    .catch((err) => console.log(err));
});

// Pesquisar
app.get("/search/:item", (request, response) => {
  const { item } = request.params;
  const db = bancoDados.getInstance();
  const result = db.searchByName(item);
  result
    .then((data) => response.json({ data: data }))
    .catch((err) => console.log(err));
});

// Registrar no terminal o estado da conexão com servidor:
app.listen(process.env.PORT, () => console.log("Server open"));
