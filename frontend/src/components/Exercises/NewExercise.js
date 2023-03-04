import React, { useState } from "react";
import ExerciseForm from "./ExerciseForm";
import { useAddRoutineMutation } from "../../store/apiSlice";
import classes from "./NewExercise.module.css";
import { useDispatch } from "react-redux";
import { showErrorModal } from "../../store/uiSlice";

function NewExerciseForm(props) {
	const dispatch = useDispatch();
	const [isFormOpen, setIsFormOpen] = useState(false);

	const [addRoutine] = useAddRoutineMutation();

	async function addExerciseHandler(routine, resetForm) {
		const routineData = new FormData();
		for (var key in routine) {
			routineData.append(key, routine[key]);
		}

		try {
			await addRoutine(routineData).unwrap();
			resetForm();
			toggleFormOpenState(false);
		} catch (error) {
			dispatch(showErrorModal(error.data));
		}
	}

	function toggleFormOpenState(startEditing) {
		if (startEditing) {
			setIsFormOpen(true);
			props.setNumberOfExerciseFormsOpen((numberOfExerciseFormsOpen) => numberOfExerciseFormsOpen + 1);
		} else {
			setIsFormOpen(false);
			props.setNumberOfExerciseFormsOpen((numberOfExerciseFormsOpen) => numberOfExerciseFormsOpen - 1);
		}
	}

	return (
		<div>
			{isFormOpen ? (
				<ExerciseForm
					saveExerciseHandler={addExerciseHandler}
					cancelEditHandler={() => toggleFormOpenState(false)}
					deleteExerciseHandler={() => toggleFormOpenState(false)}
					usingTimer={true}
					{...props}
				/>
			) : (
				<button className={classes.newExerciseButton} onClick={() => toggleFormOpenState(true)}>
					<div className={classes.newExerciseButton__addExercise}></div>
				</button>
			)}
		</div>
	);
}

export default NewExerciseForm;
