<template>
    <!-- trecho de código que representa o html do componente -->
    <!-- definindo o componente ArticleAdmin -->  
    <div class="article-admin">

        <!-- inserindo o formulário usando o bootstrap-vue -->
        <b-form>

            <!-- inserindo o input oculto com o id -->
            <!-- a propriedade v-model faz a ligação com o objeto -->
            <input id="article-id" type="hidden" v-model="article.id" />

            <!-- inserindo o form-group para o dado de nome usando o bootstrap-vue -->
            <b-form-group label="Nome:" label-for="article-name">

                <!-- inserindo o input para o dado de nome usando o bootstrap-vue  -->
                <!-- a propriedade v-model faz a ligação com o objeto -->
                <!-- preenchimento obrigatório -->
                <!-- a propriedade :readonly será ativada caso o atributo mode seja 'remove' -->
                <b-form-input id="article-name" type="text"
                    v-model="article.name" required
                    :readonly="mode === 'remove'"
                    placeholder="Informe o Nome do Artigo..." />
            </b-form-group>

            <!-- inserindo o form-group para o dado de descrição usando o bootstrap-vue -->
            <b-form-group label="Descrição" label-for="article-description">

                <!-- inserindo o input para o dado de descrição usando o bootstrap-vue  -->
                <!-- a propriedade v-model faz a ligação com o objeto -->
                <!-- preenchimento obrigatório -->
                <!-- a propriedade :readonly será ativada caso o atributo mode seja 'remove' -->
                <b-form-input id="article-description" type="text"
                    v-model="article.description" required
                    :readonly="mode === 'remove'"
                    placeholder="Informe o Nome do Artigo..." />
            </b-form-group>

            <!-- inserindo o form-group para o dado de URL imagem usando o bootstrap-vue -->
            <!-- será renderizado somente se o atributo mode seja 'save' -->
            <b-form-group v-if="mode === 'save'"
                label="Imagem (URL):" label-for="article-imageUrl">

                <!-- inserindo o input para o dado de URL imagem usando o bootstrap-vue  -->
                <!-- a propriedade v-model faz a ligação com o objeto -->
                <!-- preenchimento obrigatório -->
                <!-- a propriedade :readonly será ativada caso o atributo mode seja 'remove' -->
                <b-form-input id="article-imageUrl" type="text"
                    v-model="article.imageUrl" required
                    :readonly="mode === 'remove'"
                    placeholder="Informe a URL da Imagem..." />
            </b-form-group>

            <!-- inserindo o form-group para o dado de categoria usando o bootstrap-vue -->
            <!-- será renderizado somente se o atributo mode seja 'save' -->
            <b-form-group v-if="mode === 'save'" 
                label="Categoria:" label-for="article-categoryId">

                <!-- inserindo o select para o dado de categoria usando o bootstrap-vue  -->
                <!-- a propriedade :options carrega as opções a partir do array passado -->
                <!-- a propriedade v-model faz a ligação com o objeto -->
                <b-form-select id="article-categoryId"
                    :options="categories" v-model="article.categoryId"/>
            </b-form-group>

            <!-- inserindo o form-group para o dado de autor usando o bootstrap-vue -->
            <!-- será renderizado somente se o atributo mode seja 'save' -->
            <b-form-group v-if="mode === 'save'" 
                label="Autor:" label-for="article-userId">

                <!-- inserindo o select para o dado de autor usando o bootstrap-vue  -->
                <!-- a propriedade :options carrega as opções a partir do array passado -->
                <!-- a propriedade v-model faz a ligação com o objeto -->
                <b-form-select id="article-userId"
                    :options="users" v-model="article.userId" />
            </b-form-group>

            <!-- inserindo o form-group para o dado de conteúdo usando o bootstrap-vue -->
            <!-- será renderizado somente se o atributo mode seja 'save' -->
            <b-form-group v-if="mode === 'save'"
                label="Conteúdo" label-for="article-content">

                <!-- inserindo o componente editor de texto  -->
                <!-- a propriedade v-model faz a ligação com o objeto -->
                <VueEditor v-model="article.content"
                    placeholder="Informe o Conteúdo do Artigo..." />
            </b-form-group>

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
        </b-form>

        <!-- inserindo uma linha horizontal -->
        <hr>

        <!-- inserindo a tabela com a listagem de artigos usando o bootstrap-vue -->
        <!-- a propriedade :items carrega as linhas a partir do array passado -->
        <!-- a propriedade :fiels carrega os cabeçalhos a partir do array passado -->
        <b-table hover striped :items="articles" :fields="fields">

            <!-- criando o conteúdo da coluna de ações -->
            <template slot="actions" slot-scope="data">

                <!-- inserindo o botão de editar -->
                <!-- o atributo @click é responsável por escutar o evento de click padrão e executar o método loadArticle() -->
                <b-button variant="warning" @click="loadArticle(data.item)" class="mr-2">
                    
                    <!-- inserindo o ícone do botão -->
                    <i class="fa fa-pencil"></i>
                </b-button>

                <!-- inserindo o botão de excluir -->
                <!-- o atributo @click é responsável por escutar o evento de click padrão e executar o método loadArticle() com a variação de remove -->
                <b-button variant="danger" @click="loadArticle(data.item, 'remove')">
                    
                    <!-- inserindo o ícone do botão -->
                    <i class="fa fa-trash"></i>
                </b-button>
            </template>
        </b-table>

        <!-- inserindo o controle da paginação -->
        <!-- a propriedade v-model faz a ligação com o número da página -->
        <!-- a propriedade :total-rows carrega a quantidade de linhas totais definida no atributo count -->
        <!-- a propriedade :per-page carrega a quantidade de linhas por página definida no atributo limit -->
        <b-pagination size="md" v-model="page" :total-rows="count" :per-page="limit" />
    </div>
</template>

<script>
// trecho de código que representa o comportamento do componente

// importando as dependências
import { VueEditor } from "vue2-editor"; // componente de edição de texto
import { baseApiUrl, showError } from "@/global"; // importando a constante baseApiUrl e o método showError() presente no arquivo global.js
import axios from "axios"; // ferramenta para requisições http
import { mapState } from "vuex"; //responsável por mapear os atributos da store

export default {
  // definindo o atributo name
  name: "ArticleAdmin",

  // obtendo o valor dos atributos keyCategoriesReload e keyUsersReload da store
  computed: mapState(["keyCategoriesReload", "keyUsersReload"]),

  // definindo os componentes a serem utilizados
  components: { VueEditor },

  // função que retorna um objeto representando o estado do componente
  data: function() {
    return {
      // modo de exibição do formulário
      mode: "save",

      // estado inicial do artigo
      article: {},

      // array com a listagem de artigos para carregamento da tabela
      articles: [],

      // array com a listagem de categorias
      categories: [],

      // array com a listagem de usuários
      users: [],

      // número da página atual da listagem de artigos
      page: 1,

      // número de linhas por página da listagem de artigos
      limit: 0,

      // número de linhas totais da listagem de artigos
      count: 0,

      // cabeçalhos da tabela de listagem de artigos
      fields: [
        { key: "id", label: "Código", sortable: true },
        { key: "name", label: "Nome", sortable: true },
        { key: "description", label: "Descrição", sortable: true },
        { key: "actions", label: "Ações" },
      ],
    };
  },
  // definindo os métodos
  methods: {
    // método responsável por atualizar os dados do artigo no componente e formulário
    // atualiza também o modo de exibição do formulário (por padrão "save")
    loadArticle(article, mode = "save") {
      // atualizando o modo de exibição do formulário
      this.mode = mode;

      // realizando a requisição HTTP
      axios

        // na URL de consulta de artigos por id
        .get(`${baseApiUrl}/articles/${article.id}`)

        // em caso de sucesso atualiza os dados do artigo
        .then((res) => (this.article = res.data));

      // movendo o scroll para o topo da página
      window.scrollTo(0, 0);
    },
    // método responsável por limpar os dados do artigo no componente e formulário
    reset() {
      // atualizando o modo de exibição do formulário para o inicial
      this.mode = "save";

      // limpando os dados do artigo
      this.article = {};

      // recarregando a listagem de artigos
      // this.loadArticles();
    },
    // método responsável por criar ou atualizar o artigo via API
    save() {
      // se existir id, o método de requisição será put, senão será post
      const method = this.article.id ? "put" : "post";

      // se existir id, será incluído na URL
      const id = this.article.id ? `/${this.article.id}` : "";

      // realizando a requisição HTTP na URL definida
      axios[method](`${baseApiUrl}/articles${id}`, this.article)

        // em caso de sucesso:
        .then(() => {
          // exibindo mensagem de sucesso
          this.$toasted.global.defaultSuccess();

          // limpa os dados do artigo e do formulário
          this.reset();

          // recarregando a listagem de artigos
          this.loadArticles();
        })

        // em caso de erro, exibe a mensagem de erro
        .catch(showError);
    },
    // método responsável por excluir o artigo via API
    remove() {
      // definindo o id do artigo
      const id = this.article.id;

      // realizando a requisição HTTP:
      axios

        // na URL definida com o método delete
        .delete(`${baseApiUrl}/articles/${id}`)

        // em caso de sucesso:
        .then(() => {
          // exibindo mensagem de sucesso
          this.$toasted.global.defaultSuccess();

          // limpa os dados do artigo e do formulário
          this.reset();

          // recarregando a listagem de artigos
          this.loadArticles();
        })

        // em caso de erro, exibe a mensagem de erro
        .catch(showError);
    },
    // função responsável por consultar via API os artigos existentes e popular o array de artigos
    // utiliza recursos de paginação na URL
    loadArticles() {
      // definindo a URL a ser consultada, considerando a página atual
      const url = `${baseApiUrl}/articles?page=${this.page}`;

      // realizando a requisição HTTP
      axios

        // na URL definida
        .get(url)

        // em caso de sucesso:
        .then((res) => {
          // popula o array de artigos
          this.articles = res.data.data;

          // popula o número total de artigos
          this.count = res.data.count;

          // popula o limite de de artigos por página
          this.limit = res.data.limit;
        });
    },
    // função responsável por consultar via API as categorias existentes e popular o array de categorias
    loadCategories() {
      // definindo a URL a ser consultada
      const url = `${baseApiUrl}/categories`;

      // definindo a opção default para exibição no select
      const defaultOption = [
        {
          value: undefined,
          text: "Selecione uma Categoria...",
        },
      ];

      // inicializando o array de categorias vazio
      let categoriesList = [];

      // realizando a requisição HTTP
      axios

        // na URL definida
        .get(url)

        // em caso de sucesso, popula o array de categorias
        .then((res) => {
          categoriesList = res.data.map((category) => {
            return { value: category.id, text: category.path };
          });
          // montando o array de categorias com a opção default para carregamento no select
          this.categories = defaultOption.concat(categoriesList);
        });
    },

    // função responsável por consultar via API os usuários existentes e popular o array de usuários
    loadUsers() {
      // definindo a URL a ser consultada
      const url = `${baseApiUrl}/users`;

      // definindo a opção default para exibição no select
      const defaultOption = [
        {
          value: undefined,
          text: "Selecione um Autor...",
        },
      ];

      // inicializando o array de usuários vazio
      let usersList = [];

      // realizando a requisição HTTP
      axios

        // na URL definida
        .get(url)

        // em caso de sucesso, popula o array de usuários
        .then((res) => {
          usersList = res.data.map((user) => {
            return { value: user.id, text: `${user.name} - ${user.email}` };
          });

          // montando o array de usuários com a opção default para carregamento no select
          this.users = defaultOption.concat(usersList);
        });
    },
  },
  // lista de observers
  watch: {
    // quando o valor do atributo page alterar:
    page() {
      // recarregando a listagem de artigos
      this.loadArticles();
    },
    // quando o valor do atributo keyCategoriesReload alterar:
    keyCategoriesReload() {
      // recarregando as listagens de categorias
      this.loadCategories();
    },
    // quando o valor do atributo keyUsersReload alterar:
    keyUsersReload() {
      // recarregando as listagens de categorias
      this.loadUsers();
    },
  },
  // função de ciclo de vida, chamada quando o componente é montado
  mounted() {
    // carrega a listagem de artigos
    this.loadArticles();

    // carrega o array de categorias
    this.loadCategories();

    // carrega o array de usuários
    this.loadUsers();
  },
};
</script>

<style>
/* trecho de código que representa o css do componente */
</style>
