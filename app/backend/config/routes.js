// importando o middleware para verificação se o usuário é administrador
const admin = require("./admin");

module.exports = (app) => {
  //
  app.post("/signup", app.api.user.save);

  //
  app.post("/signin", app.api.auth.signin);

  //
  app.post("/validateToken", app.api.auth.validateToken);

  // entrypoint de /createGenericAdmin
  // utilizado somente para inclusão de um administrador genérico para fins de desenvolvimento
  app
    .route("/createGenericAdmin")

    // intercepta as requisições get para a inclusão do administrador genérico
    .get(app.api.user.createGenericAdmin);

  // entrypoint de /users
  app
    .route("/users")
    // intercepta todas as requisições para ...
    // .all(app.config.passport.authenticate())

    // intercepta as requisições post para inclusão de novos usuários
    // é necessário ser administrador
    .post(admin(app.api.user.save))

    // intercepta as requisições get para consulta de todos os usuários
    // é necessário ser administrador
    .get(admin(app.api.user.get));

  // entrypoint de /users/:id
  app
    .route("/users/:id")
    // intercepta todas as requisições para ...
    // .all(app.config.passport.authenticate())

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
    // intercepta todas as requisições para ...
    // .all(app.config.passport.authenticate())

    // intercepta as requisições post para inclusão de novas categorias
    // é necessário ser administrador
    .post(admin(app.api.category.save))

    // intercepta as requisições get para consulta de todas as categorias
    // é necessário ser administrador
    .get(admin(app.api.category.get));

  // Cuidado com ordem! Tem que vir antes de /categories/:id
  app
    .route("/categories/tree")
    .all(app.config.passport.authenticate())
    .get(app.api.category.getTree);

  // entrypoint de /categories/:id
  app
    .route("/categories/:id")
    // intercepta todas as requisições para ...
    // .all(app.config.passport.authenticate())

    // intercepta as requisições put para atualização de categoria por id
    // é necessário ser administrador
    .put(admin(app.api.category.save))

    // intercepta as requisições delete para exclusão (hard delete) de categoria por id
    // é necessário ser administrador
    .delete(admin(app.api.category.remove))

    // intercepta as requisições get para consulta de categoria por id
    // é necessário ser administrador
    .get(app.api.category.getById);

  app
    .route("/articles")
    // .all(app.config.passport.authenticate())
    .get(admin(app.api.article.get))
    .post(admin(app.api.article.save));

  app
    .route("/articles/:id")
    // .all(app.config.passport.authenticate())
    .get(app.api.article.getById)
    .put(admin(app.api.article.save))
    .delete(admin(app.api.article.remove));

  app
    .route("/categories/:id/articles")
    .all(app.config.passport.authenticate())
    .get(app.api.article.getByCategory);

  app
    .route("/stats")
    // .all(app.config.passport.authenticate())
    .get(app.api.stat.get);
};
