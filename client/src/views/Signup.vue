<template>
  <div>
    <h1 class="is-size-1">Sign up</h1>

    <div class="columns">
      <div class="column is-one-third is-offset-one-third">
        <ul>
          <form @submit.prevent="join">
            <div class="field" :class="{ 'is-danger': error }">
              <div class="field">
                <div class="control has-icons-left has-icons-right">
                  <label for="username"></label>
                  <input v-model="username" class="input" type="text" placeholder="Username" />
                </div>
              </div>
              <div class="field">
                <div class="control has-icons-left has-icons-right">
                  <input v-model="password" class="input" type="text" placeholder="Password" />
                </div>
              </div>
              <div class="control is-right">
                <button class="button is-info">Sign up</button>
              </div>
              <p class="help is-danger">{{ error }}</p>
            </div>
          </form>
        </ul>
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
    join() {
      Profile_Server.Join(this.username, this.password).catch(err => {
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
