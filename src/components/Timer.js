import React from "react";
import classes from "./Timer.module.css";

function Timer(props) {
	return (
		<div className={classes.timer}>
			<h1>
				{props.minutes}:{props.seconds < 10 ? `0${props.seconds}` : props.seconds}
			</h1>
		</div>
	);
}

export default Timer;
