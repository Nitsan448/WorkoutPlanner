import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import classes from "./Workouts.module.css";
import { useGetWorkoutsQuery, useAddWorkoutMutation } from "../store/apiSlice";

function Workouts(props) {
	const navigate = useNavigate();
	const location = useLocation();

	const {
		data: workouts,
		isLoading: isWorkoutsRequestLoading,
		isSuccess: isWorkoutsRequestSuccess,
		isError: isWorkoutsRequestError,
		error: workoutsRequestError,
	} = useGetWorkoutsQuery();

	const [addWorkout] = useAddWorkoutMutation();

	function goToWorkoutHandler(workoutIndex, mode) {
		navigate(`${location.pathname}/${workoutIndex}?mode=${mode}`);
	}

	async function onAddWorkoutClicked() {
		try {
			const workoutId = await addWorkout({
				name: "",
				description: "",
			});
			goToWorkoutHandler(workoutId.data, "edit");
		} catch (error) {
			console.log("failed to add workout", error);
		}
	}

	let content;
	if (isWorkoutsRequestLoading) {
		content = <h1>Loading...</h1>;
	} else if (isWorkoutsRequestSuccess) {
		content = workouts.map((workout) => (
			<div className={classes.workouts__workout}>
				<button
					className={classes.workouts__viewWorkoutButton}
					key={workout.workout_id}
					onClick={() => goToWorkoutHandler(workout.workout_id, "view")}>
					{workout.image ? (
						<div className={classes.workouts__workoutImageContainer}>
							<img className={classes.workouts__workoutImage} src={`${workout.image}`} alt="workout" />
							<div className={classes.workouts__imageFilter}></div>
						</div>
					) : (
						<div className={classes.workouts__workoutImage} />
					)}
					<div>
						<h2 className={classes.workouts__workoutName}>{workout.name}</h2>
						<p className={classes.workouts__workoutDescription}>{workout.description}</p>
					</div>
				</button>
				<button className={classes.edit} onClick={() => goToWorkoutHandler(workout.workout_id, "edit")} />
				<button className={classes.play} onClick={() => goToWorkoutHandler(workout.workout_id, "play")} />
			</div>
		));
	} else if (isWorkoutsRequestError) {
		content = <div>{workoutsRequestError.toString()}</div>;
	}

	return (
		<div className={classes.workouts}>
			<h2>My workouts</h2>
			<div className={classes.workouts__gridContainer}>
				{content} <button className={classes.workouts__newWorkout} onClick={onAddWorkoutClicked} />
			</div>
		</div>
	);
}

export default Workouts;
