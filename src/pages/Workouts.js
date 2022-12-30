import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../components/UI/Button";
import classes from "./Workouts.module.css";
import useHttp from "../hooks/use-http";
import { fetchWorkouts } from "../lib/workoutsApi";

function Workouts(props) {
	const navigate = useNavigate();
	const location = useLocation();

	const {
		sendRequest: sendFetchWorkoutsRequest,
		status: fetchWorkoutsStatus,
		data: workouts,
		error: fetchWorkoutsError,
	} = useHttp(fetchWorkouts, true);

	useEffect(() => {
		sendFetchWorkoutsRequest();
	}, [sendFetchWorkoutsRequest]);

	function viewWorkoutHandler(workoutIndex) {
		navigate(`${location.pathname}/${workoutIndex}?playing=false`);
	}

	function playWorkoutHandler(workoutIndex) {
		navigate(`${location.pathname}/${workoutIndex}?playing=true`);
	}

	if (fetchWorkoutsStatus === "pending") {
		return <h2>Fetching Workout Names data...</h2>;
	}
	if (fetchWorkoutsError) {
		return (
			<div>
				<h2>There was an error fetching workout data</h2>
				<p>{fetchWorkoutsError}</p>
			</div>
		);
	}

	return (
		<div className={classes.workouts}>
			<div className={classes.gridContainer}>
				{workouts.map((workout, index) => (
					<div key={index + 1}>
						<Button onClick={() => viewWorkoutHandler(index + 1)} text={workout.name} />
						<Button onClick={() => playWorkoutHandler(index + 1)} text="Play" />
						<h3>{workout.description}</h3>
					</div>
				))}
			</div>
		</div>
	);
}

export default Workouts;
