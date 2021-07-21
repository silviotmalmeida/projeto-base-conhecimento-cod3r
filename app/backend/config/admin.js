// middleware com função de consultar os dados recebidos na requisição e verificar se o usuário é administrador

module.exports = (middleware) => {
  return (req, res, next) => {
    // se o atributo user.admin for true
    if (req.user.admin) {
      // repassa os dados da requisição para o próximo middleware
      middleware(req, res, next);
    }
    // senão:
    else {
      // retorna status 401 e envia mensagem de erro
      res.status(401).send("Usuário não é administrador.");
    }
  };
};
