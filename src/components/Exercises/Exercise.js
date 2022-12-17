import React from "react";
import classes from "./Exercise.module.css";
import { getTimeInSetFormat } from "../../helpers/time";

function Exercise(props) {
	return (
		<div className={classes.exercise}>
			<h3>{props.name}</h3>
			<p>Repetitions: {props.repetitions}</p>
			<p>Sets: {props.sets}</p>
			<p>Rest time: {getTimeInSetFormat(props.restTime)}</p>
			<p>Description: {props.description}</p>
		</div>
	);
}

export default Exercise;
