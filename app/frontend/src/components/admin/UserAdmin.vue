<template>
    <!-- trecho de código que representa o html do componente -->
    <!-- definindo o componente UserAdmin -->  
    <div class="user-admin">

        <!-- inserindo o formulário usando o bootstrap-vue -->
        <b-form>

            <!-- inserindo o input oculto com o id -->
            <!-- a propriedade v-model faz a ligação com o objeto -->
            <input id="user-id" type="hidden" v-model="user.id" />

            <!-- inserindo uma linha de componentes usando o bootstrap-vue  -->
            <b-row>

                <!-- inserindo uma coluna de componentes usando o bootstrap-vue  -->
                <b-col md="6" sm="12">

                    <!-- inserindo o form-group para o dado de nome usando o bootstrap-vue -->
                    <b-form-group label="Nome:" label-for="user-name">

                        <!-- inserindo o input para o dado de nome usando o bootstrap-vue  -->
                        <!-- a propriedade v-model faz a ligação com o objeto -->
                        <!-- preenchimento obrigatório -->
                        <!-- a propriedade :readonly será ativada caso o atributo mode seja 'remove' -->
                        <b-form-input id="user-name" type="text"
                            v-model="user.name" required
                            :readonly="mode === 'remove'"
                            placeholder="Informe o Nome do Usuário..." />
                    </b-form-group>
                </b-col>

                <!-- inserindo uma coluna de componentes usando o bootstrap-vue  -->
                <b-col md="6" sm="12">

                    <!-- inserindo o form-group para o dado de e-mail usando o bootstrap-vue -->
                    <b-form-group label="E-mail:" label-for="user-email">

                        <!-- inserindo o input para o dado de e-mail usando o bootstrap-vue  -->
                        <!-- a propriedade v-model faz a ligação com o objeto -->
                        <!-- preenchimento obrigatório -->
                        <!-- a propriedade :readonly será ativada caso o atributo mode seja 'remove' -->
                        <b-form-input id="user-email" type="text"
                            v-model="user.email" required
                            :readonly="mode === 'remove'"
                            placeholder="Informe o E-mail do Usuário..." />
                    </b-form-group>
                </b-col>
            </b-row>

            <!-- inserindo o checkbox para o status de administrador usando o bootstrap-vue  -->
            <!-- a propriedade v-model faz a ligação com o objeto -->
            <!-- será exibido somente se o atributo mode seja 'save' -->
            <b-form-checkbox id="user-admin" v-show="mode === 'save'"
                v-model="user.admin" class="mt-3 mb-3">
                Administrador?
            </b-form-checkbox>

            <!-- inserindo uma linha de componentes usando o bootstrap-vue  -->
            <!-- será exibido somente se o atributo mode seja 'save' -->
            <b-row v-show="mode === 'save'">

                <!-- inserindo uma coluna de componentes usando o bootstrap-vue  -->
                <b-col md="6" sm="12">

                    <!-- inserindo o form-group para o dado de senha usando o bootstrap-vue -->
                    <b-form-group label="Senha:" label-for="user-password">

                        <!-- inserindo o input para o dado de senha usando o bootstrap-vue  -->
                        <!-- a propriedade v-model faz a ligação com o objeto -->
                        <!-- preenchimento obrigatório -->
                        <b-form-input id="user-password" type="password"
                            v-model="user.password" required
                            placeholder="Informe a Senha do Usuário..." />
                    </b-form-group>
                </b-col>

                <!-- inserindo uma coluna de componentes usando o bootstrap-vue  -->
                <b-col md="6" sm="12">

                    <!-- inserindo o form-group para o dado de confirmação de senha usando o bootstrap-vue -->
                    <b-form-group label="Confirmação de Senha:" 
                        label-for="user-confirm-password">

                        <!-- inserindo o input para o dado de confirmação de senha usando o bootstrap-vue  -->
                        <!-- a propriedade v-model faz a ligação com o objeto -->
                        <!-- preenchimento obrigatório -->
                        <b-form-input id="user-confirm-password" type="password"
                            v-model="user.confirmPassword" required
                            placeholder="Confirme a Senha do Usuário..." />
                    </b-form-group>
                </b-col>
            </b-row>

            <!-- inserindo uma linha de componentes usando o bootstrap-vue  -->
            <b-row>

                <!-- inserindo uma coluna de componentes usando o bootstrap-vue  -->
                <b-col xs="12">

                    <!-- inserindo o botão de salvar usando o bootstrap-vue -->
                    <!-- será renderizado somente se o atributo mode seja 'save' -->
                    <!-- o atributo @click é responsável por escutar o evento de click padrão e executar o método save() -->
                    <b-button variant="primary" v-if="mode === 'save'"
                        @click="save">Salvar</b-button>

                    <!-- inserindo o botão de excluir usando o bootstrap-vue -->
                    <!-- será renderizado somente se o atributo mode seja 'remove' -->
                    <!-- o atributo @click é responsável por escutar o evento de click padrão e executar o método remove() -->
                    <b-button variant="danger" v-if="mode === 'remove'"
                        @click="remove">Excluir</b-button>

                    <!-- inserindo o botão de cancelar usando o bootstrap-vue -->
                    <!-- o atributo @click é responsável por escutar o evento de click padrão e executar o método reset() -->
                    <b-button class="ml-2" @click="reset">Cancelar</b-button>
                </b-col>
            </b-row>
        </b-form>

        <!-- inserindo uma linha horizontal -->
        <hr>

        <!-- inserindo a tabela com a listagem de usuários usando o bootstrap-vue -->
        <!-- a propriedade :items carrega as linhas a partir do array passado -->
        <!-- a propriedade :fiels carrega os cabeçalhos a partir do array passado -->
        <b-table hover striped :items="users" :fields="fields">

            <!-- criando o conteúdo da coluna de ações -->
            <template slot="actions" slot-scope="data">

                <!-- inserindo o botão de editar -->
                <!-- o atributo @click é responsável por escutar o evento de click padrão e executar o método loadUser() -->
                <b-button variant="warning" @click="loadUser(data.item)" class="mr-2">
                    
                    <!-- inserindo o ícone do botão -->
                    <i class="fa fa-pencil"></i>
                </b-button>

                <!-- inserindo o botão de excluir -->
                <!-- o atributo @click é responsável por escutar o evento de click padrão e executar o método loadUser() com a variação de remove -->
                <b-button variant="danger" @click="loadUser(data.item, 'remove')">
                    
                    <!-- inserindo o ícone do botão -->
                    <i class="fa fa-trash"></i>
                </b-button>
            </template>
        </b-table>
    </div>
</template>

<script>
// trecho de código que representa o comportamento do componente

// importando as dependências
import { baseApiUrl, showError } from "@/global"; // importando a constante baseApiUrl e o método showError() presente no arquivo global.js
import axios from "axios"; // ferramenta para requisições http

export default {
  // definindo o atributo name
  name: "UserAdmin",

  // função que retorna um objeto representando o estado do componente
  data: function() {
    return {
      // modo de exibição do formulário
      mode: "save",

      // estado inicial do usuário
      user: {},

      // array com a listagem de usuários para carregamento da tabela
      users: [],

      // cabeçalhos da tabela de listagem de usuários
      fields: [
        { key: "id", label: "Código", sortable: true },
        { key: "name", label: "Nome", sortable: true },
        { key: "email", label: "E-mail", sortable: true },
        {
          key: "admin",
          label: "Administrador",
          sortable: true,
          formatter: (value) => (value ? "Sim" : "Não"),
        },
        { key: "actions", label: "Ações" },
      ],
    };
  },
  // definindo os métodos
  methods: {
    // método responsável por atualizar os dados do usuário no componente e formulário
    // atualiza também o modo de exibição do formulário (por padrão "save")
    loadUser(user, mode = "save") {
      // atualizando o modo de exibição do formulário
      this.mode = mode;

      // atualiza os dados do usuário
      this.user = { ...user };

      // movendo o scroll para o topo da página
      window.scrollTo(0, 0);
    },
    // método responsável por limpar os dados do usuário no componente e formulário
    reset() {
      // atualizando o modo de exibição do formulário para o inicial
      this.mode = "save";

      // limpando os dados do usuário
      this.user = {};

      // recarregando a listagem de usuários
      this.loadUsers();
    },
    // método responsável por criar ou atualizar o usuário via API
    save() {
      // se existir id, o método de requisição será put, senão será post
      const method = this.user.id ? "put" : "post";

      // se existir id, será incluído na URL
      const id = this.user.id ? `/${this.user.id}` : "";

      // realizando a requisição HTTP na URL definida
      axios[method](`${baseApiUrl}/users${id}`, this.user)

        // em caso de sucesso:
        .then(() => {
          // exibindo mensagem de sucesso
          this.$toasted.global.defaultSuccess();

          // limpa os dados do usuário e do formulário
          this.reset();
        })

        // em caso de erro, exibe a mensagem de erro
        .catch(showError);
    },
    // método responsável por excluir a categoria via API
    remove() {
      // definindo o id do usuário
      const id = this.user.id;

      // realizando a requisição HTTP:
      axios

        // na URL definida com o método delete
        .delete(`${baseApiUrl}/users/${id}`)

        // em caso de sucesso:
        .then(() => {
          // exibindo mensagem de sucesso
          this.$toasted.global.defaultSuccess();

          // limpa os dados do usuário e do formulário
          this.reset();
        })

        // em caso de erro, exibe a mensagem de erro
        .catch(showError);
    },
    loadUsers() {
      // definindo a URL a ser consultada
      const url = `${baseApiUrl}/users`;

      // realizando a requisição HTTP
      axios

        // na URL definida
        .get(url)

        // em caso de sucesso:
        .then((res) => {
          // popula o array de usuários para listagem na tabela
          this.users = res.data;
        });
    },
  },
  // função de ciclo de vida, chamada quando o componente é montado
  mounted() {
    // carrega o array de usuários
    this.loadUsers();
  },
};
</script>

<style>
/* trecho de código que representa o css do componente */
</style>
