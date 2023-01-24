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
		const query = "INSERT INTO workouts (name, description, user_id, image) VALUES (?, ?, ?, ?)";
		return database.execute(query, Object.values(workout));
	}

	static deleteWorkout(workoutId) {
		const query = "call delete_workout(?)";
		return database.execute(query, [workoutId]);
	}

	static updateWorkout(workout) {
		const query = "UPDATE workouts SET name=?, description=?, image=? WHERE workout_id=?";
		return database.execute(query, Object.values(workout));
	}

	static updateRoutinesOrder(workoutId, oldRoutineIndex, newRoutineIndex) {
		const query = "call update_routines_order(?, ?, ?)";
		return database.execute(query, [workoutId, oldRoutineIndex, newRoutineIndex]);
	}

	static getRoutines(workoutId) {
		// Order by order in workout
		const query =
			"SELECT * FROM routines INNER JOIN exercises ON routines.exercise_id=exercises.exercise_id WHERE workout_id=?";
		return database.execute(query, [workoutId]);
	}
};
