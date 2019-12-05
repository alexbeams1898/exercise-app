<template>
  <div>
    <h1 class="welcome is-size-3">Welcome {{ me.Username }}!</h1>

    <div class="columns hero is-medium">
      <div class="column">
        <ul class="panel">
          <p class="panel-heading ">
            My Excercises
            <router-link class="is-pulled-right" exact-active-class="active" to="/addexercise">
              <button class="button is-primary ">Add exercise</button>
            </router-link>
          </p>
          <div>
            <li
              v-for="(c, i) in My_Exercises"
              :key="i"
              class="panel-block is-active is-clickable"
              @click="chooseExercise(c, i)"
            >
              <strong>Exercise</strong>: {{ c.name }}, Sets: {{ c.sets }}, Reps: {{ c.reps }}
            </li>
          </div>
        </ul>
        <div class="hero-body"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { Profile_Server } from "../models/Profile";
export default {
  data: () => ({
    profile: {},
    My_Exercises: [],
    me: Profile_Server.User
  }),
  async created() {
    this.My_Exercises = await Profile_Server.Get_Exercises();
    setInterval(async () => (this.profile = await Profile_Server.Get_State()), 2000);
  },
  methods: {
    async chooseExercise(i) {
      await Profile_Server.Choose_Exercise(i);
    }
  }
};
</script>

<style>
.is-clickable {
  cursor: pointer;
}
.is-expanded {
  flex-grow: 1;
}
.welcome {
  padding-top: 15px;
  padding-bottom: 30px;
}
</style>
