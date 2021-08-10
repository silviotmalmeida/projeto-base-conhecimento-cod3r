// o objetivo deste arquivo é configurar um interceptador para o axios, de modo a para os erros 401, o usuário seja redirecionado para a página inicial
// o vencimento do token é considerado erro 401

// importando as dependências
import axios from "axios"; // ferramenta para requisições http

// em caso de sucesso, prossegue
const success = (res) => res;

// em caso de erro:
const error = (err) => {
  // se tratar-se de erro 401:
  if (401 === err.response.status) {
    // redireciona para a página inicial
    window.location = "/";
  }
  // senão:
  else {
    // envia erro
    return Promise.reject(err);
  }
};

// carregando o interceptador
axios.interceptors.response.use(success, error);
