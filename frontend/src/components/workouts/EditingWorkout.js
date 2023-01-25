import React, { useCallback, useEffect, useState } from "react";
import NewExercise from "../Exercises/NewExercise";
import classes from "./Workout.module.css";
import Exercise from "../Exercises/Exercise";
import { useLocation, useNavigate } from "react-router-dom";
import {
	useUpdateWorkoutMutation,
	useDeleteWorkoutMutation,
	useUpdateRoutinesOrderMutation,
} from "../../store/apiSlice";
import { useForm } from "react-hook-form";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import useImageUpload from "../../hooks/use-image-upload";

let deleteWorkoutOnUnmount = true;
function EditingWorkout(props) {
	const workoutImage = useImageUpload();
	const location = useLocation();
	const navigate = useNavigate();
	const workoutId = props.workout.workout_id;
	let newWorkout = props.workout.name === "";

	const [descriptionTextAreaOpen, setDescriptionTextAreaOpen] = useState(props.workout.description !== "");
	const [inEditMode, setInEditMode] = useState(props.inEditMode);
	const [routines, setRoutines] = useState(props.workout.routines);
	const [numberOfExerciseFormsOpen, setNumberOfExerciseFormsOpen] = useState(0);

	const [updateWorkout] = useUpdateWorkoutMutation();
	const [deleteWorkout] = useDeleteWorkoutMutation();
	const [updateRoutinesOrder] = useUpdateRoutinesOrderMutation();

	function StartWorkoutHandler() {
		navigate(`${location.pathname}?mode=play`);
	}

	function EditWorkoutHandler() {
		navigate(`${location.pathname}?mode=edit`);
		setInEditMode(true);
		setDescriptionTextAreaOpen(props.workout.description !== "");
	}

	useEffect(() => {
		setRoutines(props.workout.routines);
	}, [props.workout.routines]);

	const handleWorkoutDeletionOnUnmount = useCallback(
		(event) => {
			event && event.preventDefault();
			if (deleteWorkoutOnUnmount && newWorkout) {
				deleteWorkout({ workout_id: workoutId });
			}
		},
		[workoutId, deleteWorkout, newWorkout]
	);

	useEffect(() => {
		window.addEventListener("beforeunload", handleWorkoutDeletionOnUnmount);

		return () => {
			window.removeEventListener("beforeunload", handleWorkoutDeletionOnUnmount);
			handleWorkoutDeletionOnUnmount();
		};
	}, [handleWorkoutDeletionOnUnmount]);

	async function onDeleteWorkoutClicked() {
		deleteWorkout({ workout_id: workoutId });
		navigate(`/workouts`);
	}

	async function saveWorkoutHandler(data) {
		const formData = new FormData();
		formData.append("name", data.name);
		formData.append("description", data.description);
		formData.append("workout_id", workoutId);

		// TODO: send old image if no new image
		formData.append("image", workoutImage.image);

		try {
			await updateWorkout(formData).unwrap();
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

	async function onDragEnd(result) {
		const { destination, source } = result;
		if (!destination || destination.index === source.index) {
			return;
		}
		const newRoutines = [...routines];
		const [movedRoutine] = newRoutines.splice(source.index, 1);
		newRoutines.splice(destination.index, 0, movedRoutine);
		setRoutines(newRoutines);

		try {
			await updateRoutinesOrder({
				workout_id: workoutId,
				old_routine_index: source.index,
				new_routine_index: destination.index,
			}).unwrap();
		} catch (error) {
			console.log(error.data);
		}
	}

	function getExerciseAsComponent(exercise) {
		return (
			<Exercise
				workoutId={workoutId}
				orderInWorkout={exercise.order_in_workout}
				key={exercise.order_in_workout}
				name={exercise.name}
				description={exercise.description}
				image={exercise.image}
				setTime={exercise.set_time}
				sets={exercise.sets}
				restTime={exercise.rest_time}
				breakAfterExercise={exercise.break_after_routine}
				inEditMode={inEditMode}
				setNumberOfExerciseFormsOpen={setNumberOfExerciseFormsOpen}
				numberOfExerciseFormsOpen={numberOfExerciseFormsOpen}
			/>
		);
	}

	const image = props.workout.image
		? workoutImage.imageUrl || `http://localhost:8000/${props.workout.image}`
		: workoutImage.imageUrl;

	function renderWorkout() {
		return (
			<div className={classes.container__workout}>
				{inEditMode ? (
					<form
						encType="multipart/form-data"
						onSubmit={handleSubmit(async (data) => saveWorkoutHandler(data))}>
						{/*TODO: Extract image upload input to component */}
						<label htmlFor="image" className={classes.container__editingWorkoutImage}>
							{!image && "Add image"}
							<input
								id="image"
								type="file"
								onChange={workoutImage.onImageUpload}
								accept=".jpg, .jpeg, .png"
								className={classes.container__workoutImageInput}
							/>
							{Image && <img src={image} alt="Workout" width={"200"} height={"200"} />}

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
						</label>
						{descriptionTextAreaOpen ? (
							<textarea type="description" {...register("description")} />
						) : (
							<button
								className={classes.container__addDescriptionButton}
								onClick={() => setDescriptionTextAreaOpen(true)}
							/>
						)}
						<button className={classes.checkmark} />
					</form>
				) : (
					<>
						<div className={classes.container__workoutImage}>
							{Image && <img src={image} alt="Workout" width={"200"} height={"200"} />}
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
			<DragDropContext onDragEnd={onDragEnd}>
				<div className={classes.container__exercises}>
					{routines ? (
						<Droppable droppableId={"0"}>
							{(provided) => (
								<ul ref={provided.innerRef} {...provided.droppableProps}>
									{routines.map((routine) => getExerciseAsComponent(routine))}
									{provided.placeholder}
								</ul>
							)}
						</Droppable>
					) : (
						""
					)}
					{inEditMode && (
						<NewExercise orderInWorkout={routines ? routines.length : 0} workoutId={workoutId} />
					)}
				</div>
			</DragDropContext>
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
					{/* <button
						className={classes.checkmark}
						onClick={handleSubmit(async (data) => saveWorkoutHandler(data))}
					/> */}
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
