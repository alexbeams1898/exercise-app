const express = require("express");
const { Profile } = require("../models/Profile");
const { CustomError } = require("../models/CustomError");

const app = express.Router();

app.get("/", (req, res) => {
  res.send({ ...Profile.Get_State(), me: Profile.Users[req.user_id] });
});
app.get("/hand", (req, res) => {
  res.send(Profile.Get_Exercises());
});
app.get("/picture/flip", (req, res) => {
  if (req.user_id != Profile.Dealer) {
    throw new CustomError(403, "Only the dealer can flip the picture");
  }
  Profile.Flip_Picture();
  res.send({ success: true, url: Profile.Picture_In_Play });
});
// app.post("currentexercise", (req, res) => {
//   Profile.Get_Current_Exercise();
//   res.send({ success: true });
// });
// app.get("/users", (req, res) => {
//   const user_id = Profile.LogIn(req.body.username);
//   res.send({ success: true, user_id });
// });
app.post("/users", (req, res) => {
  const user_id = Profile.Join(req.body.username);
  res.send({ success: true, user_id });
});
app.post("/addexercise", (req, res) => {
  Profile.Add_Exercise(
    req.body.exercise.name,
    req.body.exercise.sets,
    req.body.exercise.reps
  );
  res.send({ success: true });
});
app.post("/captions_in_play", (req, res) => {
  Profile.Submit_Caption(req.user_id, req.body.text);
  res.send({ success: true });
});
// app.post("/openexercise", (req, res) => {
//   Profile.Choose_Exercise(req.user_id, req.body.id);
//   res.send({ success: true });
// });

module.exports = app;
