import { createSlice } from "@reduxjs/toolkit";

const currentWorkoutSlice = createSlice({
	name: "current workout",
	initialState: {
		exercises: [],
		currentExerciseIndex: 0,
	},
	reducers: {
		replaceCurrentWorkout(state, action) {
			state.exercises = action.payload.exercises;
			state.currentExerciseIndex = 0;
		},
		addExercise(state, action) {
			const newExercise = action.payload;
			state.exercises.push(newExercise);
		},
		removeExercise(state, action) {
			const exerciseToRemoveId = action.payload;
			state.exercises = state.exercises.filter((exercise) => exercise.id === exerciseToRemoveId);
		},
		nextExercise(state, action) {
			state.currentExerciseIndex++;
		},
	},
});

export const currentWorkoutActions = currentWorkoutSlice.actions;
export default currentWorkoutSlice;
