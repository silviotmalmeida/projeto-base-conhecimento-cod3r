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


                <b-form-select id="article-userId"
                    :options="users" v-model="article.userId" />
            </b-form-group>
            <b-form-group v-if="mode === 'save'"
                label="Conteúdo" label-for="article-content">
                <VueEditor v-model="article.content"
                    placeholder="Informe o Conteúdo do Artigo..." />
            </b-form-group>
            <b-button variant="primary" v-if="mode === 'save'"
                @click="save">Salvar</b-button>
            <b-button variant="danger" v-if="mode === 'remove'"
                @click="remove">Excluir</b-button>
            <b-button class="ml-2" @click="reset">Cancelar</b-button>
        </b-form>
        <hr>
        <b-table hover striped :items="articles" :fields="fields">
            <template slot="actions" slot-scope="data">
                <b-button variant="warning" @click="loadArticle(data.item)" class="mr-2">
                    <i class="fa fa-pencil"></i>
                </b-button>
                <b-button variant="danger" @click="loadArticle(data.item, 'remove')">
                    <i class="fa fa-trash"></i>
                </b-button>
            </template>
        </b-table>
        <b-pagination size="md" v-model="page" :total-rows="count" :per-page="limit" />
    </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import { baseApiUrl, showError } from "@/global";
import axios from "axios";

export default {
  name: "ArticleAdmin",
  components: { VueEditor },
  data: function() {
    return {
      mode: "save",
      article: {},
      articles: [],
      categories: [],
      users: [],
      page: 1,
      limit: 0,
      count: 0,
      fields: [
        { key: "id", label: "Código", sortable: true },
        { key: "name", label: "Nome", sortable: true },
        { key: "description", label: "Descrição", sortable: true },
        { key: "actions", label: "Ações" },
      ],
    };
  },
  methods: {
    loadArticles() {
      const url = `${baseApiUrl}/articles?page=${this.page}`;
      axios.get(url).then((res) => {
        this.articles = res.data.data;
        this.count = res.data.count;
        this.limit = res.data.limit;
      });
    },
    reset() {
      this.mode = "save";
      this.article = {};
      this.loadArticles();
    },
    save() {
      const method = this.article.id ? "put" : "post";
      const id = this.article.id ? `/${this.article.id}` : "";
      axios[method](`${baseApiUrl}/articles${id}`, this.article)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    remove() {
      const id = this.article.id;
      axios
        .delete(`${baseApiUrl}/articles/${id}`)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    loadArticle(article, mode = "save") {
      this.mode = mode;
      axios
        .get(`${baseApiUrl}/articles/${article.id}`)
        .then((res) => (this.article = res.data));
    },
    loadCategories() {
      const url = `${baseApiUrl}/categories`;
      const defaultOption = [
        {
          value: null,
          text: "Informe a Categoria...",
        },
      ];
      let categoriesList = {};

      axios.get(url).then((res) => {
        categoriesList = res.data.map((category) => {
          return { value: category.id, text: category.path };
        });

        this.categories = defaultOption.concat(categoriesList);

        console.log(this.categories);
      });
    },
    loadUsers() {
      const url = `${baseApiUrl}/users`;
      axios.get(url).then((res) => {
        this.users = res.data.map((user) => {
          return { value: user.id, text: `${user.name} - ${user.email}` };
        });
      });
    },
  },
  watch: {
    page() {
      this.loadArticles();
    },
  },
  mounted() {
    this.loadUsers();
    this.loadCategories();

    this.loadArticles();
  },
};
</script>

<style>
</style>
