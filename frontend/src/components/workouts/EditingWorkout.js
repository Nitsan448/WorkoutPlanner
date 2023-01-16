import React, { useCallback, useEffect } from "react";
import NewExerciseForm from "../Exercises/NewExerciseForm";
import classes from "./Workout.module.css";
import Button from "../UI/Button";
import Exercise from "../Exercises/Exercise";
import { useLocation, useNavigate } from "react-router-dom";
import { useUpdateWorkoutMutation, useDeleteWorkoutMutation } from "../../store/apiSlice";
import { useForm } from "react-hook-form";

function EditingWorkout(props) {
	let deleteWorkoutOnUnmount = props.workout.name === "";
	const location = useLocation();
	const navigate = useNavigate();

	const [updateWorkout] = useUpdateWorkoutMutation();

	const [deleteWorkout] = useDeleteWorkoutMutation();

	const workoutId = props.workout.workout_id;

	const handleWorkoutDeletionOnUnmount = useCallback(
		(event) => {
			event && event.preventDefault();
			if (deleteWorkoutOnUnmount) {
				deleteWorkout({ workout_id: workoutId });
			}
		},
		[deleteWorkout, deleteWorkoutOnUnmount, workoutId]
	);

	useEffect(() => {
		window.addEventListener("beforeunload", handleWorkoutDeletionOnUnmount);
		return () => {
			window.removeEventListener("beforeunload", handleWorkoutDeletionOnUnmount);
			handleWorkoutDeletionOnUnmount();
		};
	}, [handleWorkoutDeletionOnUnmount]);

	async function onDeleteWorkoutClicked() {
		deleteWorkoutOnUnmount = true;
		navigate(`/workouts`);
	}

	function getExerciseAsComponent(exercise) {
		return (
			<Exercise
				workoutId={workoutId}
				orderInWorkout={exercise.order_in_workout}
				key={exercise.order_in_workout}
				name={exercise.name}
				setTime={exercise.set_time}
				sets={exercise.sets}
				restTime={exercise.rest_time}
				description={exercise.description}
				canEdit={true}
			/>
		);
	}

	async function saveWorkoutHandler(data) {
		try {
			await updateWorkout({
				name: data.name,
				description: data.description,
				workout_id: workoutId,
			}).unwrap();
			deleteWorkoutOnUnmount = false;
			clearErrors();
			navigate(`${location.pathname}?mode=view`);
		} catch (error) {
			setError("name", { message: error.data });
		}
	}

	const {
		register,
		formState: { errors },
		handleSubmit,
		setError,
		clearErrors,
	} = useForm({
		defaultValues: {
			name: props.workout.name,
			description: props.workout.description,
		},
	});

	return (
		<>
			<div className={classes.container}>
				<div className={classes.workout}>
					<div className={classes.container__workoutImage}></div>
					<div>
						<label htmlFor="name">Name:</label>
						<input
							type="text"
							className={errors.name ? classes.invalid : ""}
							{...register("name", { required: "Workout name can not be empty" })}
						/>
						{errors.name && <p className={classes.invalid}>{errors.name.message}</p>}
					</div>
					<div>
						<label htmlFor="description">Description:</label>
						<input type="description" {...register("description")} />
					</div>
				</div>
				<div>
					{props.workout.routines ? (
						<ul>{props.workout.routines.map((routine) => getExerciseAsComponent(routine))}</ul>
					) : (
						""
					)}
					<NewExerciseForm
						orderInWorkout={props.workout.routines ? props.workout.routines.length + 1 : 0}
						workoutId={workoutId}
					/>
				</div>
			</div>
			{/* <Button text="Save workout" onClick={handleSubmit(async (data) => saveWorkoutHandler(data))} />
			<Button onClick={onDeleteWorkoutClicked} text="Delete" /> */}
		</>
	);
}

export default EditingWorkout;
