import React from "react";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import PlayingWorkout from "../components/workouts/PlayingWorkout";
import EditingWorkout from "../components/workouts/EditingWorkout";
import { useGetWorkoutQuery } from "../store/apiSlice";
import { useDispatch } from "react-redux";
import { showModal } from "../store/errorModalSlice";
import { useState, useEffect } from "react";

function Workout(props) {
	const location = useLocation();
	const dispatch = useDispatch();
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

	useEffect(() => {
		if (isWorkoutRequestError) {
			dispatch(showModal(workoutRequestError.error.toString()));
		}
	}, [isWorkoutRequestError]);

	let content;
	if (isWorkoutRequestLoading) {
		content = <h1>Loading...</h1>;
	} else if (isWorkoutRequestSuccess) {
		content = (
			<>
				{workoutMode === "play" ? (
					workout.routines.length > 0 ? (
						<PlayingWorkout workout={workout} />
					) : (
						<>
							<h1>This workout is empty</h1>
							<h3>Add some exercises and then try playing it again.</h3>
						</>
					)
				) : (
					<EditingWorkout workout={workout} inEditMode={workoutMode === "edit"} />
				)}
			</>
		);
	} else if (isWorkoutRequestError) {
		content = "";
	}

	return <>{content}</>;
}

export default Workout;
