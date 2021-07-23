<template>
    <!-- trecho de código que representa o html do componente -->
    <!-- definindo o componente Header -->  
    <header class="header">

        <!-- inserindo o botão para exibir/esconder o menu lateral -->
        <!-- o atributo @click é responsável por escutar o evento de click padrão e executar o método toggleMenu() -->
        <!--só será renderizado se o atributo hideToggle for false -->
        <a class="toggle" @click="toggleMenu" v-if="!hideToggle">
            <!-- inserindo o ícone do fontAwesome -->
            <!-- a classe do ícone será o retorno da função icon() -->
            <i class="fa fa-lg" :class="icon"></i>
        </a>

        <!-- inserindo o título -->
        <h1 class="title">
            <!-- insere um link para a URL "/" -->
            <!-- insere o texto recebino pelo atributo title -->
            <router-link to="/">{{ title }}</router-link>
        </h1>

        <!-- inserindo o componente de menu do usuário -->
        <UserDropdown v-if="!hideUserDropdown" />
    </header>
</template>

<script>
// trecho de código que representa o comportamento do componente

// importando o componente UserDropDown
import UserDropdown from "./UserDropdown";

export default {
  // definindo o atributo name
  name: "Header",

  // definindo os componentes a serem utilizados
  components: { UserDropdown },

  // definindo as propriedades a serem recebidas na criação do componente
  props: {
    title: String,
    hideToggle: Boolean,
    hideUserDropdown: Boolean,
  },

  // definindo as propriedades computadas
  computed: {
    // função que retorna a classe de ícone a ser utilizada no toogle
    icon() {
      // utilizando o atributo isMenuVisible da store para selecionar o ícone
      return this.$store.state.isMenuVisible
        ? "fa-angle-left"
        : "fa-angle-down";
    },
  },

  // definindo os métodos
  methods: {
    // utilizando o método toggleMenu da store para alternar o atributo isMenuVisible da store
    toggleMenu() {
      this.$store.commit("toggleMenu");
    },
  },
};
</script>

<style>
/* trecho de código que representa o css do componente */

.header {
  grid-area: header;
  background: linear-gradient(to right, #1e469a, #49a7c1);

  display: flex;
  justify-content: center;
  align-items: center;
}

.title {
  font-size: 1.2rem;
  color: #fff;
  font-weight: 100;
  flex-grow: 1;
  text-align: center;
}

.title a {
  color: #fff;
  text-decoration: none;
}

.title a:hover {
  color: #fff;
  text-decoration: none;
}

header.header > a.toggle {
  width: 60px;
  height: 100%;
  color: #fff;
  justify-self: flex-start;
  text-decoration: none;

  display: flex;
  justify-content: center;
  align-items: center;
}

header.header > a.toggle:hover {
  color: #fff;
  background-color: rgba(0, 0, 0, 0.2);
}
</style>
