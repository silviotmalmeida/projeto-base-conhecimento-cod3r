<template>
    <!-- trecho de código que representa o html do componente -->
    <!-- definindo o componente Menu -->
    <!-- só será renderizado se o atributo isMenuVisible for true -->
    <aside class="menu" v-show="isMenuVisible">

        <!-- inserindo o formulário de filtro do menu -->
        <div class="menu-filter">

            <!-- inserindo o ícone -->
            <i class="fa fa-search fa-lg"></i>

            <!-- inserindo o formulário de filtro -->
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
        // definindo o nome da propriedade que será utilizada como label dos nós da árvore (name)
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

          // em caso de sucesso, retorna uma Promise para a árvore de categorias
          .then((res) => res.data)
      );
    },
    // método responsável pela navegação do menu
    // recebe como parâmetro um dos nós da árvore
    onNodeSelect(node) {
      // redireciona a URL para a página com os artigos por categoria
      // usa o nome da rota definido no router e o id da categoria/nó recebido por parâmetro
      this.$router.push({
        name: "articlesByCategory",
        params: { id: node.id },
      });

      // deselecionando o nó para permitir reclick
      node.unselect();

      // se o dispositivo for extra-pequeno ou pequeno:
      if (this.$mq === "xs" || this.$mq === "sm") {
        // utiliza o método toogleMenu() da store para ocultar o menu
        this.$store.commit("toggleMenu", false);
      }
    },
  },
  // função de ciclo de vida, chamada quando o componente é montado
  mounted() {
    // monitora o evento de seleção de algum nó da árvore e dispara o método onNodeSelect()
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
  /* cor de fundo no nó selecionado e em hover */
  background-color: rgba(255, 255, 255, 0.2);
}

.tree-arrow.has-child {
  /* aplicando filtro */
  filter: brightness(2);
}

.menu .menu-filter {
  /* utilizando flexbox dentro do componente */
  display: flex;

  /* centralizando horizontalmente os componentes internos */
  justify-content: center;

  /* centralizando verticalmente os componentes internos */
  align-items: center;

  /* espaçamento externo */
  margin: 20px;

  /* espaçamento interno inferior */
  padding-bottom: 8px;

  /* borda inferior */
  border-bottom: 1px solid #aaa;
}

.menu .menu-filter i {
  /* cor do texto */
  color: #aaa;

  /* margem direita */
  margin-right: 10px;
}

.menu input {
  /* cor do texto */
  color: #ccc;

  /* tamanho do texto */
  font-size: 1.3rem;

  /* retirando a borda default */
  border: 0;

  /* retirando o outline default */
  outline: none;

  /* comprimento */
  width: 100%;

  /* estilo do fundo */
  background: transparent;
}

.tree-filter-empty {
  /* cor de texto */
  color: #ccc;

  /* tamanho do texto */
  font-size: 1.3rem;

  /* margem esquerda */
  margin-left: 20px;
}
</style>
