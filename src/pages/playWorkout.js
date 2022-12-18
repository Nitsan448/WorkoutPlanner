import React, { useEffect, useState } from "react";
import PlayingExercise from "../components/Exercises/PlayingExercise";
import { useSelector, useDispatch } from "react-redux";
import { getTimeInMinutesAndSeconds } from "../helpers/time";
import useTimer from "../hooks/use-timer";
import Timer from "../components/Timer";
import Button from "../components/UI/Button";
import { useNavigate } from "react-router-dom";
import { fetchWorkoutData } from "../store/workout-actions";

function PlayWorkout(props) {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [currentSet, setCurrentSet] = useState(1);
	const [inSet, setInSet] = useState(true);
	const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
	const [workoutFinished, setWorkoutFinished] = useState(false);

	const workoutId = ":0";
	useEffect(() => {
		dispatch(fetchWorkoutData(workoutId));
	}, [dispatch, workoutId]);

	const currentWorkout = useSelector((state) => state.currentWorkout);

	useEffect(() => {
		setNewTimerTime();
	}, [inSet, currentSet]);

	const [currentExercise, setCurrentExercise] = useState(currentWorkout.exercises[currentExerciseIndex]);

	const initialTimerTime = getNewTimerTime();
	const timer = useTimer(initialTimerTime, timerFinishedHandler);

	function timerFinishedHandler() {
		const exerciseFinished = inSet && currentSet === +currentExercise.sets;

		if (exerciseFinished) {
			finishExercise();
		} else {
			updateCurrentSetState();
		}
	}

	function finishExercise() {
		if (currentExerciseIndex < currentWorkout.exercises.length - 1) {
			goToNextExercise();
		} else {
			setWorkoutFinished(true);
		}
	}

	function goToNextExercise() {
		setCurrentExerciseIndex(currentExerciseIndex + 1);
		setCurrentExercise(currentWorkout.exercises[currentExerciseIndex + 1]);
		setCurrentSet(1);
		setInSet(true);
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

	//Use callback?
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
			<div>
				{/* Current exercise && */}
				<PlayingExercise
					name={currentExercise.name}
					setTime={currentExercise.setTime}
					currentSet={currentSet}
					sets={currentExercise.sets}
					restTime={currentExercise.restTime}
					description={currentExercise.description}></PlayingExercise>
				<div>
					{inSet ? <h2>In set</h2> : <h2>Resting</h2>}
					<Timer minutes={timer.minutes} seconds={timer.seconds} />
				</div>
				{workoutFinished && (
					<div>
						<label>Workout finished!</label>
						<Button onClick={() => navigate("/workouts")} text="Back to home page" />
					</div>
				)}
			</div>
		</>
	);
}

export default PlayWorkout;
