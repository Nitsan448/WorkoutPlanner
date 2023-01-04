import React from "react";
import classes from "./Exercise.module.css";
import { getTimeInTimerFormat } from "../../helpers/time";
import Button from "../UI/Button";
import { useDeleteRoutineMutation } from "../../store/apiSlice";

function EditingExercise(props) {
	const [deleteRoutine] = useDeleteRoutineMutation();

	async function onDeleteClicked() {
		console.log(props.workoutId);
		deleteRoutine({ workout_id: props.workoutId, order_in_workout: props.orderInWorkout });
	}

	return (
		<>
			<div className={classes.exercise}>
				<h3>{props.name}</h3>
				<p>Set Time: {getTimeInTimerFormat(props.setTime)}</p>
				<p>Sets: {props.sets}</p>
				<p>Rest time: {getTimeInTimerFormat(props.restTime)}</p>
				<p>Description: {props.description}</p>
				<Button text="Edit" onClick={() => {}} />
				<Button onClick={onDeleteClicked} text="Delete" />
			</div>
		</>
	);
}

export default EditingExercise;
