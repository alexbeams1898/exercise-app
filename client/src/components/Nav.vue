<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a
        @click.prevent="isOpen = !isOpen"
        role="button"
        class="navbar-burger burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu" :class="{ 'is-active': isOpen }">
      <div class="navbar-start">
        <router-link exact-active-class="active" class="navbar-item" to="/profile">
          <i class="fas fa-ghost fa-pull-left"></i>
          Profile
        </router-link>

        <router-link exact-active-class="active" class="navbar-item" to="/about">
          <i class="fab fa-vuejs fa-pull-left"></i>
          About
        </router-link>

        <!-- <router-link exact-active-class="active" class="navbar-item" to="/login">
          <i class="fab fa-vuejs fa-pull-left"></i>
          Log out
        </router-link> -->
      </div>

      <!-- <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <a class="button is-primary">
              <router-link exact-active-class="active" class="navbar-item" to="/signup">
                Sign up
              </router-link>
            </a>
            <a class="button is-light"
              ><router-link exact-active-class="active" class="navbar-item" to="/login">
                Log in
              </router-link></a
            >
          </div>
        </div>
      </div> -->
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false
    };
  }
};
</script>

<style>
.active {
  background-color: aliceblue;
  font-weight: bold;
}
.kind-of-active {
  background-color: rgb(244, 248, 252);
  font-weight: 100;
}
</style>
