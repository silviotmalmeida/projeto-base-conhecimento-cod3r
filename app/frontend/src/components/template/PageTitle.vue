<template>
    <!-- trecho de código que representa o html do componente -->
    <!-- definindo o componente PageTitle -->  
    <div class="page-title">
        
        <!-- inserindo o ícone e título da página -->        
        <h1>
            <!-- o ícone só será renderizado se o atributo icon for não nulo -->
            <i v-if="icon" :class="icon"></i> {{ main }}</h1>

        <!-- inserindo subtítulo da página --> 
        <h2>{{ sub }}</h2>

        <!-- inserindo uma linha horizontal -->
        <hr>
    </div>
</template>

<script>
// trecho de código que representa o comportamento do componente

export default {
  // definindo o atributo name
  name: "PageTitle",

  // definindo as propriedades a serem recebidas na criação do componente
  props: ["icon", "main", "sub"],
};
</script>

<style>
/* trecho de código que representa o css do componente */

.page-title h1 {
  /* espaçamento externo */
  margin: 0px;
}

.page-title h2 {
  /* cor do texto */
  color: #777;

  /* espaçamento externo superior */
  margin-top: 5px;

  /* tamanho do texto */
  font-size: 1.3rem;
}
</style>
