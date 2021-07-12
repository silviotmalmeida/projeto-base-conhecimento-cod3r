// configuração dos middlewares do express

// middleware utilizado para interpretar o body das requisições
const bodyParser = require("body-parser");

// middleware utilizado para permitir o acesso da api do backend por outras aplicações
const cors = require("cors");

module.exports = (app) => {
  // incluido os middlewares
  app.use(bodyParser.json());
  app.use(cors());
};
