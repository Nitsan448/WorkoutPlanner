import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../components/UI/Button";
import classes from "./Workouts.module.css";
import useHttp from "../hooks/use-http";
import { fetchWorkouts, addNewWorkout } from "../lib/workoutsApi";

function Workouts(props) {
	const navigate = useNavigate();
	const location = useLocation();

	const {
		sendRequest: sendFetchWorkoutsRequest,
		status: fetchWorkoutsStatus,
		data: workouts,
		error: fetchWorkoutsError,
	} = useHttp(fetchWorkouts, true);

	const {
		sendRequest: sendAddNewWorkoutRequest,
		status: addNewWorkoutStatus,
		data: createdWorkoutId,
		error: addNewWorkoutError,
	} = useHttp(addNewWorkout, false);

	useEffect(() => {
		sendFetchWorkoutsRequest();
	}, [sendFetchWorkoutsRequest]);

	useEffect(() => {
		if (addNewWorkoutStatus === "completed" && !addNewWorkoutError) {
			goToWorkoutHandler(createdWorkoutId, "edit");
		}
	}, [addNewWorkoutStatus, addNewWorkoutError]);

	function goToWorkoutHandler(workoutIndex, mode) {
		navigate(`${location.pathname}/${workoutIndex}?mode=${mode}`);
	}

	function createNewWorkout() {
		sendAddNewWorkoutRequest();
	}

	if (fetchWorkoutsStatus === "pending") {
		return <h2>Fetching Workout Names data...</h2>;
	}
	if (fetchWorkoutsError || addNewWorkoutError) {
		return (
			<div>
				<h2>There was an error connecting to the server</h2>
				<p>{fetchWorkoutsError ? fetchWorkoutsError : addNewWorkoutError}</p>
			</div>
		);
	}
	return (
		<div className={classes.workouts}>
			<div className={classes.gridContainer}>
				{workouts.map((workout) => (
					<div key={workout.workout_id}>
						<Button onClick={() => goToWorkoutHandler(workout.workout_id, "view")} text={workout.name} />
						<Button onClick={() => goToWorkoutHandler(workout.workout_id, "edit")} text="Edit" />
						<Button onClick={() => goToWorkoutHandler(workout.workout_id, "play")} text="Play" />
						<h3>{workout.description}</h3>
					</div>
				))}
			</div>
			<Button onClick={createNewWorkout} text="Add workout" />
		</div>
	);
}

export default Workouts;
