// importando o arquivo de configuração do knex
const config = require("../knexfile.js");

// carregando o arquivo de configuração para o knex
const knex = require("knex")(config);

// executando as migrations para criação das tabelas do banco
knex.migrate.latest([config]);
module.exports = knex;
