import React from "react";
import { getTimeInTimerFormat } from "../../helpers/time";
import classes from "./PlayingExercise.module.css";

function PlayingExercise(props) {
	return (
		<div className={classes.playingExercise}>
			<h2>{props.name}</h2>
			<p>Set Time: {getTimeInTimerFormat(props.setTime)}</p>
			<p>Current set: {`${props.currentSet}/${props.sets}`}</p>
			<p>Description: {props.description}</p>
		</div>
	);
}

export default PlayingExercise;
