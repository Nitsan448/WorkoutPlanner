import React, { useState } from "react";
import classes from "./ExerciseForm.module.css";
import Button from "./UI/Button";
import useInput from "../hooks/useInput";
import { currentWorkoutActions } from "../store/currentWorkout-slice";
import { useDispatch } from "react-redux";

function ExerciseForm(props) {
	const dispatch = useDispatch();

	const [isFormOpen, setIsFormOpen] = useState(false);

	const nameInput = useInput((value) => value.trim() !== "");
	const repetitionsInput = useInput((value) => value > 0);
	const restTimeInput = useInput((value) => value >= 0);
	const descriptionInput = useInput((value) => value.trim() !== "");

	const nameInputClasses = nameInput.hasError ? classes.invalid : "";
	const repetitionsInputClasses = repetitionsInput.hasError ? classes.invalid : "";
	const restTimeInputClasses = restTimeInput.hasError ? classes.invalid : "";
	const descriptionInputClasses = descriptionInput.hasError ? classes.invalid : "";

	const formIsValid =
		nameInput.isValid && repetitionsInput.isValid && restTimeInput.isValid && descriptionInput.isValid;

	function addNewExerciseHandler(event) {
		event.preventDefault();
		resetInputFields();

		dispatch(
			currentWorkoutActions.addExercise({
				key: nameInput.value,
				name: nameInput.value,
				repetitions: repetitionsInput.value,
				restTime: restTimeInput.value,
				description: descriptionInput.value,
			})
		);
	}

	function resetInputFields() {
		nameInput.reset();
		repetitionsInput.reset();
		restTimeInput.reset();
		descriptionInput.reset();
	}

	function renderInput(input, inputClass, type) {
		return (
			<input
				className={inputClass}
				type={type}
				value={input.value}
				onChange={input.valueChangeHandler}
				onBlur={input.inputBlurHandler}
			/>
		);
	}

	return (
		// TODO: get rid of space between error paragraph and input fields
		isFormOpen ? (
			<div className={classes.form}>
				<form onSubmit={addNewExerciseHandler}>
					<h3>New Exercise</h3>
					<div className={classes.form_group}>
						<label>Name:</label>
						{renderInput(nameInput, nameInputClasses, "text")}
						{nameInput.hasError && <p className={classes.invalid}>Name cannot be empty</p>}
					</div>

					<div className={classes.form_group}>
						<label>Repetitions:</label>
						{renderInput(repetitionsInput, repetitionsInputClasses, "number")}
						{repetitionsInput.hasError && (
							<p className={classes.invalid}>Repetitions must be larger than 0</p>
						)}
					</div>

					<div className={classes.form_group}>
						<label>Rest time:</label>
						{renderInput(restTimeInput, restTimeInputClasses, "number")}
						{restTimeInput.hasError && <p className={classes.invalid}>rest time must be 0 or more</p>}
					</div>

					<div className={classes.form_group}>
						<label>Description:</label>
						<textarea
							className={descriptionInputClasses}
							name="description"
							value={descriptionInput.value}
							onChange={descriptionInput.valueChangeHandler}
							onBlur={descriptionInput.inputBlurHandler}></textarea>
						{descriptionInput.hasError && <p className={classes.invalid}>Description cannot be empty</p>}
					</div>
					<Button
						disabled={!formIsValid}
						text="Add exercise"></Button>
				</form>
			</div>
		) : (
			<Button
				onClick={() => setIsFormOpen(true)}
				text="Add new exercise"></Button>
		)
	);
}

export default ExerciseForm;
