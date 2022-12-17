import React, { useEffect } from "react";
import PlayingExercise from "../components/Exercises/PlayingExercise";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchWorkoutData } from "../store/workout-actions";
import Timer from "../components/Timer";

function PlayWorkout(props) {
	// const params = useParams();
	// const { workoutId } = params;
	const workoutId = ":0";
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchWorkoutData(workoutId));
	}, [dispatch, workoutId]);

	const currentWorkout = useSelector((state) => state.currentWorkout);
	const { name, repetitions, sets, restTime, description } =
		currentWorkout.exercises[currentWorkout.currentExerciseIndex];

	return (
		<>
			<PlayingExercise
				name={name}
				repetitions={repetitions}
				sets={sets}
				restTime={restTime}
				description={description}></PlayingExercise>
			<Timer initialMinutes={2} initialSeconds={30} />
		</>
	);
}

export default PlayWorkout;
