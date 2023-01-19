import React, { useCallback, useEffect, useState } from "react";
import NewExercise from "../Exercises/NewExercise";
import classes from "./Workout.module.css";
import Exercise from "../Exercises/Exercise";
import { useLocation, useNavigate } from "react-router-dom";
import { useUpdateWorkoutMutation, useDeleteWorkoutMutation } from "../../store/apiSlice";
import { useForm } from "react-hook-form";

function EditingWorkout(props) {
	let deleteWorkoutOnUnmount = props.workout.name === "";
	const [descriptionTextAreaOpen, setDescriptionTextAreaOpen] = useState(props.workout.description !== "");
	const location = useLocation();
	const navigate = useNavigate();
	const [inEditMode, setInEditMode] = useState(props.inEditMode);

	function StartWorkoutHandler() {
		navigate(`${location.pathname}?mode=play`);
	}

	function EditWorkoutHandler() {
		setInEditMode(true);
		setDescriptionTextAreaOpen(props.workout.description !== "");
	}

	const [updateWorkout] = useUpdateWorkoutMutation();

	const [deleteWorkout] = useDeleteWorkoutMutation();

	const workoutId = props.workout.workout_id;

	const handleWorkoutDeletionOnUnmount = useCallback(
		(event) => {
			event && event.preventDefault();
			console.log(deleteWorkoutOnUnmount);
			if (deleteWorkoutOnUnmount) {
				deleteWorkout({ workout_id: workoutId });
			}
		},
		[workoutId, deleteWorkoutOnUnmount, deleteWorkout]
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
				breakAfterExercise={exercise.break_after_routine}
				description={exercise.description}
				canEdit={inEditMode}
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
			clearErrors();
			setDescriptionTextAreaOpen(false);
			setInEditMode(false);
			deleteWorkoutOnUnmount = false;
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

	function renderWorkout() {
		return (
			<div className={classes.container__workout}>
				{inEditMode ? (
					<>
						<div className={classes.container__workoutImage}>
							<input
								type="text"
								className={
									errors.name
										? `invalidInput ${classes.container__workoutNameInput}`
										: classes.container__workoutNameInput
								}
								{...register("name", { required: "Workout name can not be empty" })}
							/>
							{errors.name && <p className={"invalidParagraph"}>{errors.name.message}</p>}
						</div>
						{descriptionTextAreaOpen ? (
							<textarea type="description" {...register("description")} />
						) : (
							<button
								className={classes.container__addDescriptionButton}
								onClick={() => setDescriptionTextAreaOpen(true)}
							/>
						)}
					</>
				) : (
					<>
						<div className={classes.container__workoutImage}>
							<h1>{props.workout.name}</h1>
						</div>
						<h4>{props.workout.description}</h4>
					</>
				)}
			</div>
		);
	}

	function renderExercises() {
		return (
			<div className={classes.container__exercises}>
				{props.workout.routines ? (
					<ul>{props.workout.routines.map((routine) => getExerciseAsComponent(routine))}</ul>
				) : (
					""
				)}
				{inEditMode && (
					<NewExercise
						orderInWorkout={props.workout.routines ? props.workout.routines.length + 1 : 0}
						workoutId={workoutId}
					/>
				)}
			</div>
		);
	}

	return (
		<div>
			<div className={classes.container}>
				{renderWorkout()}
				{renderExercises()}
			</div>
			{inEditMode ? (
				<>
					<button
						className={classes.checkmark}
						onClick={handleSubmit(async (data) => saveWorkoutHandler(data))}
					/>
					<button className={classes.deleteButton} onClick={onDeleteWorkoutClicked} />
				</>
			) : (
				<>
					<button className={classes.play} onClick={StartWorkoutHandler} />

					<button className={classes.edit} onClick={EditWorkoutHandler}></button>
				</>
			)}
		</div>
	);
}

export default EditingWorkout;
