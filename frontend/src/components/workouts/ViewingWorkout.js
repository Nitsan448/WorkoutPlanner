import React from "react";
import Exercise from "../Exercises/Exercise";
import Button from "../../components/UI/Button";
import { useLocation, useNavigate } from "react-router-dom";

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
			<h1>{props.workout.name}</h1>
			<h4>{props.workout.description}</h4>
			<ul>
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
			<div style={{ display: "flex", justifyContent: "center" }}>
				<Button onClick={EditWorkoutHandler} text="Edit workout"></Button>
				<Button onClick={StartWorkoutHandler} text="Start Workout"></Button>
			</div>
		</>
	);
}

export default ViewingWorkout;
