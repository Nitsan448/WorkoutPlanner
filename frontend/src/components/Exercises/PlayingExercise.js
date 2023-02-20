import React from "react";
import classes from "./PlayingExercise.module.css";
import Timer from "../Timer/Timer";

function PlayingExercise(props) {
	const currentSet = props.currentlyPlaying ? props.currentSet : 1;
	const playingExerciseClasses = props.currentlyPlaying
		? `${classes.playingExercise} ${classes.currentlyPlaying}`
		: `${classes.playingExercise}`;
	console.log(props.usingTimer);
	return (
		<div className={playingExerciseClasses}>
			{props.currentActivity === "Break" && props.currentlyPlaying ? (
				<div>
					<p>{props.currentActivity}</p>
					<Timer minutes={props.timer.minutes} seconds={props.timer.seconds} />
				</div>
			) : (
				<>
					<div>
						<h2>{props.name}</h2>
						<p>{`${currentSet}/${props.sets}`}</p>
						{props.currentlyPlaying && <p>{props.description}</p>}
					</div>

					{props.currentlyPlaying && (
						<div>
							<p>{props.currentActivity}</p>
							{props.usingTimer || props.currentActivity === "Resting" ? (
								<Timer minutes={props.timer.minutes} seconds={props.timer.seconds} />
							) : (
								<h3>Repetitions: {props.repetitions}</h3>
							)}
						</div>
					)}
				</>
			)}
		</div>
	);
}

export default PlayingExercise;
