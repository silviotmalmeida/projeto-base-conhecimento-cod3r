<template>
    <!-- trecho de código que representa o html do componente -->
    <!-- definindo o componente Loading -->  
    <div class="loading">

        <!-- inserindo o gif de caregamento -->
        <img src="@/assets/loading.gif" alt="Loading">
    </div>
</template>

<script>
// trecho de código que representa o comportamento do componente

export default {
  // definindo o atributo name
  name: "Loading",
};
</script>

<style>
/* trecho de código que representa o css do componente */

.loading {
  /* definindo o nome do componente no css-grid */
  grid-area: content;

  /* utilizando flexbox dentro do componente */
  display: flex;

  /* centralizando horizontalmente os componentes internos */
  justify-content: center;

  /* centralizando verticalmente os componentes internos */
  align-items: center;
}
</style>
