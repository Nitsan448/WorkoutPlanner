import React from "react";
import classes from "./ImageInput.module.css";

function ImageInput(props) {
	let containerClasses = props.allowImageChange ? `${classes.imageInput} pointerCursor` : classes.imageInput;

	containerClasses = props.workoutImage ? `${containerClasses} ${classes.workoutImageInput}` : containerClasses;

	return props.allowImageChange ? (
		<label htmlFor={props.inputId} className={containerClasses}>
			{!props.image && <p>Add image</p>}
			<input id={props.inputId} type="file" onChange={props.onChange} accept=".jpg, .jpeg, .png" />
			{props.image && <img src={props.image} alt={props.alt} />}
			<div className={classes.imageOverlay}></div>
			{props.children}
		</label>
	) : (
		<div className={containerClasses}>
			{props.image && <img src={props.image} alt={props.alt} />}
			<div className={classes.imageOverlay}></div>
			{props.children}
		</div>
	);
}

export default ImageInput;
