<template>
  <div>
    <h1 class="is-size-1">Login</h1>

    <div class="columns">
      <div class="column is-one-third is-offset-one-third">
        <ul class="panel">
          <p class="panel-heading">Login</p>
          <form class="panel-block" @submit.prevent="logIn">
            <div class="field" :class="{ 'is-danger': error }">
              <div class="field">
                <div class="control has-icons-left has-icons-right">
                  <input v-model="username" class="input" type="text" placeholder="Username" />
                </div>
              </div>
              <div class="field">
                <div class="control has-icons-left has-icons-right">
                  <input v-model="password" class="input" type="text" placeholder="Password" />
                </div>
              </div>
              <div class="control is-right">
                <button class="button is-info">Log in</button>
              </div>
              <p class="help is-danger">{{ error }}</p>
            </div>
          </form>
        </ul>
        <p>
          Don't have an account?
          <router-link to="/signup" exact-active-class="active">
            Sign Up
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { Profile_Server } from "../models/Profile";
export default {
  data: () => ({
    username: "",
    password: "",
    error: ""
  }),
  methods: {
    logIn() {
      Profile_Server.LogIn(this.username, this.password).catch(err => {
        this.error = err.message;
      });
    }
  }
};
</script>

<style>
.fas.fa-exclamation-triangle {
  display: none;
}
.fa-exclamation-triangle {
  display: inline;
  color: red;
}
.input {
  border-color: red;
}
</style>
