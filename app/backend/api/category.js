// as funções serão injetadas no app (padrão consign)
module.exports = (app) => {
  // importando as funções de validação de dados
  const { existsOrError, notExistsOrError } = app.api.validation;

  // método para cadastro de usuário e atualização de usuário por id
  const save = (req, res) => {
    // obtendo os dados do body da requisição
    const category = {
      id: req.body.id,
      name: req.body.name,
      parentId: req.body.parentId,
    };

    // se na requisição estiver setado o atributo id, preenche o category user.id
    if (req.params.id) category.id = req.params.id;

    // validando os dados recebidos pelo body da requisição
    try {
      // se o nome não for válido, lança mensagem de erro
      existsOrError(category.name, "Nome não informado");
    } catch (msg) {
      // se foi lançado algum erro, retorna erro 400
      return res.status(400).send(msg);
    }

    // se o atributo category.id estiver setado,
    if (category.id) {
      // será feita uma atualização
      app
        // consultando a tabela categories
        .db("categories")

        // atualizando o cadastro da categoria através dos dados passados no body da requisição
        .update(category)

        // filtrando o update com o id recebido pelo parâmetro da requisição
        .where({ id: category.id })

        // em caso de sucesso retorna o status 204
        .then((_) => res.status(204).send())

        // em caso de erro retorna o status 500 e detalhes do erro
        .catch((err) => res.status(500).send(err));
    }
    // senão será feita uma inclusão
    else {
      app
        // consultando a tabela categories
        .db("categories")

        // inserindo a categoria através dos dados passados no body da requisição
        .insert(category)

        // em caso de sucesso retorna o status 204
        .then((_) => res.status(204).send())

        // em caso de erro retorna o status 500 e detalhes do erro
        .catch((err) => res.status(500).send(err));
    }
  };

  // método para exclusão de categoria por id (hard delete)
  const remove = async (req, res) => {
    try {
      // se não foi passado o parâmetro id na requisição, lança mensagem de erro
      existsOrError(req.params.id, "Código da Categoria não informado.");

      // consultando no bd se existem subcategorias relacionadas à categoria
      // iniciando processamento síncrono
      const subcategory = await app
        // consultando a tabela categories
        .db("categories")

        // filtrando a consulta com o id recebido pelo parâmetro da requisição
        .where({ parentId: req.params.id });
      // fim do processamento síncrono

      // se existirem subcategorias relacionadas à categoria, lança mensagem de erro
      notExistsOrError(subcategory, "Categoria possui subcategorias.");
      // senão prossegue:

      // consultando no bd se existem artigos relacionados à categoria
      // iniciando processamento síncrono
      const articles = await app
        // consultando a tabela articles
        .db("articles")

        // filtrando a consulta com o id recebido pelo parâmetro da requisição
        .where({ categoryId: req.params.id });
      // fim do processamento síncrono

      // se existirem artigos relacionados à categoria, lança mensagem de erro
      notExistsOrError(articles, "Categoria possui artigos.");
      // senão prossegue:

      // realizando o hard delete da categoria
      // iniciando processamento síncrono
      const rowsDeleted = await app
        // consultando a tabela categories
        .db("categories")

        // filtrando a consulta com o id recebido pelo parâmetro da requisição
        .where({ id: req.params.id })

        // excluindo a categoria
        .del();
      // fim do processamento síncrono

      // se não foi excluída nenhuma linha, lança mensagem de erro
      existsOrError(rowsDeleted, "Categoria não foi encontrada.");

      // em caso de sucesso retorna o status 204
      res.status(204).send();
    } catch (msg) {
      // em caso de erro retorna o status 400 e detalhes do erro
      res.status(400).send(msg);
    }
  };

  const withPath = (categories) => {
    const getParent = (categories, parentId) => {
      const parent = categories.filter((parent) => parent.id === parentId);
      return parent.length ? parent[0] : null;
    };

    const categoriesWithPath = categories.map((category) => {
      let path = category.name;
      let parent = getParent(categories, category.parentId);

      while (parent) {
        path = `${parent.name} > ${path}`;
        parent = getParent(categories, parent.parentId);
      }

      return { ...category, path };
    });

    categoriesWithPath.sort((a, b) => {
      if (a.path < b.path) return -1;
      if (a.path > b.path) return 1;
      return 0;
    });

    return categoriesWithPath;
  };

  const get = (req, res) => {
    app
      .db("categories")
      .then((categories) => res.json(withPath(categories)))
      .catch((err) => res.status(500).send(err));
  };

  const getById = (req, res) => {
    app
      .db("categories")
      .where({ id: req.params.id })
      .first()
      .then((category) => res.json(category))
      .catch((err) => res.status(500).send(err));
  };

  const toTree = (categories, tree) => {
    if (!tree) tree = categories.filter((c) => !c.parentId);
    tree = tree.map((parentNode) => {
      const isChild = (node) => node.parentId == parentNode.id;
      parentNode.children = toTree(categories, categories.filter(isChild));
      return parentNode;
    });
    return tree;
  };

  const getTree = (req, res) => {
    app
      .db("categories")
      .then((categories) => res.json(toTree(categories)))
      .catch((err) => res.status(500).send(err));
  };

  return { save, remove, get, getById, getTree };
};
