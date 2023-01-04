import React from "react";
import classes from "./PlayingExercise.module.css";

function PlayingExercise(props) {
	return (
		<div className={classes.playingExercise}>
			<h2>{props.name}</h2>
			<p>Current set: {`${props.currentSet}/${props.sets}`}</p>
			{props.description !== "" ? <p>Description: {props.description}</p> : ""}
		</div>
	);
}

export default PlayingExercise;
