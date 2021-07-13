// criada a partir do comando knex migrate:make create_table_categories

// criando a tabela categories
exports.up = function(knex, Promise) {
    return knex.schema.createTable('categories', table => {
        table.increments('id').primary()
        table.string('name').notNull()
        table.integer('parentId').references('id')
            .inTable('categories')
    })
};

// exluindo a tabela categories
exports.down = function(knex, Promise) {
    return knex.schema.dropTable('categories')
};
