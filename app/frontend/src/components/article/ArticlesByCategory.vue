<template>
    <!-- trecho de código que representa o html do componente -->
    <!-- definindo o componente ArticlesByCategory -->  
    <div class="articles-by-category">

        <!-- inserindo o título da página com componente PageTitle -->
        <PageTitle icon="fa fa-folder-o"
            :main="category.name" sub="Categoria" />

        <!-- inserindo a lista de artigos -->
        <ul>

            <!-- inserindo os itens da lista -->
            <!-- iterando sobre o array de artigos -->
            <li v-for="article in articles" :key="article.id">

                <!-- inserindo o artigo com o componente ArticleItem -->
                <ArticleItem :article="article" />
            </li>
        </ul>

        <!-- inserindo div para o botão de Carregar Mais Artigos -->
        <div class="load-more">

            <!-- inserindo o botão -->
            <!-- será renderizado somente se o atributo loadMore seja 'true' -->
            <!-- o atributo @click é responsável por escutar o evento de click padrão e executar o método getArticles() -->
            <button v-if="loadMore"
                class="btn btn-lg btn-outline-primary"
                @click="getArticles">Carregar Mais Artigos</button>
        </div>
    </div>
</template>

<script>
// trecho de código que representa o comportamento do componente

// importando as dependências
import { baseApiUrl } from "@/global"; // importando a constante baseApiUrl presente no arquivo global.js
import axios from "axios"; // ferramenta para requisições http
import PageTitle from "../template/PageTitle"; // componente de título da página
import ArticleItem from "./ArticleItem"; // componente de artigo

export default {
  // definindo o atributo name
  name: "ArticlesByCategory",

  // definindo os componentes a serem utilizados
  components: { PageTitle, ArticleItem },

  // função que retorna um objeto representando o estado do componente
  data: function() {
    return {
      // estado inicial da categoria
      category: {},

      // array com a listagem de artigos
      articles: [],

      // número da página atual da listagem de artigo
      page: 1,

      // atributo que habilita o botão "Carregar Mais Itens"
      loadMore: true,
    };
  },
  // definindo os métodos
  methods: {
    // método responsável por carregar os dados da categoria
    getCategory() {
      // definindo a URL a ser consultada, considerando o id da categoria
      const url = `${baseApiUrl}/categories/${this.category.id}`;

      // realizando a requisição HTTP na URL definida
      axios(url)
        // em caso de sucesso, carrega os dados da categoria
        .then((res) => (this.category = res.data));
    },
    // método responsável por carregar os artigos da categoria
    getArticles() {
      // definindo a URL a ser consultada, considerando o id da categoria e o número da página
      const url = `${baseApiUrl}/categories/${this.category.id}/articles?page=${
        this.page
      }`;

      // realizando a requisição HTTP na URL definida
      axios(url)
        // em caso de sucesso:
        .then((res) => {
          // incrementa o array de artigos
          this.articles = this.articles.concat(res.data);

          // incrementa o número da página
          this.page++;

          // caso a resposta tenha sido vazia, considera-se que não há mais artigos e atribui false à loadMore
          if (res.data.length === 0) this.loadMore = false;
        });
    },
  },
  // lista de observers
  watch: {
    // em caso de alteração na rota
    $route(to) {
      // obtendo o id da categoria a partir da rota
      this.category.id = to.params.id;

      // limpa a lista de artigos
      this.articles = [];

      // definindo a página inicial da lista
      this.page = 1;

      // habilitando a exibição do botão de "Carregar Mais Itens"
      this.loadMore = true;

      // carregando os dados da categoria
      this.getCategory();

      // carregando a primeira página de artigos da categoria
      this.getArticles();
    },
  },
  // função de ciclo de vida, chamada quando o componente é montado
  mounted() {
    // obtendo o id da categoria a partir da rota
    this.category.id = this.$route.params.id;

    // carregando os dados da categoria
    this.getCategory();

    // carregando a primeira página de artigos da categoria
    this.getArticles();
  },
};
</script>

<style>
/* trecho de código que representa o css do componente */

.articles-by-category ul {
  /* removendo o estilo default da lista */
  list-style-type: none;

  /* removendo o espaçamento interno */
  padding: 0px;
}

.articles-by-category .load-more {
  /* utilizando flexbox dentro do componente */
  display: flex;

  /* alterando o eixo principal para coluna */
  flex-direction: column;

  /* centralizando horizontalmente os componentes internos */
  align-items: center;

  /* espaçamento externo superior */
  margin-top: 25px;
}
</style>
