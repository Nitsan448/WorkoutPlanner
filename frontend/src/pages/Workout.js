import React from "react";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import PlayingWorkout from "../components/workouts/PlayingWorkout";
import ViewingWorkout from "../components/workouts/ViewingWorkout";
import EditingWorkout from "../components/workouts/EditingWorkout";
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

	let content;
	if (isWorkoutRequestLoading) {
		content = <h1>Loading...</h1>;
	} else if (isWorkoutRequestSuccess) {
		content = (
			<>
				{workoutMode === "view" && <ViewingWorkout workout={workout} />}
				{workoutMode === "play" && <PlayingWorkout workout={workout} />}
				{workoutMode === "edit" && <EditingWorkout workout={workout} />}
			</>
		);
	} else if (isWorkoutRequestError) {
		content = <div>{workoutRequestError.toString()}</div>;
	}

	return <>{content}</>;
}

export default Workout;
