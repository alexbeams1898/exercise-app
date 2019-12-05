<template>
  <div>
    <h1 class="is-size-2">Add Exercise</h1>

    <div class="columns">
      <div class="column is-one-third is-offset-one-third">
        <ul class="panel">
          <p class="panel-heading">Add an exercise</p>
          <form class="panel-block" @submit.prevent="addExercise">
            <div class="field" :class="{ 'is-danger': error }">
              <div class="field">
                <div class="control has-icons-left has-icons-right">
                  <input v-model="name" class="input" type="text" placeholder="Exercise name" />
                </div>
              </div>
              <div class="field">
                <div class="control has-icons-left has-icons-right">
                  <input v-model="sets" class="input" type="text" placeholder="Sets" />
                </div>
              </div>
              <div class="field">
                <div class="control has-icons-left has-icons-right">
                  <input v-model="reps" class="input" type="text" placeholder="Reps" />
                </div>
              </div>
              <div class="control is-right">
                <button class="button is-info">Add</button>
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
    name: "",
    sets: "",
    reps: ""
  }),
  methods: {
    addExercise() {
      let exercise = {
        name: this.name,
        sets: this.sets,
        reps: this.reps
      };
      Profile_Server.Add_Exercise(exercise).catch(err => {
        this.error = err.message;
      });
    }
    // async submitCaption(caption, i) {
    //   const response = await Game_Server.Submit_Caption(caption);
    //   this.My_Captions.splice(i, 1);
    // },
    // async chooseExercise(i) {
    //   const response = await Game_Server.Choose_Exercise(i);
    // }
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
</style>
