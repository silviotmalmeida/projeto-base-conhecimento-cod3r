<template>
    <!-- trecho de código que representa o html do componente -->
    <!-- definindo o componente Menu -->
    <!-- só será renderizado se o atributo isMenuVisible for true -->
    <aside class="menu" v-show="isMenuVisible">

        <!-- inserindo o formulário de filtro do menu -->
        <div class="menu-filter">

            <!-- inserindo o ícone -->
            <i class="fa fa-search fa-lg"></i>

            <!-- inserindo o formulário -->
            <input type="text" placeholder="Digite para filtrar..."
                v-model="treeFilter" class="filter-field">
        </div>

        <!-- inserindo o componente da árvore de categorias-->
        <!-- a propriedade :data carrega os dados da árvore -->
        <!-- a propriedade :options carrega as opções de configuração da árvore -->
        <!-- a propriedade :filter carrega o filtro a ser aplicado na árvore -->
        <!-- a propriedade ref indica um alias para os métodos referenciarem a árvore -->
        <Tree :data="treeData" :options="treeOptions"
            :filter="treeFilter" ref="tree" />
    </aside>
</template>

<script>
// trecho de código que representa o comportamento do componente

// importando as dependências
import { mapState } from "vuex"; // responsável por mapear os atributos da store
import Tree from "liquor-tree"; // responsável por desenhar a árvore de categorias
import { baseApiUrl } from "@/global"; // importando a constante baseApiUrl presente no arquivo global.js
import axios from "axios"; // ferramenta para requisições http

export default {
  // definindo o atributo name
  name: "Menu",

  // definindo os componentes a serem utilizados
  components: { Tree },

  // obtendo o valor do atributo isMenuVisible da store
  computed: mapState(["isMenuVisible"]),

  // função que retorna um objeto representando o estado do componente
  data: function() {
    return {
      // valor do filtro a ser aplicado na árvore
      treeFilter: "",

      // chamada para a função que retornará a árvore
      treeData: this.getTreeData(),

      // opções da árvore
      treeOptions: {
        // definindo o nome da propriedade que será utilizada como label dos nós da árvore
        propertyNames: { text: "name" },

        // definindo o texto a ser exibido quando o resultado da filtragem for vazio
        filter: { emptyText: "Categoria não encontrada" },
      },
    };
  },
  // definindo os métodos
  methods: {
    // função responsável por obter a árvore de categorias
    getTreeData() {
      // definindo a URL
      const url = `${baseApiUrl}/categories/tree`;

      // realizando a requisição HTTP
      return (
        axios

          // na URL definida
          .get(url)

          // em caso de sucesso, retorna a árvore de categorias
          .then((res) => res.data)
      );
    },

    onNodeSelect(node) {
      this.$router.push({
        name: "articlesByCategory",
        params: { id: node.id },
      });

      if (this.$mq === "xs" || this.$mq === "sm") {
        this.$store.commit("toggleMenu", false);
      }
    },
  },
  // função de ciclo de vida, chamada quando o componente é montado
  mounted() {

    // ....
    this.$refs.tree.$on("node:selected", this.onNodeSelect);
  },
};
</script>

<style>
/* trecho de código que representa o css do componente */

.menu {
  /* definindo o nome do componente no css-grid */
  grid-area: menu;

  /* gradiente na cor de fundo */
  background: linear-gradient(to right, #232526, #414345);

  /* utilizando flexbox dentro do componente */
  display: flex;

  /* alterando o eixo principal para coluna */
  flex-direction: column;

  /* permitindo quebras de linha */
  flex-wrap: wrap;
}

.menu a,
.menu a:hover {

  /* cor do texto */
  color: #fff;

  /* removendo a formatação default do link */
  text-decoration: none;
}

.menu .tree-node.selected > .tree-content,
.menu .tree-node .tree-content:hover {

  /* cor de fundo */
  background-color: rgba(255, 255, 255, 0.2);
}

.tree-arrow.has-child {

  /* .... */
  filter: brightness(2);
}

.menu .menu-filter {
  display: flex;
  justify-content: center;
  align-items: center;

  margin: 20px;
  padding-bottom: 8px;
  border-bottom: 1px solid #aaa;
}

.menu .menu-filter i {
  color: #aaa;
  margin-right: 10px;
}

.menu input {
  color: #ccc;
  font-size: 1.3rem;
  border: 0;
  outline: 0;
  width: 100%;
  background: transparent;
}

.tree-filter-empty {
  color: #ccc;
  font-size: 1.3rem;
  margin-left: 20px;
}
</style>
