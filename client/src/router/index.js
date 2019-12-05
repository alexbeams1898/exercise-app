import Vue from "vue";
import VueRouter from "vue-router";
import { User } from "../models/my-fetch";

import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Profile from "../views/Profile";
import Login from "../views/Login";
import AddExercise from "../views/AddExercise";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    beforeEnter: (to, from, next) => {
      if (User.User_Id == null) {
        next({ name: "login" });
      } else {
        next();
      }
    }
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile
  },
  { path: "/login", name: "login", component: Login },
  { path: "/addexercise", name: "addexercise", component: AddExercise },
  {
    path: "/about",
    name: "about",
    component: About
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
