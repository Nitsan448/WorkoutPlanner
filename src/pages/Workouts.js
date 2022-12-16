import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../components/UI/Button";
import classes from "./Workouts.module.css";

function Workouts(props) {
	const navigate = useNavigate();
	const location = useLocation();

	function goToWorkoutHandler(workoutIndex) {
		navigate(`${location.pathname}/:${workoutIndex}`);
	}

	return (
		<div className={classes.workouts}>
			<div className={classes.gridContainer}>
				<Button onClick={() => goToWorkoutHandler(0)} text="Workout 1"></Button>
				<Button onClick={() => goToWorkoutHandler(1)} text="Workout 2"></Button>
				<Button onClick={() => goToWorkoutHandler(2)} text="Workout 3"></Button>
				<Button onClick={() => goToWorkoutHandler(3)} text="Workout 4"></Button>
				<Button onClick={() => goToWorkoutHandler(4)} text="Workout 5"></Button>
				<Button onClick={() => goToWorkoutHandler(5)} text="Workout 6"></Button>
			</div>
		</div>
	);
}

export default Workouts;
