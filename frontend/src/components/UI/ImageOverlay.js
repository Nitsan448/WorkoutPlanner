import React from "react";
import classes from "./ImageOverlay.module.css";

function ImageOverlay(props) {
	const imageFilterClasses = props.exerciseImage
		? `${classes.imageFilterExercise} ${classes.imageFilter}`
		: classes.imageFilter;
	return (
		<>
			<div className={classes.imageOverlay}></div>
			<div className={imageFilterClasses}></div>
		</>
	);
}

export default ImageOverlay;
