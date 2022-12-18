import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../components/UI/Button";
import classes from "./Workouts.module.css";

function Workouts(props) {
	const navigate = useNavigate();
	const location = useLocation();

	function viewWorkoutHandler(workoutIndex) {
		navigate(`${location.pathname}/:${workoutIndex}`);
	}

	function playWorkoutHandler(workoutIndex) {
		navigate(`${location.pathname}/:${workoutIndex}/playing`);
	}

	return (
		<div className={classes.workouts}>
			<div className={classes.gridContainer}>
				<div>
					<Button onClick={() => viewWorkoutHandler(0)} text="Simple and Sinister"></Button>
					<Button onClick={() => playWorkoutHandler(0)} text="Play"></Button>
				</div>
				<Button onClick={() => viewWorkoutHandler(1)} text="Push ups and pull ups"></Button>
				<Button onClick={() => viewWorkoutHandler(2)} text="Armor building complex"></Button>
			</div>
			{/* <Button onClick={() => goToWorkoutHandler(3)} text="Add workout"></Button> */}
		</div>
	);
}

export default Workouts;
