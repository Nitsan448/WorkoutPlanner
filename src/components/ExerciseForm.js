import React, { useState } from "react";
import classes from "./ExerciseForm.module.css";
import Button from "./UI/Button";
import useInput from "../hooks/useInput";

function ExerciseForm(props)
{
	const [isFormOpen, setIsFormOpen] = useState(false);

	const nameInput = useInput(value => value.trim() !== '');
	const repetitionsInput = useInput(value => value > 0);
	const restTimeInput = useInput(value => value >= 0);
	const descriptionInput = useInput(value => value.trim() !== '');

	function addNewExercise(event)
	{
		event.preventDefault();
		nameInput.reset();
		repetitionsInput.reset();
		restTimeInput.reset();
		descriptionInput.reset();
		// TODO: send new exercise to backend.
	}

	const nameInputClasses = nameInput.hasError ? classes.invalid : '';
	const repetitionsInputClasses = repetitionsInput.hasError ? classes.invalid : '';
	const restTimeInputClasses = restTimeInput.hasError ? classes.invalid : '';
	const descriptionInputClasses = descriptionInput.hasError ? classes.invalid : '';

	const formIsValid = nameInput.isValid && repetitionsInput.isValid &&
		restTimeInput.isValid && descriptionInput.isValid;

	return (
		// TODO: get rid of space between error paragraph and input fields
		isFormOpen ? (<div className={classes.form} >
			<form onSubmit={addNewExercise}>
				<h3>New Exercise</h3>
				<div className={classes.form_group}>
					<label>Name:</label>
					<input className={nameInputClasses} type="text" name="name" value={nameInput.value}
						onChange={nameInput.valueChangeHandler} onBlur={nameInput.inputBlurHandler}>
					</input>
					{nameInput.hasError && <p className={classes.invalid}>Name cannot be empty</p>}
				</div>

				<div className={classes.form_group}>
					<label>Repetitions:</label>
					<input className={repetitionsInputClasses} type="number" name="repetitions" value={repetitionsInput.value}
						onChange={repetitionsInput.valueChangeHandler} onBlur={repetitionsInput.inputBlurHandler}>
					</input>
					{repetitionsInput.hasError && <p className={classes.invalid}>Repetitions must be larger than 0</p>}
				</div>

				<div className={classes.form_group}>
					<label>Rest time:</label>
					<input className={restTimeInputClasses} type="number" name="rest-time" value={restTimeInput.value}
						onChange={restTimeInput.valueChangeHandler} onBlur={restTimeInput.inputBlurHandler}>
					</input>
					{restTimeInput.hasError && <p className={classes.invalid}>rest time must be 0 or more</p>}
				</div>

				<div className={classes.form_group}>
					<label>Description:</label>
					<textarea className={descriptionInputClasses} name="description" value={descriptionInput.value}
						onChange={descriptionInput.valueChangeHandler} onBlur={descriptionInput.inputBlurHandler}>
					</textarea>
					{descriptionInput.hasError && <p className={classes.invalid}>Description cannot be empty</p>}
				</div>
				<Button disabled={!formIsValid} text="Add exercise"></Button>
			</form >
		</div >) : (<Button onClick={() => setIsFormOpen(true)} text="Add new exercise"></Button>)
	);
}

export default ExerciseForm;