import React, { useState } from "react";
import classes from "./ExerciseForm.module.css";
import { isPositiveNumber } from "../../helpers/helpers";
import { useForm } from "react-hook-form";
import { getTimeInSeconds, getTimeInTimerFormat } from "../../helpers/time";
import useImageUpload from "../../hooks/use-image-upload";
import Image from "../UI/Image";

function ExerciseForm(props) {
	const [descriptionTextAreaOpen, setDescriptionTextAreaOpen] = useState(props.description !== "");
	const [repetitionsFieldActive, setRepetitionsFieldActive] = useState(!props.usingTimer);

	const exerciseImage = useImageUpload();
	const image = props.exerciseImage ? exerciseImage.imageUrl || props.exerciseImage : exerciseImage.imageUrl;

	function validateTimeInput(value) {
		if (value.split(":").length !== 2) {
			return false;
		}
		const [minutes, seconds] = value.split(":");
		return isPositiveNumber(minutes) && isPositiveNumber(seconds) && seconds < 60 && minutes < 60;
	}

	async function saveRoutine(data) {
		const routine = {
			workout_id: +props.workoutId,
			name: data.name,
			description: data.description,
			image: exerciseImage.image,
			sets: data.sets,
			time_or_repetitions: repetitionsFieldActive ? 0 : 1,
			set_time: getTimeInSeconds(data.setTime),
			repetitions: data.repetitions,
			rest_time: getTimeInSeconds(data.restTime),
			break_after_routine: getTimeInSeconds(data.breakAfterExercise),
			order_in_workout: props.orderInWorkout,
		};

		props.saveExerciseHandler(routine, reset);
	}

	const {
		register,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm({
		defaultValues: {
			setTime: isDefinedAndPositive(props.setTime) ? getTimeInTimerFormat(props.setTime) : "00:30",
			restTime: isDefinedAndPositive(props.restTime) ? getTimeInTimerFormat(props.restTime) : "00:30",
			breakAfterExercise: isDefinedAndPositive(props.breakAfterExercise)
				? getTimeInTimerFormat(props.breakAfterExercise)
				: "01:00",
			repetitions: props.repetitions ? props.repetitions : 10,
			sets: props.sets ? props.sets : 3,
			name: props.name ? props.name : "",
			description: props.description ? props.description : "",
		},
	});

	function isDefinedAndPositive(value) {
		return value && value > 0;
	}

	return (
		<>
			<form
				encType="multipart/form-data"
				className={classes.form}
				onSubmit={handleSubmit(async (data) => saveRoutine(data))}>
				<Image
					inputId={`exercise_image${props.orderInWorkout}`}
					onChange={exerciseImage.onImageUpload}
					image={image}
					allowImageChange={true}
					alt="Exercise"
					exerciseImage={true}
				/>
				<div className={classes.form__exercise}>
					<input type="text" placeholder="Exercise name" {...register("name", { required: true })} />
					{errors.name && <p className={"invalidParagraph"}>Can not be empty</p>}
					{descriptionTextAreaOpen ? (
						<textarea placeholder="Description" {...register("description")} />
					) : (
						<button
							className={classes.form__addDescriptionButton}
							onClick={() => setDescriptionTextAreaOpen(true)}
						/>
					)}
				</div>
				<div className={classes.form__routine}>
					<label htmlFor="sets">Number of sets:</label>
					<input
						type="number"
						{...register("sets", {
							required: true,
							min: 1,
						})}
					/>
					{errors.sets && <p className={"invalidParagraph"}>Must be larger than 0</p>}
				</div>
				<div className={classes.form__routine}>
					<label htmlFor="restTime">Rests:</label>
					<input
						type="text"
						{...register("restTime", {
							required: true,
							validate: (value) => validateTimeInput(value),
						})}
					/>
					{errors.restTime && <p className={"invalidParagraph"}>Must be in xx:xx format</p>}
				</div>
				<div className={classes.form__repsOrSets}>
					<div className={repetitionsFieldActive ? classes.form__routine : classes.form__greyRoutine}>
						<label htmlFor="repetitions">Repetitions:</label>
						<input
							type="number"
							{...register("repetitions", {
								required: true,
								min: 1,
							})}
							onSelect={() => setRepetitionsFieldActive(true)}
						/>
						{errors.repetitions && <p className={"invalidParagraph"}>Must be larger than 0</p>}
					</div>
					<div className={classes.form__orImage}></div>
					<div className={!repetitionsFieldActive ? classes.form__routine : classes.form__greyRoutine}>
						<label htmlFor="setTime">Set time:</label>
						<input
							type="text"
							{...register("setTime", {
								required: true,
								validate: (value) => validateTimeInput(value),
							})}
							onSelect={() => setRepetitionsFieldActive(false)}
						/>
						{errors.setTime && <p className={"invalidParagraph"}>Must be in xx:xx format</p>}
					</div>
				</div>
				<div className={classes.form__routine}>
					<label htmlFor="setTime">Break after:</label>
					<input
						type="text"
						{...register("breakAfterExercise", {
							required: true,
							validate: (value) => validateTimeInput(value),
						})}
					/>
					{errors.breakAfterExercise && <p className={"invalidParagraph"}>Must be in xx:xx format</p>}
				</div>
				<button className={classes.form__checkmark} />
				<button type="button" className={classes.form__deleteButton} onClick={props.deleteExerciseHandler} />
				<button type="button" className={classes.form__cancelButton} onClick={props.cancelEditHandler} />
			</form>
		</>
	);
}

export default ExerciseForm;
