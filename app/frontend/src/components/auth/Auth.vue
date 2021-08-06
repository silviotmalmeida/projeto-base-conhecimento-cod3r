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

            <!-- inserindo o input para o dado de nome -->
            <!-- será renderizado somente se o atributo showSignup seja 'true' -->
            <!-- a propriedade v-model faz a ligação com o objeto -->                
            <input v-if="showSignup" v-model="user.name" type="text" placeholder="Nome">
            
            <!-- inserindo o input para o dado de e-mail -->
            <!-- a propriedade v-model faz a ligação com o objeto -->  
            <input v-model="user.email" name="email" type="text" placeholder="E-mail">
            
            <!-- inserindo o input para o dado de senha -->
            <!-- a propriedade v-model faz a ligação com o objeto -->
            <input v-model="user.password" name="password" type="password" placeholder="Senha">
            
            <!-- inserindo o input para o dado de confirmação de senha -->
            <!-- será renderizado somente se o atributo showSignup seja 'true' -->
            <!-- a propriedade v-model faz a ligação com o objeto --> 
            <input v-if="showSignup" v-model="user.confirmPassword"
                type="password" placeholder="Confirme a Senha">


            <!-- inserindo o botão de registrar -->
            <!-- será renderizado somente se o atributo showSignup seja 'true' -->
            <!-- o atributo @click é responsável por escutar o evento de click padrão e executar o método signup() -->
            <button v-if="showSignup" @click="signup">Registrar</button>

            <!-- inserindo o botão de entrar -->
            <!-- será renderizado somente se o atributo showSignup seja 'false' -->
            <!-- o atributo @click é responsável por escutar o evento de click padrão e executar o método signin() -->            
            <button v-else @click="signin">Entrar</button>

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
import { baseApiUrl, showError, userKey } from "@/global";
import axios from "axios";

export default {
  name: "Auth",
  data: function() {
    return {
      showSignup: false,
      user: {},
    };
  },
  // definindo os métodos
  methods: {
    signin() {
      axios
        .post(`${baseApiUrl}/signin`, this.user)
        .then((res) => {
          this.$store.commit("setUser", res.data);
          localStorage.setItem(userKey, JSON.stringify(res.data));
          this.$router.push({ path: "/" });
        })
        .catch(showError);
    },
    signup() {
      axios
        .post(`${baseApiUrl}/signup`, this.user)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.user = {};
          this.showSignup = false;
        })
        .catch(showError);
    },
  },
};
</script>

<style>
.auth-content {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.auth-modal {
  background-color: #fff;
  width: 350px;
  padding: 35px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);

  display: flex;
  flex-direction: column;
  align-items: center;
}

.auth-title {
  font-size: 1.2rem;
  font-weight: 100;
  margin-top: 10px;
  margin-bottom: 15px;
}

.auth-modal input {
  border: 1px solid #bbb;
  width: 100%;
  margin-bottom: 15px;
  padding: 3px 8px;
  outline: none;
}

.auth-modal button {
  align-self: flex-end;
  background-color: #2460ae;
  color: #fff;
  padding: 5px 15px;
}

.auth-modal a {
  margin-top: 35px;
}

.auth-modal hr {
  border: 0;
  width: 100%;
  height: 1px;
  background-image: linear-gradient(
    to right,
    rgba(120, 120, 120, 0),
    rgba(120, 120, 120, 0.75),
    rgba(120, 120, 120, 0)
  );
}
</style>
