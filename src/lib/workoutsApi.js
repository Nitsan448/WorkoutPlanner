// const SERVERURL = "https://practicing-react-67914-default-rtdb.firebaseio.com/";
const SERVERURL = "http://localhost:8000/";

export async function fetchWorkoutData(workoutId) {
	const response = await fetch(`${SERVERURL}workouts/${workoutId}`);
	if (!response.ok) {
		throw new Error("Could not fetch workout data");
	}

	return response.json();
}

export async function fetchExercisesData(workoutId) {
	const response = await fetch(`${SERVERURL}workouts/${workoutId}/exercises`);
	if (!response.ok) {
		throw new Error("Could not fetch exercises data");
	}

	return response.json();
}

export async function fetchWorkoutNames() {
	const response = await fetch(`${SERVERURL}workouts`);
	if (!response.ok) {
		throw new Error("Could not fetch workout names");
	}

	return response.json();
}

export async function addExercise(exercise, workoutId) {
	console.log(exercise);
	// const response = await fetch(`${SERVERURL}workouts/${workoutId}.json`)
}

export async function sendWorkoutData(workout, workoutId) {
	const sendRequest = async () => {
		const response = await fetch(`${SERVERURL}workouts/${workoutId}.json`, {
			method: "PUT",
			body: JSON.stringify({
				exercises: workout.exercises,
				workoutName: workout.workoutName,
				currentExerciseIndex: workout.currentExerciseIndex,
			}),
			headers: {
				"Content-Type": "application.json",
			},
		});
		if (!response.ok) {
			throw new Error("Could not send workout data");
		}
	};
	await sendRequest();
}
