// biblioteca para criptografia da senha do usuário
const bcrypt = require("bcrypt-nodejs");

// as funções serão injetadas no app (padrão consign)
module.exports = (app) => {
  // importando as funções de validação
  const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation;

  // função responsável por encriptar a senha do usuário
  const encryptPassword = (password) => {
    // gerando o hash
    const salt = bcrypt.genSaltSync(10);

    // encriptando a senha
    return bcrypt.hashSync(password, salt);
  };

  // método para cadastro de usuário e atualização de usuário por id
  const save = async (req, res) => {
    // obtendo os dados do body da requisição
    const user = { ...req.body };

    // se na requisição estiver setado o atributo id, preenche o atributo user.id
    if (req.params.id) user.id = req.params.id;

    if (!req.originalUrl.startsWith("/users")) user.admin = false;
    if (!req.user || !req.user.admin) user.admin = false;

    // validando os dados recebidos
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

        // retornando o primeiro registro
        .first();

      // se o atributo user.id não estiver setado
      if (!user.id) {
        // se a consulta retornar algo, lança uma mensagem de erro
        notExistsOrError(userFromDB, "Usuário já cadastrado");
      }
    } catch (msg) {
      // se foi lançado algum erro, retorna erro 400
      return res.status(400).send(msg);
    }

    user.password = encryptPassword(user.password);
    delete user.confirmPassword;

    if (user.id) {
      app
        .db("users")
        .update(user)
        .where({ id: user.id })
        .whereNull("deletedAt")
        .then((_) => res.status(204).send())
        .catch((err) => res.status(500).send(err));
    } else {
      app
        .db("users")
        .insert(user)
        .then((_) => res.status(204).send())
        .catch((err) => res.status(500).send(err));
    }
  };

  // método para listagem de usuários
  const get = (req, res) => {
    app
      .db("users")
      .select("id", "name", "email", "admin")
      .whereNull("deletedAt")
      .then((users) => res.json(users))
      .catch((err) => res.status(500).send(err));
  };

  // método para consulta de usuário por id
  const getById = (req, res) => {
    app
      .db("users")
      .select("id", "name", "email", "admin")
      .where({ id: req.params.id })
      .whereNull("deletedAt")
      .first()
      .then((user) => res.json(user))
      .catch((err) => res.status(500).send(err));
  };

  // método para exclusão de usuário por id
  const remove = async (req, res) => {
    try {
      const articles = await app
        .db("articles")
        .where({ userId: req.params.id });
      notExistsOrError(articles, "Usuário possui artigos.");

      const rowsUpdated = await app
        .db("users")
        .update({ deletedAt: new Date() })
        .where({ id: req.params.id });
      existsOrError(rowsUpdated, "Usuário não foi encontrado.");

      res.status(204).send();
    } catch (msg) {
      res.status(400).send(msg);
    }
  };

  // disponibiliza as funções para uso do app (padrão consign)
  return { save, get, getById, remove };
};
