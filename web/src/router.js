import Vue from "vue";
import VueRouter from "vue-router";
import Main from "./views/Main";
import Home from "./views/Home";
import Article from "./views/Article";
import Role from "./views/Role";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Main,
    children: [
      { path: "/", component: Home },
      { path: "/articles/:id", component: Article, props: true }
    ]
  },
  { path: "/roles/:id", component: Role, props: true }
];

const router = new VueRouter({
  routes
});

export default router;
