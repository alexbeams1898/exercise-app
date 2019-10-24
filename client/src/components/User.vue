<template>
  <div>
      <ul>
          <li></li>
      </ul>
  </div>
</template>

<script>
import Login from "./Login";
// import axios from "axios";
export default {
  name: "User",
  components: Login,
  data() {
    return {
      loading: false,
      error: null,
      userData: null
    };
  },
  async created() {
    this.loading = true;
    try {
      this.loading = false;
      alert(Login.methods.getUsername());
    } catch (err) {
      this.loading = false;
      this.error = err.response.data.message;
    }
  }
};
</script>

<style scoped>
</style>