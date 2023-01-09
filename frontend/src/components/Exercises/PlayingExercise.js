import React from "react";
import classes from "./PlayingExercise.module.css";
import Timer from "../Timer/Timer";

function PlayingExercise(props) {
	return (
		<div className={classes.playingExercise}>
			<div>
				<h2>{props.name}</h2>
				<p>{`${props.currentSet}/${props.sets}`}</p>
			</div>
			<div>
				<p>{props.description}</p>
				{props.inSet ? <p>In set</p> : <p>Resting</p>}
				<Timer minutes={props.timer.minutes} seconds={props.timer.seconds} />
			</div>
		</div>
	);
}

export default PlayingExercise;
