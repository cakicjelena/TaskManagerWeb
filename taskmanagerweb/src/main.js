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

import Vuex from "vuex";
import VueSession from "vue-session";

Vue.use(Vuex);
const store = {
  user: {
    id: null,
    first_name: null,
    last_name: null,
    sex: null,
    birthDate: null,
    email: null,
    password: null,
    cpassword: null,
  },
  project: {
    id: null,
    name: null,
    createDate: null,
    deadlineDate: null,
    description: null,
    projectManagerId: null,
    users: null,
  },
  task: {
    id: null,
    name: null,
    type: null,
    status: null,
    description: null,
    startDate: null,
    finishDate: null,
    comments: null,
    userTask: null,
  },
  allUsers: null,
  allProjects: null,
};
export default new Vuex.Store({ store });

Vue.use(VueFilterDateParse);
Vue.use(VueMaterial);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueSession);

Vue.config.productionTip = true;
Vue.config.devtools = true;
Vue.config.debug = true;
Vue.config.silent = true;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
