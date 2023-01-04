import React from "react";
import useInput from "../../hooks/use-input";
import ExerciseForm from "../Exercises/ExerciseForm";
import classes from "../Exercises/ExerciseForm.module.css";
import Button from "../UI/Button";
import EditingExercise from "../Exercises/EditingExercise";
import { useLocation, useNavigate } from "react-router-dom";
import { useEditWorkoutMutation } from "../../store/apiSlice";

function EditingWorkout(props) {
	const location = useLocation();
	const navigate = useNavigate();

	const workoutNameInput = useInput((value) => value.trim().length > 0, props.workout.name);
	const workoutDescriptionInput = useInput((value) => true, props.workout.description);

	const workoutNameInputClasses = workoutNameInput.hasError ? classes.invalid : "";

	const [updateWorkout] = useEditWorkoutMutation();

	function getExerciseAsComponent(exercise) {
		return (
			<EditingExercise
				workoutId={props.workout.workout_id}
				orderInWorkout={exercise.order_in_workout}
				key={exercise.order_in_workout}
				name={exercise.name}
				setTime={exercise.set_time}
				sets={exercise.sets}
				restTime={exercise.rest_time}
				description={exercise.description}
			/>
		);
	}

	async function onSaveWorkoutClicked() {
		await updateWorkout({
			name: workoutNameInput.value,
			description: workoutDescriptionInput.value,
			workout_id: props.workout.workout_id,
		});
		//TODO: only navigate after workout finished updating
		navigate(`${location.pathname}?mode=view`);
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
				{props.workout.routines ? (
					<ul>{props.workout.routines.map((routine) => getExerciseAsComponent(routine))}</ul>
				) : (
					""
				)}
				<ExerciseForm
					orderInWorkout={props.workout.routines ? props.workout.routines.length + 1 : 0}
					workoutId={props.workout.workout_id}
				/>
			</div>
			<Button onClick={onSaveWorkoutClicked} text="Save workout" />
		</>
	);
}

export default EditingWorkout;
