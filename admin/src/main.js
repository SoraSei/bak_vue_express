import Vue from "vue";
import App from "./App";
import router from "./router";
import "./plugins/axios";
import "./plugins/element";
import "./style.css";

Vue.config.productionTip = false;

Vue.mixin({
  computed: {
    uploadUrl() {
      return `${this.axios.defaults.baseURL}/upload`;
    }
  },
  methods: {
    getAuthHeaders() {
      return { Authorization: `Bearer ${localStorage.token || ""}` };
    }
  }
});

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
