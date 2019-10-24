import Vue from "vue";
import Router from "vue-router";
import Login from "./components/Login.vue";
import Signup from "./components/Signup.vue";
import User from "./components/User.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "login",
      component: Login
    },
    {
      path: "/user",
      name: "user",
      component: User
    },
    {
      path: "/signup",
      name: "signup",
      component: Signup
    }
  ]
});
