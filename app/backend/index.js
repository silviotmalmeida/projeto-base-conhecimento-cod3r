// importando as dependências
// servidor http da api
const app = require("express")();

// gerenciador de injeção de middlewares
const consign = require("consign");

// gerenciador de acesso ao bd postgresql
const db = require("./config/db");

// gerenciador de acesso ao bd mongodb
const mongoose = require("mongoose");
require("./config/mongodb");

// adicionando suporte ao bd postgresql ao app
app.db = db;

// adicionando suporte o bd mongodb ao app
app.mongoose = mongoose;

// injetando os middlewares no app com o consign
consign()
  // injetando o middleware de validação de payload e token de authorization
  .include("./config/passport.js")

  // injetando os middlewares gerais
  .then("./config/middlewares.js")

  // injetando o middleware de validação de dados
  .then("./api/validation.js")

  // injetando os arquivos da pasta api
  .then("./api")

  // injetando o middleware de agendamento de atualização de estatísticas
  .then("./schedule")

  // injetando as rotas
  .then("./config/routes.js")

  .into(app);

// iniciando a api na porta 4000
app.listen(4000, () => {
  console.log("Backend executando...");
});
