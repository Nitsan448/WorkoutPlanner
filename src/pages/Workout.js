import React, { useEffect } from "react";
import { fetchWorkoutData, fetchRoutinesData } from "../lib/workoutsApi";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import useHttp from "../hooks/use-http";
import PlayingWorkout from "../components/workouts/PlayingWorkout";
import ViewingWorkout from "../components/workouts/ViewingWorkout";

// let isInitial = true;

function Workout(props) {
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const workoutMode = queryParams.get("mode");

	const params = useParams();
	const { workoutId } = params;

	const {
		sendRequest: sendFetchWorkoutRequest,
		status: fetchWorkoutStatus,
		data: workoutData,
		error: fetchWorkoutError,
	} = useHttp(fetchWorkoutData, true);

	const {
		sendRequest: sendFetchRoutinesRequest,
		status: fetchRoutinesStatus,
		data: routinesData,
		error: fetchRoutinesError,
	} = useHttp(fetchRoutinesData, true);

	useEffect(() => {
		sendFetchWorkoutRequest(workoutId);
		sendFetchRoutinesRequest(workoutId);
	}, [sendFetchWorkoutRequest, sendFetchRoutinesRequest, workoutId]);

	// useEffect(() => {
	// 	if (workout.changed && !isInitial) {
	// 		dispatch(sendWorkoutData(workout, workoutId));
	// 	}
	// 	isInitial = false;
	// }, [workout, workoutId, dispatch]);

	if (fetchWorkoutStatus === "pending" || fetchRoutinesStatus === "pending") {
		return <h2>Fetching workout data...</h2>;
	}
	if (fetchWorkoutError || fetchRoutinesError) {
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
		exercises: routinesData,
	};

	return (
		<>
			{workoutMode === "view" && <ViewingWorkout workout={workout} />}
			{workoutMode === "play" && <PlayingWorkout workout={workout} />}
		</>
	);
}

export default Workout;
