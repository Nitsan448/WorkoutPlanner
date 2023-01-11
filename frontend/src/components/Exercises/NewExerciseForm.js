import React, { useState } from "react";
import ExerciseForm from "./ExerciseForm";
import { useAddRoutineMutation } from "../../store/apiSlice";
import Button from "../UI/Button";

function NewExerciseForm(props) {
	const [isFormOpen, setIsFormOpen] = useState(false);

	const [addRoutine] = useAddRoutineMutation();

	async function addExerciseHandler(routine, resetForm) {
		try {
			await addRoutine(routine);
			resetForm();
			setIsFormOpen(false);
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<div className="border">
			{isFormOpen ? (
				<ExerciseForm saveExerciseHandler={addExerciseHandler} {...props} />
			) : (
				<Button onClick={() => setIsFormOpen(true)} text="+ New exercise"></Button>
			)}
		</div>
	);
}

export default NewExerciseForm;
