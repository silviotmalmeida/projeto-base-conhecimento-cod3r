// configurações globais da aplicação

// importando as dependências
import Vue from "vue";

// definindo a constante de ....
export const userKey = "__knowledge_user";

// definindo a URL da API a ser consultada
export const baseApiUrl = "http://localhost:4000";

// ....
export function showError(e) {
  if (e && e.response && e.response.data) {
    Vue.toasted.global.defaultError({ msg: e.response.data });
  } else if (typeof e === "string") {
    Vue.toasted.global.defaultError({ msg: e });
  } else {
    Vue.toasted.global.defaultError();
  }
}

export default { baseApiUrl, showError, userKey };
