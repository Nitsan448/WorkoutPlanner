import React, { useEffect } from "react";
import classes from "./CurrentWorkout.module.css";
import Exercise from "../components/Exercises/Exercise";
import ExerciseForm from "../components/Exercises/ExerciseForm";
import { useSelector, useDispatch } from "react-redux";
import { fetchWorkoutData, sendWorkoutData } from "../store/currentWorkout-actions";
import { useParams } from "react-router-dom";

let isInitial = true;

function CurrentWorkout(props) {
	const params = useParams();
	const { workoutId } = params;

	const currentWorkout = useSelector((state) => state.currentWorkout);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchWorkoutData(workoutId));
	}, [dispatch, workoutId]);

	useEffect(() => {
		if (isInitial) {
			isInitial = false;
			return;
		}
		if (currentWorkout.changed) {
			dispatch(sendWorkoutData(currentWorkout, workoutId));
		}
	}, [currentWorkout, dispatch]);

	return (
		<div className={classes.currentWorkout}>
			<ul>
				{currentWorkout.exercises.map((exercise) => (
					<Exercise
						key={exercise.key}
						name={exercise.name}
						repetitions={exercise.repetitions}
						restTime={exercise.restTime}
						description={exercise.description}
					/>
				))}
			</ul>
			<ExerciseForm></ExerciseForm>
		</div>
	);
}

export default CurrentWorkout;
