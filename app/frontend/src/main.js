// entrypoint da aplicação

//importando as dependências
// importação do font-awesome
import "font-awesome/css/font-awesome.css";

import Vue from "vue";
import App from "./App";

import "./config/bootstrap";
import "./config/msgs";
import "./config/axios";
import "./config/mq";

// importando a store para compartilhar atributos e comportamentos entre os componentes
import store from "./config/store";
import router from "./config/router";

Vue.config.productionTip = false;

//renderizando a aplicação
new Vue({

  // carregando a store
  store,
  router,

  // renderiza o componente raiz
  render: (h) => h(App),

  // na div app do index.html
}).$mount("#app");
