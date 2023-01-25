import React from "react";
import classes from "./ImageInput.module.css";

function ImageInput(props) {
	return (
		<label htmlFor="image" className={classes.imageInput}>
			{!props.image && "Add image"}
			<input id="image" type="file" onChange={props.onChange} accept=".jpg, .jpeg, .png" />
			{props.image && <img src={props.image} alt="Workout" width={"200"} height={"200"} />}

			{props.children}
		</label>
	);
}

export default ImageInput;
