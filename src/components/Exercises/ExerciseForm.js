import React, { useState, useEffect } from "react";
import classes from "./ExerciseForm.module.css";
import Button from "../UI/Button";
import useInput from "../../hooks/use-input";
import { isPositiveNumber } from "../../helpers/helpers";
import { useParams } from "react-router-dom";
import { addExercise } from "../../lib/exercisesApi";
import { addRoutine } from "../../lib/routinesApi";
import useHttp from "../../hooks/use-http";
import { getTimeInSeconds } from "../../helpers/time";

function ExerciseForm(props) {
	const params = useParams();
	const { workoutId } = params;

	const [isFormOpen, setIsFormOpen] = useState(false);

	const nameInput = useInput((value) => value.trim() !== "");

	const setTimeInput = useInput((value) => validateTimeInput(value), "00:00");

	const setsInput = useInput((value) => value > 0, 1);

	const restTimeInput = useInput((value) => validateTimeInput(value), "00:00");

	const [orderInWorkout, setOrderInWorkout] = useState(props.orderInWorkout);

	function validateTimeInput(value) {
		if (value.split(":").length !== 2) {
			return false;
		}
		const [minutes, seconds] = value.split(":");
		return isPositiveNumber(minutes) && isPositiveNumber(seconds);
	}

	const descriptionInput = useInput((value) => true);

	const nameInputClasses = nameInput.hasError ? classes.invalid : "";
	const setsInputClasses = setsInput.hasError ? classes.invalid : "";
	const setTimeInputClasses = setTimeInput.hasError ? classes.invalid : "";
	const restTimeInputClasses = restTimeInput.hasError ? classes.invalid : "";

	const formIsValid =
		nameInput.isValid &&
		setTimeInput.isValid &&
		restTimeInput.isValid &&
		descriptionInput.isValid &&
		setsInput.isValid;

	const {
		sendRequest: sendAddExerciseRequest,
		status: addExerciseStatus,
		data: exerciseId,
		error: addExerciseError,
	} = useHttp(addExercise, true);

	const {
		sendRequest: sendAddRoutineRequest,
		status: addRoutineStatus,
		data: routineData,
		error: addRoutineError,
	} = useHttp(addRoutine, true);

	useEffect(() => {
		if (addExerciseStatus === "completed" && !addExerciseError) {
			const routine = {
				workout_id: workoutId,
				exercise_id: exerciseId,
				name: nameInput.value,
				description: descriptionInput.value,
				sets: setsInput.value,
				time_or_repetitions: 1,
				set_time: getTimeInSeconds(setTimeInput.value),
				repetitions: 10,
				rest_time: getTimeInSeconds(restTimeInput.value),
				break_after_routine: 30,
				order_in_workout: orderInWorkout,
			};
			sendAddRoutineRequest(routine);
			props.addToWorkout(routine);
			setOrderInWorkout(orderInWorkout + 1);
			resetInputFields();
		}
	}, [addExerciseError, addExerciseStatus]);

	function addNewExerciseHandler(event) {
		event.preventDefault();
		setIsFormOpen(false);

		sendAddExerciseRequest({
			name: nameInput.value,
			description: descriptionInput.value,
		});
	}

	function resetInputFields() {
		nameInput.reset();
		setTimeInput.reset();
		setsInput.reset();
		restTimeInput.reset();
		descriptionInput.reset();
	}

	return isFormOpen ? (
		<div className={classes.form}>
			<form onSubmit={addNewExerciseHandler}>
				<h3>New Exercise</h3>
				<div className={classes.form_group}>
					<label>Name:</label>
					<input
						className={nameInputClasses}
						type="text"
						value={nameInput.value}
						onChange={nameInput.valueChangeHandler}
						onBlur={nameInput.inputBlurHandler}
					/>
					{nameInput.hasError && <p className={classes.invalid}>Name cannot be empty</p>}
				</div>
				{/* 
				<div
					className={classes.form_group}
					onChange={(event) => {
						console.log(event.target.value);
					}}>
					<label>Set time:</label>
					<input type="radio" value="set time" name="set settings" />
					<label>Repetitions:</label>
					<input type="radio" value="repetitions" name="set settings" />
				</div> */}

				<div className={classes.form_group}>
					<label>setTime:</label>
					<input
						className={setTimeInputClasses}
						type="text"
						value={setTimeInput.value}
						onChange={setTimeInput.valueChangeHandler}
						onBlur={setTimeInput.inputBlurHandler}
					/>
					{setTimeInput.hasError && <p className={classes.invalid}>Set time must be in xx:xx format</p>}
				</div>

				<div className={classes.form_group}>
					<label>Sets:</label>
					<input
						className={setsInputClasses}
						type="number"
						value={setsInput.value}
						onChange={setsInput.valueChangeHandler}
						onBlur={setsInput.inputBlurHandler}
					/>
					{setsInput.hasError && <p className={classes.invalid}>Sets must be larger than 0</p>}
				</div>

				<div className={classes.form_group}>
					<label>Rest time:</label>
					<input
						className={restTimeInputClasses}
						type="text"
						value={restTimeInput.value}
						onChange={restTimeInput.valueChangeHandler}
						onBlur={restTimeInput.inputBlurHandler}
					/>
					{restTimeInput.hasError && <p className={classes.invalid}>Rest time must be in xx:xx format</p>}
				</div>

				<div className={classes.form_group}>
					<label>Description:</label>
					<textarea
						name="description"
						value={descriptionInput.value}
						onChange={descriptionInput.valueChangeHandler}
						onBlur={descriptionInput.inputBlurHandler}></textarea>
				</div>
				<Button disabled={!formIsValid} text="Add exercise"></Button>
			</form>
		</div>
	) : (
		<Button onClick={() => setIsFormOpen(true)} text="Add new exercise"></Button>
	);
}

export default ExerciseForm;
