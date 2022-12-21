import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../components/UI/Button";
import classes from "./Workouts.module.css";
import useHttp from "../hooks/use-http";
import { fetchWorkoutNames } from "../lib/workoutsApi";

function Workouts(props) {
	const navigate = useNavigate();
	const location = useLocation();

	const {
		sendRequest: sendFetchWorkoutNamesRequest,
		status: fetchWorkoutNamesStatus,
		data: workoutNames,
		error: fetchWorkoutNamesError,
	} = useHttp(fetchWorkoutNames, true);

	useEffect(() => {
		sendFetchWorkoutNamesRequest();
	}, []);

	function viewWorkoutHandler(workoutIndex) {
		navigate(`${location.pathname}/:${workoutIndex}?playing=false`);
	}

	function playWorkoutHandler(workoutIndex) {
		navigate(`${location.pathname}/:${workoutIndex}?playing=true`);
	}

	if (fetchWorkoutNamesStatus === "pending") {
		return <h2>Fetching Workout Names data...</h2>;
	}
	if (fetchWorkoutNamesError) {
		return (
			<div>
				<h2>There was an error fetching workout data</h2>
				<p>{fetchWorkoutNamesError}</p>
			</div>
		);
	}

	return (
		<div className={classes.workouts}>
			<div className={classes.gridContainer}>
				{workoutNames.map((workoutName, index) => (
					<div>
						<Button onClick={() => viewWorkoutHandler(index)} text={workoutName}></Button>
						<Button onClick={() => playWorkoutHandler(index)} text="Play"></Button>
					</div>
				))}
				{/* <div>
					<Button onClick={() => viewWorkoutHandler(0)} text="Simple and Sinister"></Button>
					<Button onClick={() => playWorkoutHandler(0)} text="Play"></Button>
				</div>
				<div>
					<Button onClick={() => viewWorkoutHandler(1)} text="Push ups and pull ups"></Button>
					<Button onClick={() => playWorkoutHandler(1)} text="Play"></Button>
				</div>
				<div>
					<Button onClick={() => viewWorkoutHandler(2)} text="Armor building complex"></Button>
					<Button onClick={() => playWorkoutHandler(2)} text="Play"></Button>
				</div> */}
			</div>
		</div>
	);
}

export default Workouts;
