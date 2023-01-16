import React, { useState, useEffect } from "react";
import classes from "./ExerciseForm.module.css";
import Button from "../UI/Button";
import { isPositiveNumber } from "../../helpers/helpers";
import { useForm } from "react-hook-form";
import { getTimeInSeconds, getTimeInTimerFormat } from "../../helpers/time";

function ExerciseForm(props) {
	const [image, setImage] = useState(null);
	const [imageUrl, setImageUrl] = useState(null);

	function onImageUpload(event) {
		setImage(...event.target.files);
	}

	useEffect(() => {
		if (image) {
			setImageUrl(URL.createObjectURL(image));
		}
	}, [image]);

	function validateTimeInput(value) {
		if (value.split(":").length !== 2) {
			return false;
		}
		const [minutes, seconds] = value.split(":");
		return isPositiveNumber(minutes) && isPositiveNumber(seconds) && seconds < 60 && minutes < 60;
	}

	function saveRoutine(data) {
		const routine = {
			workout_id: +props.workoutId,
			name: data.name,
			description: data.description,
			sets: data.sets,
			time_or_repetitions: 1,
			set_time: getTimeInSeconds(data.setTime),
			repetitions: 10,
			rest_time: getTimeInSeconds(data.restTime),
			break_after_routine: 30,
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
			setTime: props.setTime ? getTimeInTimerFormat(props.setTime) : "00:00",
			repetitions: props.repetitions ? props.setTime : 10,
			restTime: props.restTime ? getTimeInTimerFormat(props.restTime) : "00:00",
			sets: props.sets ? props.sets : 1,
			name: props.name ? props.name : "",
			description: props.description ? props.description : "",
		},
	});

	return (
		<>
			<form className={classes.form} onSubmit={handleSubmit(async (data) => saveRoutine(data))}>
				<label htmlFor="image-upload" className={classes.form__image}>
					Add image
					<input id="image-upload" type="file" onChange={onImageUpload} accept=".jpg, .jpeg, .png" />
					{image && <img src={imageUrl} alt="Exercise" width={"200"} height={"200"} />}
				</label>

				<div className={classes.form__exercise}>
					<input
						type="text"
						placeholder="Exercise name"
						className={errors.name ? classes.invalid : ""}
						{...register("name", { required: true })}
					/>
					{errors.name && <p className={classes.invalid}>Exercise name can not be empty</p>}
					<textarea placeholder="Description" {...register("description")} />
				</div>
				<div className={classes.form__routine}>
					<label htmlFor="sets">Number of sets:</label>
					<input
						type="number"
						className={errors.sets ? classes.invalid : ""}
						{...register("sets", {
							required: true,
							min: 1,
						})}
					/>
					{errors.sets && <p className={classes.invalid}>Number of sets must be larger than 0</p>}
				</div>
				<div className={classes.form__routine}>
					<label htmlFor="restTime">Break between sets:</label>
					<input
						type="text"
						className={errors.restTime ? classes.invalid : ""}
						{...register("restTime", {
							required: true,
							validate: (value) => validateTimeInput(value),
						})}
					/>
					{errors.restTime && <p className={classes.invalid}>Break between sets must be in xx:xx format</p>}
				</div>
				<div className={classes.form__repsOrSets}>
					<div className={classes.form__routine}>
						<label htmlFor="repetitions">Repetitions:</label>
						<input
							type="number"
							className={errors.setTime ? classes.invalid : ""}
							{...register("repetitions", {
								required: true,
								validate: (value) => validateTimeInput(value),
							})}
						/>
						{errors.setTime && <p className={classes.invalid}>Set time must be in xx:xx format</p>}
					</div>
					<div className={classes.form__orImage}></div>
					<div className={classes.form__routine}>
						<label htmlFor="setTime">Set time:</label>
						<input
							type="text"
							className={errors.setTime ? classes.invalid : ""}
							{...register("setTime", {
								required: true,
								validate: (value) => validateTimeInput(value),
							})}
						/>
						{errors.setTime && <p className={classes.invalid}>Set time must be in xx:xx format</p>}
					</div>
				</div>
				<div className={classes.form__checkmark}>{/* <Button text="Save exercise" /> */}</div>
			</form>
		</>
	);
}

export default ExerciseForm;
