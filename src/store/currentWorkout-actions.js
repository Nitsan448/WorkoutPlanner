import { currentWorkoutActions } from "./currentWorkout-slice";
import { uiActions } from "./ui-slice";

export function fetchWorkoutData() {
	return async (dispatch) => {
		const fetchData = async () => {
			const response = await fetch("https://practicing-react-67914-default-rtdb.firebaseio.com/workout.json");
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
		} catch (Error) {
			dispatch(
				uiActions.showNotification({
					status: "error",
					title: "Error!",
					message: "Fetching workout data failed",
				})
			);
		}
	};
}

export function sendWorkoutData(workout) {
	return async () => {
		const sendRequest = async () => {
			const response = await fetch("https://practicing-react-67914-default-rtdb.firebaseio.com/workout.json", {
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
