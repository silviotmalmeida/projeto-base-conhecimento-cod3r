<template>
	<!-- trecho de código que representa o html do componente -->
	<!-- definindo a div principal com o componente raiz a ser renderizado -->
	<!-- este componente é formado pela composição dos demais componente criados -->
	<!-- caso o menu esteja invisível ou não exista usuário logado, aplica a classe hide-menu  -->
	<div id="app" :class="{'hide-menu': !isMenuVisible || !user}">

		<!-- inserindo o componente Header -->
		<!-- recebe os atributos title, hideToggle e hideUserDropdown -->
		<!-- caso o usuário não esteja logado, hideToggle e hideUserDropdown recebem true -->
		<Header title="Cod3r - Base de Conhecimento" 
			:hideToggle="!user"
			:hideUserDropdown="!user" />

		<!-- inserindo o componente Menu -->
    <!-- so será renderizada se o usuário estiver logado -->
    <!-- a propriedade :key vincula o componente a uma chave que quando é alterada, recarrega o componente -->
		<Menu v-if="user" :key="keyCategoriesReload"/>

    <!-- se o token de validação for válido -->
		<!-- insere o componente Loading -->
		<Loading v-if="validatingToken" />

    <!-- senão -->
		<!-- insere o componente Content -->
		<Content v-else />

		<!-- inserindo o componente Footer -->
		<Footer />

	</div>
</template>

<script>
// trecho de código que representa o comportamento do componente

// importando as dependências
import axios from "axios"; // ferramenta para requisições http
import { baseApiUrl, userKey } from "@/global"; // importando as constantes baseApiUrl e userKey presente no arquivo global.js
import { mapState } from "vuex"; //responsável por mapear os atributos da store

// componentes de template utilizados na composição deste componente
import Header from "@/components/template/Header";
import Menu from "@/components/template/Menu";
import Content from "@/components/template/Content";
import Footer from "@/components/template/Footer";
import Loading from "@/components/template/Loading";

// criando o componente
export default {
  // definindo o atributo name
  name: "App",

  // definindo os componentes a serem utilizados
  components: { Header, Menu, Content, Footer, Loading },

  // obtendo o valor dos atributos isMenuVisible, keyCategoriesReload e user da store
  computed: mapState(["isMenuVisible", "keyCategoriesReload", "user"]),

  // função que retorna um objeto representando o estado do componente
  data: function() {
    return {
      // definindo a necessidade de validação de token
      validatingToken: true,
    };
  },
  // definindo os métodos
  methods: {
    // método responsável por validar o token da sessão
    async validateToken() {
      // definindo a necessidade de validação de token
      this.validatingToken = true;

      // obtendo os dados do armazenamento local
      const json = localStorage.getItem(userKey);

      // convertendo os dados obtidos para json
      const userData = JSON.parse(json);

      // retirando os dados de usuário da store
      this.$store.commit("setUser", null);

      // se não existirem dados de usuário no armazenamento local:
      if (!userData) {
        // remove a necessidade de validação de token
        this.validatingToken = false;

        // redireciona para a página de autenticação
        this.$router.push({ name: "auth" });
        return;
      }

      // validando o token obtido nos dados do armazenamento local
      const res = await axios.post(`${baseApiUrl}/validateToken`, userData);

      // se o token for válido:
      if (res.data) {
        // envia o payload e token para o método setUser() da store
        this.$store.commit("setUser", userData);

        // se o dispositivo for extra-pequeno ou pequeno:
        if (this.$mq === "xs" || this.$mq === "sm") {
          // utiliza o método toogleMenu() da store para ocultar o menu
          this.$store.commit("toggleMenu", false);
        }
      }
      // senão:
      else {
        // apaga os dados do armazenamento local
        localStorage.removeItem(userKey);

        // redireciona para a página de autenticação
        this.$router.push({ name: "auth" });
      }

      // remove a necessidade de validação de token
      this.validatingToken = false;
    },
  },

  // função de ciclo de vida, chamada quando o componente é criado
  created() {
    // valida o token
    this.validateToken();
  },
};
</script>

<style>
/* trecho de código que representa o css do componente */

* {
  /* fonte dos textos */
  font-family: "Lato", sans-serif;
}

body {
  /* retirando as margens default do browser */
  margin: 0;
}

#app {
  /* propriedades para suavizar as fontes  */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  /* altura do componente */
  height: 100vh;

  /* utilizando o css-grid dentro do componente*/
  display: grid;

  /* definindo as alturas das linhas de cima para baixo */
  grid-template-rows: 60px 1fr 40px;

  /* definindo o comprimento das colunas da esquerda para direita */
  grid-template-columns: 300px 1fr;

  /* distribuindo as áreas conforme os nomes definidos nos componentes internos */
  grid-template-areas:
    "header header"
    "menu content"
    "menu footer";
}

#app.hide-menu {
  /* distribuindo as áreas conforme os nomes definidos nos componentes internos */
  /* utilizado quando o menu estiver oculto */
  grid-template-areas:
    "header header"
    "content content"
    "footer footer";
}
</style>
