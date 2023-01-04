import React from "react";
import classes from "./Exercise.module.css";
import { getTimeInTimerFormat } from "../../helpers/time";
import Button from "../UI/Button";
import useHttp from "../../hooks/use-http";
import { deleteRoutineRequest } from "../../lib/routinesApi";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { workoutActions } from "../../store/workout-slice";

function EditingExercise(props) {
	const dispatch = useDispatch();
	const workoutId = useSelector((state) => state.workout.workoutId);

	const {
		sendRequest: sendDeleteRoutineRequest,
		// error: deleteRoutineError,
		// status: deleteRoutineStatus,
	} = useHttp(deleteRoutineRequest, false);

	function deleteExercise() {
		sendDeleteRoutineRequest({ workoutId, orderInWorkout: props.orderInWorkout });
		dispatch(workoutActions.removeExercise(props.orderInWorkout));
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
				<Button text="Delete" onClick={deleteExercise} />
			</div>
		</>
	);
}

export default EditingExercise;
