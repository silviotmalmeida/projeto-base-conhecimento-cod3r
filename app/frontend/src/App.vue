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
		<Menu v-if="user" />

		<!-- inserindo o componente Loading -->
		<Loading v-if="validatingToken" />

		<!-- inserindo o componente Content -->
		<Content v-else />

		<!-- inserindo o componente Footer -->
		<Footer />
	</div>
</template>

<script>
// trecho de código que representa o comportamento do componente

// importando as dependências

//
import axios from "axios";

//
import { baseApiUrl, userKey } from "@/global";

//
import { mapState } from "vuex"; //responsável por mapear os atributos da store

// componentes utilizados na composição deste componente
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

  // obtendo o valor dos atributo isMenuVisible e user da store
  computed: mapState(["isMenuVisible", "user"]),
  data: function() {
    return {
      validatingToken: true,
    };
  },
  methods: {
    async validateToken() {
      this.validatingToken = true;

      const json = localStorage.getItem(userKey);
      const userData = JSON.parse(json);
      this.$store.commit("setUser", null);

      if (!userData) {
        this.validatingToken = false;
        this.$router.push({ name: "auth" });
        return;
      }

      const res = await axios.post(`${baseApiUrl}/validateToken`, userData);

      if (res.data) {
        this.$store.commit("setUser", userData);

        if (this.$mq === "xs" || this.$mq === "sm") {
          this.$store.commit("toggleMenu", false);
        }
      } else {
        localStorage.removeItem(userKey);
        this.$router.push({ name: "auth" });
      }

      this.validatingToken = false;
    },
  },
  created() {
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
