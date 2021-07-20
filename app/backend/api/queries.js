// arquivo com consultas customizadas não-genéricas

module.exports = {

    // sql que retorna os ids da categoria relacionada, bem como os id dos seus filhos
    categoryWithChildren: `
        WITH RECURSIVE subcategories (id) AS (
            SELECT id FROM categories WHERE id = ?
            UNION ALL
            SELECT c.id FROM subcategories, categories c
                WHERE "parentId" = subcategories.id
        )
        SELECT id FROM subcategories
    `
}