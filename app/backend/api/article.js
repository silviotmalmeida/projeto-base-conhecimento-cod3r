// importando as queries customizadas não genéricas
const queries = require("./queries");

// as funções serão injetadas no app (padrão consign)
module.exports = (app) => {
  // importando as funções de validação de dados
  const { existsOrError } = app.api.validation;

  // método para inclusão de artigo genérico para fins de desenvolvimento
  const createGenericArticles = async (req, res) => {
    // atributos dos artigos genéricos
    const article1 = {
      name: "Artigo 1",
      description: "Descrição do artigo genérico 1",
      userId: null,
      categoryId: null,
      content: "Texto do artigo genérico 1",
    };

    const article2 = {
      name: "Artigo 1.1",
      description: "Descrição do artigo genérico 1.1",
      userId: null,
      categoryId: null,
      content: "Texto do artigo genérico 1.1",
    };

    const article3 = {
      name: "Artigo 1.1.1",
      description: "Descrição do artigo genérico 1.1.1",
      userId: null,
      categoryId: null,
      content: "Texto do artigo genérico 1.1.1",
    };

    // verificando se existe usuário genérico cadastrado e atribuindo o seu id aos artigos
    try {
      // iniciando processamento síncrono
      const genericUser = await app

        // consultando na tabela users
        .db("users")

        // filtrando os campos a serem retornados
        .select("id", "name")

        // filtrando a consulta com o nome da Categoria 1
        .where({ name: "Administrador Genérico" })

        // retornando somente o primeiro registro
        .first();
      // finalizando processamento síncrono

      // se a consulta retornar um usuário, lança uma mensagem de erro
      existsOrError(genericUser, "Usuário genérico não encontrado!");

      // atribuindo o id do usuário genérico aos artigos
      article1.userId = genericUser.id;
      article2.userId = genericUser.id;
      article3.userId = genericUser.id;
    } catch (msg) {
      // se foi lançado algum erro, retorna erro 400
      return res.status(400).send(msg);
    }

    // verificando se existe categoria genérica 1 cadastrada e atribuindo o seu id ao artigo genérico 1
    try {
      // iniciando processamento síncrono
      const genericCategory1 = await app

        // consultando na tabela categories
        .db("categories")

        // filtrando os campos a serem retornados
        .select("id", "name")

        // filtrando a consulta com o nome da Categoria 1
        .where({ name: "Categoria 1" })

        // retornando somente o primeiro registro
        .first();
      // finalizando processamento síncrono

      // se a consulta retornar um usuário, lança uma mensagem de erro
      existsOrError(genericCategory1, "Categoria genérica 1 não encontrada!");

      // atribuindo o id da categoria ao artigo
      article1.categoryId = genericCategory1.id;
    } catch (msg) {
      // se foi lançado algum erro, retorna erro 400
      return res.status(400).send(msg);
    }

    // verificando se existe categoria genérica 1.1 cadastrada e atribuindo o seu id ao artigo genérico 1.1
    try {
      // iniciando processamento síncrono
      const genericCategory2 = await app

        // consultando na tabela categories
        .db("categories")

        // filtrando os campos a serem retornados
        .select("id", "name")

        // filtrando a consulta com o nome da Categoria 1
        .where({ name: "Categoria 1.1" })

        // retornando somente o primeiro registro
        .first();
      // finalizando processamento síncrono

      // se a consulta retornar um usuário, lança uma mensagem de erro
      existsOrError(genericCategory2, "Categoria genérica 1.1 não encontrada!");

      // atribuindo o id da categoria ao artigo
      article2.categoryId = genericCategory2.id;
    } catch (msg) {
      // se foi lançado algum erro, retorna erro 400
      return res.status(400).send(msg);
    }

    // verificando se existe categoria genérica 1.1.1 cadastrada e atribuindo o seu id ao artigo genérico 1.1.1
    try {
      // iniciando processamento síncrono
      const genericCategory3 = await app

        // consultando na tabela categories
        .db("categories")

        // filtrando os campos a serem retornados
        .select("id", "name")

        // filtrando a consulta com o nome da Categoria 1
        .where({ name: "Categoria 1.1.1" })

        // retornando somente o primeiro registro
        .first();
      // finalizando processamento síncrono

      // se a consulta retornar um usuário, lança uma mensagem de erro
      existsOrError(
        genericCategory3,
        "Categoria genérica 1.1.1 não encontrada!"
      );

      // atribuindo o id da categoria ao artigo
      article3.categoryId = genericCategory3.id;
    } catch (msg) {
      // se foi lançado algum erro, retorna erro 400
      return res.status(400).send(msg);
    }

    // inserindo o Artigo 1
    // iniciando processamento síncrono
    await app
      // consultando a tabela articles
      .db("articles")

      // inserindo os dados do artigo
      .insert(article1)

      // em caso de erro retorna o status 500 e detalhes do erro
      .catch((err) => res.status(500).send(err));
    // finalizando processamento síncrono

    // inserindo o Artigo 1.1
    // iniciando processamento síncrono
    await app
      // consultando a tabela articles
      .db("articles")

      // inserindo os dados do artigo
      .insert(article2)

      // em caso de erro retorna o status 500 e detalhes do erro
      .catch((err) => res.status(500).send(err));
    // finalizando processamento síncrono

    // inserindo o Artigo 1.1.1
    // iniciando processamento síncrono
    await app
      // consultando a tabela articles
      .db("articles")

      // inserindo os dados do artigo
      .insert(article3)

      // em caso de sucesso retorna o status 200 e mensagem de sucesso
      .then((_) => res.status(200).send(`Artigos genéricos inseridos!`))

      // em caso de erro retorna o status 500 e detalhes do erro
      .catch((err) => res.status(500).send(err));
    // finalizando processamento síncrono
  };

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

  // método para exclusão de artigo por id (hard delete)
  const remove = async (req, res) => {
    try {
      // se não foi passado o parâmetro id na requisição, lança mensagem de erro
      existsOrError(req.params.id, "Código do Artigo não informado.");

      // realizando o hard delete do artigo
      // iniciando processamento síncrono
      const rowsDeleted = await app
        // consultando a tabela articles
        .db("articles")

        // filtrando a consulta com o id recebido pelo parâmetro da requisição
        .where({ id: req.params.id })

        // excluindo a categoria
        .del();
      // fim do processamento síncrono

      try {
        // se não foi excluída nenhuma linha, lança mensagem de erro
        existsOrError(rowsDeleted, "Artigo não foi encontrado.");
      } catch (msg) {
        // em caso de erro retorna o status 400 e detalhes do erro
        return res.status(400).send(msg);
      }

      // em caso de sucesso retorna o status 204
      res.status(204).send();
    } catch (msg) {
      // em caso de erro retorna o status 500 e detalhes do erro
      res.status(500).send(msg);
    }
  };

  // definindo a quantidade máxima de registros por página
  const limit = 10;

  // método para consulta de artigos
  const get = async (req, res) => {
    // definindo o número da página a ser retornada
    // se o parâmetro page estiver definido, atribui o mesmo;
    // senão atribui 1
    const page = req.query.page || 1;

    // pesquisando a quantidade de artigos cadastrados no bd
    // iniciando processamento síncrono
    const result = await app
      // consultando a tabela articles
      .db("articles")

      // contando os registros
      .count("id")
      .first();
    // fim do processamento síncrono

    // definindo a contagem de registros a partir da consulta e convertendo para inteiro
    const count = parseInt(result.count);

    // realizando a consulta de artigos de forma paginada
    app
      // consultando a tabela articles
      .db("articles")

      // filtrando os campos a serem retornados
      .select("id", "name", "description", "userId", "categoryId")

      // definindo a quantidade máxima de registros por página
      .limit(limit)

      // aplicando o offset de registros a partir da página e do limite
      .offset(page * limit - limit)

      // em caso de sucesso retorno dados no formato json
      // serão retornadas os artigos, a quantidade total de registros no bd e o limite por página
      .then((articles) => res.json({ data: articles, count, limit }))

      // em caso de erro retorna o status 500 e detalhes do erro
      .catch((err) => res.status(500).send(err));
  };

  // método para consulta de artigo por id
  const getById = (req, res) => {
    app
      // consultando a tabela articles
      .db("articles")

      // filtrando a consulta com o id recebido pelo parâmetro da requisição
      .where({ id: req.params.id })

      // retornando somente o primeiro registro
      .first()

      // em caso de sucesso:
      .then((article) => {
        // converte o conteúdo de content para string
        article.content = article.content.toString();

        // reforna os dados no formato json
        return res.json(article);
      })

      // em caso de erro retorna o status 500 e detalhes do erro
      .catch((err) => res.status(500).send(err));
  };

  // método para consulta de artigo por categoria, coniderando também as categorias filhas
  const getByCategory = async (req, res) => {
    // definindo a categoria com o id recebido pelo parâmetro da requisição
    const categoryId = req.params.id;

    // definindo o número da página a ser retornada
    // se o parâmetro page estiver definido, atribui o mesmo;
    // senão atribui 1
    const page = req.query.page || 1;

    // realizando consulta para obter os id da categoria relacionada, bem como os id dos seus filhos
    // realizando consulta customizada não-genérica
    // iniciando processamento síncrono
    const categories = await app.db.raw(
      // usando a query customizada não-genérica com prepared statement
      queries.categoryWithChildren,

      // aplicando a variável para o prepared statement
      categoryId
    );
    // finalizando processamento síncrono

    // obtendo um array somente os ids das categorias
    const ids = categories.rows.map((c) => c.id);

    // realizando a consulta
    app
      // consultando a junção das tabela articles e users
      .db({ a: "articles", u: "users" })

      // filtrando os campos a serem retornados
      .select("a.id", "a.name", "a.description", "a.imageUrl", {
        author: "u.name",
      })

      // definindo a quantidade máxima de registros por página
      .limit(limit)

      // aplicando o offset de registros a partir da página e do limite
      .offset(page * limit - limit)

      // aplicando a condição de junção (inner join)
      .whereRaw("?? = ??", ["u.id", "a.userId"])

      // filtrando a consulta com os ids das categorias
      .whereIn("categoryId", ids)

      // ordenando os resultados de forma cronológica decrescente
      .orderBy("a.id", "desc")

      // em caso de sucesso retorno dados no formato json
      .then((articles) => res.json(articles))

      // em caso de erro retorna o status 500 e detalhes do erro
      .catch((err) => res.status(500).send(err));
  };

  // disponibiliza as funções para uso do app (padrão consign)
  return { createGenericArticles, save, remove, get, getById, getByCategory };
};
