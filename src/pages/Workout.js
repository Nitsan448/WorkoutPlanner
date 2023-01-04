import React, { useEffect, useState } from "react";
import { fetchWorkoutRequest, fetchRoutinesRequest } from "../lib/workoutsApi";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
// import useHttp from "../hooks/use-http";
import PlayingWorkout from "../components/workouts/PlayingWorkout";
import ViewingWorkout from "../components/workouts/ViewingWorkout";
import EditingWorkout from "../components/workouts/EditingWorkout";
// import { useDispatch } from "react-redux";
// import { workoutActions } from "../store/workout-slice";
import { useGetWorkoutQuery } from "../store/apiSlice";

function Workout(props) {
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const workoutMode = queryParams.get("mode");

	const params = useParams();
	const { workoutId } = params;

	const {
		data: workout,
		isLoading: isWorkoutRequestLoading,
		isSuccess: isWorkoutRequestSuccess,
		isError: isWorkoutRequestError,
		error: workoutRequestError,
	} = useGetWorkoutQuery(workoutId);
	// const [workoutFetched, setWorkoutFetched] = useState(false);

	// const dispatch = useDispatch();

	// const {
	// 	sendRequest: sendFetchWorkoutRequest,
	// 	status: fetchWorkoutStatus,
	// 	data: workoutData,
	// 	error: fetchWorkoutError,
	// } = useHttp(fetchWorkoutRequest, true);

	// const {
	// 	sendRequest: sendFetchRoutinesRequest,
	// 	status: fetchRoutinesStatus,
	// 	data: routinesData,
	// 	error: fetchRoutinesError,
	// } = useHttp(fetchRoutinesRequest, true);

	// useEffect(() => {
	// 	sendFetchWorkoutRequest(workoutId);
	// 	sendFetchRoutinesRequest(workoutId);
	// }, [sendFetchWorkoutRequest, sendFetchRoutinesRequest, workoutId]);

	// useEffect(() => {
	// 	if (
	// 		!fetchRoutinesError &&
	// 		!fetchWorkoutError &&
	// 		fetchWorkoutStatus === "completed" &&
	// 		fetchRoutinesStatus === "completed"
	// 	) {
	// 		dispatch(
	// 			workoutActions.replaceWorkout({
	// 				name: workoutData[0].name,
	// 				description: workoutData[0].description,
	// 				workoutId,
	// 				exercises: routinesData,
	// 			})
	// 		);
	// 		setWorkoutFetched(true);
	// 	}
	// }, [
	// 	fetchWorkoutError,
	// 	fetchRoutinesError,
	// 	fetchRoutinesStatus,
	// 	fetchWorkoutStatus,
	// 	routinesData,
	// 	workoutData,
	// 	dispatch,
	// 	workoutId,
	// ]);

	// if (fetchWorkoutError || fetchRoutinesError) {
	// 	return (
	// 		<div>
	// 			<h2>There was an error fetching workout data</h2>
	// 			<p>{fetchWorkoutError}</p>
	// 		</div>
	// 	);
	// }
	// if (fetchWorkoutStatus === "pending" || fetchRoutinesStatus === "pending" || !workoutFetched) {
	// 	return <h2>Fetching workout data...</h2>;
	// }

	let content;
	if (isWorkoutRequestLoading) {
		content = <h1>Loading...</h1>;
	} else if (isWorkoutRequestSuccess) {
		content = (
			<>
				{workoutMode === "view" && <ViewingWorkout />}
				{workoutMode === "play" && <PlayingWorkout />}
				{workoutMode === "edit" && <EditingWorkout />}
			</>
		);
	} else if (isWorkoutRequestError) {
		content = <div>{workoutRequestError.toString()}</div>;
	}

	return <>{content}</>;
}

export default Workout;
