const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");

const ExerciseController = require("../controllers/exercises");

router.get("/", ExerciseController.exercises_get_all);

router.post("/", ExerciseController.new_exercise);

router.get("/:exerciseId", ExerciseController.get_exercise);

router.delete("/:exerciseId", checkAuth, ExerciseController.delete_exercise);

module.exports = router;
