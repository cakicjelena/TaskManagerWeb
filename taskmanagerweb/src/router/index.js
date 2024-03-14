import Vue from "vue";
import VueRouter from "vue-router";
//import HomeView from "../views/HomeView.vue";
import Login from "../components/Login.vue";
import Profile from "@/components/Profile.vue";
import Registration from "../components/Registration.vue";
import Project from "@/components/Project.vue";
import Task from "@/components/Task.vue";
import User from "@/components/User.vue";
import ProjectCreate from "@/components/ProjectCreate.vue";
import UserOnProject from "@/components/UserOnProject.vue";
import Home from "@/components/Home.vue";
import TaskCreate from "@/components/TaskCreate.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/home",
    //name: "home",
    //component: HomeView,
  },
  {
    path: "/home",
    component: Home,
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
    name: "projects",
    component: Project,
  },
  {
    path: "/projectcreate",
    name: "projectcreate",
    component: ProjectCreate,
  },
  {
    path: "/useronproject",
    name: "useronproject",
    component: UserOnProject,
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

  {
    path: "/taskcreate",
    name: "taskcreate",
    component: TaskCreate,
  },
  {
    path: "/users",
    name: "users",
    component: User,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
