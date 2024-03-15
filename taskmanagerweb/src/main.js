import Vue from "vue";
import App from "./App.vue";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import router from "./router";
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css";
import VueMaterial from "vue-material";
import VueFilterDateParse from "@vuejs-community/vue-filter-date-parse";

Vue.use(VueFilterDateParse);
Vue.use(VueMaterial);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
