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
  grid-area: footer;
  background-color: #ddd;
  color: #333;

  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 10px;
}
</style>
