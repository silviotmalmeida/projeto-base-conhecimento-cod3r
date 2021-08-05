// o objetivo desta store é criar uma área de armazenamento a ser utilizada pelos componentes,
// permitindo troca de mensagens entre os mesmos

// importando as dependências
import axios from "axios"; // ferramenta para requisições http
import Vue from "vue";
import Vuex from "vuex"; // controla a store da aplicação

// carregando o vuex
Vue.use(Vuex);

// criando a store
// compartilhará os atributos e comportamentos entre os componentes
export default new Vuex.Store({
  // atributos
  state: {
    // define a visibilidade atual do menu lateral
    isMenuVisible: false,

    // define a necessidade de recarregar o menu lateral
    isMenuChanged: false,

    // define se existe usuário logado atualmente
    user: null,
  },

  // comportamentos
  mutations: {
    // método responsável por alternar o valor do atributo isMenuVisible
    // recebe como parâmetro o estado atual e um booleano que indica a visibilidade desejada
    toggleMenu(state, isVisible) {
      // se não existir usuário logado, define o menu como não visível
      if (!state.user) {
        state.isMenuVisible = false;
        return;
      }

      // se o parâmetro não for informado, alterna o valor do atributo isMenuVisible
      if (isVisible === undefined) {
        state.isMenuVisible = !state.isMenuVisible;
      }
      // senão aplica o valor do parâmetro
      else {
        state.isMenuVisible = isVisible;
      }
    },
    // método responsável por alternar o valor do atributo isMenuChanged
    // recebe como parâmetro o estado atual e um booleano que indica a necessidade de atualizar o menu
    reloadMenu(state, reload) {
      console.log("rodei fora");

      // se o parâmetro não for informado, alterna o valor do atributo isMenuChanged
      if (reload === undefined) {
        state.isMenuChanged = !state.isMenuChanged;
      }
      // senão aplica o valor do parâmetro
      else {
        state.isMenuChanged = reload;
      }
    },
    setUser(state, user) {
      state.user = user;
      if (user) {
        axios.defaults.headers.common["Authorization"] = `bearer ${user.token}`;
        state.isMenuVisible = true;
      } else {
        delete axios.defaults.headers.common["Authorization"];
        state.isMenuVisible = false;
      }
    },
  },
});
