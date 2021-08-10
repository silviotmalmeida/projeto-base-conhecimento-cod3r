<template>
    <!-- trecho de código que representa o html do componente -->
    <!-- definindo o componente Auth -->
    <div class="auth-content">

        <!-- inserindo a região do formulário -->
        <div class="auth-modal">

            <!-- inserindo a logomarca -->
            <img src="@/assets/logo.png" width="200" alt="Logo" />

            <!-- inserindo um alinha horizontal -->
            <hr>

            <!-- inserindo o título do formulário -->
            <!-- se o atributo showSignup for true, o título é Cadastro, senão é Login -->
            <div class="auth-title">{{ showSignup ? 'Cadastro' : 'Login' }}</div>

              <!-- inserindo o input para o dado de nome usando o bootstrap-vue  -->
              <!-- será renderizado somente se o atributo showSignup seja 'true' -->
              <!-- a propriedade v-model faz a ligação com o objeto -->
              <!-- preenchimento obrigatório -->
              <b-form-input v-if="showSignup" id="user-name" type="text"
                  v-model="user.name" required
                  placeholder="Informe o Nome do Usuário..." />

              <!-- inserindo o input para o dado de e-mail usando o bootstrap-vue  -->
              <!-- a propriedade v-model faz a ligação com o objeto -->
              <!-- preenchimento obrigatório -->
              <b-form-input id="user-email" type="text"
                  v-model="user.email" required
                  placeholder="Informe o E-mail do Usuário..." />

              <!-- inserindo o input para o dado de senha usando o bootstrap-vue  -->
              <!-- a propriedade v-model faz a ligação com o objeto -->
              <!-- preenchimento obrigatório -->
              <b-form-input id="user-password" type="password"
                  v-model="user.password" required
                  placeholder="Informe a Senha do Usuário..." />

              <!-- inserindo o input para o dado de confirmação de senha usando o bootstrap-vue  -->
              <!-- será renderizado somente se o atributo showSignup seja 'true' -->
              <!-- a propriedade v-model faz a ligação com o objeto -->
              <!-- preenchimento obrigatório -->
              <b-form-input v-if="showSignup" id="user-confirmPassword" type="password"
                  v-model="user.confirmPassword" required
                  placeholder="Confirme a Senha do Usuário..." />
             
              <!-- inserindo o botão de registrar -->
              <!-- será renderizado somente se o atributo showSignup seja 'true' -->
              <!-- o atributo @click é responsável por escutar o evento de click padrão e executar o método signup() -->
              <b-button variant="primary" v-if="showSignup" @click="signup">Registrar</b-button>

              <!-- inserindo o botão de entrar -->
              <!-- será renderizado somente se o atributo showSignup seja 'false' -->
              <!-- o atributo @click é responsável por escutar o evento de click padrão e executar o método signin() -->            
              <b-button variant="primary" v-else @click="signin">Entrar</b-button>

            <!-- inserindo o link para alternar os formulários -->
            <!-- o atributo @click é responsável por escutar o evento de click padrão e alternar o valor do atributo showSignup -->            
            <a href @click.prevent="showSignup = !showSignup">

                <!-- inserindo o texto do link para o formulário de cadastro -->
                <!-- será renderizado somente se o atributo showSignup seja 'true' -->
                <span v-if="showSignup">Já tem cadastro? Acesse o Login!</span>
                
                <!-- inserindo o texto do link para o formulário de login -->
                <!-- será renderizado somente se o atributo showSignup seja 'false' -->
                <span v-else>Não tem cadastro? Registre-se aqui!</span>
            </a>
        </div>
    </div>
</template>

<script>
// trecho de código que representa o comportamento do componente

// importando as dependências
import { baseApiUrl, showError, userKey } from "@/global"; // importando as constantes baseApiUrl e userKey e o método showError() presente no arquivo global.js
import axios from "axios"; // ferramenta para requisições http

export default {
  // definindo o atributo name
  name: "Auth",

  // função que retorna um objeto representando o estado do componente
  data: function() {
    return {
      // modo de exibição do formulário
      showSignup: false,

      // estado inicial do usuário
      user: {},
    };
  },
  // definindo os métodos
  methods: {
    // método responsável por realizar o login na aplicação
    signin() {
      // realizando a requisição HTTP
      axios

        // na URL de signin, passando os dados do usuário
        .post(`${baseApiUrl}/signin`, this.user)

        // em caso de sucesso:
        .then((res) => {
          // envia o payload e t para o método setUser() da store
          this.$store.commit("setUser", res.data);

          // armazena localmente os dados de login para acesso posterior
          localStorage.setItem(userKey, JSON.stringify(res.data));

          // redireciona para a página inicial
          this.$router.push({ path: "/" });
        })

        // em caso de erro, exibe a mensagem de erro
        .catch(showError);
    },

    // método responsável por realizar o cadastro de um novo usuário na aplicação
    signup() {
      // realizando a requisição HTTP
      axios
        // na URL de signup, passando os dados do usuário
        .post(`${baseApiUrl}/signup`, this.user)

        // em caso de sucesso:
        .then(() => {
          // exibe mensagem de sucesso
          this.$toasted.global.defaultSuccess();

          // remove os dados do usuário
          this.user = {};

          // alterna a exibição para o formulário de login
          this.showSignup = false;
        })

        // em caso de erro, exibe a mensagem de erro
        .catch(showError);
    },
  },
};
</script>

<style>
/* trecho de código que representa o css do componente */

.auth-content {
  /* altura */
  height: 100%;

  /* utilizando flexbox dentro do componente */
  display: flex;

  /* centralizando horizontalmente os componentes internos */
  justify-content: center;

  /* centralizando verticalmente os componentes internos */
  align-items: center;
}

.auth-modal {
  /* cor de fundo */
  background-color: #fff;

  /* comprimento */
  width: 350px;

  /* espaçamento interno */
  padding: 35px;

  /* sombreamento */
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);

  /* utilizando flexbox dentro do componente */
  display: flex;

  /* alterando o eixo principal para coluna */
  flex-direction: column;

  /* centralizando horizontalmente os componentes internos */
  align-items: center;
}

.auth-title {
  /* tamanho do texto */
  font-size: 1.2rem;

  /* peso do texto */
  font-weight: 100;

  /* espaçamento externo superior */
  margin-top: 10px;

  /* espaçamento externo inferior */
  margin-bottom: 15px;
}

.auth-modal input {
  /* borda */
  border: 1px solid #bbb;

  /* comprimento */
  width: 100%;

  /* espaçamento externo inferior */
  margin-bottom: 15px;

  /* espaçamento interno */
  padding: 3px 8px;

  /* retirando o outline default */
  outline: none;
}

.auth-modal button {
  /* alinhando à esquerda */
  align-self: flex-end;

  /* cor do texto */
  color: #fff;

  /* espaçamento interno */
  padding: 5px 15px;
}

.auth-modal a {
  /* espaçamento externo superior */
  margin-top: 35px;
}

.auth-modal hr {
  /* borda */
  border: 0;

  /* comprimento */
  width: 100%;

  /* altura */
  height: 1px;

  /* imagem de fundo */
  background-image: linear-gradient(
    to right,
    rgba(120, 120, 120, 0),
    rgba(120, 120, 120, 0.75),
    rgba(120, 120, 120, 0)
  );
}
</style>
