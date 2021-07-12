// importando as dependências
const app = require("express")();
const consign = require("consign");
const db = require("./config/db");
const mongoose = require("mongoose");

require("./config/mongodb");

// adicionando o postgresql ao app
app.db = db;

// adicionando o mongodb ao app
app.mongoose = mongoose;

// injetando os arquivos no app
consign()
  //
  .include("./config/passport.js")

  // injetando os middlewares
  .then("./config/middlewares.js")
  //
  .then("./api/validation.js")
  // injetando os arquivos da pasta api
  .then("./api")
  //
  .then("./schedule")
  // injetando as rotas
  .then("./config/routes.js")
  .into(app);

// iniciando a api na porta 4000
app.listen(4000, () => {
  console.log("Backend executando...");
});
