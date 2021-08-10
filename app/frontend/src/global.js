// configurações globais da aplicação

// importando as dependências
import Vue from "vue";

// definindo a constante de chave dos dados do armazenamento local
export const userKey = "__conhecimento_user";

// definindo a URL da API a ser consultada
export const baseApiUrl = "http://localhost:4000";

// método responsável por exibir as mensagens de erro
export function showError(e) {
  // se o objeto de erro contém os atributos response e data:
  if (e && e.response && e.response.data) {
    // envia para o toasted exibir a mensagem com os dados do erro
    Vue.toasted.global.defaultError({ msg: e.response.data });
  }

  // se o tipo do erro for string:
  else if (typeof e === "string") {
    // envia para o toasted exibir a mensagem com o texto do erro
    Vue.toasted.global.defaultError({ msg: e });
  }

  // senão:
  else {
    // exibe a mensagem default de erro
    Vue.toasted.global.defaultError();
  }
}

// exportando os atributos e métodos para uso por outros módulos
export default { baseApiUrl, showError, userKey };
