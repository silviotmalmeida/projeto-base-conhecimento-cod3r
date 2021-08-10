// arquivo com a definição das rotas

// importando as dependências
import Vue from "vue";
import VueRouter from "vue-router"; // gerenciador de rotas

import Home from "@/components/home/Home"; // componente com o conteúdo da página Home
import AdminPages from "@/components/admin/AdminPages"; // componente com o conteúdo da página Administração
import ArticlesByCategory from "@/components/article/ArticlesByCategory"; // componente com o conteúdo da página de Artigos por Categoria
import ArticleById from "@/components/article/ArticleById"; // componente com o conteúdo da página de Artigos por Id
import Auth from "@/components/auth/Auth"; // componente com o formulário de autenticação

import { userKey } from "@/global"; // importando a constante userKey presente no arquivo global.js

// carregando o router
Vue.use(VueRouter);

// definição das rotas
const routes = [
  {
    // página Home
    name: "home",
    path: "/",
    component: Home,
  },
  {
    // página Administração
    name: "adminPages",
    path: "/admin",
    component: AdminPages,
    meta: { requiresAdmin: true }, // incluindo atributo meta para validação de administrador
  },
  {
    // página de Artigos por Categoria
    name: "articlesByCategory",
    path: "/categories/:id/articles",
    component: ArticlesByCategory,
  },
  {
    // página de Artigos por Id
    name: "articleById",
    path: "/articles/:id",
    component: ArticleById,
  },
  {
    // página de login
    name: "auth",
    path: "/auth",
    component: Auth,
  },
];

// criando o router com o modo history e as rotas definidas
const router = new VueRouter({
  mode: "history",
  routes,
});

// evento que é executado sempre que houver mudança de rota
// recebe como parâmetros:
// a rota de destino (to)
// a tela de origem (from)
router.beforeEach((to, from, next) => {
  // obtendo os dados do armazenamento local
  const json = localStorage.getItem(userKey);

  // verificando se a rota de destino possui o atributo meta requiresAdmin true
  // em caso positivo:
  if (to.matched.some((record) => record.meta.requiresAdmin)) {
    // convertendo os dados obtidos para json
    const user = JSON.parse(json);

    // caso o usuario exista e seja administrador, prossegue.
    // senão redireciona para a página inicial
    user && user.admin ? next() : next({ path: "/" });
  }
  // em caso negativo:
  else {
    // prossegue
    next();
  }
});

// exportando o router
export default router;
