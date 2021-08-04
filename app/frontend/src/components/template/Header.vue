<template>
    <!-- trecho de código que representa o html do componente -->
    <!-- definindo o componente Header -->  
    <header class="header">

        <!-- inserindo o botão para exibir/esconder o menu lateral -->
        <!-- o atributo @click é responsável por escutar o evento de click padrão e executar o método toggleMenu() -->
        <!-- só será renderizado se o atributo hideToggle for false -->
        <a class="toggle" @click="toggleMenu" v-if="!hideToggle">
            <!-- inserindo o ícone do fontAwesome -->
            <!-- a classe do ícone será o retorno da função icon() -->
            <i class="fa fa-lg" :class="icon"></i>
        </a>

        <!-- inserindo o título -->
        <h1 class="title">
            <!-- insere um link para a URL "/" -->
            <!-- insere o texto recebido pelo atributo title -->
            <router-link to="/">{{ title }}</router-link>
        </h1>

        <!-- inserindo o componente de menu do usuário -->
        <!-- só será renderizado se o atributo hideUserDropdown for false -->
        <UserDropdown v-if="!hideUserDropdown" />
    </header>
</template>

<script>
// trecho de código que representa o comportamento do componente

// importando as dependências
import UserDropdown from "./UserDropdown"; // componente utilizado no menu do usuário

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
    // utiliza o método toggleMenu da store para alternar o atributo isMenuVisible da store
    toggleMenu() {
      this.$store.commit("toggleMenu");
    },
  },
};
</script>

<style>
/* trecho de código que representa o css do componente */

.header {
  /* definindo o nome do componente no css-grid */
  grid-area: header;

  /* gradiente na cor de fundo */
  background: linear-gradient(to right, #1e469a, #49a7c1);

  /* utilizando flexbox dentro do componente */
  display: flex;

  /* centralizando horizontalmente os componentes internos */
  justify-content: center;

  /* centralizando verticalmente os componentes internos */
  align-items: center;
}

.title {
  /* tamanho do texto */
  font-size: 1.2rem;

  /* cor do texto e ícones */
  color: #fff;

  /* peso do texto */
  font-weight: 100;

  /* parte do container que irá crescer dento do flex container */
  flex-grow: 1;

  /* alinhamento do texto */
  text-align: center;
}

.title a {
  /* cor dos links */
  color: #fff;

  /* retirando o estilo default dos links */
  text-decoration: none;
}

.title a:hover {
  /* cor dos links com o mouse sobre o link*/
  color: #fff;

  /* retirando o estilo default dos links com o mouse sobre o link*/
  text-decoration: none;
}

header.header > a.toggle {
  /* comprimento do link de ativar/desativar menu */
  width: 60px;

  /* altura do link de ativar/desativar menu */
  height: 100%;

  /* cor do componente interno de ativar/desativar menu */
  color: #fff;

  /* alinhando horizontalmente o link à esquerda */
  justify-self: flex-start;

  /* retirando o estilo default dos links */
  text-decoration: none;

  /* utilizando flexbox dentro do link */
  display: flex;

  /* centralizando horizontalmente os componentes internos */
  justify-content: center;

  /* centralizando verticalmente os componentes internos */
  align-items: center;
}

header.header > a.toggle:hover {
  /* cor do link de ativar/desativar menu com o mouse sobre o link */
  color: #fff;

  /* cor de fundo do link de ativar/desativar menu com o mouse sobre o link */
  background-color: rgba(0, 0, 0, 0.2);
}
</style>
