import useTimer from "../../hooks/use-timer";
import Timer from "../Timer";
import { getTimeInMinutesAndSeconds } from "../../helpers/time";
import { useCallback, useState, useEffect } from "react";
import PlayingExercise from "../Exercises/PlayingExercise";
import Button from "../UI/Button";
import { useNavigate } from "react-router-dom";

function PlayingWorkout(props) {
	const navigate = useNavigate();

	const [currentSet, setCurrentSet] = useState(1);
	const [inSet, setInSet] = useState(true);
	const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
	const [workoutFinished, setWorkoutFinished] = useState(false);
	const [currentExercise, setCurrentExercise] = useState(props.workout.exercises[currentExerciseIndex]);

	const getNewTimerTime = useCallback(() => {
		if (inSet) {
			return getTimeInMinutesAndSeconds(currentExercise.setTime);
		}
		return getTimeInMinutesAndSeconds(currentExercise.restTime);
	}, [inSet, currentExercise.setTime, currentExercise.restTime]);

	const initialTimerTime = getNewTimerTime();
	const timer = useTimer(initialTimerTime, timerFinishedHandler);

	useEffect(() => {
		function setNewTimerTime() {
			const newTimerTime = getNewTimerTime();
			timer.setTime(newTimerTime);
		}
		setNewTimerTime();
	}, [getNewTimerTime, currentSet]); // eslint-disable-line react-hooks/exhaustive-deps

	function timerFinishedHandler() {
		const exerciseFinished = inSet && currentSet === +currentExercise.sets;

		if (exerciseFinished) {
			finishExercise();
		} else {
			updateCurrentSetState();
		}
	}

	function finishExercise() {
		if (currentExerciseIndex < props.workout.exercises.length - 1) {
			goToNextExercise();
		} else {
			setWorkoutFinished(true);
		}
	}

	function goToNextExercise() {
		setCurrentExerciseIndex(currentExerciseIndex + 1);
		setCurrentExercise(props.workout.exercises[currentExerciseIndex + 1]);
		setCurrentSet(1);
		setInSet(true);
	}

	function updateCurrentSetState() {
		if (inSet && currentExercise.restTime > 0) {
			setInSet(false);
		} else if (inSet && currentExercise.restTime === 0) {
			setCurrentSet(currentSet + 1);
		} else {
			setInSet(true);
			setCurrentSet(currentSet + 1);
		}
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
				{inSet ? <h2>In set</h2> : <h2>Resting</h2>}
				<Timer minutes={timer.minutes} seconds={timer.seconds} />
			</div>
			{workoutFinished ? (
				<div>
					<label>Workout finished!</label>
					<Button onClick={() => navigate("/workouts")} text="Back to home page" />
				</div>
			) : (
				<Button
					text="Pause"
					onClick={() => {
						timer.togglePausedState();
					}}></Button>
			)}
		</>
	);
}

export default PlayingWorkout;
