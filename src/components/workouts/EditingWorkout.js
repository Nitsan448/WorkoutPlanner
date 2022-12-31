import React from "react";
import ExerciseForm from "../Exercises/ExerciseForm";
import classes from "../Exercises/ExerciseForm.module.css";
import Button from "../UI/Button";

function EditingWorkout(props) {
	//Send form to

	return (
		<>
			<div className={classes.form}>
				<form>
					<div className={classes.form_group}>
						<label>Workout name</label>
						<input></input>
					</div>
					<div className={classes.form_group}>
						<label>Description</label>
						<input></input>
					</div>
					<Button text="Add workout"></Button>
				</form>
			</div>
			<ExerciseForm />
		</>
	);
}

export default EditingWorkout;
