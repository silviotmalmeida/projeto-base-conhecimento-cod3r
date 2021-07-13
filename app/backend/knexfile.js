// criado a partir do comando knex init
// carregando os dados do objeto db do arquivo .env
const { db } = require("./.env");

// configurando o acesso ao banco de dados postgresql
module.exports = {
  client: "postgresql",
  connection: db,
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: "knex_migrations",
  },
};
