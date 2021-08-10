<template>
    <!-- trecho de código que representa o html do componente -->
    <!-- definindo o componente UserDropdown -->  
    <div class="user-dropdown">

        <!-- inserindo o botão com o nome e imagem do usuário -->
        <div class="user-button">

            <!-- inserindo o nome do usuário -->
            <span class="d-none d-sm-block">{{ user.name }}</span>

            <!-- inserindo a imagem do usuário -->
            <div class="user-dropdown-img">

                <!-- utilizando o componente Gravatar para obter a imagem do usuário a partir do e-mail -->
                <Gravatar :email="user.email" alt="User" />
            </div>

            <!-- inserindo o ícone seta pra baixo -->
            <i class="fa fa-angle-down"></i>
        </div>

        <!-- inserindo o menu dropdown a ser chamado quando o mouse passar sobre o botão -->
        <div class="user-dropdown-content">

            <!-- inserindo o link para a área de administração utilizando o router-->
            <!-- só será renderizado se o usuário for administrador -->
            <router-link to="/admin" v-if="user.admin">

                <!-- inserindo o ícone e texto Administração -->
                <i class="fa fa-cogs"></i> Administração
            </router-link>

            <!-- inserindo o link para deslogar do sistema -->
            <!-- o atributo @click é responsável por escutar o evento de click padrão e executar o método logout() -->
            <a href @click.prevent="logout">
                <!-- inserindo o ícone e texto Sair -->
                <i class="fa fa-sign-out"></i> Sair</a>
        </div>
    </div>
</template>

<script>
// trecho de código que representa o comportamento do componente

// importando as dependências
import { userKey } from "@/global"; // ....
import { mapState } from "vuex"; //responsável por mapear os atributos da store
import Gravatar from "vue-gravatar"; //responsável por obter a imagem do usuário a partir de seu e-mail

export default {
  // definindo o atributo name
  name: "UserDropdown",

  // definindo os componentes a serem utilizados
  components: { Gravatar },

  // definindo as propriedades computadas
  // obtendo os dados do usuário a partir da store
  computed: mapState(["user"]),

  // definindo os métodos
  methods: {
    // método que realiza o logout do sistema
    logout() {
      // removendo os dados do usuário do armazenamento local
      localStorage.removeItem(userKey);

      // retirando os dados do usuário da store
      this.$store.commit("setUser", null);

      // redirecionando para a tela de autenticação
      this.$router.push({ name: "auth" });
    },
  },
};
</script>

<style>
/* trecho de código que representa o css do componente */

.user-dropdown {
  /* posição relativa */
  position: relative;

  /* altura do menu do usuário */
  height: 100%;
}

.user-button {
  /* utilizando flexbox dentro do botão */
  display: flex;

  /* centralizando verticalmente os componentes internos */
  align-items: center;

  /* cor do texto e ícones */
  color: #fff;

  /* peso do texto */
  font-weight: 100;

  /* altura do botão */
  height: 100%;

  /* espaçamento interno */
  padding: 0px 20px;
}

.user-dropdown:hover {
  /* cor de fundo do menu do usuário com o mouse sobre o menu */
  background-color: rgba(0, 0, 0, 0.2);
}

.user-dropdown-img {
  /* espaçamento externo da imagem do usuário */
  margin: 0px 10px;
}

.user-dropdown-img > img {
  /* altura máxima da imagem do usuário */
  max-height: 37px;

  /* borda circular da imagem do usuário */
  border-radius: 5px;
}

.user-dropdown-content {
  /* posição absoluta */
  position: absolute;

  /* alinhando à direita */
  right: 0px;

  /* cor de fundo */
  background-color: #f9f9f9;

  /* comprimento mínimo */
  min-width: 170px;

  /* sobreamento ao redor */
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);

  /* espaçamento interno */
  padding: 10px;

  /* colocando em ordem acima dos demais */
  z-index: 1;

  /* utilizando flexbox dentro do menu oculto */
  display: flex;

  /* alterando o eixo principal para coluna */
  flex-direction: column;

  /* permitindo quebras de linha */
  flex-wrap: wrap;

  /* ocultando os elementos e definindo a transição de desaparecimento*/
  visibility: hidden;
  opacity: 0;
  transition: visibility 0s, opacity 0.5s linear;
}

.user-dropdown:hover .user-dropdown-content {
  /* exibir os elementos ocultos quando o mouse estiver sobre o botão */
  visibility: visible;
  opacity: 1;
}

.user-dropdown-content a {
  /* removendo o estilo default dos links */
  text-decoration: none;

  /* cor dos links */
  color: #000;

  /* espaçamento interno */
  padding: 10px;
}

.user-dropdown-content a:hover {
  /* removendo o estilo default dos links quando o mouse estiver sobre o link */
  text-decoration: none;

  /* cor dos links quando o mouse estiver sobre o link */
  color: #000;

  /* cor de fundo dos links quando o mouse estiver sobre o link */
  background-color: #ededed;
}
</style>
