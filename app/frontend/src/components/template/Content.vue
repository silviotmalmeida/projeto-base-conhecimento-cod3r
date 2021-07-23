<template>
  <!-- trecho de código que representa o html do componente -->
  <!-- definindo o componente Content -->  
    <div class="content">

        <!-- inserindo o componente router -->
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
  grid-area: content;
  background-color: #efefef;
  padding: 20px;
}
</style>
