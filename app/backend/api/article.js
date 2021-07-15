const queries = require("./queries");

// as funções serão injetadas no app (padrão consign)
module.exports = (app) => {
  // importando as funções de validação de dados
  const { existsOrError } = app.api.validation;

  // método para cadastro de artigo e atualização de artigo por id
  const save = (req, res) => {
    // obtendo os dados do body da requisição
    const article = { ...req.body };

    // se na requisição estiver setado o atributo id, preenche o article.id
    if (req.params.id) article.id = req.params.id;

    // validando os dados recebidos pelo body da requisição
    try {
      // se o nome não for válido, lança mensagem de erro
      existsOrError(article.name, "Nome não informado");

      // se a descrição não for válida, lança mensagem de erro
      existsOrError(article.description, "Descrição não informada");

      // se a categoria não for válida, lança mensagem de erro
      existsOrError(article.categoryId, "Categoria não informada");

      // se o usuário não for válido, lança mensagem de erro
      existsOrError(article.userId, "Autor não informado");

      // se o conteúdo não for válido, lança mensagem de erro
      existsOrError(article.content, "Conteúdo não informado");
    } catch (msg) {
      // se foi lançado algum erro, retorna erro 400
      res.status(400).send(msg);
    }

    // se o atributo article.id estiver setado,
    if (article.id) {
      // será feita uma atualização
      app
        // consultando a tabela articles
        .db("articles")

        // atualizando o cadastro do artigo através dos dados passados no body da requisição
        .update(article)

        // filtrando o update com o id recebido pelo parâmetro da requisição
        .where({ id: article.id })

        // em caso de sucesso retorna o status 204
        .then((_) => res.status(204).send())

        // em caso de erro retorna o status 500 e detalhes do erro
        .catch((err) => res.status(500).send(err));
    }
    // senão será feita uma inclusão
    else {
      app
        // consultando a tabela articles
        .db("articles")

        // inserindo o artigo através dos dados passados no body da requisição
        .insert(article)

        // em caso de sucesso retorna o status 204
        .then((_) => res.status(204).send())

        // em caso de erro retorna o status 500 e detalhes do erro
        .catch((err) => res.status(500).send(err));
    }
  };

  const remove = async (req, res) => {
    try {
      const rowsDeleted = await app
        .db("articles")
        .where({ id: req.params.id })
        .del();

      try {
        existsOrError(rowsDeleted, "Artigo não foi encontrado.");
      } catch (msg) {
        return res.status(400).send(msg);
      }

      res.status(204).send();
    } catch (msg) {
      res.status(500).send(msg);
    }
  };

  const limit = 10; // usado para paginação
  const get = async (req, res) => {
    const page = req.query.page || 1;

    const result = await app.db("articles").count("id").first();
    const count = parseInt(result.count);

    app
      .db("articles")
      .select("id", "name", "description")
      .limit(limit)
      .offset(page * limit - limit)
      .then((articles) => res.json({ data: articles, count, limit }))
      .catch((err) => res.status(500).send(err));
  };

  const getById = (req, res) => {
    app
      .db("articles")
      .where({ id: req.params.id })
      .first()
      .then((article) => {
        article.content = article.content.toString();
        return res.json(article);
      })
      .catch((err) => res.status(500).send(err));
  };

  const getByCategory = async (req, res) => {
    const categoryId = req.params.id;
    const page = req.query.page || 1;
    const categories = await app.db.raw(
      queries.categoryWithChildren,
      categoryId
    );
    const ids = categories.rows.map((c) => c.id);

    app
      .db({ a: "articles", u: "users" })
      .select("a.id", "a.name", "a.description", "a.imageUrl", {
        author: "u.name",
      })
      .limit(limit)
      .offset(page * limit - limit)
      .whereRaw("?? = ??", ["u.id", "a.userId"])
      .whereIn("categoryId", ids)
      .orderBy("a.id", "desc")
      .then((articles) => res.json(articles))
      .catch((err) => res.status(500).send(err));
  };

  return { save, remove, get, getById, getByCategory };
};
