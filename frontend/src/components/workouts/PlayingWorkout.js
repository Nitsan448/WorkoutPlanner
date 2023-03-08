import useTimer from "../../hooks/use-timer";
import { getTimeInMinutesAndSeconds, getTimeInTimerFormat } from "../../helpers/time";
import { useCallback, useState, useEffect, Fragment } from "react";
import PlayingExercise from "../Exercises/PlayingExercise";
import Button from "../UI/Button";
import { useNavigate } from "react-router-dom";
import classes from "./PlayingWorkout.module.css";
import Image from "../UI/Image";

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

	const currentExercise = exercises[currentExerciseIndex];
	const usingTimer = currentExercise.time_or_repetitions.data[0] === 1;
	const lastSet = currentSet === +currentExercise.sets;

	const getNewTimerTime = useCallback(() => {
		if (currentActivity === Activity.InSet) {
			return getTimeInMinutesAndSeconds(currentExercise.set_time);
		} else if (currentActivity === Activity.Resting) {
			return getTimeInMinutesAndSeconds(currentExercise.rest_time);
		} else {
			return getTimeInMinutesAndSeconds(currentExercise.break_after_routine);
		}
	}, [currentActivity, currentExercise]);

	const initialTimerTime = getNewTimerTime();
	const timer = useTimer(initialTimerTime, activityFinishedHandler, !usingTimer);

	useEffect(() => {
		function setNewTimerTime() {
			const newTimerTime = getNewTimerTime();
			timer.setTime(newTimerTime);
		}
		setNewTimerTime();
		//TODO: pause timer if the exercise uses repetitions
	}, [getNewTimerTime, currentSet]); // eslint-disable-line react-hooks/exhaustive-deps

	function activityFinishedHandler() {
		const exerciseFinished = currentActivity !== Activity.Resting && lastSet;

		const goToBreak =
			exerciseFinished && currentActivity !== Activity.Break && currentExercise.break_after_routine > 0;

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
		if (currentActivity === Activity.InSet && currentExercise.rest_time > 0) {
			setCurrentActivity(Activity.Resting);
		} else if (currentActivity === Activity.InSet && currentExercise.rest_time === 0) {
			setCurrentSet(currentSet + 1);
		} else {
			setCurrentActivity(Activity.InSet);
			setCurrentSet(currentSet + 1);
		}
	}

	function setSwitchHandler(change) {
		if (currentSet + change <= currentExercise.sets && currentSet + change > 0) {
			setCurrentSet(currentSet + change);
		}
	}

	let itemsShown = 0;

	function getExercise(routine, index) {
		const showExercise = index > currentExerciseIndex;
		if (showExercise) {
			itemsShown++;
		}
		const showBreak = routine.break_after_routine > 0 && itemsShown < 3;
		if (showBreak) {
			itemsShown++;
		}
		return (
			<Fragment key={index}>
				{showExercise && (
					<div className={classes.upNext__exercise}>
						<Image image={routine.image} exerciseImage />
						<div>
							<p className={classes.upNext__name}>{routine.name}</p>
							<p className={classes.upNext__timeOrSets}>{routine.sets} sets</p>
						</div>
					</div>
				)}
				{showBreak && (
					<div className={classes.upNext__break}>
						<p className={classes.upNext__breakTime}>
							{getTimeInTimerFormat(routine.break_after_routine)} min Break
						</p>
					</div>
				)}
			</Fragment>
		);
	}

	function renderPlayingExercise() {
		// const inBreak = currentActivity === Activity.Break;
		// const renderBreakAfterExercise =
		// 	exercises[exerciseIndex].break_after_routine > 0 &&
		// 	((!inBreak && currentlyPlaying) || (inBreak && !currentlyPlaying));
		return (
			<div className={classes.playingExercise}>
				<Image image={currentExercise.image} exerciseImage={true} />
				<div className={classes.playingExercise__exerciseInformation}>
					<h1 className={classes.playingExercise__exerciseName}>
						{currentExercise.name} / set {currentSet}
					</h1>
					<h3 className={classes.playingExercise__exerciseBreakBetweenSets}>
						Break between sets: <section>{getTimeInTimerFormat(currentExercise.rest_time)}min</section>
					</h3>
					<p className={classes.playingExercise__exerciseDescription}>{currentExercise.description}</p>
				</div>
				<div className={classes.playingExercise__exerciseState}>
					{usingTimer ? (
						<h1 className={classes.playingExercise__timer}>
							{timer.minutes}:{timer.seconds < 10 ? `0${timer.seconds}` : timer.seconds}
						</h1>
					) : (
						<h1 className={classes.playingExercise__timer}>{props.repetitions}Reps</h1>
					)}
					<div className={classes.playingExercise__sets}>
						<button className={classes.previousSet} onClick={() => setSwitchHandler(-1)} />
						<p>
							{currentSet}/{currentExercise.sets} sets
						</p>
						<button className={classes.nextSet} onClick={() => setSwitchHandler(1)} />
					</div>
				</div>
			</div>
		);
	}

	return (
		<>
			{workoutFinished ? (
				<div>
					<label>Workout finished!</label>
					<Button onClick={() => navigate("/workouts")} text="Back to home page" />
				</div>
			) : (
				<div id="playingWorkout" className={classes.mainContainer}>
					{renderPlayingExercise(currentExerciseIndex, true)}
					<div className={classes.upNext}>
						{props.workout.routines.map(
							(routine, index) =>
								index >= currentExerciseIndex && itemsShown < 3 && getExercise(routine, index)
						)}
					</div>
					{/* <div className={classes.playingWorkout__utilityButtons}>
							{currentActivity === Activity.InSet && (
								<Button text="Finish Set" onClick={activityFinishedHandler}></Button>
							)}
							{currentActivity === Activity.Resting && (
								<Button text="Next Set" onClick={activityFinishedHandler}></Button>
							)}
							<Button
								text="Pause Timer"
								onClick={() => {
									timer.togglePausedState();
								}}></Button>
							<Button text="Next Exercise" onClick={finishExercise}></Button>
						</div> */}
					{/* {currentExerciseIndex < props.workout.routines.length - 1 &&
						renderPlayingExercise(currentExerciseIndex + 1, false)} */}
				</div>
			)}
		</>
	);
}

export default PlayingWorkout;
