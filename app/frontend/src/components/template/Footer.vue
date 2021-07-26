<template>
  <!-- trecho de código que representa o html do componente -->
  <!-- definindo o componente Footer -->  
    <footer class="footer">

        <!-- inserindo a mensagem a ser exibida no rodapé da página -->
        <span>Copyright <strong>Cod3r</strong> © 2015-2018</span>
    </footer>
</template>

<script>
// trecho de código que representa o comportamento do componente

export default {
  // definindo o atributo name
  name: "Footer",
};
</script>

<style>
/* trecho de código que representa o css do componente */

.footer {
  /* definindo o nome do componente no css-grid */
  grid-area: footer;

  /* cor de fundo */
  background-color: #ddd;

  /* cor da fonte */
  color: #333;

  /* utilizando flexbox dentro do componente */
  display: flex;

  /* centralizando verticalmente os componentes internos */
  align-items: center;

  /* alinhando horizontalmente à direita os componentes internos */
  justify-content: flex-end;

  /* espaçamento interno à direita do componente */
  padding-right: 10px;
}
</style>
