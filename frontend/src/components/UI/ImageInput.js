import React from "react";
import classes from "./ImageInput.module.css";

function ImageInput(props) {
	const containterClasses = props.allowImageChange ? `${classes.imageInput} pointerCursor` : classes.imageInput;

	return props.allowImageChange ? (
		<label htmlFor={props.inputId} className={containterClasses}>
			{!props.image && <p>Add image</p>}
			<input id={props.inputId} type="file" onChange={props.onChange} accept=".jpg, .jpeg, .png" />
			{props.image && <img src={props.image} alt={props.alt} />}
			<div className={classes.imageOverlay}></div>
			{props.children}
		</label>
	) : (
		<div className={containterClasses}>
			{props.image && <img src={props.image} alt={props.alt} />}
			<div className={classes.imageOverlay}></div>
			{props.children}
		</div>
	);
}

export default ImageInput;
