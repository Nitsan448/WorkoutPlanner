import { createSlice } from "@reduxjs/toolkit";

const workoutSlice = createSlice({
	name: "current workout",
	initialState: {
		name: "",
		description: "",
		workoutId: null,
		exercises: [],
	},
	reducers: {
		replaceWorkout(state, action) {
			state.name = action.payload.name;
			state.description = action.payload.description;
			state.exercises = action.payload.exercises;
			state.workoutId = action.payload.workoutId;
		},
		addExercise(state, action) {
			const newExercise = action.payload;
			console.log(newExercise);
			state.exercises.push(newExercise);
		},
		removeExercise(state, action) {
			const orderInWorkout = action.payload;
			state.exercises = state.exercises.filter((exercise) => exercise.order_in_workout !== orderInWorkout);
		},
	},
});

export const workoutActions = workoutSlice.actions;
export default workoutSlice;
