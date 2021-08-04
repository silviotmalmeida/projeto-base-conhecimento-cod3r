<template>
    <!-- trecho de código que representa o html do componente -->
    <!-- definindo o componente ArticleItem -->  
    <div class="article-item">

        <!-- insere um link para a URL "/articles/:id" -->
        <!-- usa o nome da rota definido no router e o id do artigo recebido por parâmetro -->
        <router-link :to="{ name: 'articleById', params: { id: article.id } }">  

            <!-- inserindo a imagem do artigo -->
            <div class="article-item-image d-none d-sm-block">

                <!-- se existir a URL da imagem, carrega a imagem selecionada -->
                <img v-if="article.imageUrl"
                    :src="article.imageUrl"
                    height="150" width="150" alt="Article">

                <!-- senão, carrega a imagem default -->
                <img v-else
                    src="@/assets/article.png"
                    height="150" width="150" alt="Article">
            </div>

            <!-- inserindo o nome, descrição e autor do artigo -->
            <div class="article-item-info">

                <!-- inserindo o nome -->
                <h2>{{ article.name }}</h2>

                <!-- inserindo a descrição -->
                <p>{{ article.description }}</p>

                <!-- inserindo o autor -->
                <span class="article-item-author">
                    <strong>Autor: </strong>{{ article.author }}
                </span>
            </div>
        </router-link>
    </div>
</template>

<script>
// trecho de código que representa o comportamento do componente

export default {
  // definindo o atributo name
  name: "ArticleItem",

  // definindo as propriedades a serem recebidas na criação do componente
  props: ["article"],
};
</script>

<style>
/* trecho de código que representa o css do componente */

.article-item {
  /* raio da borda circular */
  border-radius: 8px;

  /* espaçamento externo inferior */
  margin-bottom: 20px;

  /* cor de fundo */
  background-color: #fff;

  /* espaçamento interno */
  padding: 20px;

  /* borda */
  border: 1px solid rgba(0, 0, 0, 0.2);

  /* sombreamento */
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
}

.article-item a {
  /* utilizando flexbox dentro do componente */
  display: flex;

  /* alinhando verticalmente em cima */
  align-items: flex-start;

  /* removendo o estilo default de link */
  text-decoration: none;

  /* cor do texto */
  color: #000;
}

.article-item-info h2 {
  /* tamanho do texto */
  font-size: 1.7rem;
}

.article-item-image {
  /* espaçamento interno à direita */
  padding-right: 20px;

  /* espaçamento externo à direita */
  margin-right: 20px;

  /* borda à direita */
  border-right: 1px solid #aaa;
}

.article-item-image img {
  /* raio da borda circular */
  border-radius: 5px;
}

.article-item-info {
  /* utilizando flexbox dentro do componente */
  display: flex;

  /* distribuindo os componentes internos na área disponível */
  align-self: stretch;

  /* alterando o eixo principal para coluna */
  flex-direction: column;
}

.article-item-info p {
  /* componente que crescerá para ocupar a área disponível */
  flex: 1;

  /* cor do texto */
  color: #555;

  /* tamanho do texto */
  font-size: 1.1rem;
}
</style>
