import { configureStore } from "@reduxjs/toolkit";
import currentWorkoutSlice from "./currentWorkout-slice";
import uiSlice from "./ui-slice";

const store = configureStore({
	reducer: { currentWorkout: currentWorkoutSlice.reducer, ui: uiSlice.reducer },
});

export default store;
