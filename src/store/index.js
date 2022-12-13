import { configureStore } from "@reduxjs/toolkit";
import currentWorkoutSlice from "./currentWorkout-slice";

const store = configureStore({
	reducer: { currentWorkout: currentWorkoutSlice.reducer },
});

export default store;
