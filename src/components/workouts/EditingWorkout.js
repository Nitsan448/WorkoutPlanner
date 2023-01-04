import React, { useEffect, useState } from "react";
import useInput from "../../hooks/use-input";
import ExerciseForm from "../Exercises/ExerciseForm";
import classes from "../Exercises/ExerciseForm.module.css";
import Button from "../UI/Button";
import EditingExercise from "../Exercises/EditingExercise";
import { editWorkoutRequest } from "../../lib/workoutsApi";
import useHttp from "../../hooks/use-http";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { workoutActions } from "../../store/workout-slice";

function EditingWorkout(props) {
	const location = useLocation();
	const navigate = useNavigate();

	const dispatch = useDispatch();
	const workout = useSelector((state) => state.workout);
	const [workoutDryData, setWorkoutDryData] = useState();

	const workoutNameInput = useInput((value) => value.trim().length > 0, workout.name);
	const workoutDescriptionInput = useInput((value) => true, workout.description);

	const workoutNameInputClasses = workoutNameInput.hasError ? classes.invalid : "";

	function getExerciseAsComponent(exercise) {
		return (
			<EditingExercise
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

	function addExercise(exercise) {
		dispatch(workoutActions.addExercise(exercise));
	}

	const {
		sendRequest: sendEditWorkoutRequest,
		status: editWorkoutStatus,
		error: editWorkoutError,
	} = useHttp(editWorkoutRequest, false);

	function finishEditingHandler() {
		setWorkoutDryData({
			name: workoutNameInput.value,
			description: workoutDescriptionInput.value,
			workout_id: workout.workoutId,
		});
		sendEditWorkoutRequest(workoutDryData);
	}

	useEffect(() => {
		if (editWorkoutStatus === "completed" && !editWorkoutError) {
			dispatch(
				workoutActions.replaceWorkout({
					...workoutDryData,
					exercises: workout.exercises,
				})
			);
			navigate(`${location.pathname}?mode=view`);
		}
	}, [editWorkoutStatus, editWorkoutError, navigate, location.pathname]);

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
				<ul>{workout.exercises.map((exercise) => getExerciseAsComponent(exercise))}</ul>
				<ExerciseForm addToWorkout={addExercise} orderInWorkout={workout.exercises.length + 1} />
			</div>
			<Button onClick={finishEditingHandler} text="Finish editing" />
		</>
	);
}

export default EditingWorkout;
