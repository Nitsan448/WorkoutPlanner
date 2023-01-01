const SERVERURL = "http://localhost:8000/exercises/";

export async function addExerciseRequest(exercise) {
	const response = await fetch(`${SERVERURL}create-exercise`, {
		method: "POST",
		body: JSON.stringify({
			name: exercise.name,
			description: exercise.description,
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
