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
        <Tree :data="treeData" :options="treeOptions"
            :filter="treeFilter" ref="tree" />
    </aside>
</template>

<script>
// trecho de código que representa o comportamento do componente

// importando as dependências
import { mapState } from "vuex"; //responsável por mapear os atributos da store
import Tree from "liquor-tree";
import { baseApiUrl } from "@/global";
import axios from "axios";

export default {
  // definindo o atributo name
  name: "Menu",

  // definindo os componentes a serem utilizados
  components: { Tree },

  // obtendo o valor do atributo isMenuVisible da store
  computed: mapState(["isMenuVisible"]),
  data: function() {
    return {
      treeFilter: "",
      treeData: this.getTreeData(),
      treeOptions: {
        propertyNames: { text: "name" },
        filter: { emptyText: "Categoria não encontrada" },
      },
    };
  },
  methods: {
    getTreeData() {
      const url = `${baseApiUrl}/categories/tree`;
      return axios.get(url).then((res) => res.data);
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
  mounted() {
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
  color: #fff;
  text-decoration: none;
}

.menu .tree-node.selected > .tree-content,
.menu .tree-node .tree-content:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.tree-arrow.has-child {
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
