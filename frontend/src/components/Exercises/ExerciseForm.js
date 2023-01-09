import React from "react";
import classes from "./ExerciseForm.module.css";
import Button from "../UI/Button";
import { isPositiveNumber } from "../../helpers/helpers";
import { useForm } from "react-hook-form";
import { getTimeInSeconds, getTimeInTimerFormat } from "../../helpers/time";

function ExerciseForm(props) {
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
			restTime: props.restTime ? getTimeInTimerFormat(props.restTime) : "00:00",
			sets: props.sets ? props.sets : 1,
			name: props.name ? props.name : "",
			description: props.description ? props.description : "",
		},
	});

	return (
		<>
			<div className={classes.form}>
				<form onSubmit={handleSubmit(async (data) => saveRoutine(data))}>
					<h3>New Exercise</h3>
					<div className={classes.form_group}>
						<label htmlFor="name">Name:</label>
						<input
							type="text"
							className={errors.name ? classes.invalid : ""}
							{...register("name", { required: true })}
						/>
						{errors.name && <p className={classes.invalid}>Exercise name can not be empty</p>}
					</div>
					<div className={classes.form_group}>
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
					<div className={classes.form_group}>
						<label htmlFor="sets">Sets:</label>
						<input
							type="number"
							className={errors.sets ? classes.invalid : ""}
							{...register("sets", {
								required: true,
								min: 1,
							})}
						/>
						{errors.sets && <p className={classes.invalid}>Sets must be larger than 0</p>}
					</div>
					<div className={classes.form_group}>
						<label htmlFor="restTime">Rest time:</label>
						<input
							type="text"
							className={errors.restTime ? classes.invalid : ""}
							{...register("restTime", {
								required: true,
								validate: (value) => validateTimeInput(value),
							})}
						/>
						{errors.restTime && <p className={classes.invalid}>Rest time must be in xx:xx format</p>}
					</div>
					<div className={classes.form_group}>
						<label htmlFor="description">Description:</label>
						<textarea {...register("description")} />
					</div>
					<Button text="Save exercise" />
				</form>
			</div>
		</>
	);
}

export default ExerciseForm;
