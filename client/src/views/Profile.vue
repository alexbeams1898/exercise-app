<template>
  <div>
    <h1 class="is-size-1">This is the Game Page</h1>

    <div class="columns">
      <div class="column is-one-quarter">
        <!-- <ul class="panel">
          <p class="panel-heading">Players</p>
          <li
            v-for="(p, i) in game.Players"
            :key="i"
            class="panel-block"
            :class="{ 'is-active': i == game.Dealer, 'has-text-primary': i == me.User_Id }"
          >
            <span class="panel-icon">
              <i
                class="fas"
                :class="i == game.Dealer ? 'fa-user-secret' : 'fa-user'"
                aria-hidden="true"
              ></i>
            </span>
            {{ p.username }}
          </li>
        </ul> -->

        <ul class="panel">
          <p class="panel-heading">
            My Exercises
            <router-link exact-active-class="active" to="/addexercise">
              +
            </router-link>
          </p>
          <li
            v-for="(c, i) in My_Exercises"
            :key="i"
            class="panel-block is-active"
            @click="submitCaption(c, i)"
          >
            {{ c.name }}
          </li>
        </ul>
      </div>
      <div class="column">
        <!-- <div class="box is-clickable" @click="pictureClicked">
          <img
            alt="Current Picture in Play"
            class="image is-fullwidth"
            :src="game.Picture_In_Play"
            v-if="game.Picture_In_Play"
          />
          <div class="notification is-primary" v-else>Flip First Picture</div>
        </div> -->

        <ul class="panel">
          <p class="panel-heading">
            My Excercises
          </p>
          <li
            v-for="(c, i) in profile.Captions_In_Play"
            :key="i"
            class="panel-block is-active"
            :class="{ 'has-background-warning': i == profile.Caption_Chosen }"
          >
            <div class="is-expanded">{{ c.text }}</div>
            <span class="tag" :class="profile.Caption_Chosen > -1 ? 'is-primary' : 'is-light'">{{
              c.player
            }}</span>
            <button
              class="button is-small is-primary"
              @click.prevent="chooseExercise(i)"
              v-show="me.User_Id == profile.Dealer && profile.Caption_Chosen == -1"
              :disabled="profile.Captions_In_Play.length < profile.Users.length - 1"
            >
              Choose
            </button>
          </li>
        </ul>
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
    pictureClicked() {
      Profile_Server.Flip_Picture();
    },
    addExercise() {}
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
