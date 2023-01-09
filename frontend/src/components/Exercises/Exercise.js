import React from "react";
import classes from "./Exercise.module.css";
import { getTimeInTimerFormat } from "../../helpers/time";

function Exercise(props) {
	return (
		<div className={classes.exercise}>
			<h3>{props.name}</h3>
			<p>{props.description}</p>
			<div className={classes.routine}>
				<p>Set Time: {getTimeInTimerFormat(props.setTime)}</p>
				<p>Sets: {props.sets}</p>
				<p>Rest time: {getTimeInTimerFormat(props.restTime)}</p>
			</div>
		</div>
	);
}

export default Exercise;
