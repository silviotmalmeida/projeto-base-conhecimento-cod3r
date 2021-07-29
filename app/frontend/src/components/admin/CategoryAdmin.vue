<template>
    <!-- trecho de código que representa o html do componente -->
    <!-- definindo o componente CategoryAdmin -->  
    <div class="category-admin">

        <!-- inserindo o formulário usando o bootstrap-vue -->
        <b-form>
            
            <!-- inserindo o input oculto com o id -->
            <!-- a propriedade v-model faz a ligação com o objeto -->
            <input id="category-id" type="hidden" v-model="category.id" />

            <!-- inserindo o form-group para o dado de nome usando o bootstrap-vue -->
            <b-form-group label="Nome:" label-for="category-name">

                <!-- inserindo o input para o dado de nome usando o bootstrap-vue  -->
                <!-- a propriedade v-model faz a ligação com o objeto -->
                <!-- preenchimento obrigatório -->
                <!-- a propriedade :readonly será ativada caso o atributo mode seja 'remove' -->
                <b-form-input id="category-name" type="text"
                    v-model="category.name" required
                    :readonly="mode === 'remove'"
                    placeholder="Informe o Nome da Categoria..." />
            </b-form-group>

            <!-- inserindo o form-group para o dado de categoria pai usando o bootstrap-vue -->
            <!-- será renderizado somente se o atributo mode seja 'save' -->            
            <b-form-group label="Categoria Pai:" label-for="category-parentId" v-if="mode === 'save'">

                <!-- inserindo o select para o dado de categoria pai usando o bootstrap-vue  -->
                <!-- a propriedade :options carrega as opções a partir do array passado -->
                <!-- a propriedade v-model faz a ligação com o objeto -->
                <b-form-select id="category-parentId"
                    :options="categories" v-model="category.parentId" />                
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

        <!-- inserindo a tabela com a listagem de categorias usando o bootstrap-vue -->
        <!-- a propriedade :items carrega as linhas a partir do array passado -->
        <!-- a propriedade :fiels carrega os cabeçalhos a partir do array passado -->
        <b-table hover striped :items="categories" :fields="fields">

            <!-- criando o conteúdo da coluna de ações -->
            <template slot="actions" slot-scope="data">

                <!-- inserindo o botão de editar -->
                <!-- o atributo @click é responsável por escutar o evento de click padrão e executar o método loadArticle() -->
                <b-button variant="warning" @click="loadCategory(data.item)" class="mr-2">
                    
                    <!-- inserindo o ícone do botão -->
                    <i class="fa fa-pencil"></i>
                </b-button>

                <!-- inserindo o botão de excluir -->
                <!-- o atributo @click é responsável por escutar o evento de click padrão e executar o método loadArticle() com a variação de remove -->
                <b-button variant="danger" @click="loadCategory(data.item, 'remove')">
                    
                    <!-- inserindo o ícone do botão -->
                    <i class="fa fa-trash"></i>
                </b-button>
            </template>
        </b-table>
    </div>
</template>

<script>
import { baseApiUrl, showError } from "@/global";
import axios from "axios";

export default {
  name: "CategoryAdmin",
  data: function() {
    return {
      mode: "save",
      category: {},
      categories: [],
      fields: [
        { key: "id", label: "Código", sortable: true },
        { key: "name", label: "Nome", sortable: true },
        { key: "path", label: "Caminho", sortable: true },
        { key: "actions", label: "Ações" },
      ],
    };
  },
  methods: {
    loadCategories() {
      const url = `${baseApiUrl}/categories`;
      axios.get(url).then((res) => {
        // this.categories = res.data
        this.categories = res.data.map((category) => {
          return { ...category, value: category.id, text: category.path };
        });
      });
    },
    reset() {
      this.mode = "save";
      this.category = {};
      this.loadCategories();
    },
    save() {
      const method = this.category.id ? "put" : "post";
      const id = this.category.id ? `/${this.category.id}` : "";
      axios[method](`${baseApiUrl}/categories${id}`, this.category)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    remove() {
      const id = this.category.id;
      axios
        .delete(`${baseApiUrl}/categories/${id}`)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    loadCategory(category, mode = "save") {
      this.mode = mode;
      this.category = { ...category };
    },
  },
  mounted() {
    this.loadCategories();
  },
};
</script>

<style>
</style>
