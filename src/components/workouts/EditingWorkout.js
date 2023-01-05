import React from "react";
import ExerciseForm from "../Exercises/ExerciseForm";
import classes from "../Exercises/ExerciseForm.module.css";
import Button from "../UI/Button";
import EditingExercise from "../Exercises/EditingExercise";
import { useLocation, useNavigate } from "react-router-dom";
import { useEditWorkoutMutation, useDeleteWorkoutMutation } from "../../store/apiSlice";
import { useForm } from "react-hook-form";

function EditingWorkout(props) {
	const location = useLocation();
	const navigate = useNavigate();

	const [updateWorkout] = useEditWorkoutMutation();

	const [deleteWorkout] = useDeleteWorkoutMutation();

	async function onDeleteWorkoutClicked(workout_id) {
		try {
			await deleteWorkout({ workout_id });
			navigate(`/workouts`);
		} catch (error) {
			console.log("failed to delete workout", error);
		}
	}

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

	async function saveWorkoutHandler(data) {
		console.log(data);
		try {
			await updateWorkout({
				name: data.name,
				description: data.description,
				workout_id: props.workout.workout_id,
			});
			navigate(`${location.pathname}?mode=view`);
		} catch (error) {
			console.log(error);
		}
	}

	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm({
		defaultValues: {
			name: props.workout.name,
			description: props.workout.description,
		},
	});

	return (
		<>
			<div className={classes.form}>
				<form>
					<div className={classes.form_group}>
						<label htmlFor="name">Name:</label>
						<input type="text" {...register("name", { required: true })} />
						{errors.name && <p className={classes.invalid}>Workout name can not be empty</p>}
					</div>
					<div className={classes.form_group}>
						<label htmlFor="description">Description:</label>
						<input type="description" {...register("description")} />
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
				<Button text="Save workout" onClick={handleSubmit(async (data) => saveWorkoutHandler(data))} />
			</div>
			<Button onClick={() => onDeleteWorkoutClicked(props.workout.workout_id)} text="Delete" />
		</>
	);
}

export default EditingWorkout;
