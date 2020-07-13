import Vue from "vue";
import VueRouter from "vue-router";
import Main from "./views/Main";
import CategoryEdit from "./views/CategoryEdit";
import CategoryList from "./views/CategoryList";
import ItemEdit from "./views/ItemEdit";
import ItemList from "./views/ItemList";
import RoleEdit from "./views/RoleEdit";
import RoleList from "./views/RoleList";
import ArticleEdit from "./views/ArticleEdit";
import ArticleList from "./views/ArticleList";
import AdEdit from "./views/AdEdit";
import AdList from "./views/AdList";
import UserEdit from "./views/UserEdit";
import UserList from "./views/UserList";
import Login from "./views/Login";

Vue.use(VueRouter);

const routes = [
  { path: "/login", name: "login", component: Login, meta: { isPublic: true } },
  {
    path: "/",
    name: "main",
    component: Main,
    children: [
      { path: "categories/create", component: CategoryEdit },
      { path: "categories/edit/:id", component: CategoryEdit, props: true },
      { path: "categories/list", component: CategoryList },
      { path: "items/create", component: ItemEdit },
      { path: "items/edit/:id", component: ItemEdit, props: true },
      { path: "items/list", component: ItemList },
      { path: "roles/create", component: RoleEdit },
      { path: "roles/edit/:id", component: RoleEdit, props: true },
      { path: "roles/list", component: RoleList },
      { path: "articles/create", component: ArticleEdit },
      { path: "articles/edit/:id", component: ArticleEdit, props: true },
      { path: "articles/list", component: ArticleList },
      { path: "ads/create", component: AdEdit },
      { path: "ads/edit/:id", component: AdEdit, props: true },
      { path: "ads/list", component: AdList },
      { path: "users/create", component: UserEdit },
      { path: "users/edit/:id", component: UserEdit, props: true },
      { path: "users/list", component: UserList }
    ]
  }
];

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  if (!to.meta.isPublic && !localStorage.token) {
    return next("/login");
  }
  next();
});

export default router;
