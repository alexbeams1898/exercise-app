<template>
  <div>
    <section v-if="!loggedIn" class="login">
      <form v-on:submit.prevent="onSubmit">
        <div class="form-group">
          <label for="username">Username</label>
          <input name="username" id="username" type="text" v-model="username" />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input name="password" id="password" type="text" v-model="password" />
        </div>
        <div class="form-group">
          <input type="submit" value="submit" class="btn" />
        </div>
      </form>
      <a v-on:click="signup" class="btn">Sign up</a>
    </section>
    <section v-if="loggedIn" class="login">
      <div v-if="username">
        <h2 class="welcome">Welcome {{username}}!</h2>
      </div>
      <h3 class="exercises">Exercises:</h3>
      <ul>
        <li
          v-bind:key="exercise"
          v-for="exercise in exercises"
        >Name: {{exercise.name}}, Sets: {{exercise.sets}}, Reps: {{exercise.reps}}</li>
      </ul>
      <a v-on:click="showBox" class="btn">Click to create exercise</a>
      <form v-if="showExerciseBox" v-on:submit.prevent="addExercise">
        <div class="form-group">
          <label for="exerciseName">Name</label>
          <input name="exerciseName" id="exerciseName" type="text" v-model="exerciseName" />
        </div>
        <div class="form-group">
          <label for="exerciseSets">Sets</label>
          <input name="exerciseSets" id="exerciseSets" type="text" v-model="exerciseSets" />
        </div>
        <div class="form-group">
          <label for="exerciseReps">Reps</label>
          <input name="exerciseReps" id="exerciseReps" type="text" v-model="exerciseReps" />
        </div>
        <div class="form-group">
          <input type="submit" value="submit" class="btn" />
        </div>
      </form>
    </section>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      id: "",
      exercises: [],
      exerciseName: "",
      exerciseSets: "",
      exerciseReps: "",
      loggedIn: false,
      showExerciseBox: false
    };
  },
  methods: {
    onSubmit() {
      if (!this.username) {
        alert("Please enter username");
      } else {
        try {
          axios
            .post(`/users/login`, {
              username: this.username,
              password: this.password
            })
            .then(res => {
              this.id = res.data.id;
              this.loggedIn = true;
            })
            .catch(e => {
              alert(e);
            });
        } catch (err) {
          this.loggedIn = false;
        }
      }
    },
    showBox() {
      this.showExerciseBox = true;
    },
    addExercise() {
      if (!this.exerciseName) {
        alert("Please enter name");
      } else {
        try {
          axios.post(`/exercises/`, {
            userId: this.id,
            exerciseName: this.exerciseName,
            exerciseSets: this.exerciseSets,
            exerciseReps: this.exerciseReps
          });
          this.exercises.push({
            name: this.exerciseName,
            sets: this.exerciseSets,
            reps: this.exerciseReps
          });
          this.showExerciseBox = false;
        } catch (err) {
          alert(err);
          this.showExerciseBox = true;
        }
      }
    },
    editExercise() {
      axios;
    },
    signup() {
      this.$router.push(`/signup`);
    }
  }
};
</script>

<style scoped>
</style>
