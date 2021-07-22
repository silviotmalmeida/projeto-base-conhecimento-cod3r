// criada a partir do comando knex migrate:make add_deleted_at_table_user

// alterando a tabela users, incluindo um atributo chamado deletedAt do tipo Date
exports.up = function (knex, Promise) {
  return knex.schema.alterTable("users", (table) => {
    table.timestamp("deletedAt");
  });
};

// alterando a tabela users, removendo o atributo deletedAt
exports.down = function (knex, Promise) {
  return knex.schema.alterTable("users", (table) => {
    table.dropColumn("deletedAt");
  });
};
