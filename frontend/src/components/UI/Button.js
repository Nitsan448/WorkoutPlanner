import React from "react";
import classes from "./Button.module.css";

function Button(props) {
	// TODO: refactor
	let buttonClasses;
	switch (props.color) {
		case "white":
			buttonClasses = `${classes.button} ${classes.whiteButton}`;
			break;
		case "orange":
			buttonClasses = `${classes.button} ${classes.orangeButton}`;
			break;
		default:
			buttonClasses = classes.button;
			break;
	}
	return (
		<button disabled={props.disabled} className={buttonClasses} onClick={props.onClick}>
			{props.text}
		</button>
	);
}

export default Button;
