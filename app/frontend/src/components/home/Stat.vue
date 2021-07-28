<template>
    <!-- trecho de código que representa o html do componente -->
    <!-- definindo o componente Stat -->  
    <div class="stat">

        <!-- inserindo o ícone -->
        <div class="stat-icon">
            <i :class="icon" :style="style"></i>
        </div>

        <!-- inserindo as informações -->
        <div class="stat-info">

            <!-- inserindo o título -->
            <span class="stat-title">{{ title }}</span>

            <!-- inserindo o valor -->
            <span class="stat-value">{{ value }}</span>
        </div>
    </div>
</template>

<script>
// trecho de código que representa o comportamento do componente

export default {
  // definindo o atributo name
  name: "Stat",

  // definindo as propriedades a serem recebidas na criação do componente
  props: ["title", "value", "icon", "color"],

  // definindo as propriedades computadas
  computed: {
    // função que aplica uma determinada cor a um elemento
    style() {
      return "color: " + (this.color || "#000");
    },
  },
};
</script>

<style>
/* trecho de código que representa o css do componente */
.stat {
  /* permite que o componente cresça conforme a necessidade */
  flex: 1;

  /* utilizando flexbox dentro do componente */
  display: flex;

  /* borda arredondada */
  border-radius: 8px;

  /* espaçamento externo */
  margin-right: 20px;
  margin-bottom: 20px;

  /* cor do fundo */
  background-color: #fff;

  /* espaçamento interno */
  padding: 20px;

  /* borda */
  border: 1px solid rgba(0, 0, 0, 0.2);

  /* sombreamento */
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
}

.stat-icon {
  /* utilizando flexbox dentro do componente */
  display: flex;

  /* centralizando verticalmente os componentes internos */
  align-items: center;
}

.stat-icon i {
  /* tamanho do ícone */
  font-size: 5rem;
}

.stat-info {
  /* permite que o componente cresça conforme a necessidade */
  flex: 1;

  /* utilizando flexbox dentro do componente */
  display: flex;

  /* alterando o eixo principal para coluna */
  flex-direction: column;

  /* alinhando à direita os componentes internos */
  align-items: flex-end;
}

.stat-title {
  /* tamanho do texto */
  font-size: 1.2rem;
}

.stat-value {
  /* tamanho do texto */
  font-size: 3rem;
}
</style>
