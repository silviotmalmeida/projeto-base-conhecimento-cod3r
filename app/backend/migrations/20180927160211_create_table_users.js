// criada a partir do comando knex migrate:make create_table_users

// criando a tabela users
exports.up = function (knex, Promise) {
  return knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("name").notNull();
    table.string("email").notNull().unique();
    table.string("password").notNull();
    table.boolean("admin").notNull().defaultTo(false);
  });
};

// excluindo a tabela users
exports.down = function (knex, Promise) {
  return knex.schema.dropTable("users");
};
