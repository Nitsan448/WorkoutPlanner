const SERVERURL = "http://localhost:8000/routines/";

export async function addRoutine(routine) {
	const response = await fetch(`${SERVERURL}create-routine`, {
		method: "POST",
		body: JSON.stringify({
			workout_id: routine.workout_id,
			exercise_id: routine.exercise_id,
			sets: routine.sets,
			time_or_repetitions: routine.time_or_repetitions,
			set_time: routine.set_time,
			repetitions: routine.repetitions,
			rest_time: routine.rest_time,
			break_after_routine: routine.break_after_routine,
			order_in_workout: routine.order_in_workout,
		}),
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
	});
	if (!response.ok) {
		throw new Error("Could not send exercise data");
	}
	return response.json();
}
