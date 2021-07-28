<template>
    <!-- trecho de código que representa o html do componente -->
    <!-- definindo o componente Home -->  
    <div class="home">

        <!-- inserindo o título da página com componente PageTitle -->
        <PageTitle icon="fa fa-home" main="Dashboard"
            sub="Base de Conhecimento" />

        <!-- inserindo a área das estatísticas -->
        <div class="stats">

            <!-- inserindo o componente Stat para categorias -->
            <Stat title="Categorias" :value="stat.categories"
                icon="fa fa-folder" color="#d54d50" />

            <!-- inserindo o componente Stat para artigos -->
            <Stat title="Artigos" :value="stat.articles"
                icon="fa fa-file" color="#3bc480" />

            <!-- inserindo o componente Stat para usuários -->
            <Stat title="Usuários" :value="stat.users"
                icon="fa fa-user" color="#3282cd" />
        </div>
    </div>
</template>

<script>
// trecho de código que representa o comportamento do componente

// importando as dependências
import PageTitle from "../template/PageTitle"; // componente de título da página
import Stat from "./Stat"; // componente de estatísticas
import axios from "axios"; // ferramenta para requisições http
import { baseApiUrl } from "@/global"; // importando a constante baseApiUrl presente no arquivo global.js

export default {
  // definindo o atributo name
  name: "Home",

  // definindo os componentes a serem utilizados
  components: { PageTitle, Stat },

  // função que retorna um objeto representando o estado do componente
  data: function() {
    return {
      // estado inicial do componente é vazio
      stat: {},
    };
  },

  // definindo os métodos
  methods: {
    // função responsável por consultar as estatísticas na API
    getStats() {
      // iniciando a requisição http
      axios
        // consultando a URL /stats na API
        .get(`${baseApiUrl}/stats`)

        // em caso de sucesso, popula o estado do componente
        .then((res) => (this.stat = res.data));
    },
  },

  // função de ciclo de vida, chamada quando o compoenten é montado
  mounted() {
    // consulta as estatísticas na API
    this.getStats();
  },
};
</script>

<style>
/* trecho de código que representa o css do componente */

.stats {
  /* utilizando flexbox dentro do menu oculto */
  display: flex;

  /* distribui os elementos internos de forma uniforme na linha */
  justify-content: space-between;

  /* permite quebra de linha */
  flex-wrap: wrap;
}
</style>
