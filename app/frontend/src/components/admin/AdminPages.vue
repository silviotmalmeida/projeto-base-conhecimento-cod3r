<template>
    <!-- trecho de código que representa o html do componente -->
    <!-- definindo o componente AdminPages -->  
    <div class="admin-pages">

        <!-- inserindo o título da página com componente PageTitle -->
        <PageTitle icon="fa fa-cogs" main="Administração do Sistema"
            sub="Cadastros & Cia" />

        <!-- inserindo a área das abas -->
        <div class="admin-pages-tabs">

            <!-- inserindo o cartão geral usando o bootstrap-vue -->
            <b-card no-body>

                <!-- inserindo as abas usando o bootstrap-vue -->
                <b-tabs card>

                    <!-- inserindo a aba Artigos e definindo como ativa usando o bootstrap-vue -->
                    <b-tab title="Artigos" active>

                        <!-- inserindo o gerenciador de artigos com o componente ArticleAdmin -->
                        <ArticleAdmin />
                    </b-tab>

                    <!-- inserindo a aba Categorias usando o bootstrap-vue -->
                    <b-tab title="Categorias">

                        <!-- inserindo o gerenciador de categorias com o componente CategoryAdmin -->
                        <CategoryAdmin />
                    </b-tab>

                    <!-- inserindo a aba Usuários usando o bootstrap-vue -->
                    <b-tab title="Usuários">

                        <!-- inserindo o gerenciador de usuários com o componente UserAdmin -->
                        <UserAdmin />
                    </b-tab>
                </b-tabs>
            </b-card>
        </div>
    </div>
</template>

<script>
// trecho de código que representa o comportamento do componente

// importando as dependências
import PageTitle from "../template/PageTitle"; // componente de título da página
import ArticleAdmin from "./ArticleAdmin"; // componente gerenciador de artigos
import CategoryAdmin from "./CategoryAdmin"; // componente gerenciador de categorias
import UserAdmin from "./UserAdmin"; // componente gerenciador de usuários

export default {
  // definindo o atributo name
  name: "AdminPages",

  // definindo os componentes a serem utilizados
  components: { PageTitle, ArticleAdmin, CategoryAdmin, UserAdmin },
};
</script>

<style>
/* trecho de código que representa o css do componente */
</style>
