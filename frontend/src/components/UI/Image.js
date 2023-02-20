import React from "react";
import classes from "./Image.module.css";

function Image(props) {
	let containerClasses = props.allowImageChange ? `${classes.image} pointerCursor` : classes.image;

	containerClasses = props.workoutImage ? `${containerClasses} ${classes.workoutImage}` : containerClasses;

	return props.allowImageChange ? (
		<label htmlFor={props.inputId} className={containerClasses}>
			{!props.image && <p>+ Photo</p>}
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

export default Image;
