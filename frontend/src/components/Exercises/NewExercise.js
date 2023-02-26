import React, { useState } from "react";
import ExerciseForm from "./ExerciseForm";
import { useAddRoutineMutation } from "../../store/apiSlice";
import classes from "./NewExercise.module.css";
import { useDispatch } from "react-redux";
import { showModal } from "../../store/errorModalSlice";

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
			setIsFormOpen(false);
		} catch (error) {
			dispatch(showModal(error.data));
		}
	}

	return (
		<div>
			{isFormOpen ? (
				<ExerciseForm
					saveExerciseHandler={addExerciseHandler}
					cancelEditHandler={() => setIsFormOpen(false)}
					deleteExerciseHandler={() => setIsFormOpen(false)}
					usingTimer={true}
					{...props}
				/>
			) : (
				<button className={classes.newExerciseButton} onClick={() => setIsFormOpen(true)}>
					<div className={classes.newExerciseButton__addExercise}></div>
				</button>
			)}
		</div>
	);
}

export default NewExerciseForm;
