// entrypoint da aplicação

//importando as dependências
import "font-awesome/css/font-awesome.css"; // importação do font-awesome
import Vue from "vue";
import App from "./App";
import "./config/bootstrap"; // importando o bootstrap
import "./config/msgs"; // ....
import "./config/axios"; // ....
import "./config/mq"; // ....
import store from "./config/store"; // importando a store para compartilhar atributos e comportamentos entre os componentes
import router from "./config/router"; // importando o router com as definições das rotas

Vue.config.productionTip = false;

//renderizando a aplicação
new Vue({
  // carregando a store
  store,

  // carregando o router
  router,

  // renderiza o componente raiz
  render: (h) => h(App),

  // na div app do index.html
}).$mount("#app");
