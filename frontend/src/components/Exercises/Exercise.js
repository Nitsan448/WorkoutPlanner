import React, { useState } from "react";
import classes from "./Exercise.module.css";
import { getTimeInTimerFormat } from "../../helpers/time";
import Button from "../UI/Button";
import { useDeleteRoutineMutation, useUpdateRoutineMutation } from "../../store/apiSlice";
import ExerciseForm from "./ExerciseForm";

function Exercise(props) {
	const [editingExercise, setEditingExercise] = useState(false);

	const [deleteRoutine] = useDeleteRoutineMutation();
	const [updateRoutine] = useUpdateRoutineMutation();

	async function onDeleteClicked() {
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

	return (
		<>
			{editingExercise ? (
				<ExerciseForm saveExerciseHandler={editExerciseHandler} {...props} />
			) : (
				<div className={classes.exercise}>
					<div className={classes.exercise__image}></div>
					<div>
						{/* <button></button> */}
						<h3>{props.name}</h3>
						<p>{props.description}</p>
						<div className={classes.routine}>
							{props.sets > 1 ? <h3>{props.sets} Sets</h3> : <h3>{props.sets} Set</h3>}
							<h3>Break between sets: {getTimeInTimerFormat(props.restTime)} </h3>
							<h3>Set Time: {getTimeInTimerFormat(props.setTime)}</h3>
						</div>
						{props.canEdit ? (
							<>
								<Button text="Edit" onClick={() => setEditingExercise(true)} />
								<Button onClick={onDeleteClicked} text="Delete" />
							</>
						) : (
							""
						)}
					</div>
				</div>
			)}
		</>
	);
}

export default Exercise;
