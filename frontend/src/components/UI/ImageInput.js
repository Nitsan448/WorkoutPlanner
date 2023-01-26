import React from "react";
import classes from "./ImageInput.module.css";

function ImageInput(props) {
	return (
		<label htmlFor={props.inputId} className={classes.imageInput}>
			{!props.image && <p>Add image</p>}
			<input id={props.inputId} type="file" onChange={props.onChange} accept=".jpg, .jpeg, .png" />
			{props.image && <img src={props.image} alt="Workout" />}
			{props.children}
		</label>
	);
}

export default ImageInput;
