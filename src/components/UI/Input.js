import React from "react";
import classes from "./Input.module.css";

function Input(props) {
	return (
		<input
			type={props.type}
			className={props.className}
			name={props.name}
			value={props.value}
			onChange={props.onChange}
			onBlur={props.onChange}></input>
	);
}

export default Input;
