import React, { useEffect, useState } from "react";
import PlayingExercise from "../components/Exercises/PlayingExercise";
import { useSelector, useDispatch } from "react-redux";
// import { useParams } from "react-router-dom";
import { fetchWorkoutData } from "../store/workout-actions";
import { getTimeInMinutesAndSeconds } from "../helpers/time";
import useTimer from "../hooks/use-timer";
import Timer from "../components/Timer";

function PlayWorkout(props) {
	// const params = useParams();
	// const { workoutId } = params;
	const workoutId = ":0";
	const dispatch = useDispatch();
	const [currentSet, setCurrentSet] = useState(1);
	const [inSet, setInSet] = useState(true);
	const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);

	useEffect(() => {
		dispatch(fetchWorkoutData(workoutId));
	}, [dispatch, workoutId]);

	const currentWorkout = useSelector((state) => state.currentWorkout);
	const [currentExercise, setCurrentExercise] = useState(currentWorkout.exercises[currentExerciseIndex]);

	const initialTimerTime = getNewTimerTime();
	const timer = useTimer(initialTimerTime, timerFinishedHandler);

	function timerFinishedHandler() {
		const changeToNextSet = !inSet || (inSet && currentExercise.restTime === 0);

		const lastSet = currentSet === +currentExercise.sets;
		if (lastSet && changeToNextSet) {
			changeToNextExercise();
		} else {
			updateCurrentSetState();
		}
		setNewTimerTime();
	}

	function changeToNextExercise() {
		if (currentExerciseIndex < currentWorkout.exercises.length - 1) {
			setCurrentExerciseIndex(currentExerciseIndex + 1);
			setCurrentExercise(currentWorkout.exercises[currentExerciseIndex + 1]);
			setCurrentSet(1);
			setInSet(true);
		} else {
			console.log("Workout finished!!!");
		}
	}

	function updateCurrentSetState() {
		if (inSet && currentExercise.restTime > 0) {
			setInSet(false);
			setCurrentSet(currentSet + 1);
		} else if (inSet && currentExercise.restTime === 0) {
			setCurrentSet(currentSet + 1);
		} else {
			setInSet(true);
		}
	}

	function setNewTimerTime() {
		const [minutes, seconds] = getNewTimerTime();
		timer.setMinutes(minutes);
		timer.setSeconds(seconds);
	}

	function getNewTimerTime() {
		if (inSet) {
			return getTimeInMinutesAndSeconds(currentExercise.setTime);
		}
		return getTimeInMinutesAndSeconds(currentExercise.restTime);
	}

	return (
		<>
			<PlayingExercise
				name={currentExercise.name}
				setTime={currentExercise.setTime}
				currentSet={currentSet}
				sets={currentExercise.sets}
				restTime={currentExercise.restTime}
				description={currentExercise.description}></PlayingExercise>
			<div>
				{inSet ? <h3>In set</h3> : <h3>Resting</h3>}
				<Timer minutes={timer.minutes} seconds={timer.seconds} />
			</div>
		</>
	);
}

export default PlayWorkout;
