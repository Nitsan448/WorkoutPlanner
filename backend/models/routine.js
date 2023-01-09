const database = require("../database");
module.exports = class Routine {
	static findByWorkoutIdAndOrderInWorkout(workoutId, orderInWorkout) {
		const query =
			"SELECT * FROM exercises INNER JOIN routines on routines.exercise_id = exercises.exercise_id WHERE routines.workout_id = ? AND routines.order_in_workout = ?";
		return database.execute(query, [workoutId, orderInWorkout]);
	}

	static async addRoutine(routine) {
		const query = `CALL add_routine(
			?, ?, ?, ?, ?,
			?, ?, ?, ?, ?,
			?, ?)`;
		return database.execute(query, Object.values(routine));
	}

	static async updateRoutine(routine) {
		const query = `CALL update_routine(
			?, ?, ?, ?, ?,
			?, ?, ?, ?, ?,
			?, ?)`;
		return database.execute(query, Object.values(routine));
	}

	static deleteRoutine(workoutId, orderInWorkout) {
		const query = "CALL delete_routine(?, ?)";
		return database.execute(query, [workoutId, orderInWorkout]);
	}
};
