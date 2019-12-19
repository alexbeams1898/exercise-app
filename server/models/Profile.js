const Exercises = require("./Exercises");
const Users = require("./Users");
const { CustomError } = require("./CustomError");

module.exports.Profile = {
  Users: Users,
  Exercises,
  Exercise_Names: [],
  Top_Of_Picture_Deck: 0,
  Top_Of_Caption_Deck: 0,

  Dealer: 0,
  Captions_In_Play: [], // strings
  Picture_In_Play: "",
  Exercise_Chosen: {},
  Get_Exercises() {
    return this.Exercises;
  },
  Get_Names() {
    this.Exercise_Names = this.Add_Names();
    return this.Exercise_Names;
  },
  Add_Names() {
    let names = [];
    for (let index = 0; index < this.Exercises.length; index++) {
      names[index] = this.Exercises[index].name;
    }
    return names;
  },
  Add_Exercise(name, sets, reps) {
    Exercises.push({ name, sets, reps });
  },
  Flip_Picture() {
    this.Top_Of_Picture_Deck =
      (this.Top_Of_Picture_Deck + 1) % this.Picture_Deck.length;
    this.Picture_In_Play = this.Picture_Deck[this.Top_Of_Picture_Deck];
    this.Caption_Chosen = -1;
    this.Captions_In_Play = [];
  },
  Join(username, password) {
    if (
      this.Users.find(x => x.username == username && x.password == password)
    ) {
      throw new CustomError(409, "Another user is already using that name.");
    }
    this.Users.push({ username, password });
    return this.Users.length - 1;
  },
  // LogIn(username, password) {
  //   Current_User = this.Users.find(
  //     x => x.username == username && x.password == password
  //   );
  //   alert(this.Current_User);
  //   return this.Current_User;
  // },
  // Choose_Exercise(player_id, id) {
  //   this.Exercise_Chosen = Exercises[id];
  //   // this.Dealer = (this.Dealer + 1) % this.Players.length;
  // },
  // Get_Current_Exercise() {
  //   return this.Exercise_Chosen;
  // },
  Get_State() {
    return {
      Users: this.Users,
      Exercises: this.Exercises,
      Exercise_Names: this.Exercise_Names,
      Picture_In_Play: this.Picture_In_Play,
      Exercise_Chosen: this.Exercise_Chosen
    };
  }
};
