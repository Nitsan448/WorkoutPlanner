import React, { useState } from "react";
import classes from "./ExerciseForm.module.css";
import Button from "../UI/Button";
import { isPositiveNumber } from "../../helpers/helpers";
import { getTimeInSeconds } from "../../helpers/time";
import { useAddRoutineMutation } from "../../store/apiSlice";
import { useForm } from "react-hook-form";

function ExerciseForm(props) {
	const [isFormOpen, setIsFormOpen] = useState(false);

	const [addRoutine] = useAddRoutineMutation();

	function validateTimeInput(value) {
		if (value.split(":").length !== 2) {
			return false;
		}
		const [minutes, seconds] = value.split(":");
		return isPositiveNumber(minutes) && isPositiveNumber(seconds);
	}

	async function addNewExerciseHandler(data) {
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
		try {
			await addRoutine(routine);
			setIsFormOpen(false);
		} catch (error) {
			console.log(error);
		}
	}

	const {
		register,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm({
		defaultValues: {
			setTime: "00:00",
			restTime: "00:00",
			sets: 1,
		},
	});

	return (
		<>
			{isFormOpen ? (
				<div className={classes.form}>
					<form onSubmit={handleSubmit(async (data) => addNewExerciseHandler(data))}>
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
						<Button text="Add exercise" />
					</form>
				</div>
			) : (
				<Button onClick={() => setIsFormOpen(true)} text="Add new exercise"></Button>
			)}
		</>
	);
}

export default ExerciseForm;
