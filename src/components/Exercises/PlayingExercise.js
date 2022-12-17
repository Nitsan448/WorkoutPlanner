import React from "react";
import classes from "./PlayingExercise.module.css";
import { getTimeInSetFormat } from "../../helpers/time";

function PlayingExercise(props) {
	return (
		<div className={classes.playingExercise}>
			<h2>{props.name}</h2>
			<p>Repetitions: {props.repetitions}</p>
			<p>Current set: {`1/${props.sets}`}</p>
			<p>Description: {props.description}</p>
		</div>
	);
}

export default PlayingExercise;
