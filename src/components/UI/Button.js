import React from "react";
import classes from "./Button.module.css";

function Button(props)
{
	return (
		<button disabled={props.disabled} className={classes.button} onClick={props.onClick}>
			{props.text}
		</button>
	);
}

export default Button;