import React, { useEffect, useState } from "react";
import NewExercise from "../Exercises/NewExercise";
import classes from "./EditingWorkout.module.css";
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
import { useDispatch } from "react-redux";
import { showModal } from "../../store/errorModalSlice";
import Image from "../UI/Image";

function EditingWorkout(props) {
	const location = useLocation();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const workoutId = props.workout.workout_id;

	const [descriptionTextAreaOpen, setDescriptionTextAreaOpen] = useState(props.workout.description !== "");
	const [inEditMode, setInEditMode] = useState(props.inEditMode);
	const [routines, setRoutines] = useState(props.workout.routines);
	const [numberOfExerciseFormsOpen, setNumberOfExerciseFormsOpen] = useState(0);

	const [updateWorkout] = useUpdateWorkoutMutation();
	const [deleteWorkout] = useDeleteWorkoutMutation();
	const [updateRoutinesOrder] = useUpdateRoutinesOrderMutation();

	const workoutImage = useImageUpload();
	const image = props.workout.image ? workoutImage.imageUrl || `${props.workout.image}` : workoutImage.imageUrl;

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

	async function onDeleteWorkoutClicked(event) {
		event.preventDefault();
		deleteWorkout({ workout_id: workoutId });
		navigate(`/workouts`, { replace: true });
	}

	async function saveWorkoutHandler(data) {
		const workoutData = new FormData();
		workoutData.append("name", data.name);
		workoutData.append("description", data.description);
		workoutData.append("workout_id", workoutId);
		workoutData.append("image", workoutImage.image);

		try {
			await updateWorkout(workoutData).unwrap();
			clearErrors();
			setDescriptionTextAreaOpen(false);
			setInEditMode(false);
		} catch (error) {
			dispatch(showModal(error.data));
		}
	}

	const {
		register,
		formState: { errors },
		handleSubmit,
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
			dispatch(showModal(error.data));
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
				usingTimer={exercise.time_or_repetitions.data[0] === 1 ? true : false}
				setTime={exercise.set_time}
				repetitions={exercise.repetitions}
				sets={exercise.sets}
				restTime={exercise.rest_time}
				breakAfterExercise={exercise.break_after_routine}
				inEditMode={inEditMode}
				setNumberOfExerciseFormsOpen={setNumberOfExerciseFormsOpen}
				numberOfExerciseFormsOpen={numberOfExerciseFormsOpen}
			/>
		);
	}

	function renderWorkout() {
		return (
			<div className={classes.container__workout}>
				{inEditMode ? (
					<form
						encType="multipart/form-data"
						onSubmit={handleSubmit(async (data) => saveWorkoutHandler(data))}>
						<Image
							workoutImage={true}
							inputId="workout_image"
							onChange={workoutImage.onImageUpload}
							image={image}
							alt="Workout"
							allowImageChange={true}>
							<input
								type="text"
								placeholder="Workout name"
								className={classes.container__workoutNameInput}
								{...register("name", {
									maxLength: {
										value: 24,
										message: "Workout name cannot be longer than 24 characters",
									},
								})}
							/>
						</Image>
						{errors.name && <p className={"invalidParagraph"}>{errors.name.message}</p>}

						{descriptionTextAreaOpen ? (
							<>
								<textarea
									type="description"
									{...register("description", {
										maxLength: {
											value: 500,
											message: "Workout description cannot be longer than 500 characters",
										},
									})}
								/>
								{errors.description && (
									<p className={"invalidParagraph"}>{errors.description.message}</p>
								)}
							</>
						) : (
							<button
								className={classes.container__addDescriptionButton}
								onClick={() => setDescriptionTextAreaOpen(true)}
							/>
						)}
						<div>
							<button className={`${classes.checkmark} ${classes.imageButton}`} />

							<button
								className={`${classes.delete} ${classes.imageButton}`}
								onClick={onDeleteWorkoutClicked}
							/>
						</div>
					</form>
				) : (
					<>
						<Image workoutImage={true} image={image} alt="Workout" allowImageChange={false}>
							<h1>{props.workout.name}</h1>
						</Image>
						<h4>{props.workout.description}</h4>
						<div>
							<button
								className={`${classes.play} ${classes.imageButton}`}
								onClick={StartWorkoutHandler}
							/>

							<button
								className={`${classes.edit} ${classes.imageButton}`}
								onClick={EditWorkoutHandler}></button>
						</div>
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
		</div>
	);
}

export default EditingWorkout;
