import React from "react";
import classes from "./Exercise.module.css";
import { getTimeInTimerFormat } from "../../helpers/time";

function Exercise(props) {
	return (
		<div className={classes.exercise}>
			<h3>{props.name}</h3>
			<p>Set Time: {getTimeInTimerFormat(props.setTime)}</p>
			<p>Sets: {props.sets}</p>
			<p>Rest time: {getTimeInTimerFormat(props.restTime)}</p>
			<p>Description: {props.description}</p>
		</div>
	);
}

export default Exercise;
