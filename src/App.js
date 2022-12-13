import classes from "./App.module.css";
import Exercise from "./components/Exercise";
import ExerciseForm from "./components/ExerciseForm";
import { useSelector, useDispatch } from "react-redux";
import { sendWorkoutData, fetchWorkoutData } from "./store/currentWorkout-actions";
import { useEffect } from "react";

let isInitial = true;

function App() {
	const dispatch = useDispatch();
	const currentWorkout = useSelector((state) => state.currentWorkout);

	useEffect(() => {
		dispatch(fetchWorkoutData());
	}, [dispatch]);

	useEffect(() => {
		if (isInitial) {
			isInitial = false;
			return;
		}
		if (currentWorkout.changed) {
			dispatch(sendWorkoutData(currentWorkout));
		}
	}, [currentWorkout, dispatch]);

	return (
		<div className={classes.App}>
			<ExerciseForm></ExerciseForm>
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
		</div>
	);
}

export default App;
