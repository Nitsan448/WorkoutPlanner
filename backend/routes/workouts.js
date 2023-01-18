const express = require("express");
const Workout = require("../models/workout");
const { validateNameIsNotEmpty, validate } = require("../middleware/validation");
const { checkIfRowCanBeManipulated } = require("../helpers/validation");

const router = express.Router();

router.get("/", async (req, res, next) => {
	try {
		const [workouts] = await Workout.getWorkouts(req.userId);
		res.status(200).json(workouts);
	} catch (error) {
		console.log(error.message);
		res.sendStatus(500);
	}
});

router.get("/:workoutId", async (req, res, next) => {
	const workoutId = req.params.workoutId;
	try {
		const [workout] = await Workout.findById(workoutId);
		const [routines] = await Workout.getRoutines(workoutId);
		res.status(200).json({
			...workout[0],
			routines: routines,
		});
	} catch (error) {
		res.status(500).json("Could not fetch workout");
	}
});

router.post("/", async (req, res, next) => {
	//Validate image
	try {
		const [results] = await Workout.addWorkout({
			name: req.body.name,
			description: req.body.description,
			userId: req.userId,
			image: req.body.image === undefined ? null : req.body.image,
			isPublic: req.body.is_public !== undefined && req.body.is_public ? 1 : 0,
		});
		res.status(201).json(results.insertId);
	} catch (error) {
		console.log(error.message);
		res.status(500).json("Could not create workout");
	}
});

router.patch("/:workoutId", validateNameIsNotEmpty(), validate, async (req, res, next) => {
	//Validate image
	try {
		const [workout] = await Workout.findById(req.params.workoutId);
		checkIfRowCanBeManipulated(workout, req.userId);

		await Workout.updateWorkout({
			name: req.body.name,
			description: req.body.description,
			image: req.body.image === undefined ? null : req.body.image,
			isPublic: req.body.is_public !== undefined && req.body.is_public ? 1 : 0,
			workoutId: req.params.workoutId,
		});
		res.status(200).json("Workout updated");
	} catch (error) {
		console.log(error.message);
		res.status(500).json("Could not update workout");
	}
});

router.delete("/:workoutId", async (req, res, next) => {
	const workoutId = req.params.workoutId;
	console.log("deleting");
	try {
		const [workout] = await Workout.findById(workoutId);
		checkIfRowCanBeManipulated(workout, req.userId);

		await Workout.deleteRoutines(workoutId);
		await Workout.deleteWorkout(workoutId);
		res.status(200).json("Workout deleted");
	} catch (error) {
		console.log(error.message);
		res.status(500).json("Could not delete workout");
	}
});

module.exports = router;
