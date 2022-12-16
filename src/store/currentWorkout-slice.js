import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	workoutName: "",
	exercises: [],
	currentExerciseIndex: 0,
	changed: false,
};

const currentWorkoutSlice = createSlice({
	name: "current workout",
	initialState,
	reducers: {
		replaceCurrentWorkout(state, action) {
			state.exercises = action.payload.exercises;
			state.currentExerciseIndex = 0;
		},
		addExercise(state, action) {
			const newExercise = action.payload;
			state.changed = true;
			state.exercises.push(newExercise);
		},
		removeExercise(state, action) {
			const exerciseToRemoveId = action.payload;
			state.changed = true;
			state.exercises = state.exercises.filter((exercise) => exercise.id === exerciseToRemoveId);
		},
		nextExercise(state, action) {
			state.currentExerciseIndex++;
		},
		reset(state) {
			state.workoutName = "";
			state.exercises = [];
			state.currentExerciseIndex = 0;
			state.changed = false;
		},
	},
});

export const currentWorkoutActions = currentWorkoutSlice.actions;
export default currentWorkoutSlice;
