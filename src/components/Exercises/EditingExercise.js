import React from "react";
import classes from "./Exercise.module.css";
import { getTimeInTimerFormat } from "../../helpers/time";
import Button from "../UI/Button";
import useHttp from "../../hooks/use-http";
import { deleteRoutineRequest } from "../../lib/routinesApi";
import { useParams } from "react-router-dom";

function EditingExercise(props) {
	const params = useParams();
	const { workoutId } = params;
	const {
		sendRequest: sendDeleteRoutineRequest,
		error: deleteRoutineError,
		status: deleteRoutineStatus,
	} = useHttp(deleteRoutineRequest, false);

	function deleteExercise() {
		sendDeleteRoutineRequest({ workoutId, orderInWorkout: props.orderInWorkout });
		props.deleteFromWorkout(props.orderInWorkout);
	}

	return (
		<>
			<div className={classes.exercise}>
				<h3>{props.name}</h3>
				<p>Set Time: {getTimeInTimerFormat(props.setTime)}</p>
				<p>Sets: {props.sets}</p>
				<p>Rest time: {getTimeInTimerFormat(props.restTime)}</p>
				<p>Description: {props.description}</p>
				<Button text="Delete" onClick={deleteExercise} />
			</div>
		</>
	);
}

export default EditingExercise;
