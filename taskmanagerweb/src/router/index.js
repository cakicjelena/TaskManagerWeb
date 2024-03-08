import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import Login from "../components/Login.vue";
import Profile from "@/components/Profile.vue";
import Registration from "../components/Registration.vue";
import Project from "@/components/Project.vue";
import Task from "@/components/Task.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/projects",
    name: "projdects",
    component: Project,
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile,
    props: true,
  },
  {
    path: "/registration",
    name: "registration",
    component: Registration,
  },
  {
    path: "/tasks",
    name: "tasks",
    component: Task,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
