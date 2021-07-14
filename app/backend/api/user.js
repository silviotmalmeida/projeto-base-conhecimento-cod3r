// biblioteca para criptografia da senha do usuário
const bcrypt = require("bcrypt-nodejs");

// as funções serão injetadas no app (padrão consign)
module.exports = (app) => {
  // importando as funções de validação de dados
  const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation;

  // função responsável por encriptar a senha do usuário
  const encryptPassword = (password) => {
    // gerando o hash
    const salt = bcrypt.genSaltSync(10);

    // encriptando a senha
    return bcrypt.hashSync(password, salt);
  };

  // método para inclusão de um administrador genérico para fins de desenvolvimento
  const createGenericAdmin = async (req, res) => {
    // atributos do administrador genérico
    const user = {
      name: "Administrador Genérico",
      email: "administrador@generico.com.br",
      password: "123456",
      admin: true,
    };

    // consultando no bd se o email já está em uso
    try {
      // iniciando processamento síncrono
      const userFromDB = await app

        // consultando na tabela users
        .db("users")

        // filtrando a consulta com o email informado
        .where({ email: user.email })

        // retornando somente o primeiro registro
        .first();
      // finalizando processamento síncrono

      // se a consulta retornar um email existente, lança uma mensagem de erro
      notExistsOrError(userFromDB, "Administrador genérico já cadastrado");
    } catch (msg) {
      // se foi lançado algum erro, retorna erro 400
      return res.status(400).send(msg);
    }

    genericPassword = user.password;

    // criptografando a senha do usuário
    user.password = encryptPassword(user.password);

    app
      // consultando a tabela users
      .db("users")

      // inserindo o usuário através dos dados passados no body da requisição
      .insert(user)

      // em caso de sucesso retorna o status 200 e os dados do usuário
      .then((_) =>
        res
          .status(200)
          .send(
            `Dados para login:<br>Email:${user.email}<br>Senha:${genericPassword}`
          )
      )

      // em caso de erro retorna o status 500 e detalhes do erro
      .catch((err) => res.status(500).send(err));
  };

  // método para cadastro de usuário e atualização de usuário por id
  const save = async (req, res) => {
    // obtendo os dados do body da requisição
    const user = { ...req.body };

    // se na requisição estiver setado o atributo id, preenche o atributo user.id
    if (req.params.id) user.id = req.params.id;

    // se a url que chamou este método não iniciar por /users, define o atributo user.admin como false
    if (!req.originalUrl.startsWith("/users")) user.admin = false;

    // se não estiverem setados o objeto user ou o atributo user.admin, define o atributo user.admin como false
    if (!req.user || !req.user.admin) user.admin = false;

    // validando os dados recebidos pelo body da requisição
    try {
      // se o nome não for válido, lança mensagem de erro
      existsOrError(user.name, "Nome não informado");

      // se o email não for válido, lança mensagem de erro
      existsOrError(user.email, "E-mail não informado");

      // se a senha não for válida, lança mensagem de erro
      existsOrError(user.password, "Senha não informada");

      // se a confirmação senha não for válida, lança mensagem de erro
      existsOrError(user.confirmPassword, "Confirmação de Senha inválida");
      // se a confirmação de senha não for igual a senha, lança mensagem de erro
      equalsOrError(user.password, user.confirmPassword, "Senhas não conferem");

      // consultando no bd se o email já está em uso
      // iniciando processamento síncrono
      const userFromDB = await app

        // consultando na tabela users
        .db("users")

        // filtrando a consulta com o email informado
        .where({ email: user.email })

        // retornando somente o primeiro registro
        .first();
      // finalizando processamento síncrono

      // se o atributo user.id não estiver setado
      if (!user.id) {
        // se a consulta retornar um email existente, lança uma mensagem de erro
        notExistsOrError(userFromDB, "Usuário já cadastrado");
      }
    } catch (msg) {
      // se foi lançado algum erro, retorna erro 400
      return res.status(400).send(msg);
    }

    // criptografando a senha do usuário
    user.password = encryptPassword(user.password);

    // limpando o atributo confirmPassword
    delete user.confirmPassword;

    // se o atributo user.id estiver setado,
    if (user.id) {
      // será feita uma atualização
      app
        // consultando a tabela users
        .db("users")

        // atualizando o cadastro do usuário através dos dados passados no body da requisição
        .update(user)

        // filtrando o update com o id recebido pelo parâmetro da requisição
        .where({ id: user.id })

        // só serão atualizados usuários ativos, ou seja com o atributo deletedAt nulo
        .whereNull("deletedAt")

        // em caso de sucesso retorna o status 204
        .then((_) => res.status(204).send())

        // em caso de erro retorna o status 500 e detalhes do erro
        .catch((err) => res.status(500).send(err));
    }
    // senão será feita uma inclusão
    else {
      app
        // consultando a tabela users
        .db("users")

        // inserindo o usuário através dos dados passados no body da requisição
        .insert(user)

        // em caso de sucesso retorna o status 204
        .then((_) => res.status(204).send())

        // em caso de erro retorna o status 500 e detalhes do erro
        .catch((err) => res.status(500).send(err));
    }
  };

  // método para consulta de usuários
  const get = (req, res) => {
    app
      // consultando a tabela users
      .db("users")

      // filtrando os campos a serem retornados
      .select("id", "name", "email", "admin", "password", "deletedAt")

      // só serão retornados usuários ativos, ou seja com o atributo deletedAt nulo
      .whereNull("deletedAt")

      // em caso de sucesso retorna os dados no formato json
      .then((users) => res.json(users))

      // em caso de erro retorna o status 500 e detalhes do erro
      .catch((err) => res.status(500).send(err));
  };

  // método para consulta de usuário por id
  const getById = (req, res) => {
    app
      // consultando a tabela users
      .db("users")

      // filtrando os campos a serem retornados
      .select("id", "name", "email", "admin")

      // filtrando a consulta com o id recebido pelo parâmetro da requisição
      .where({ id: req.params.id })

      // só serão retornados usuários ativos, ou seja com o atributo deletedAt nulo
      .whereNull("deletedAt")

      // retornando somente o primeiro registro
      .first()

      // em caso de sucesso retorna os dados no formato json
      .then((user) => res.json(user))

      // em caso de erro retorna o status 500 e detalhes do erro
      .catch((err) => res.status(500).send(err));
  };

  // método para exclusão de usuário por id (soft delete)
  const remove = async (req, res) => {
    try {
      // se não foi passado o parâmetro id na requisição, lança mensagem de erro
      existsOrError(req.params.id, "Código do usuário não informado.");

      // consultando no bd se existem artigos relacionados ao usuário
      // iniciando processamento síncrono
      const articles = await app

        // consultando a tabela articles
        .db("articles")

        // filtrando a consulta com o id recebido pelo parâmetro da requisição
        .where({ userId: req.params.id });
      // fim do processamento síncrono

      // se existirem artigos relacionados ao usuário, lança mensagem de erro
      notExistsOrError(articles, "Usuário possui artigos.");
      // senão prossegue:

      // realizando o soft delete do usuário
      // iniciando processamento síncrono
      const rowsUpdated = await app

        // consultando a tabela users
        .db("users")

        // realizando o update do atributo deletedAt para o momento atual
        .update({ deletedAt: new Date() })

        // filtrando a consulta com o id recebido pelo parâmetro da requisição
        .where({ id: req.params.id });
      // fim do processamento síncrono

      // se não foi atualizada nenhuma linha, lança mensagem de erro
      existsOrError(rowsUpdated, "Usuário não foi encontrado.");
      // senão prossegue:

      // em caso de sucesso retorna o status 204
      res.status(204).send();
    } catch (msg) {
      // em caso de erro retorna o status 400 e detalhes do erro
      res.status(400).send(msg);
    }
  };

  // disponibiliza as funções para uso do app (padrão consign)
  return { createGenericAdmin, save, get, getById, remove };
};
