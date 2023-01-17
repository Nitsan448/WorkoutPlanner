import React from "react";
import Exercise from "../Exercises/Exercise";
import Button from "../../components/UI/Button";
import { useLocation, useNavigate } from "react-router-dom";
import classes from "./Workout.module.css";

function ViewingWorkout(props) {
	const navigate = useNavigate();
	const location = useLocation();

	function StartWorkoutHandler() {
		navigate(`${location.pathname}?mode=play`);
	}

	function EditWorkoutHandler() {
		navigate(`${location.pathname}?mode=edit`);
	}

	return (
		<>
			<div className={classes.container}>
				<div className={classes.container__workout}>
					<div className={classes.container__workoutImage}>
						<h1>{props.workout.name}</h1>
					</div>
					<h4>{props.workout.description}</h4>
				</div>
				<ul className={classes.container__exercises}>
					{props.workout.routines
						? props.workout.routines.map((routine) => (
								<Exercise
									key={routine.exercise_id}
									name={routine.name}
									setTime={routine.set_time}
									sets={routine.sets}
									restTime={routine.rest_time}
									description={routine.description}
								/>
						  ))
						: ""}
				</ul>
			</div>
			{/* <button className={classes.container__checkmark} onClick={StartWorkoutHandler} /> */}
			<div style={{ display: "flex", justifyContent: "center" }}>
				<Button onClick={EditWorkoutHandler} text="Edit workout"></Button>
			</div>
		</>
	);
}

export default ViewingWorkout;
