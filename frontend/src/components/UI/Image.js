import React from "react";
import classes from "./Image.module.css";
import ImageOverlay from "./ImageOverlay";

function Image(props) {
	let containerClasses = props.allowImageChange ? `${classes.image} pointerCursor` : classes.image;

	containerClasses = props.workoutImage
		? `${containerClasses} ${classes.workoutImage}`
		: `${containerClasses} ${classes.exerciseImage}`;

	return props.allowImageChange ? (
		<label htmlFor={props.inputId} className={containerClasses}>
			{!props.image && <p>+ Photo</p>}
			<input id={props.inputId} type="file" onChange={props.onChange} accept=".jpg, .jpeg, .svg" />
			{props.image && <img src={props.image} alt={props.alt} />}
			<ImageOverlay />
			{props.children}
		</label>
	) : (
		<div className={containerClasses}>
			{props.image && <img src={props.image} alt={props.alt} />}
			<ImageOverlay exerciseImage={props.exerciseImage} />
			{props.children}
		</div>
	);
}

export default Image;
