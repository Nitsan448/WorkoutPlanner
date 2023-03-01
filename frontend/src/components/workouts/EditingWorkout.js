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
import { showErrorModal } from "../../store/modalSlice";
import Image from "../UI/Image";
import ConfirmationModal from "../Modals/ConfirmationModal";

function EditingWorkout(props) {
	const location = useLocation();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const workoutId = props.workout.workout_id;

	const [descriptionTextAreaOpen, setDescriptionTextAreaOpen] = useState(props.workout.description !== "");
	const [inEditMode, setInEditMode] = useState(props.inEditMode);
	const [routines, setRoutines] = useState(props.workout.routines);
	const [numberOfExerciseFormsOpen, setNumberOfExerciseFormsOpen] = useState(0);
	const [showDeleteWorkoutConfirmationModal, setShowDeleteWorkoutConfirmationModal] = useState(false);

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

	function onDeleteWorkoutClicked(event) {
		event.preventDefault();
		setShowDeleteWorkoutConfirmationModal(true);
	}

	function deleteWorkoutAndGoToWorkouts() {
		deleteWorkout({ workout_id: workoutId });
		navigate(`/workouts`);
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
			dispatch(showErrorModal(error.data));
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
			dispatch(showErrorModal(error.data));
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

	function renderConfirmationModal() {
		return (
			showDeleteWorkoutConfirmationModal && (
				<ConfirmationModal
					title="Confirmation required"
					message="Are you sure you want to delete this workout?"
					onCancel={() => {
						setShowDeleteWorkoutConfirmationModal(false);
					}}
					onConfirm={deleteWorkoutAndGoToWorkouts}
				/>
			)
		);
	}

	function renderWorkoutForm() {
		return (
			<form encType="multipart/form-data">
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
								value: 22,
								message: "Workout name cannot be longer than 22 characters",
							},
						})}
					/>
				</Image>
				{errors.name && <p className={"invalidParagraph"}>{errors.name.message}</p>}

				{renderDescriptionTextArea()}
			</form>
		);
	}

	function renderDescriptionTextArea() {
		return (
			<>
				{descriptionTextAreaOpen ? (
					<>
						<textarea
							type="description"
							{...register("description", {
								maxLength: {
									value: 400,
									message: "Workout description cannot be longer than 400 characters",
								},
							})}
						/>
						{errors.description && <p className={"invalidParagraph"}>{errors.description.message}</p>}
					</>
				) : (
					<button
						className={classes.container__addDescriptionButton}
						onClick={() => setDescriptionTextAreaOpen(true)}
					/>
				)}
			</>
		);
	}

	function renderWorkout() {
		return (
			<>
				<Image workoutImage={true} image={image} alt="Workout" allowImageChange={false}>
					<h1>{props.workout.name}</h1>
				</Image>
				<p className={classes.container__workoutDescription}>{props.workout.description}</p>
			</>
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

	function renderFooter() {
		return (
			<footer className={classes.footer}>
				{inEditMode ? (
					<>
						<button className={classes.delete} onClick={onDeleteWorkoutClicked}>
							Delete
						</button>
						<button
							className={classes.save}
							onClick={handleSubmit(async (data) => saveWorkoutHandler(data))}>
							Save
						</button>
					</>
				) : (
					<>
						<button className={classes.edit} onClick={EditWorkoutHandler}>
							Edit
						</button>
						<button className={classes.play} onClick={StartWorkoutHandler}>
							Play
						</button>
					</>
				)}
			</footer>
		);
	}

	return (
		<>
			{renderConfirmationModal()}
			<div className={classes.container}>
				<div className={classes.container__workout}>{inEditMode ? renderWorkoutForm() : renderWorkout()}</div>
				{renderExercises()}
			</div>
			{renderFooter()}
		</>
	);
}

export default EditingWorkout;
