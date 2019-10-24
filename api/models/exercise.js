const mongoose = require("mongoose");

const exerciseSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  exerciseName: { type: String, required: true },
  exerciseSets: { type: Number, default: 1 },
  exerciseReps: { type: Number, default: 1 }
});

module.exports = mongoose.model("Exercise", exerciseSchema);
