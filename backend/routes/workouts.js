const express = require("express");
const Workout = require("../models/workout");
const { validateNameIsNotEmpty, validate } = require("../middleware/validation");
const { checkIfRowCanBeManipulated } = require("../helpers/validation");
const fileHelper = require("../helpers/file");

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
			image: workout[0].image,
			...workout[0],
			routines: routines,
		});
	} catch (error) {
		res.status(500).json("Could not fetch workout");
	}
});

router.post("/", async (req, res, next) => {
	const image = req.file === undefined ? null : req.file.path;
	try {
		const [results] = await Workout.addWorkout({
			name: req.body.name,
			description: req.body.description,
			userId: req.userId,
			image,
		});
		res.status(201).json(results.insertId);
	} catch (error) {
		console.log(error.message);
		res.status(500).json("Could not create workout");
	}
});

router.patch("/", validateNameIsNotEmpty(), validate, async (req, res, next) => {
	try {
		const [workout] = await Workout.findById(req.body.workout_id);
		checkIfRowCanBeManipulated(workout, req.userId);

		let image = req.file.path;

		if (req.file === undefined) {
			image = workout[0].image;
		} else if (workout[0].image) {
			fileHelper.deleteFile(workout[0].image);
		}

		await Workout.updateWorkout({
			name: req.body.name,
			description: req.body.description,
			image: image,
			workoutId: req.body.workout_id,
		});
		res.status(200).json("Workout updated");
	} catch (error) {
		console.log(error.message);
		res.status(500).json("Could not update workout");
	}
});

router.delete("/:workoutId", async (req, res, next) => {
	const workoutId = req.params.workoutId;
	try {
		const [workout] = await Workout.findById(workoutId);
		checkIfRowCanBeManipulated(workout, req.userId);

		if (workout[0].image) {
			fileHelper.deleteFile(workout[0].image);
		}

		await Workout.deleteWorkout(workoutId);
		res.status(200).json("Workout deleted");
	} catch (error) {
		console.log(error.message);
		res.status(500).json("Could not delete workout");
	}
});

router.post("/update_routines_order", async (req, res, next) => {
	try {
		await Workout.updateRoutinesOrder(req.body.workout_id, req.body.old_routine_index, req.body.new_routine_index);
		res.status(200).json("Routines order updated");
	} catch (error) {
		console.log(error.message);
		res.status(500).json("Could not create workout");
	}
});

module.exports = router;
