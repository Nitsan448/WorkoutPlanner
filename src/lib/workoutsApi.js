// const SERVERURL = "https://practicing-react-67914-default-rtdb.firebaseio.com/";
const SERVERURL = "http://localhost:8000/workouts/";

export async function fetchWorkoutRequest(workoutId) {
	const response = await fetch(`${SERVERURL}${workoutId}`, { credentials: "include" });
	if (!response.ok) {
		throw new Error("Could not fetch workout data");
	}

	return response.json();
}

export async function fetchRoutinesRequest(workoutId) {
	const response = await fetch(`${SERVERURL}${workoutId}/routines`, { credentials: "include" });
	if (!response.ok) {
		throw new Error("Could not fetch routines data");
	}

	return response.json();
}

export async function fetchWorkoutsRequest() {
	const response = await fetch(`${SERVERURL}`, {
		credentials: "include",
	});
	if (!response.ok) {
		throw new Error("Could not fetch workout names");
	}

	return response.json();
}

export async function addWorkoutRequest() {
	const response = await fetch(`${SERVERURL}create-workout`, {
		method: "POST",
		body: JSON.stringify({
			name: "",
			description: "",
		}),
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
	});
	if (!response.ok) {
		throw new Error("Could not send workout data");
	}
	return response.json();
}
