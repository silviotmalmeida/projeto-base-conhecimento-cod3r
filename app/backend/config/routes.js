// importando o middleware para verificação se o usuário é administrador
const admin = require("./admin");

module.exports = (app) => {
  // entrypoint de /signup
  app
    // intercepta as requisições post para inclusão de novos usuários
    .post("/signup", app.api.user.save);

  // entrypoint de /signin
  app
    // intercepta as requisições post para login no sistema
    .post("/signin", app.api.auth.signin);

  // entrypoint de /validateToken
  app
    // intercepta as requisições post para validação do token
    .post("/validateToken", app.api.auth.validateToken);

  // entrypoint de /createGenericAdmin
  // utilizado somente para inclusão de um administrador genérico para fins de desenvolvimento
  app
    // intercepta as requisições get para a inclusão do administrador genérico
    .get("/createGenericAdmin", app.api.user.createGenericAdmin);

  // entrypoint de /createGenericCategories
  // utilizado somente para inclusão de categorias genéricas para fins de desenvolvimento
  app
    // intercepta as requisições get para a inclusão de categorias genéricas
    .get("/createGenericCategories", app.api.category.createGenericCategories);

  // entrypoint de /createGenericArticles
  // utilizado somente para inclusão de artigos genéricos para fins de desenvolvimento
  app
    // intercepta as requisições get para a inclusão de categorias genéricas
    .get("/createGenericArticles", app.api.article.createGenericArticles);

  // entrypoint de /users
  app
    .route("/users")
    // intercepta todas as requisições para validação de payload recebido e token presente no header Authorization
    .all(app.config.passport.authenticate())

    // intercepta as requisições post para inclusão de novos usuários
    // é necessário ser administrador
    .post(admin(app.api.user.save))

    // intercepta as requisições get para consulta de todos os usuários
    // é necessário ser administrador
    .get(admin(app.api.user.get));

  // entrypoint de /users/:id
  app
    .route("/users/:id")
    // intercepta todas as requisições para validação de payload recebido e token presente no header Authorization
    .all(app.config.passport.authenticate())

    // intercepta as requisições put para atualização de usuário por id
    // é necessário ser administrador
    .put(admin(app.api.user.save))

    // intercepta as requisições delete para exclusão (soft delete) de usuário por id
    // é necessário ser administrador
    .delete(admin(app.api.user.remove))

    // intercepta as requisições get para consulta de usuário por id
    // é necessário ser administrador
    .get(admin(app.api.user.getById));

  // entrypoint de /categories
  app
    .route("/categories")
    // intercepta todas as requisições para validação de payload recebido e token presente no header Authorization
    .all(app.config.passport.authenticate())

    // intercepta as requisições post para inclusão de novas categorias
    // é necessário ser administrador
    .post(admin(app.api.category.save))

    // intercepta as requisições get para consulta de todas as categorias
    // é necessário ser administrador
    .get(admin(app.api.category.get));

  // entrypoint de /categories/tree
  // cuidado com ordem! Tem que vir antes de /categories/:id
  app
    .route("/categories/tree")
    // intercepta todas as requisições para validação de payload recebido e token presente no header Authorization
    .all(app.config.passport.authenticate())

    // intercepta as requisições get para consulta de categorias organizadas em árvore
    .get(app.api.category.getTree);

  // entrypoint de /categories/:id
  app
    .route("/categories/:id")
    // intercepta todas as requisições para validação de payload recebido e token presente no header Authorization
    .all(app.config.passport.authenticate())

    // intercepta as requisições put para atualização de categoria por id
    // é necessário ser administrador
    .put(admin(app.api.category.save))

    // intercepta as requisições delete para exclusão (hard delete) de categoria por id
    // é necessário ser administrador
    .delete(admin(app.api.category.remove))

    // intercepta as requisições get para consulta de categoria por id
    .get(app.api.category.getById);

  // entrypoint de /articles
  app
    .route("/articles")
    // intercepta todas as requisições para validação de payload recebido e token presente no header Authorization
    .all(app.config.passport.authenticate())

    // intercepta as requisições post para inclusão de novos artigos
    // é necessário ser administrador
    .post(admin(app.api.article.save))

    // intercepta as requisições get para consulta de todos os artigos
    // é necessário ser administrador
    .get(admin(app.api.article.get));

  // entrypoint de /articles/:id
  app
    .route("/articles/:id")
    // intercepta todas as requisições para validação de payload recebido e token presente no header Authorization
    .all(app.config.passport.authenticate())

    // intercepta as requisições put para atualização de artigos por id
    // é necessário ser administrador
    .put(admin(app.api.article.save))

    // intercepta as requisições delete para exclusão (hard delete) de artigo por id
    // é necessário ser administrador
    .delete(admin(app.api.article.remove))

    // intercepta as requisições get para consulta de artigos por id
    .get(app.api.article.getById);

  // entrypoint de /articles/:id/articles
  app
    .route("/categories/:id/articles")
    // intercepta todas as requisições para validação de payload recebido e token presente no header Authorization
    .all(app.config.passport.authenticate())

    // intercepta as requisições get para consulta de artigos por categoria
    .get(app.api.article.getByCategory);

  app
    .route("/stats")
    // .all(app.config.passport.authenticate())
    .get(app.api.stat.get);
};
