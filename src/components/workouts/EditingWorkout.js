import React, { useState } from "react";
import useInput from "../../hooks/use-input";
import ExerciseForm from "../Exercises/ExerciseForm";
import classes from "../Exercises/ExerciseForm.module.css";
import Button from "../UI/Button";
import EditingExercise from "../Exercises/EditingExercise";

function EditingWorkout(props) {
	const workout = props.workout ? props.workout : { name: "", description: "", exercises: [] };

	const [exercises, setExercises] = useState(workout.exercises);

	const workoutNameInput = useInput((value) => value.trim().length > 0, workout.name);
	const workoutDescriptionInput = useInput((value) => true, workout.description);

	const workoutNameInputClasses = workoutNameInput.hasError ? classes.invalid : "";

	function getExerciseAsComponent(exercise) {
		return (
			<EditingExercise
				deleteFromWorkout={deleteExercise}
				orderInWorkout={exercise.order_in_workout}
				key={exercise.exercise_id}
				name={exercise.name}
				setTime={exercise.set_time}
				sets={exercise.sets}
				restTime={exercise.rest_time}
				description={exercise.description}
			/>
		);
	}

	function addExercise(exercise) {
		setExercises([...exercises, exercise]);
	}

	function deleteExercise(orderInWorkout) {
		setExercises((exercises) => exercises.filter((exercise) => exercise.order_in_workout !== orderInWorkout));
	}

	return (
		<>
			<div className={classes.form}>
				<form>
					<div className={classes.form_group}>
						<label>Workout name</label>
						<input
							className={workoutNameInputClasses}
							type="text"
							value={workoutNameInput.value}
							onChange={workoutNameInput.valueChangeHandler}
							onBlur={workoutNameInput.inputBlurHandler}></input>
					</div>
					<div className={classes.form_group}>
						<label>Description</label>
						<textarea
							value={workoutDescriptionInput.value}
							onChange={workoutDescriptionInput.valueChangeHandler}
							onBlur={workoutDescriptionInput.inputBlurHandler}></textarea>
					</div>
				</form>
				<ul>{exercises.map((exercise) => getExerciseAsComponent(exercise))}</ul>
				<ExerciseForm addToWorkout={addExercise} orderInWorkout={workout.exercises.length + 1} />
			</div>

			{/* TODO: send workout name and description to server and update components on button click */}
			<Button text="Finish editing" />
		</>
	);
}

export default EditingWorkout;
