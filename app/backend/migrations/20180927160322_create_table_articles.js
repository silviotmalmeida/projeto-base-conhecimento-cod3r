// criada a partir do comando knex migrate:make create_table_articles

// criando a tabela articles
exports.up = function(knex, Promise) {
    return knex.schema.createTable('articles', table => {
        table.increments('id').primary()
        table.string('name').notNull()
        table.string('description', 1000).notNull()
        table.string('imageUrl', 1000)
        table.binary('content').notNull()
        table.integer('userId').references('id')
            .inTable('users').notNull()
        table.integer('categoryId').references('id')
            .inTable('categories').notNull()
    })
};

// excluindo a tabela articles
exports.down = function(knex, Promise) {
    return knex.schema.dropTable('articles')
};
