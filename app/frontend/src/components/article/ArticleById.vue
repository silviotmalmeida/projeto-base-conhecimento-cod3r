<template>
    <!-- trecho de código que representa o html do componente -->
    <!-- definindo o componente ArticleById -->  
    <div class="article-by-id">

        <!-- inserindo o título da página com componente PageTitle -->
        <PageTitle icon="fa fa-file-o" :main="article.name" :sub="article.description" />
        
        <!-- inserindo o conteudo do artigo -->
        <!-- a diretiva v-html faz o conteúdo do artigo ser apresentado de forma correta-->
        <div class="article-content" v-html="article.content"></div>
    </div>
</template>

<script>
// trecho de código que representa o comportamento do componente

// importando as dependências
import "highlightjs/styles/dracula.css"; // importando o css da bliblioteca de highlight de código-fonte
import hljs from "highlightjs/highlight.pack.js"; // // importando o js da bliblioteca de highlight de código-fonte
import { baseApiUrl } from "@/global"; // importando a constante baseApiUrl presente no arquivo global.js
import axios from "axios"; // ferramenta para requisições http
import PageTitle from "../template/PageTitle"; // componente de título da página

export default {
  // definindo o atributo name
  name: "ArticleById",

  // definindo os componentes a serem utilizados
  components: { PageTitle },

  // função que retorna um objeto representando o estado do componente
  data: function() {
    return {
      // estado inicial da categoria
      article: {},
    };
  },
  // função de ciclo de vida, chamada quando o componente é montado
  mounted() {
    // definindo a URL a ser consultada, considerando o id do artigo presente na rota
    const url = `${baseApiUrl}/articles/${this.$route.params.id}`;

    // realizando a requisição HTTP
    axios

      // na URL definida
      .get(url)

      // em caso de sucesso, carrega os dados do artigo
      .then((res) => (this.article = res.data));
  },
  // função de ciclo de vida, chamada quando o componente é atualizado
  updated() {
    // aplicando o highlight dentro dos objetos de código-fonte
    document.querySelectorAll(".article-content pre.ql-syntax").forEach((e) => {
      hljs.highlightBlock(e);
    });
  },
};
</script>

<style>
/* trecho de código que representa o css do componente */

.article-content {
  /* cor de fundo */
  background-color: #fff;

  /* raio da borda circular */
  border-radius: 8px;

  /* espaçamento interno */
  padding: 25px;
}

/* estilo para apresentação dos códigos-fonte */
.article-content pre {
  /* espaçamento interno */
  padding: 20px;

  /* raio da borda circular */
  border-radius: 8px;

  /* tamanho do texto */
  font-size: 1.2rem;

  /* cor de fundo */
  background-color: #1e1e1e;

  /* cor do texto */
  color: #fff;
}

/* estilo para apresentação das imagens */
.article-content img {
  /* tamanho máximohorizontal */
  max-width: 100%;
}

/* estilo para apresentação do último elemento */
.article-content :last-child {
  /* espaçamento externo inferior */
  margin-bottom: 0px;
}
</style>
