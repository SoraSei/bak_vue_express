import Vue from "vue";
import App from "./App";
import router from "./router";
import "./plugins/axios";
import "./assets/style.scss";

import VueAwesomeSwiper from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";
Vue.use(VueAwesomeSwiper);

import Card from "./components/Card";
Vue.component("c-card", Card);

import ListCard from "./components/ListCard";
Vue.component("c-list-card", ListCard);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
