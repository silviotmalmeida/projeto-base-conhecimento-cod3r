// importando as dependências
// servidor http
const app = require("express")();

// gerenciador de injeção de middlewares
const consign = require("consign");

// gerenciador de acesso ao bd postgresql
const db = require("./config/db");

// gerenciador de acesso ao bd mongodb
const mongoose = require("mongoose");
require("./config/mongodb");

// adicionando o bd postgresql ao app
app.db = db;

// adicionando o bd mongodb ao app
app.mongoose = mongoose;

// injetando os middlewares no app
consign()
  //
  .include("./config/passport.js")

  // injetando os middlewares gerais
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
