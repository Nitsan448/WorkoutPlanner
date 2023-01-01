import React, { useState } from "react";
import useInput from "../../hooks/use-input";
import ExerciseForm from "../Exercises/ExerciseForm";
import classes from "../Exercises/ExerciseForm.module.css";
import Button from "../UI/Button";
import Exercise from "../Exercises/Exercise";

function EditingWorkout(props) {
	let workout = props.workout;
	if (!workout) {
		workout = {
			name: "",
			description: "",
			exercises,
		};
	}
	const [exercises, setExercises] = useState(workout.exercises);
	const workoutNameInput = useInput((value) => value.trim().length > 0, workout.name);
	const workoutNameInputClasses = workoutNameInput.hasError ? classes.invalid : "";

	const workoutDescriptionInput = useInput((value) => value.trim().length > 0, workout.description);
	const workoutDescriptionInputClasses = workoutDescriptionInput.hasError ? classes.invalid : "";

	function getExerciseAsComponent(exercise) {
		return (
			<Exercise
				key={exercise.exercise_id}
				name={exercise.name}
				setTime={exercise.set_time}
				sets={exercise.sets}
				restTime={exercise.rest_time}
				description={exercise.description}
			/>
		);
	}

	function addExerciseToWorkout(exercise) {
		setExercises([...exercises, exercise]);
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
						<input
							className={workoutDescriptionInputClasses}
							type="text"
							value={workoutDescriptionInput.value}
							onChange={workoutDescriptionInput.valueChangeHandler}
							onBlur={workoutDescriptionInput.inputBlurHandler}></input>
					</div>
				</form>
				<ul>{exercises.map((exercise) => getExerciseAsComponent(exercise))}</ul>
			</div>
			<ExerciseForm addToWorkout={addExerciseToWorkout} orderInWorkout={workout.exercises.length + 1} />
		</>
	);
}

export default EditingWorkout;
