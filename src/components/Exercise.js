import React from "react";
import classes from "./Exercise.module.css";

function Exercise(props) {
	return (
		<div className={classes.exercise}>
			<h3>{props.name}</h3>
			<p>Repetitions: {props.repetitions}</p>
			<p>Rest time: {props.restTime}</p>
			<p>Description: {props.description}</p>
		</div>
	);
}

export default Exercise;
