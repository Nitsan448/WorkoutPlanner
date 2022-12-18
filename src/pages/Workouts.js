import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../components/UI/Button";
import useInput from "../hooks/use-input";
import classes from "./Workouts.module.css";

function Workouts(props) {
	const navigate = useNavigate();
	const location = useLocation();

	const workoutNameInput = useInput((value) => value.trim() === "");
	const [addWorkoutFormIsOpen, setAddWorkoutFormIsOpen] = useState(false);

	function goToWorkoutHandler(workoutIndex) {
		navigate(`${location.pathname}/:${workoutIndex}`);
	}

	return (
		<div className={classes.workouts}>
			<div className={classes.gridContainer}>
				<Button onClick={() => goToWorkoutHandler(0)} text="Simple and Sinister"></Button>
				<Button onClick={() => goToWorkoutHandler(1)} text="Dry figthing weight"></Button>
				<Button onClick={() => goToWorkoutHandler(2)} text="Armor building complex"></Button>
			</div>
			{addWorkoutFormIsOpen ? (
				<form onSubmit={() => setAddWorkoutFormIsOpen(false)}>
					<input
						type="text"
						value={workoutNameInput.value}
						onChange={workoutNameInput.valueChangeHandler}
						onBlur={workoutNameInput.inputBlurHandler}
					/>
					{workoutNameInput.isValid && <p>Workout name cannt be empty</p>}
					<Button text="Add workout"></Button>
				</form>
			) : (
				<Button onClick={() => setAddWorkoutFormIsOpen(true)} text="Add workout"></Button>
			)}
		</div>
	);
}

export default Workouts;
