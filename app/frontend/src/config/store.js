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

    // define a chave a ser vinculada as listas de categorias para atualização automática
    keyCategoriesReload: 0,

    // define a chave a ser vinculada as listas de usuários para atualização automática
    keyUsersReload: 0,

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
    // método responsável por alterar a chave das categorias, forçando a atualização automática
    reloadCategories(state) {
      // incrementa a chave das categorias
      state.keyCategoriesReload++;
    },
    // método responsável por alterar a chave dos usuários, forçando a atualização automática
    reloadUsers(state) {
      // incrementa a chave dos usuários
      state.keyUsersReload++;
    },
    // método responsável por logar o usuário no sistema
    setUser(state, user) {
      // populando os dados de usuário a partir do parâmetro recebido
      state.user = user;

      // se o usuário foi passado por parâmetro:
      if (user) {
        // aplica o token gerado no header da sessão
        axios.defaults.headers.common["Authorization"] = `bearer ${user.token}`;

        // exibe o menu lateral
        state.isMenuVisible = true;
      }
      // senão:
      else {
        // limpa o header da sessão
        delete axios.defaults.headers.common["Authorization"];

        // oculta o menu lateral
        state.isMenuVisible = false;
      }
    },
  },
});
