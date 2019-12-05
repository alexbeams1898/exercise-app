import { api, User } from "./my-fetch";
import $router from "../router/index";

export const Profile_Server = {
  User,
  Get_Exercises() {
    return api("hand");
  },
  async Add_Exercise(exercise) {
    await api("addexercise", { exercise });
    $router.push({ name: "profile" });
  },
  // Flip_Picture() {
  //   return api("picture/flip");
  // },
  // Submit_Caption(text) {
  //   return api("captions_in_play", { text });
  // },
  // Choose_Exercise(id) {
  //   return api("openexercise", { id });
  // },
  async Join(username, password) {
    const { user_id } = await api("users", { username, password });
    User.User_Id = user_id;
    User.Username = username;
    User.Password = password;
    $router.push({ name: "profile" });
  },
  // async LogIn(username, password) {
  //   const { user_id } = await api("users");

  //   $router.push({ name: "profile" });
  // },
  // Get_Chosen_Exercise() {
  //   return api("currentexercise");
  // },
  Get_State() {
    return api("");
  }
};
