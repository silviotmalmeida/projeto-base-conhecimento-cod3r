// middleware com função de validar o o payload recebido e o token presente no header Authorization

// importando as dependências
// importanto a chave secreta para validar o token jwt
const { authSecret } = require("../.env");

// usando o framework passport para validação do token
const passport = require("passport");
const passportJwt = require("passport-jwt");
const { Strategy, ExtractJwt } = passportJwt;

// as funções serão injetadas no app (padrão consign)
module.exports = (app) => {
  // parâmetros usados na estratégia de validação
  const params = {
    // atribuindo a palavra secreta usada na geração do token
    secretOrKey: authSecret,

    // obtendo o token do header da requisição
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  };

  // definindo a estratégia de validação
  // recebe os parâmetros definidos acima e o payload
  // retorna uma função chamada done
  const strategy = new Strategy(params, (payload, done) => {
    // realizando uma consulta com o user.id recebido no payload
    app
      // consultando a tabela users
      .db("users")

      // filtrando a consulta com o user.id recebido no payload
      .where({ id: payload.id })

      // retornando somente o primeiro registro
      .first()

      // em caso de sucesso, retorna a função done com err nulo
      // se o usuário existir, retorna o payload, senão retorna false
      .then((user) => done(null, user ? { ...payload } : false))

      // em caso de erro, retorna a função done com detalhes do erro e conteudo false
      .catch((err) => done(err, false));
  });

  // aplicando a estratégia definida ao passport
  passport.use(strategy);

  // disponibiliza as funções para uso do app (padrão consign)
  return {
    // função que autentuca o usuário
    authenticate: () => passport.authenticate("jwt", { session: false }),
  };
};
