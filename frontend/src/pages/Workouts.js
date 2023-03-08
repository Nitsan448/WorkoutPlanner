import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import classes from "./Workouts.module.css";
import { useGetWorkoutsQuery, useAddWorkoutMutation } from "../store/apiSlice";
import { useDispatch } from "react-redux";
import { showErrorModal } from "../store/uiSlice";
import { useEffect } from "react";
import ImageOverlay from "../components/UI/ImageOverlay";

function Workouts(props) {
	const navigate = useNavigate();
	const location = useLocation();
	const dispatch = useDispatch();

	const {
		data: workouts,
		isLoading: isWorkoutsRequestLoading,
		isSuccess: isWorkoutsRequestSuccess,
		isError: isWorkoutsRequestError,
		error: workoutsRequestError,
	} = useGetWorkoutsQuery();

	useEffect(() => {
		if (isWorkoutsRequestError) {
			dispatch(showErrorModal(workoutsRequestError.error.toString()));
		}
	}, [isWorkoutsRequestError, dispatch, workoutsRequestError]);

	const [addWorkout] = useAddWorkoutMutation();

	function goToWorkoutHandler(workoutIndex, mode) {
		navigate(`${location.pathname}/${workoutIndex}?mode=${mode}`);
	}

	async function onAddWorkoutClicked() {
		try {
			const workoutId = await addWorkout({
				name: "",
				description: "",
			}).unwrap();
			goToWorkoutHandler(workoutId, "edit");
		} catch (error) {
			dispatch(showErrorModal(error.data));
		}
	}

	let content;
	if (isWorkoutsRequestLoading) {
		content = <h1>Loading...</h1>;
	} else if (isWorkoutsRequestSuccess) {
		content = workouts.map((workout) => (
			<div className={classes.workouts__workout} key={workout.workout_id}>
				<button
					className={classes.workouts__viewWorkoutButton}
					onClick={() => goToWorkoutHandler(workout.workout_id, "view")}>
					{workout.image ? (
						<div className={classes.workouts__workoutImageContainer}>
							<img className={classes.workouts__workoutImage} src={`${workout.image}`} alt="workout" />
							<ImageOverlay />
						</div>
					) : (
						<div className={classes.workouts__workoutImageContainer}>
							<div className={classes.workouts__workoutImage} />
							<ImageOverlay />
						</div>
					)}
					<div>
						<h2 className={classes.workouts__workoutName}>{workout.name}</h2>
						<p className={classes.workouts__workoutDescription}>{workout.description}</p>
					</div>
				</button>
				{/* <button
					className={classes.delete}
					// onClick={}
				/> */}
				<button className={classes.edit} onClick={() => goToWorkoutHandler(workout.workout_id, "edit")} />
				<button className={classes.play} onClick={() => goToWorkoutHandler(workout.workout_id, "play")} />
			</div>
		));
	} else if (isWorkoutsRequestError) {
		content = <div>{workoutsRequestError.toString()}</div>;
	}

	return (
		<div>
			<div className={classes.workouts}>
				<h2 className={classes.workouts__title}>My workouts</h2>
				<div className={classes.workouts__gridContainer}>
					{content} <button className={classes.workouts__newWorkout} onClick={onAddWorkoutClicked} />
				</div>
			</div>
		</div>
	);
}

export default Workouts;
