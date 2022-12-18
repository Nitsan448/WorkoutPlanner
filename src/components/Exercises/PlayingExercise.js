import React from "react";
import classes from "./PlayingExercise.module.css";
import { getTimeInSetFormat } from "../../helpers/time";

function PlayingExercise(props) {
	return (
		<div className={classes.playingExercise}>
			<h2>{props.name}</h2>
			<p>Set Time: {props.setTime}</p>
			<p>Current set: {`${props.currentSet}/${props.sets}`}</p>
			<p>Description: {props.description}</p>
		</div>
	);
}

export default PlayingExercise;
