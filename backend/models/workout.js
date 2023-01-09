const database = require("../database");
const Routine = require("./routine");

module.exports = class Workout {
	static findById(workoutId) {
		const query = "SELECT * FROM workouts WHERE workout_id = ?";
		return database.execute(query, [workoutId]);
	}

	static findByName(workoutName) {
		const query = "SELECT * FROM workouts WHERE name = ?";
		return database.execute(query, [workoutName]);
	}

	static getWorkouts(userId) {
		const query = "SELECT * FROM workouts WHERE user_id = ?";
		return database.execute(query, [userId]);
		// return database.execute("SELECT name FROM workouts ORDER BY id");
	}

	static addWorkout(workout) {
		const query = "INSERT INTO workouts (name, description, user_id, image, is_public) VALUES (?, ?, ?, ?, ?)";
		return database.execute(query, Object.values(workout));
	}

	static deleteWorkout(workoutId) {
		const query = "DELETE FROM workouts WHERE workout_id = ?";
		return database.execute(query, [workoutId]);
	}

	static updateWorkout(workout) {
		const query = "UPDATE workouts SET name=?, description=?, image=?, is_public=? WHERE workout_id=?";
		return database.execute(query, Object.values(workout));
	}

	static async deleteRoutines(workoutId) {
		//TODO: Fix performance, find a way to do this without looping
		const [routines] = await Workout.getRoutines(workoutId);
		routines.forEach(async (routine) => {
			await Routine.deleteRoutine(workoutId, routine.order_in_workout);
		});
	}

	static getRoutines(workoutId) {
		const query =
			"SELECT * FROM routines INNER JOIN exercises ON routines.exercise_id=exercises.exercise_id WHERE workout_id=?";
		return database.execute(query, [workoutId]);
	}
};
