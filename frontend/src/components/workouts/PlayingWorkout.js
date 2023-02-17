import useTimer from "../../hooks/use-timer";
import { getTimeInMinutesAndSeconds, getTimeInTimerFormat } from "../../helpers/time";
import { useCallback, useState, useEffect } from "react";
import PlayingExercise from "../Exercises/PlayingExercise";
import Button from "../UI/Button";
import { useNavigate } from "react-router-dom";
import classes from "./PlayingWorkout.module.css";

const Activity = {
	InSet: "InSet",
	Resting: "Resting",
	Break: "Break",
};

function PlayingWorkout(props) {
	const navigate = useNavigate();
	const exercises = props.workout.routines;

	const [currentSet, setCurrentSet] = useState(1);
	const [currentActivity, setCurrentActivity] = useState(Activity.InSet);
	const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
	const [workoutFinished, setWorkoutFinished] = useState(false);

	const getNewTimerTime = useCallback(() => {
		if (currentActivity === Activity.InSet) {
			return getTimeInMinutesAndSeconds(exercises[currentExerciseIndex].set_time);
		} else if (currentActivity === Activity.Resting) {
			return getTimeInMinutesAndSeconds(exercises[currentExerciseIndex].rest_time);
		} else {
			return getTimeInMinutesAndSeconds(exercises[currentExerciseIndex].break_after_routine);
		}
	}, [currentActivity, currentExerciseIndex, exercises]);

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
		const exerciseFinished =
			currentActivity !== Activity.Resting && currentSet === +exercises[currentExerciseIndex].sets;

		const goToBreak =
			exerciseFinished &&
			currentActivity !== Activity.Break &&
			exercises[currentExerciseIndex].break_after_routine > 0;

		if (goToBreak) {
			setCurrentActivity(Activity.Break);
		} else if (exerciseFinished) {
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
		setCurrentSet(1);
		setCurrentActivity(Activity.InSet);
	}

	function updateCurrentSetState() {
		if (currentActivity === Activity.InSet && exercises[currentExerciseIndex].rest_time > 0) {
			setCurrentActivity(Activity.Resting);
		} else if (currentActivity === Activity.InSet && exercises[currentExerciseIndex].rest_time === 0) {
			setCurrentSet(currentSet + 1);
		} else {
			setCurrentActivity(Activity.InSet);
			setCurrentSet(currentSet + 1);
		}
	}

	function renderPlayingExercise(exerciseIndex, currentlyPlaying) {
		const inBreak = currentActivity === Activity.Break;
		console.log();
		const renderBreakAfterExercise =
			exercises[exerciseIndex].break_after_routine > 0 &&
			((!inBreak && currentlyPlaying) || (inBreak && !currentlyPlaying));
		return (
			<>
				<PlayingExercise
					name={exercises[exerciseIndex].name}
					setTime={exercises[exerciseIndex].set_time}
					currentSet={currentSet}
					sets={exercises[exerciseIndex].sets}
					restTime={exercises[exerciseIndex].rest_time}
					description={exercises[exerciseIndex].description}
					timer={timer}
					currentActivity={currentActivity}
					currentlyPlaying={currentlyPlaying}></PlayingExercise>

				{renderBreakAfterExercise && (
					<div className={classes.break}>
						<p>{getTimeInTimerFormat(exercises[exerciseIndex].break_after_routine)} Break</p>
					</div>
				)}
			</>
		);
	}

	return (
		<div id="playingWorkout" className={classes.playingWorkout}>
			{renderPlayingExercise(currentExerciseIndex, true)}

			{currentExerciseIndex < props.workout.routines.length - 1 &&
				renderPlayingExercise(currentExerciseIndex + 1, false)}

			{workoutFinished ? (
				<>
					<label>Workout finished!</label>
					<Button onClick={() => navigate("/workouts")} text="Back to home page" />
				</>
			) : (
				<>
					<Button
						text="Pause"
						onClick={() => {
							timer.togglePausedState();
						}}></Button>
					<Button text="Next Exercise" onClick={goToNextExercise}></Button>
				</>
			)}
		</div>
	);
}

export default PlayingWorkout;
