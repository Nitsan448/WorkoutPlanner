import React, { useEffect } from "react";
import { fetchWorkoutData, fetchExercisesData } from "../lib/workoutsApi";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import useHttp from "../hooks/use-http";
import PlayingWorkout from "../components/workouts/PlayingWorkout";
import ViewingWorkout from "../components/workouts/ViewingWorkout";

// let isInitial = true;

function Workout(props) {
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const isWorkoutPlaying = queryParams.get("playing") === "true";

	const params = useParams();
	const { workoutId } = params;

	const {
		sendRequest: sendFetchWorkoutRequest,
		status: fetchWorkoutStatus,
		data: workoutData,
		error: fetchWorkoutError,
	} = useHttp(fetchWorkoutData, true);

	const {
		sendRequest: sendFetchExercisesRequest,
		status: fetchExercisesStatus,
		data: exercisesData,
		error: fetchExercisesError,
	} = useHttp(fetchExercisesData, true);

	useEffect(() => {
		sendFetchWorkoutRequest(workoutId);
		sendFetchExercisesRequest(workoutId);
	}, [sendFetchWorkoutRequest, sendFetchExercisesRequest, workoutId]);

	// useEffect(() => {
	// 	if (workout.changed && !isInitial) {
	// 		dispatch(sendWorkoutData(workout, workoutId));
	// 	}
	// 	isInitial = false;
	// }, [workout, workoutId, dispatch]);

	if (fetchWorkoutStatus === "pending" || fetchExercisesStatus === "pending") {
		return <h2>Fetching workout data...</h2>;
	}
	if (fetchWorkoutError || fetchExercisesError) {
		return (
			<div>
				<h2>There was an error fetching workout data</h2>
				<p>{fetchWorkoutError}</p>
			</div>
		);
	}

	const workout = {
		name: workoutData.name,
		description: workoutData.description,
		exercises: exercisesData,
	};

	return <>{isWorkoutPlaying ? <PlayingWorkout workout={workout} /> : <ViewingWorkout workout={workout} />}</>;
}

export default Workout;
