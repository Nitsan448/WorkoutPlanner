import React, { useState } from "react";
import classes from "./Exercise.module.css";
import { getTimeInTimerFormat } from "../../helpers/time";
import { useDeleteRoutineMutation, useUpdateRoutineMutation } from "../../store/apiSlice";
import ExerciseForm from "./ExerciseForm";

function Exercise(props) {
	const [editingExercise, setEditingExercise] = useState(false);

	const [deleteRoutine] = useDeleteRoutineMutation();
	const [updateRoutine] = useUpdateRoutineMutation();

	async function deleteExerciseHandler() {
		try {
			await deleteRoutine({ workout_id: props.workoutId, order_in_workout: props.orderInWorkout }).unwrap();
		} catch (error) {
			console.log(error.message);
		}
	}

	async function editExerciseHandler(routine) {
		try {
			await updateRoutine(routine).unwrap();
			setEditingExercise(false);
		} catch (error) {
			console.log(error.message);
		}
	}

	function renderExercise() {
		const exerciseClass = !props.canEdit ? `${classes.exercise} ${classes.notInButton}` : classes.exercise;
		return (
			<div className={exerciseClass}>
				<div className={classes.exercise__image}></div>
				<div>
					<h3 className={classes.exercise__name}>{props.name}</h3>
					<p>{props.description}</p>
					<div className={classes.routine}>
						{props.sets > 1 ? <h3>{props.sets} Sets</h3> : <h3>{props.sets} Set</h3>}
						<h3>Rests: {getTimeInTimerFormat(props.restTime)} </h3>
						<h3>Set Time: {getTimeInTimerFormat(props.setTime)}</h3>
						<h3>Break after: {getTimeInTimerFormat(props.breakAfterExercise)}</h3>
					</div>
				</div>
			</div>
		);
	}

	return (
		<>
			{editingExercise && props.canEdit ? (
				<ExerciseForm
					saveExerciseHandler={editExerciseHandler}
					deleteExerciseHandler={deleteExerciseHandler}
					cancelEditHandler={() => setEditingExercise(false)}
					{...props}
				/>
			) : props.canEdit ? (
				<button className={classes.exercise__button} onClick={() => setEditingExercise(true)}>
					{renderExercise()}
				</button>
			) : (
				renderExercise()
			)}
		</>
	);
}

export default Exercise;
