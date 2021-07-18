import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/home"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/auth"),
  },
  {
    path: "/pergunta/:id",
    props: true,
    name: "pergunta",
    component: () => import("../views/pergunta"),
  },
  {
    path: "/user",
    props: true,
    name: "user",
    component: () => import("../views/user"),
    children: [
      {
        path: "/perguntas/:iduser",
        props: true,
        name: "UserPerguntas",
        component: () => import("../views/user/userPerguntas"),
      },
      {
        path: "/respostas/:iduser",
        props: true,
        name: "UserRespostas",
        component: () => import("../views/user/userRespostas"),
      },
      {
        path: "/editarPergunta/:idpergunta",
        props: true,
        name: "editarPergunta",
        component: () => import("../views/user/editarPergunta"),
      },
      {
        path: "/editarResposta/:idresposta",
        props: true,
        name: "editarResposta",
        component: () => import("../views/user/editarResposta.vue"),
      },
      {
        path: "/editarPerfil/:id",
        name: "editarPerfil",
        props: true,
        component: () => import("../views/user/editarUser.vue"),
      },
    ],
  },
  {
    path: "/novaPergunta",
    props: true,
    name: "novaPergunta",
    component: () => import("../views/user/novaPergunta"),
  },
  {
    path: "/admin",
    props: true,
    name: "admin",
    component: () => import("../views/admin"),
    children: [
      {
        path: "/stats",
        name: "stats",
        component: () => import("../views/admin/stats"),
      },
      {
        path: "/users",
        name: "users",
        component: () => import("../views/admin/users"),
      },
      {
        path: "/gerenciarPerguntas",
        name: "gerenciarPerguntas",
        component: () => import("../views/admin/gerenciarPerguntas"),
      },                      
      {
        path: "/arquivoRespostas",
        name: "arquivoRespostas",
        component: () => import("../views/admin/arquivoRespostas"),
      },
      {
        path: "/editarUser/:id",
        name: "editarUser",
        props: true,
        component: () => import("../views/admin/editarUser.vue"),
      },
      {
        path: "/editarRespostaAdm/:id",
        name: "editarRespostaAdm",
        props: true,
        component: () => import("../views/admin/editarResposta.vue"),
      },
      {
        path: "/editarPerguntaAdm/:id",
        name: "editarPerguntaAdm",
        props: true,
        component: () => import("../views/admin/editarPergunta.vue"),
      }
    ],
  },
  {
    path: "*",
    name: "404",
    component: () => import("../views/404.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
