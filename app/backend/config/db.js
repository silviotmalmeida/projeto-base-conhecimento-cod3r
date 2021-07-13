// importando o arquivo principal de configuração do knex
const config = require("../knexfile.js");

// carregando o arquivo de configuração para o knex
const knex = require("knex")(config);

// executando as migrations para criação das tabelas do banco
knex.migrate.latest([config]);

// exportando para importação no index.js
module.exports = knex;
