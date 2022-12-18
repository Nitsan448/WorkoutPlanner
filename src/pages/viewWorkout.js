import React, { useEffect } from "react";
import Exercise from "../components/Exercises/Exercise";
import ExerciseForm from "../components/Exercises/ExerciseForm";
import { useSelector, useDispatch } from "react-redux";
import { fetchWorkoutData, sendWorkoutData } from "../store/workout-actions";
import { useParams } from "react-router-dom";
import Button from "../components/UI/Button";
import { useLocation, useNavigate } from "react-router-dom";

let isInitial = true;

function ViewWorkout(props) {
	const navigate = useNavigate();
	const location = useLocation();

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

	function StartWorkoutHandler() {
		navigate(`${location.pathname}/playing`);
	}

	return (
		<>
			<ul>
				{currentWorkout.exercises.map((exercise) => (
					<Exercise
						key={exercise.key}
						name={exercise.name}
						setTime={exercise.setTime}
						sets={exercise.sets}
						restTime={exercise.restTime}
						description={exercise.description}
					/>
				))}
			</ul>
			<ExerciseForm></ExerciseForm>
			<div style={{ display: "flex", justifyContent: "center" }}>
				<Button onClick={StartWorkoutHandler} text="Start Workout"></Button>
			</div>
		</>
	);
}

export default ViewWorkout;
