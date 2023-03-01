import React from "react";
import classes from "./Button.module.css";

function Button(props) {
	const buttonClasses = props.whiteButton ? `${classes.button} ${classes.whiteButton}` : classes.button;
	return (
		<button disabled={props.disabled} className={buttonClasses} onClick={props.onClick}>
			{props.text}
		</button>
	);
}

export default Button;
