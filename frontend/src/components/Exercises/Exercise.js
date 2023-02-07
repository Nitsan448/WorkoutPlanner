import React, { useState } from "react";
import classes from "./Exercise.module.css";
import { getTimeInTimerFormat } from "../../helpers/time";
import { useDeleteRoutineMutation, useUpdateRoutineMutation } from "../../store/apiSlice";
import ExerciseForm from "./ExerciseForm";
import { Draggable } from "react-beautiful-dnd";
import ImageInput from "../UI/ImageInput";

function Exercise(props) {
	const [editingExercise, setEditingExercise] = useState(false);

	const [deleteRoutine] = useDeleteRoutineMutation();
	const [updateRoutine] = useUpdateRoutineMutation();

	const image = props.image ? `${props.image}` : "";

	async function deleteExerciseHandler() {
		setEditingExercise(false);
		try {
			await deleteRoutine({ workout_id: props.workoutId, order_in_workout: props.orderInWorkout }).unwrap();
		} catch (error) {
			console.log(error.data);
		}
	}

	async function editExerciseHandler(routine) {
		const routineData = new FormData();
		for (var key in routine) {
			routineData.append(key, routine[key]);
		}

		try {
			await updateRoutine(routineData).unwrap();
			toggleExerciseFormOpenState(false);
		} catch (error) {
			console.log(error.data);
		}
	}

	function toggleExerciseFormOpenState(startEditing) {
		if (startEditing) {
			setEditingExercise(true);
			props.setNumberOfExerciseFormsOpen((numberOfExerciseFormsOpen) => numberOfExerciseFormsOpen + 1);
		} else {
			setEditingExercise(false);
			props.setNumberOfExerciseFormsOpen((numberOfExerciseFormsOpen) => numberOfExerciseFormsOpen - 1);
		}
	}

	function renderExercise() {
		const exerciseClass = !props.inEditMode ? `${classes.exercise} ${classes.notInButton}` : classes.exercise;
		return props.inEditMode ? (
			<button className={classes.exercise__button} onClick={() => toggleExerciseFormOpenState(true)}>
				{
					<Draggable
						draggableId={props.orderInWorkout.toString()}
						index={props.orderInWorkout}
						isDragDisabled={props.numberOfExerciseFormsOpen > 0}>
						{(provided) => (
							<div
								className={exerciseClass}
								ref={provided.innerRef}
								{...provided.draggableProps}
								{...provided.dragHandleProps}>
								{renderExerciseInformation()}
							</div>
						)}
					</Draggable>
				}
			</button>
		) : (
			<div className={exerciseClass}>{renderExerciseInformation()}</div>
		);
	}

	function renderExerciseInformation() {
		return (
			<>
				<ImageInput image={image} alt={props.name} allowImageChange={false} />
				<div>
					<h3 className={classes.exercise__name}>{props.name}</h3>
					<p>{props.description}</p>
					<div className={classes.routine}>
						{props.sets > 1 ? <h3>{props.sets} Sets</h3> : <h3>{props.sets} Set</h3>}
						<h3>Rest time: {getTimeInTimerFormat(props.restTime)} </h3>
						<h3>Set Time: {getTimeInTimerFormat(props.setTime)}</h3>
						<h3>Break after exercise: {getTimeInTimerFormat(props.breakAfterExercise)}</h3>
					</div>
				</div>
			</>
		);
	}

	return (
		<>
			{editingExercise && props.inEditMode ? (
				<ExerciseForm
					saveExerciseHandler={editExerciseHandler}
					deleteExerciseHandler={deleteExerciseHandler}
					cancelEditHandler={() => toggleExerciseFormOpenState(false)}
					exerciseImage={image}
					{...props}
				/>
			) : (
				renderExercise()
			)}
		</>
	);
}

export default Exercise;
