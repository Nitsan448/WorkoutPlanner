import React, { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../components/UI/Button";
import classes from "./Workouts.module.css";
import { useGetWorkoutsQuery, useAddWorkoutMutation } from "../store/apiSlice";

function Workouts(props) {
	const navigate = useNavigate();
	const location = useLocation();

	const {
		data: workouts,
		isLoading: isWorkoutsRequestLoading,
		isSuccess: isWorkoutsRequestSuccess,
		isError: isWorkoutsRequestError,
		error: workoutsRequestError,
		refetch: refetchWorkouts,
	} = useGetWorkoutsQuery();

	const [addWorkout, { isLoading: isAddWorkoutRequestLoading }] = useAddWorkoutMutation();

	const goToWorkoutHandler = useCallback(
		(workoutIndex, mode) => {
			navigate(`${location.pathname}/${workoutIndex}?mode=${mode}`);
		},
		[navigate, location]
	);

	async function onAddWorkoutClicked() {
		try {
			await addWorkout({
				name: "",
				description: "",
			});
		} catch (error) {
			console.log("failed to add workout", error);
		}
	}

	let content;
	if (isWorkoutsRequestLoading) {
		content = <h1>Loading...</h1>;
	} else if (isWorkoutsRequestSuccess) {
		content = workouts.map((workout) => (
			<div key={workout.workout_id}>
				<Button onClick={() => goToWorkoutHandler(workout.workout_id, "view")} text={workout.name} />
				<Button onClick={() => goToWorkoutHandler(workout.workout_id, "edit")} text="Edit" />
				<Button onClick={() => goToWorkoutHandler(workout.workout_id, "play")} text="Play" />
				<h3>{workout.description}</h3>
			</div>
		));
	} else if (isWorkoutsRequestError) {
		content = <div>{workoutsRequestError.toString()}</div>;
	}

	return (
		<div className={classes.workouts}>
			<div className={classes.gridContainer}>{content}</div>
			<Button onClick={onAddWorkoutClicked} text="Add workout" />
		</div>
	);
}

export default Workouts;
