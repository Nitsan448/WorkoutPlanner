import React from "react";
import Exercise from "../Exercises/Exercise";
import Button from "../../components/UI/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function ViewingWorkout(props) {
	const navigate = useNavigate();
	const location = useLocation();
	const workout = useSelector((state) => state.workout);

	function StartWorkoutHandler() {
		navigate(`${location.pathname}?mode=play`);
	}

	function EditWorkoutHandler() {
		navigate(`${location.pathname}?mode=edit`);
	}

	return (
		<>
			<h2>{workout.name}</h2>
			<ul>
				{workout.exercises.map((exercise) => (
					<Exercise
						key={exercise.exercise_id}
						name={exercise.name}
						setTime={exercise.set_time}
						sets={exercise.sets}
						restTime={exercise.rest_time}
						description={exercise.description}
					/>
				))}
			</ul>
			<div style={{ display: "flex", justifyContent: "center" }}>
				<Button onClick={EditWorkoutHandler} text="Edit workout"></Button>
				<Button onClick={StartWorkoutHandler} text="Start Workout"></Button>
			</div>
		</>
	);
}

export default ViewingWorkout;
