import Vue from "vue";
import App from "./App.vue";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import router from "./router";
//import { createRouter } from "vue-router";
//import RegistratitionWidget from "./components/RegistratitionWidget.vue";
//import Profile from "./components/Profile.vue";
//import VueRouter from "vue-router";

//const Profile_p = { template: "<div>Profile</div>" };
//const RegistrationWidget = { template: "<div>RegistrationWidget</div>" };

//const routes = [
//{ path: "/profile", component: Profile },
//{ path: "/registration", component: RegistratitionWidget },
//];

//const router = VueRouter.createRouter({
//history: VueRouter.createWebHashHistory(),
//routes,
//});

//const app = Vue.createApp({});

//app.use(router);

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
