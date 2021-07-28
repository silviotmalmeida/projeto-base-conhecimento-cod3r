// arquivo com a definição das rotas

// importando as dependências
import Vue from "vue";
import VueRouter from "vue-router"; // gerenciador de rotas

import Home from "@/components/home/Home"; // componente com o conteúdo da página Home
import AdminPages from "@/components/admin/AdminPages"; // componente com o conteúdo da página Administração
import ArticlesByCategory from "@/components/article/ArticlesByCategory"; // componente com o conteúdo da página de Artigos por Categoria
import ArticleById from "@/components/article/ArticleById"; // componente com o conteúdo da página de Artigos por Id
import Auth from "@/components/auth/Auth";

import { userKey } from "@/global"; // ....

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
    meta: { requiresAdmin: true },
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

router.beforeEach((to, from, next) => {
  const json = localStorage.getItem(userKey);

  if (to.matched.some((record) => record.meta.requiresAdmin)) {
    const user = JSON.parse(json);
    user && user.admin ? next() : next({ path: "/" });
  } else {
    next();
  }
});

// exportando o router
export default router;
