import Vue from "vue";
import VueRouter from "vue-router";
import { User } from "../models/my-fetch";

import Home from "../views/Home.vue";
import Profile from "../views/Profile";
import Login from "../views/Login";
import Signup from "../views/Signup";
import JoinGame from "../views/JoinGame";
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
  { path: "/signup", name: "signup", component: Signup },
  { path: "/join", name: "join-game", component: JoinGame },
  { path: "/addexercise", name: "addexercise", component: AddExercise },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
