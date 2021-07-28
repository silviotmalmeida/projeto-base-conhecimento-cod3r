<template>
  <!-- trecho de código que representa o html do componente -->
  <!-- definindo o componente Content -->  
    <div class="content">

        <!-- inserindo o componente router com as definições de rotas -->
        <router-view></router-view>
    </div>
</template>

<script>
// trecho de código que representa o comportamento do componente

export default {
  // definindo o atributo name
  name: "Content",
};
</script>

<style>
/* trecho de código que representa o css do componente */

.content {
  /* definindo o nome do componente no css-grid */
  grid-area: content;

  /* cor de fundo */
  background-color: #efefef;

  /* espaçamento interno geral do componente */
  padding: 20px;
}
</style>
