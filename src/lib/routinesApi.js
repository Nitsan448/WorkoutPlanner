const SERVERURL = "http://localhost:8000/routines/";

export async function addRoutineRequest(routine) {
	const response = await fetch(`${SERVERURL}create-routine`, {
		method: "POST",
		body: JSON.stringify({
			...routine,
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

export async function deleteRoutineRequest(routine) {
	const response = await fetch(`${SERVERURL}${routine.workoutId}/${routine.orderInWorkout}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
	});
	if (!response.ok) {
		throw new Error("Could not delete routine");
	}
	return response.json();
}
