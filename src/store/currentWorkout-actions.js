import { currentWorkoutActions } from "./currentWorkout-slice";
const fireBaseUrl = "https://practicing-react-67914-default-rtdb.firebaseio.com/";

export function fetchWorkoutData(workoutId) {
	return async (dispatch) => {
		const fetchData = async () => {
			const response = await fetch(`${fireBaseUrl}workout/${workoutId}.json`);
			if (!response.ok) {
				throw new Error("Could not fetch workout data");
			}

			const data = await response.json();
			return data;
		};

		try {
			const workoutData = await fetchData();
			dispatch(
				currentWorkoutActions.replaceCurrentWorkout({
					...workoutData,
					exercises: workoutData.exercises || [],
				})
			);
		} catch (error) {
			console.log("Workout empty");
		}
	};
}

export function sendWorkoutData(workout, workoutId) {
	return async () => {
		const sendRequest = async () => {
			const response = await fetch(`${fireBaseUrl}workout/${workoutId}.json`, {
				method: "PUT",
				body: JSON.stringify({
					exercises: workout.exercises,
					workoutName: workout.workoutName,
					currentExerciseIndex: workout.currentExerciseIndex,
				}),
			});
			if (!response.ok) {
				throw new Error("Could not send workout data");
			}
		};
		await sendRequest();
	};
}
