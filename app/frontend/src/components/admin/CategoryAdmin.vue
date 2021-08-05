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

                <!-- inserindo o selectbox para o dado de categoria pai usando o bootstrap-vue  -->
                <!-- a propriedade :options carrega as opções a partir do array passado -->
                <!-- a propriedade v-model faz a ligação com o objeto -->
                <b-form-select id="category-parentId"
                    :options="categoriesOptions" v-model="category.parentId" />                
            </b-form-group>

            <!-- inserindo o form-group para o dado de caminho usando o bootstrap-vue -->
            <!-- será renderizado somente se o atributo mode seja diferente de 'save' -->            
            <b-form-group label="Caminho:" label-for="category-path" v-else>

                <!-- inserindo o input para o dado de caminho usando o bootstrap-vue  -->
                <!-- a propriedade v-model faz a ligação com o objeto -->
                <!-- somente leitura -->
                <b-form-input id="category-path" type="text"
                    v-model="category.path"
                    readonly />              
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
                <!-- o atributo @click é responsável por escutar o evento de click padrão e executar o método loadCategory() -->
                <b-button variant="warning" @click="loadCategory(data.item)" class="mr-2">
                    
                    <!-- inserindo o ícone do botão -->
                    <i class="fa fa-pencil"></i>
                </b-button>

                <!-- inserindo o botão de excluir -->
                <!-- o atributo @click é responsável por escutar o evento de click padrão e executar o método loadCategory() com a variação de remove -->
                <b-button variant="danger" @click="loadCategory(data.item, 'remove')">
                    
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
  name: "CategoryAdmin",

  // função que retorna um objeto representando o estado do componente
  data: function() {
    return {
      // modo de exibição do formulário
      mode: "save",

      // estado inicial da categoria
      category: {},

      // array com a listagem de categorias para carregamento da tabela
      categories: [],

      // array com a listagem de categorias formatadas para carregamento do selectbox
      categoriesOptions: [],

      // cabeçalhos da tabela de listagem de categorias
      fields: [
        { key: "id", label: "Código", sortable: true },
        { key: "name", label: "Nome", sortable: true },
        { key: "path", label: "Caminho", sortable: true },
        { key: "actions", label: "Ações" },
      ],
    };
  },
  // definindo os métodos
  methods: {
    // método responsável por atualizar os dados da categoria no componente e formulário
    // atualiza também o modo de exibição do formulário (por padrão "save")
    loadCategory(category, mode = "save") {
      // atualizando o modo de exibição do formulário
      this.mode = mode;

      // atualiza os dados da categoria
      this.category = { ...category };

      // movendo o scroll para o topo da página
      window.scrollTo(0, 0);
    },
    // método responsável por limpar os dados da categoria no componente e formulário
    reset() {
      // atualizando o modo de exibição do formulário para o inicial
      this.mode = "save";

      // limpando os dados da categoria
      this.category = {};

      // recarregando a listagem de categorias
      this.loadCategories();
    },
    // método responsável por criar ou atualizar a categoria via API
    save() {
      // se existir id, o método de requisição será put, senão será post
      const method = this.category.id ? "put" : "post";

      // se existir id, será incluído na URL
      const id = this.category.id ? `/${this.category.id}` : "";

      // realizando a requisição HTTP na URL definida
      axios[method](`${baseApiUrl}/categories${id}`, this.category)

        // em caso de sucesso:
        .then(() => {
          // exibindo mensagem de sucesso
          this.$toasted.global.defaultSuccess();

          // limpa os dados da categoria e do formulário
          this.reset();

          // recarrega a página para atualizar o menu
          window.location.reload();
        })

        // em caso de erro, exibe a mensagem de erro
        .catch(showError);
    },
    // método responsável por excluir a categoria via API
    remove() {
      // definindo o id da categoria
      const id = this.category.id;

      // realizando a requisição HTTP:
      axios

        // na URL definida com o método delete
        .delete(`${baseApiUrl}/categories/${id}`)

        // em caso de sucesso:
        .then(() => {
          // exibindo mensagem de sucesso
          this.$toasted.global.defaultSuccess();

          // limpa os dados da categoria e do formulário
          this.reset();

          // recarrega a página para atualizar o menu
          window.location.reload();
        })

        // em caso de erro, exibe a mensagem de erro
        .catch(showError);
    },
    // função responsável por consultar via API as categorias existentes e popular os arrays de categorias para listagem na tabela e selectbox
    loadCategories() {
      // definindo a URL a ser consultada
      const url = `${baseApiUrl}/categories`;

      // definindo a opção default para exibição no selectbox
      const defaultOption = [
        {
          value: undefined,
          text: "Selecione uma Categoria Pai...",
        },
        {
          value: null,
          text: "",
        },
      ];

      // inicializando o array de categorias vazio
      let categoriesList = [];

      // realizando a requisição HTTP
      axios

        // na URL definida
        .get(url)

        // em caso de sucesso:
        .then((res) => {
          // popula o array de categorias para listagem na tabela
          this.categories = res.data;

          // montando o array de categorias para listagem na no selectbox
          categoriesList = res.data.map((category) => {
            return { value: category.id, text: category.name };
          });

          // montando o array de categorias com a opção default para carregamento no selectbox
          this.categoriesOptions = defaultOption.concat(categoriesList);
        });
    },
  },
  // função de ciclo de vida, chamada quando o componente é montado
  mounted() {
    // carrega os arrays de categorias
    this.loadCategories();
  },
};
</script>

<style>
/* trecho de código que representa o css do componente */
</style>
