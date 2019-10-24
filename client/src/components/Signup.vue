<template>
  <div>
    <form v-on:submit.prevent="createUser">
      <div class="form-group">
        <label for="username">Pick a username</label>
        <input name="username" id="username" type="text" v-model="username" />
      </div>
      <div class="form-group">
        <label for="password">Pick a password</label>
        <input name="password" id="password" type="text" v-model="password" />
      </div>
      <div class="form-group">
        <input type="submit" value="submit" class="btn" />
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Signup",
  data() {
    return {
      error: null,
      username: "",
      password: ""
    };
  },
  methods: {
    createUser() {
      axios
        .post(`/users/signup`, {
          username: this.username,
          password: this.password
        })
        .then(res => {
          alert(res);
          this.$router.push(`/`);
        })
        .catch(e => {
          alert(e);
        });
    }
  }
};
</script>

<style scoped>
</style>
