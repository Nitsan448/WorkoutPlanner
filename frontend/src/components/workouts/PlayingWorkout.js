import useTimer from "../../hooks/use-timer";
import Timer from "../Timer/Timer";
import { getTimeInMinutesAndSeconds } from "../../helpers/time";
import { useCallback, useState, useEffect } from "react";
import PlayingExercise from "../Exercises/PlayingExercise";
import Button from "../UI/Button";
import { useNavigate } from "react-router-dom";
import classes from "./PlayingWorkout.module.css";

function PlayingWorkout(props) {
	const navigate = useNavigate();

	const [currentSet, setCurrentSet] = useState(1);
	const [inSet, setInSet] = useState(true);
	const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
	const [workoutFinished, setWorkoutFinished] = useState(false);
	const [currentExercise, setCurrentExercise] = useState(props.workout.routines[currentExerciseIndex]);

	const getNewTimerTime = useCallback(() => {
		if (inSet) {
			return getTimeInMinutesAndSeconds(currentExercise.set_time);
		}
		return getTimeInMinutesAndSeconds(currentExercise.rest_time);
	}, [inSet, currentExercise.set_time, currentExercise.rest_time]);

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
		if (currentExerciseIndex < props.workout.routines.length - 1) {
			goToNextExercise();
		} else {
			setWorkoutFinished(true);
		}
	}

	function goToNextExercise() {
		setCurrentExerciseIndex(currentExerciseIndex + 1);
		setCurrentExercise(props.workout.routines[currentExerciseIndex + 1]);
		setCurrentSet(1);
		setInSet(true);
	}

	function updateCurrentSetState() {
		if (inSet && currentExercise.rest_time > 0) {
			setInSet(false);
		} else if (inSet && currentExercise.rest_time === 0) {
			setCurrentSet(currentSet + 1);
		} else {
			setInSet(true);
			setCurrentSet(currentSet + 1);
		}
	}

	return (
		<div className={classes.playingWorkout}>
			<PlayingExercise
				name={currentExercise.name}
				setTime={currentExercise.set_time}
				currentSet={currentSet}
				sets={currentExercise.sets}
				restTime={currentExercise.rest_time}
				description={currentExercise.description}
				timer={timer}
				inSet={inSet}></PlayingExercise>
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
		</div>
	);
}

export default PlayingWorkout;
