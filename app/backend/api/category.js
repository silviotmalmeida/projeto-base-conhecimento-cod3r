// as funções serão injetadas no app (padrão consign)
module.exports = (app) => {
  // importando as funções de validação de dados
  const { existsOrError, notExistsOrError, notEqualsOrError } =
    app.api.validation;

  // método para inclusão de categorias genéricas para fins de desenvolvimento
  const createGenericCategories = async (req, res) => {
    // atributos das categorias genéricas
    const category1 = {
      name: "Categoria 1",
    };

    const category2 = {
      name: "Categoria 1.1",
    };

    const category3 = {
      name: "Categoria 1.1.1",
    };

    // verificando se já existe categoria genérica cadastrada
    try {
      // iniciando processamento síncrono
      const genericCategory = await app

        // consultando na tabela categories
        .db("categories")

        // filtrando a consulta com o nome da Categoria 1
        .where({ name: category1.name })

        // retornando somente o primeiro registro
        .first();
      // finalizando processamento síncrono

      // se a consulta retornar um id, lança uma mensagem de erro
      notExistsOrError(genericCategory, "Categoria genérica já cadastrada!");
    } catch (msg) {
      // se foi lançado algum erro, retorna erro 400
      return res.status(400).send(msg);
    }

    // inserindo a Categoria 1
    // iniciando processamento síncrono
    await app
      // consultando a tabela categories
      .db("categories")

      // inserindo os dados da categoria
      .insert(category1)

      // em caso de erro retorna o status 500 e detalhes do erro
      .catch((err) => res.status(500).send(err));
    // finalizando processamento síncrono

    // consultando o id da Categoria 1 para inclusão da Categoria 1.1 como filha
    try {
      // iniciando processamento síncrono
      const parentCategory = await app

        // consultando na tabela categories
        .db("categories")

        // filtrando a consulta com o nome da Categoria 1
        .where({ name: category1.name })

        // retornando somente o primeiro registro
        .first();
      // finalizando processamento síncrono

      // se a consulta não retornar um id, lança uma mensagem de erro
      existsOrError(parentCategory, "Categoria não encontrada");

      // atribuindo o parentId à Categoria 1.1
      category2.parentId = parentCategory.id;
    } catch (msg) {
      // se foi lançado algum erro, retorna erro 400
      return res.status(400).send(msg);
    }

    // inserindo a Categoria 1.1
    await app
      // consultando a tabela categories
      .db("categories")

      // inserindo os dados da categoria
      .insert(category2)

      // em caso de erro retorna o status 500 e detalhes do erro
      .catch((err) => res.status(500).send(err));

    // consultando o id da Categoria 1.1 para inclusão da Categoria 1.1.1 como filha
    try {
      // iniciando processamento síncrono
      const parentCategory = await app

        // consultando na tabela categories
        .db("categories")

        // filtrando a consulta com o nome da Categoria 1.1
        .where({ name: category2.name })

        // retornando somente o primeiro registro
        .first();
      // finalizando processamento síncrono

      // se a consulta não retornar um id, lança uma mensagem de erro
      existsOrError(parentCategory, "Categoria não encontrada");

      // atribuindo o parentId à Categoria 1.1
      category3.parentId = parentCategory.id;
    } catch (msg) {
      // se foi lançado algum erro, retorna erro 400
      return res.status(400).send(msg);
    }

    // inserindo a Categoria 1.1.1
    await app
      // consultando a tabela categories
      .db("categories")

      // inserindo os dados da categoria
      .insert(category3)

      // em caso de sucesso retorna o status 200 e mensagem de sucesso
      .then((_) => res.status(200).send(`Categorias genéricas inseridas!`))

      // em caso de erro retorna o status 500 e detalhes do erro
      .catch((err) => res.status(500).send(err));
  };

  // método para cadastro de categoria e atualização de categoria por id
  const save = (req, res) => {
    // obtendo os dados do body da requisição
    const category = {
      id: req.body.id,
      name: req.body.name,
      parentId: req.body.parentId,
    };

    // se na requisição estiver setado o atributo id, preenche o category.id
    if (req.params.id) category.id = req.params.id;

    // validando os dados recebidos pelo body da requisição
    try {
      // se o nome não for válido, lança mensagem de erro
      existsOrError(category.name, "Nome não informado");

      // se a categoria pai não for válida, lança mensagem de erro
      notEqualsOrError(
        category.id,
        category.parentId,
        "Categoria Pai deve ser distinta da Categoria Atual"
      );
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

  // método para consulta de categorias com os relacionamentos
  const withPath = (categories) => {
    // função auxiliar responsável por retornar o nome da categoria pai de uma determinada categoria
    const getParent = (categories, parentId) => {
      // iterando no array de categorias e filtrando pelo parentId informado
      const parent = categories.filter((parent) => parent.id === parentId);
      // se existir algum pai, retorna a categoria pai, senão retorna nulo
      return parent.length ? parent[0] : null;
    };

    // função que insere os relacionamentos no array de categorias
    // iterando no array de categorias
    const categoriesWithPath = categories.map((category) => {
      // inicializando o relacionamento com o nome da categoria atual
      let path = category.name;

      // obtendo a categoria pai
      let parent = getParent(categories, category.parentId);

      // enquanto existir antepassado
      while (parent) {
        // preenche o relacionamento de forma recursiva
        path = `${parent.name} > ${path}`;

        // obtendo os antepassados de forma recursiva
        parent = getParent(categories, parent.parentId);
      }

      // inserindo no array de categorias os relacionamentos
      return { ...category, path };
    });

    // inserindo o relacionamento no array de categorias e ordenando alfabeticamente
    categoriesWithPath.sort((a, b) => {
      if (a.path < b.path) return -1;
      if (a.path > b.path) return 1;
      return 0;
    });

    // retornando o array de categorias com o relacionamentos ordenada alfabeticamente
    return categoriesWithPath;
  };

  // método para consulta de categorias
  const get = (req, res) => {
    app
      // consultando a tabela categories
      .db("categories")

      // filtrando os campos a serem retornados
      .select("id", "name", "parentId")

      // em caso de sucesso retorno dados no formato json
      // serão retornadas as categorias e a respectivo relacionamentos
      .then((categories) => res.json(withPath(categories)))

      // em caso de erro retorna o status 500 e detalhes do erro
      .catch((err) => res.status(500).send(err));
  };

  // método para consulta de categoria por id
  const getById = (req, res) => {
    app
      // consultando a tabela categories
      .db("categories")

      // filtrando a consulta com o id recebido pelo parâmetro da requisição
      .where({ id: req.params.id })

      // retornando somente o primeiro registro
      .first()

      // em caso de sucesso retorno dados no formato json
      .then((category) => res.json(category))

      // em caso de erro retorna o status 500 e detalhes do erro
      .catch((err) => res.status(500).send(err));
  };

  // método para que converte as categorias para uma estrutura de árvore
  const toTree = (categories, tree) => {
    // se a árvore ainda estiver vazia, insere inicialmente as categorias sem pai
    // através da filtragem do array de categorias onde o atributo parentId é nulo
    if (!tree) tree = categories.filter((c) => !c.parentId);
    // senão, prosegue

    // itera sobre a árvore de forma recursiva
    tree = tree.map((parentNode) => {
      // criando uma função que verifica se determinado nó é filho de outro
      const isChild = (node) => node.parentId == parentNode.id;

      // inserindo no atributo children os nós filhos de forma recursiva
      parentNode.children = toTree(categories, categories.filter(isChild));

      // retornando o nó atualizado para a próxima iteração
      return parentNode;
    });

    // retornando as categorias em uma estrutura de árvore
    return tree;
  };

  // método para que retorna as categorias em uma estrutura de árvore
  // utilizado para construção do menu lateral do frontend
  const getTree = (req, res) => {
    app
      // consultando a tabela categories
      .db("categories")
      // convertendo e retornando as categorias em formato json
      .then((categories) => res.json(toTree(categories)))
      // em caso de erro retorna o status 500 e detalhes do erro
      .catch((err) => res.status(500).send(err));
  };

  // disponibiliza as funções para uso do app (padrão consign)
  return { createGenericCategories, save, remove, get, getById, getTree };
};
