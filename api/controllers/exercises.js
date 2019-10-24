const Exercise = require("../models/exercise");
const User = require("../models/user");
const mongoose = require("mongoose");

exports.exercises_get_all = (req, res, next) => {
  Exercise.find()
    .select("_id user exerciseName exerciseSets exerciseReps")
    .populate("user")
    .exec()
    .then(docs => {
      res.status(200).json({
        count: docs.length,
        exercises: docs.map(doc => {
          console.log(doc.userId);
          return {
            _id: doc._id,
            user: doc.user,
            exerciseName: doc.exerciseName,
            exerciseSets: doc.exerciseSets,
            exerciseReps: doc.exerciseReps,
            request: {
              type: "GET",
              url: "http://localhost:3000/exercises/" + doc._id
            }
          };
        })
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.new_exercise = (req, res) => {
  User.findById(req.body.userId)
    .then(user => {
      const exercise = new Exercise({
        _id: mongoose.Types.ObjectId(),
        exerciseName: req.body.exerciseName,
        exerciseSets: req.body.exerciseSets,
        exerciseReps: req.body.exerciseReps,
        user: req.body.userId
      });
      return exercise.save();
    })
    .then(result => {
      res.status(201).json({
        message: "Exercise created",
        createdExercise: {
          _id: result._id,
          user: result.user,
          exerciseName: result.exerciseName,
          exerciseSets: result.exerciseSets,
          exerciseReps: result.exerciseReps
        },
        request: {
          type: "GET",
          url: "http://localhost:3000/exercises/" + result._id
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        message: "User not found",
        error: err
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.get_exercise = (req, res, next) => {
  const id = req.params.exerciseId;
  Exercise.findById(id)
    .populate("user")
    .exec()
    .then(exercise => {
      if (!exercise) {
        return res.status(404).json({
          message: "Exercise not found"
        });
      }
      res.status(200).json({
        exercise: exercise,
        request: {
          type: "GET",
          url: "http://localhost:3000/exercises"
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.delete_exercise = (req, res, next) => {
  Exercise.remove({ _id: req.params.exerciseId })

    .exec()
    .then(result => {
      res.status(200).json({
        message: "Exercise deleted",
        request: {
          type: "POST",
          url: "http://localhost:3000/exercises",
          body: {
            userId: "ID",
            exerciseName: "String",
            exerciseSets: "Number",
            exerciseReps: "Number"
          }
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};
