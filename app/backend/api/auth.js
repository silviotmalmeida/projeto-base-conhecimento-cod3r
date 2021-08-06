// importando as dependências
// importanto a chave secreta para gerar e validar o token jwt
const { authSecret } = require("../.env");

// importando a biblioteca para trabalhar com token jwt
const jwt = require("jwt-simple");

// importanda biblioteca para comparar as senhas
const bcrypt = require("bcrypt-nodejs");

// as funções serão injetadas no app (padrão consign)
module.exports = (app) => {
  // método para logar no sistema. Retorna o payload e token de autorização
  const signin = async (req, res) => {
    // caso o email ou a senha não tenham sido passados na requisição
    if (!req.body.email || !req.body.password) {
      // retorna erro 400 e envia mensagem
      return res.status(400).send("Informe usuário e senha!");
    }

    // realizando uma consulta no bd para verificar a existência do usuário informado e retornar os dados do mesmo
    // iniciando processamento síncrono
    const user = await app
      // consultando a tabela users
      .db("users")

      // filtrando a consulta com o email recebido pelo parâmetro da requisição
      .where({ email: req.body.email })

      // retornando somente o primeiro registro
      .first();
    // fim do processamento síncrono

    // se o usuário não existir no bd, retorna erro 400 e envia mensagem
    if (!user) return res.status(400).send("Usuário não encontrado!");

    // comparando se senha recebida por parâmetro na requisição é compatível com a armazenada no bd
    const isMatch = bcrypt.compareSync(req.body.password, user.password);

    // se as senhas não forem compatíveis, retorna erro 401 e envia mensagem
    if (!isMatch) return res.status(401).send("Email/Senha inválidos!");

    // obtendo a data atual em segundos
    const now = Math.floor(Date.now() / 1000);

    // gerando conteúdo do token jwt
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      admin: user.admin,
      // data de geração do token
      iat: now,
      // data de expiração do token
      exp: now + 60 * 60 * 24 * 3,
    };

    // retornando o payload e o token
    res.json({
      ...payload,
      // gerando o token a partir do payload e da palavra secreta e inserindo na resposta
      token: jwt.encode(payload, authSecret),
    });
  };

  // método para validar o token de autorização
  const validateToken = async (req, res) => {
    // atribuindo os dados obtidos a partir do body da requisição caso existam. Caso não existam atribui nulo
    const userData = req.body || null;

    // validando o token
    try {
      // se os dados existirem:
      if (userData) {
        // decodificando o token recebido
        const token = jwt.decode(userData.token, authSecret);

        // se o token ainda estiver válido
        if (new Date(token.exp * 1000) > new Date()) {
          // retorna true
          return res.send(true);
        }
      }
    } catch (e) {
      // problema com o token
    }

    // senão retorna false
    res.send(false);
  };

  // disponibiliza as funções para uso do app (padrão consign)
  return { signin, validateToken };
};
